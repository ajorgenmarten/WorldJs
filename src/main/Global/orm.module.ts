import { Global, Module } from 'electron-di'
import ORMService from './orm.service'

@Global()
@Module({
  providers: [ORMService],
  exports: [ORMService]
})
export default class ORMModule {}
