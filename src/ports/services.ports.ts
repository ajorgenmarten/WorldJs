import { IStaticService } from '@main/Common/entities.defs'

export type CreateStaticServiceRequest = Omit<
  IStaticService,
  'id' | 'slug' | 'createdAt' | 'updatedAt'
>
