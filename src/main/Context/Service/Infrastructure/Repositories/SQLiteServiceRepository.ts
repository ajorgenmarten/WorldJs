import ORMService from '@main/Global/orm.service'
import { Inject, Injectable } from 'electron-di'
import { ServiceRepository } from '../../Domain/Ports/Outputs'
import ServiceMapper from '@main/Common/entities.mappers'
import {
  BuildableService,
  NodejsService,
  Service,
  StaticService
} from '@main/Common/entities.classes'
import { PostgresService } from '@prisma/client'

@Injectable()
export default class SQLiteServiceRepository implements ServiceRepository {
  constructor(@Inject(ORMService) private readonly repository: ORMService) {}
  async findById(
    id: string
  ): Promise<
    | (Service &
        Partial<BuildableService> &
        Partial<NodejsService> &
        Partial<StaticService> &
        Partial<PostgresService>)
    | null
  > {
    const service = ServiceMapper.fromDataBase(
      await this.repository.service.findFirst({
        where: { id },
        include: {
          BuildiableService: { include: { NodeJsService: true, StaticService: true } },
          PostgresService: true
        }
      })
    )
    return service
  }
}
