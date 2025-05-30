import { IService, IStaticService } from '@main/Common/entities.defs'

export abstract class StaticServiceRepository {
  abstract create(data: IStaticService): Promise<void>
  abstract ensureCreation(service: IStaticService): Promise<IService | null>
}
