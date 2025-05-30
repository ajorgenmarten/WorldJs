import { Module } from 'electron-di'
import Dialogs from './Application/Diagos'
import ServiceController from './service.controller'
import { ServiceRepository, StaticServiceRepository } from './Domain/Ports/Outputs'
import { SQLiteStaticServiceRepository } from './Infrastructure/Repositories/SQLiteStaticServiceRepository'
import CreateStaticService from './Application/CreateStaticService'
import ViewDetails from './Application/ViewDetails'
import SQLiteServiceRepository from './Infrastructure/Repositories/SQLiteServiceRepository'

@Module({
  providers: [
    {
      provide: StaticServiceRepository,
      useClass: SQLiteStaticServiceRepository
    },
    {
      provide: ServiceRepository,
      useClass: SQLiteServiceRepository
    },
    Dialogs,
    CreateStaticService,
    ViewDetails
  ],
  controllers: [ServiceController]
})
export default class ServiceModule {}
