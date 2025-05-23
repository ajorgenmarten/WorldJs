import { Controller, Inject, OnInvoke } from 'electron-di'
import Dialogs from './Application/Diagos'

@Controller('services')
export default class ServiceController {
  constructor(@Inject(Dialogs) private readonly _dialogs: Dialogs) {}

  @OnInvoke('open-folder-dialog')
  async openFolderDialog() {
    return await this._dialogs.getFolderPath()
  }
}
