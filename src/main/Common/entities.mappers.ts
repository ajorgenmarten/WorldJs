import { JsonValue } from '@prisma/client/runtime/library'
import { BuildableService, NodejsService, Service, StaticService } from './entities.classes'
import { IEnvVar } from './entities.defs'
import { PostgresService } from '@prisma/client'

type GenericService =
  | ({
      BuildiableService:
        | ({
            NodeJsService: {
              buildiableServiceId: string
              startCommand: string
            } | null
            StaticService: {
              buildiableServiceId: string
              publishDir: string | null
            } | null
          } & {
            serviceId: string
            folderPath: string
            rootDir: string | null
            buildCommand: string | null
            url: string | null
            envVars: JsonValue | IEnvVar[]
          })
        | null
      PostgresService: {
        serviceId: string
        user: string
        password: string
        database: string | null
      } | null
    } & {
      id: string
      name: string
      slug: string
      port: number
      exposed: boolean
      createdAt: Date
      updatedAt: Date
    })
  | null

export default class ServiceMapper {
  static fromDataBase(
    service: GenericService
  ):
    | (Service &
        Partial<BuildableService> &
        Partial<NodejsService> &
        Partial<StaticService> &
        Partial<PostgresService>)
    | null {
    if (service == null) return null
    if (typeof service.BuildiableService?.StaticService === 'object')
      return new StaticService(
        service.id,
        service.name,
        service.slug,
        service.port,
        service.exposed,
        service.BuildiableService.folderPath,
        service.BuildiableService.rootDir,
        service.BuildiableService.buildCommand,
        service.BuildiableService.url,
        service.BuildiableService.envVars as IEnvVar[],
        service.BuildiableService.StaticService?.publishDir || null,
        service.createdAt,
        service.updatedAt
      )
    if (typeof service.BuildiableService?.NodeJsService === 'object')
      return new NodejsService(
        service.id,
        service.name,
        service.slug,
        service.port,
        service.exposed,
        service.BuildiableService.folderPath,
        service.BuildiableService.rootDir,
        service.BuildiableService.buildCommand,
        service.BuildiableService.url,
        service.BuildiableService.envVars as IEnvVar[],
        service.BuildiableService.NodeJsService?.startCommand || 'npm start',
        service.createdAt,
        service.updatedAt
      )
    return new Service(
      service.id,
      service.name,
      service.slug,
      service.port,
      service.exposed,
      service.createdAt,
      service.updatedAt
    )
  }
}
