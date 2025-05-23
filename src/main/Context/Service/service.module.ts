import { Module } from 'electron-di'
import Dialogs from './Application/Diagos'
import ServiceController from './service.controller'
import { StaticServiceRepository } from './Domain/Ports/Outputs'
import { SQLiteStaticServiceRepository } from './Infrastructure/Repositories/SQLiteStaticServiceRepository'
import CreateStaticService from './Application/CreateStaticService'

@Module({
  providers: [
    {
      provide: StaticServiceRepository,
      useClass: SQLiteStaticServiceRepository
    },
    Dialogs,
    CreateStaticService
  ],
  controllers: [ServiceController]
})
export default class ServiceModule {}
