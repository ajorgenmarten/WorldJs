export interface EnvVar {
  key: string
  value: string
}

export interface StaticService {
  id: string
  name: string
  slug: string
  projectPath: string
  rootDir: string
  buildCommand: string
  publishDir: string
  port: number
  envVars: EnvVar[]
  createdAt: Date
}
