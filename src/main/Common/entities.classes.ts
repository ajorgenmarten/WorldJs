import { v4 as uuid } from 'uuid'
import { IEnvVar, IStaticService, IService, IBuildableService } from './entities.defs'

export class Service implements IService {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string,
    private _port: number,
    private _exposed: boolean,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  get id(): string {
    return this._id
  }
  get name(): string {
    return this._name
  }
  get slug(): string {
    return this._slug
  }
  get port(): number {
    return this._port
  }
  get exposed(): boolean {
    return this._exposed
  }
  get createdAt(): Date {
    return this._createdAt
  }
  get updatedAt(): Date {
    return this._updatedAt
  }
}

export class BuildableService extends Service implements IBuildableService {
  constructor(
    _id: string,
    _name: string,
    _slug: string,
    _port: number,
    _exposed: boolean,
    private _folderPath: string,
    private _rootDir: string | null,
    private _buildCommand: string | null,
    private _url: string | null,
    private _evnVars: IEnvVar[] | null,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _name, _slug, _port, _exposed, _createdAt, _updatedAt)
  }
  get folderPath(): string {
    return this._folderPath
  }
  get rootDir(): string | null {
    return this._rootDir
  }
  get buildCommand(): string | null {
    return this._buildCommand
  }
  get url(): string | null {
    return this._url
  }
  get envVars(): IEnvVar[] | null {
    return this._evnVars
  }
}

export class StaticService extends BuildableService implements IStaticService {
  constructor(
    _id: string,
    _name: string,
    _slug: string,
    _port: number,
    _exposed: boolean,
    _folderPath: string,
    _rootDir: string | null,
    _buildCommand: string | null,
    _url: string | null,
    _evnVars: IEnvVar[] | null,
    private _publishDir: string | null,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(
      _id,
      _name,
      _slug,
      _port,
      _exposed,
      _folderPath,
      _rootDir,
      _buildCommand,
      _url,
      _evnVars,
      _createdAt,
      _updatedAt
    )
  }
  get publishDir(): string | null {
    return this._publishDir
  }
}

export class NodejsService extends BuildableService {
  constructor(
    _id: string,
    _name: string,
    _slug: string,
    _port: number,
    _exposed: boolean,
    _folderPath: string,
    _rootDir: string | null,
    _buildCommand: string | null,
    _url: string | null,
    _evnVars: IEnvVar[] | null,
    private _startCommand: string,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(
      _id,
      _name,
      _slug,
      _port,
      _exposed,
      _folderPath,
      _rootDir,
      _buildCommand,
      _url,
      _evnVars,
      _createdAt,
      _updatedAt
    )
  }
  get startCommand(): string {
    return this._startCommand
  }
}

export class ServicesFactory {
  private static genSlug(name: string): string {
    return name
      .trim()
      .toLowerCase() // Convertir a minúsculas
      .normalize('NFD') // Normalizar caracteres especiales
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos y diacríticos
      .replace(/\s+/g, '-') // Reemplazar espacios con guiones
      .replace(/[^a-z0-9-]/g, '') // Eliminar caracteres no permitidos
      .replace(/-+/g, '-') // Evitar múltiples guiones consecutivos
      .trim() // Eliminar espacios al inicio y al final
  }
  static Service(name: string, port: number, exposed: boolean) {
    const id = uuid()
    const dateNow = new Date()
    const slug = this.genSlug(name)
    return new Service(id, name, slug, port, exposed, dateNow, dateNow)
  }
  static BuildableService(
    name: string,
    port: number,
    exposed: boolean,
    folderPath: string,
    rootDir: string | null = null,
    buildCommand: string | null = null,
    url: string | null = null,
    envVars: IEnvVar[] | null = null
  ) {
    const id = uuid()
    const dateNow = new Date()
    const slug = this.genSlug(name)
    return new BuildableService(
      id,
      name,
      slug,
      port,
      exposed,
      folderPath,
      rootDir,
      buildCommand,
      url,
      envVars,
      dateNow,
      dateNow
    )
  }
  static NodeJsService(
    name: string,
    port: number,
    exposed: boolean,
    folderPath: string,
    rootDir: string | null = null,
    buildCommand: string | null = null,
    url: string | null = null,
    envVars: IEnvVar[] | null = null,
    startCommand: string
  ) {
    const id = uuid()
    const dateNow = new Date()
    const slug = this.genSlug(name)
    return new NodejsService(
      id,
      name,
      slug,
      port,
      exposed,
      folderPath,
      rootDir,
      buildCommand,
      url,
      envVars,
      startCommand,
      dateNow,
      dateNow
    )
  }
  static StaticService(
    name: string,
    port: number,
    exposed: boolean,
    folderPath: string,
    rootDir: string | null = null,
    buildCommand: string | null = null,
    url: string | null = null,
    envVars: IEnvVar[] | null = null,
    publishDir: string | null = null
  ) {
    const id = uuid()
    const dateNow = new Date()
    const slug = this.genSlug(name)
    return new StaticService(
      id,
      name,
      slug,
      port,
      exposed,
      folderPath,
      rootDir,
      buildCommand,
      url,
      envVars,
      publishDir,
      dateNow,
      dateNow
    )
  }
}
