import { IStaticService } from '@main/Common/entities.defs'

export abstract class StaticServiceRepository {
  abstract create(data: IStaticService): Promise<void>
  abstract findBySlug(slug: string): Promise<IStaticService | null>
}
