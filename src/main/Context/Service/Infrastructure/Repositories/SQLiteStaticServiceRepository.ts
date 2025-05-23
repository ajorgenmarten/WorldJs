import { Inject, Injectable } from 'electron-di'
import { StaticServiceRepository } from '../../Domain/Ports/Outputs'
import { IEnvVar, IStaticService } from '@main/Common/entities.defs'
import ORMService from '@main/Global/orm.service'

@Injectable()
export class SQLiteStaticServiceRepository implements StaticServiceRepository {
  constructor(@Inject(ORMService) private readonly orm: ORMService) {}
  async findBySlug(slug: string): Promise<IStaticService | null> {
    const service = await this.orm.staticService.findFirst({
      where: { slug: slug }
    })
    if (!service) return null
    return { ...service, envVars: service.envVars as IEnvVar[] | null }
  }

  async create(data: IStaticService): Promise<void> {
    await this.orm.staticService.create({
      data: {
        id: data.id,
        name: data.name,
        slug: data.slug,
        projectPath: data.projectPath,
        rootDir: data.rootDir,
        buildCommand: data.buildCommand,
        publishDir: data.publishDir,
        port: data.port,
        envVars: data.envVars as object,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  }
}
