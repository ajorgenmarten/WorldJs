import { PrismaClient } from '@prisma/client'
import { Injectable } from 'electron-di'

@Injectable()
export default class ORMService extends PrismaClient {
  constructor() {
    super()
    this.$connect()
  }
}
