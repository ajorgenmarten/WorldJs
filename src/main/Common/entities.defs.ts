export interface IEnvVar {
  key: string
  value: string
}

export interface IService {
  id: string
  name: string
  slug: string
  port: number
  exposed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IBuildableService extends IService {
  folderPath: string
  rootDir: string | null
  buildCommand: string | null
  url: string | null
  envVars: IEnvVar[] | null
}

export interface IStaticService extends IBuildableService {
  publishDir: string | null
}

export interface IPostgresService extends IService {
  user: string
  password: string
  database: string | null
}

export interface INodejsService extends IBuildableService {
  startCommand: string
}
