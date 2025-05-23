export interface IStaticService {
  id: string
  name: string
  slug: string
  projectPath: string
  rootDir: string | null
  buildCommand: string | null
  publishDir: string | null
  port: number
  envVars: IEnvVar[] | null
  createdAt: Date
  updatedAt: Date
}

export interface IEnvVar {
  key: string
  value: string
}
