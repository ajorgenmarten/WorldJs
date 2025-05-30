import { Module } from 'electron-di'
import ServiceModule from './Context/Service/service.module'
import ORMModule from './Global/orm.module'

@Module({
  imports: [ORMModule, ServiceModule]
})
export default class AppModule {}
