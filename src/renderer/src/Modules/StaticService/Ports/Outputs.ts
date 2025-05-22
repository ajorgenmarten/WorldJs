import { StaticService } from '../types'

export type CreateStaticServiceOutput = Omit<StaticService, 'id' | 'createdAt' | 'slug'>
