import { Module } from 'electron-di'
import ServiceModule from './Context/Service/service.module'

@Module({
  imports: [ServiceModule]
})
export default class AppModule {}
