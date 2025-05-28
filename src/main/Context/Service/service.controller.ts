import { Controller, Inject, OnInvoke } from 'electron-di'
import Dialogs from './Application/Diagos'

@Controller('services')
export default class ServiceController {
  constructor(@Inject(Dialogs) private readonly _dialogs: Dialogs) {}

  @OnInvoke('select-folder')
  async openFolderDialog() {
    return await this._dialogs.selectFolder()
  }

  @OnInvoke('load-envs')
  async loadEnvs() {
    return await this._dialogs.loadEnvVars()
  }
}
