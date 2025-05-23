import { IStaticService } from '@main/Common/entities.defs'

export type CreateStaticServiceInput = Omit<
  IStaticService,
  'id' | 'slug' | 'createdAt' | 'updatedAt'
>
