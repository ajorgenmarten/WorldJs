import {
  BuildableService,
  NodejsService,
  Service,
  StaticService
} from '@main/Common/entities.classes'
import { IService, IStaticService } from '@main/Common/entities.defs'
import { PostgresService } from '@prisma/client'

export abstract class StaticServiceRepository {
  abstract create(data: IStaticService): Promise<void>
  abstract ensureCreation(service: IStaticService): Promise<IService | null>
}

export abstract class ServiceRepository {
  abstract findById(
    id: string
  ): Promise<
    | (Service &
        Partial<BuildableService> &
        Partial<NodejsService> &
        Partial<StaticService> &
        Partial<PostgresService>)
    | null
  >
}
