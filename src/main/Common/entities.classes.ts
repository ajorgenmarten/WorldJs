import { v4 as uuid } from 'uuid'
import { IEnvVar, IStaticService } from './entities.defs'

export class StaticService implements IStaticService {
  constructor(
    private readonly _id: string,
    private _name: string,
    private _slug: string,
    private _projectPath: string,
    private _rootDir: string | null,
    private _buildCommand: string | null,
    private _publishDir: string | null,
    private _prot: number,
    private _envVars: IEnvVar[] | null,
    private _createdAt: Date,
    private _updatedAt: Date
  ) {}

  get id() {
    return this._id
  }
  get name() {
    return this._name
  }
  get slug() {
    return this._slug
  }
  get projectPath() {
    return this._projectPath
  }
  get rootDir() {
    return this._rootDir
  }
  get buildCommand() {
    return this._buildCommand
  }
  get publishDir() {
    return this._publishDir
  }
  get port() {
    return this._prot
  }
  get envVars() {
    return this._envVars
  }
  get updatedAt() {
    return this._updatedAt
  }
  get createdAt() {
    return this._createdAt
  }
  static new(
    name: string,
    projectPath: string,
    rootDir: string | null,
    buildCommand: string | null,
    publishDir: string | null,
    port: number,
    envVars: IEnvVar[] | null,
    slug?: string
  ) {
    const id = uuid()
    const date = new Date()
    return new StaticService(
      id,
      name,
      slug ?? name.trim().toLowerCase().replace(/\s/g, '-'),
      projectPath,
      rootDir,
      buildCommand,
      publishDir,
      port,
      envVars,
      date,
      date
    )
  }
}
