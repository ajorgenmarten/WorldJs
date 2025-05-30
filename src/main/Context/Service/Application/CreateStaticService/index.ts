import { Inject, Injectable } from 'electron-di'
import { StaticServiceRepository } from '../../Domain/Ports/Outputs'
import { ServicesFactory, StaticService } from '@main/Common/entities.classes'
import { CreateStaticServiceRequest } from '@ports/services.ports'
import ServiceAlreadyExist from '../../Domain/Exceptions/ServiceAlreadyExist'
import { access, constants, writeFile } from 'node:fs/promises'
import { posix } from 'node:path'
import process from 'node:process'
import { exec } from 'node:child_process'

@Injectable()
export default class CreateStaticService {
  constructor(
    @Inject(StaticServiceRepository) private readonly repository: StaticServiceRepository
  ) {}
  async execute(data: CreateStaticServiceRequest) {
    const service = ServicesFactory.StaticService(
      data.name,
      data.port,
      data.exposed,
      data.folderPath,
      data.rootDir,
      data.buildCommand,
      data.url,
      data.envVars,
      data.publishDir
    )
    await this.ensure(service)
    const createDockerfile = this.createDockerfile(
      service.port,
      service.rootDir,
      service.buildCommand,
      service.publishDir,
      service.folderPath
    )
    const createNginxConf = this.createNginxConf(service.port, service.folderPath, service.url)
    const createDockerCompose = this.createDockerCompose(
      service.slug,
      service.exposed,
      service.port,
      service.rootDir,
      service.folderPath
    )
    const reigsterInDatabase = this.repository.create(service)
    service.url && (await this.writeInHostFile('add', service.url))
    await Promise.all([createDockerfile, createDockerCompose, createNginxConf, reigsterInDatabase])
    await this.buildProject(service.folderPath, service.rootDir)
    return service
  }

  async ensure(service: StaticService) {
    const existService = await this.repository.ensureCreation(service)
    if (existService) {
      if (existService.slug == service.slug) throw new ServiceAlreadyExist(service.slug)
      if (existService.exposed && service.exposed && existService.port == service.port)
        throw new Error(
          `No se puede crear un servicio expuesto con el puerto ${service.port} porque ya hay otro creado con este puerto`
        )
      throw new Error(`Al parecer ya existe un servicio con la misma url`)
    }
    try {
      await access(service.folderPath)
    } catch {
      throw new Error('No se puede acceder a la carpeta de proyecto')
    }
  }

  private async createDockerfile(
    port: number,
    rootDir: string | null,
    buildCommand: string | null,
    publishDir: string | null,
    folderPath: string
  ) {
    const buildFrom = 'FROM node as build\nWORKDIR /app'

    const copyPackages = `COPY ${rootDir ? posix.join(rootDir, 'package*.json') : 'package*.json'} ./\nRUN npm ci`

    const copyAll = `COPY ${rootDir ? rootDir : '.'} .`

    const runCommandBuild = this.segmentCommands(buildCommand || '')

    const nginxFrom = 'FROM nginx'

    const nginxCopy = `COPY ${rootDir ? posix.join(rootDir, 'default.conf') : 'default.conf'} /etc/nginx/conf.d/default.conf`

    const nginxCopyPublish = `COPY --from=build ${publishDir ? posix.join('app', publishDir) : '/app'} /usr/share/nginx/html`

    const expose = `EXPOSE ${port}`

    const cmdCommand = 'CMD ["nginx", "-g", "daemon off;"]'

    const dockerfileText = [
      buildFrom,
      (await this.existPackageJson(folderPath)) ? copyPackages : '',
      copyAll,
      buildCommand ? runCommandBuild : '',
      nginxFrom,
      nginxCopy,
      nginxCopyPublish,
      expose,
      cmdCommand
    ].join('\n')

    await writeFile(posix.join(folderPath, rootDir || '', 'Dockerfile'), dockerfileText)
  }

  private async existPackageJson(folderPath: string) {
    try {
      await access(folderPath, constants.F_OK)
      return true
    } catch {
      return false
    }
  }

  private segmentCommands(buildCommand: string): string {
    return buildCommand
      .split(/[;&|]/)
      .reduce((p: string[], c: string) => {
        const parsed = c.trim()
        if (!parsed) return p
        return [...p, `RUN ${parsed}`]
      }, [])
      .join('\n')
  }

  private async createDockerCompose(
    slug: string,
    exposed: boolean,
    port: number,
    rootDir: string | null,
    folderPath: string
  ) {
    const space = (count: number = 0) =>
      Array.from({ length: count * 2 })
        .fill(' ')
        .join('')
    const service = 'services:'
    const name = `${space(1)}${slug}:`
    const containerDef = `${space(2)}container_name: ${slug}`
    const buildDef = `${space(2)}build:`
    const buildContext = `${space(3)}context: ${posix.join(folderPath, rootDir || '')}`
    const buildDockerfile = `${space(3)}dockerfile: Dockerfile`
    const portsDef = [`${space(2)}ports:`, `${space(3)}- "${port}:${port}"`].join('\n')
    const dockerComposeSegments = [
      service,
      name,
      containerDef,
      buildDef,
      buildContext,
      buildDockerfile,
      exposed ? portsDef : ''
    ]
    const dockerComposeFile = dockerComposeSegments.join('\n')
    await writeFile(posix.join(folderPath, rootDir || '', 'docker-compose.yml'), dockerComposeFile)
  }

  private async createNginxConf(port: number, folderPath: string, url: string | null) {
    const serverBlock = 'server {\n\t%listen%\n\t%url%\n\n\t%location%\n}'
    const listenSentence = `listen ${port};`
    const urlSentence = `server_name ${url};`
    const locationBlock = 'location / {\n\t\t%locationConfigs%\n\t}'
    const locationConfigs = [
      'root /usr/share/nginx/html;',
      'index index.html;',
      'try_files $uri $uri/ /index.html;'
    ].join('\n\t\t')
    const defaultConf = serverBlock
      .replace('%listen%', listenSentence)
      .replace('%url%', url ? urlSentence : '')
      .replace('%location%', locationBlock)
      .replace('%locationConfigs%', locationConfigs)
    await writeFile(posix.join(folderPath, 'default.conf'), defaultConf)
  }

  private async writeInHostFile(action: 'add' | 'remove', url: string) {
    const winSysRoot = process.env.SystemRoot || process.env.WINDIR || 'C:\\WINDOWS'
    const unixSysRoot = '/etc/hosts'
    const path =
      process.platform == 'win32'
        ? posix.join(winSysRoot, 'System32', 'drivers', 'etc', 'hosts')
        : unixSysRoot

    const exePath = '../../resources/scripts/write-file.exe'
    const args = [action, url, path]
    const winCommand = `Start-Process -FilePath "${exePath}" -ArgumentList '${args.join("', '")}' -Verb RunAs -Wait -WindowStyle Hidden -PassThru | Out-String`
    return new Promise((resolve, reject) => {
      exec(`powershell -Command "${winCommand}"`, { cwd: __dirname }, (err) => {
        if (err) reject(false)
        resolve(true)
      })
    })
  }

  private async buildProject(folderPath: string, rootDir: string | null) {
    const command = `docker compose up --build -d`
    const cwd = posix.join(folderPath, rootDir || '')
    return new Promise((resolve, reject) => {
      exec(command, { cwd }, (err) => {
        if (err) reject(false)
        resolve(true)
      })
    })
  }
}
