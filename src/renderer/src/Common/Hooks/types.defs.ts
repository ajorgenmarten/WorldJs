export interface EnvVar {
  key: string
  value: string
}

export interface Service {
  id: string
  name: string
  slug: string
  port: number
  exposed: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BuildiableService extends Service {
  folderPath: string
  rootDir: string | null
  buildCommand: string | null
  url: string | null
  envVars: EnvVar[] | null
}

export interface StaticService extends BuildiableService {
  publishDir: string | null
}

export interface PostgresService extends Service {
  user: string
  password: string
  database: string | null
}

export interface NodejsService extends BuildiableService {
  startCommand: string
}
