import { Inject, Injectable } from 'electron-di'
import { StaticServiceRepository } from '../../Domain/Ports/Outputs'
import { IStaticService } from '@main/Common/entities.defs'
import ORMService from '@main/Global/orm.service'
import { BuildableService, Service, StaticService } from '@prisma/client'
import { InputJsonValue, JsonValue } from '@prisma/client/runtime/library'

@Injectable()
export class SQLiteStaticServiceRepository implements StaticServiceRepository {
  constructor(@Inject(ORMService) private readonly orm: ORMService) {}

  async ensureCreation(service: IStaticService): Promise<Service | null> {
    const exist = await this.orm.service.findFirst({
      where: {
        OR: [
          { slug: service.slug },
          { exposed: true, port: service.port },
          { BuildiableService: { url: service.url } }
        ]
      }
    })
    return exist
  }

  async create(data: IStaticService): Promise<void> {
    const service: Service = {
      id: data.id,
      name: data.name,
      slug: data.slug,
      port: data.port,
      exposed: data.exposed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }

    const buildableService: BuildableService = {
      folderPath: data.folderPath,
      rootDir: data.rootDir,
      buildCommand: data.buildCommand,
      url: data.url,
      envVars: data.envVars as JsonValue,
      serviceId: data.id
    }

    const staticService: StaticService = {
      buildiableServiceId: service.id,
      publishDir: data.publishDir
    }

    await this.orm.service.create({
      data: {
        ...service,
        BuildiableService: {
          create: {
            folderPath: buildableService.folderPath,
            rootDir: buildableService.rootDir,
            buildCommand: buildableService.buildCommand,
            url: buildableService.url,
            envVars: buildableService.envVars as InputJsonValue,
            StaticService: {
              create: {
                publishDir: staticService.publishDir
              }
            }
          }
        }
      }
    })
  }
}
