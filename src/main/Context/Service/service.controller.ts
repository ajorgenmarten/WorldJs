import { Controller, Inject, OnInvoke, Payload } from 'electron-di'
import Dialogs from './Application/Diagos'
import CreateStaticService from './Application/CreateStaticService'
import { type CreateStaticServiceRequest } from '@ports/services.ports'
import ViewDetails from './Application/ViewDetails'

@Controller('services')
export default class ServiceController {
  constructor(
    @Inject(Dialogs) private readonly _dialogs: Dialogs,
    @Inject(CreateStaticService) private readonly _createStatic: CreateStaticService,
    @Inject(ViewDetails) private readonly _viewDetails: ViewDetails
  ) {}

  @OnInvoke('select-folder')
  async openFolderDialog() {
    return await this._dialogs.selectFolder()
  }

  @OnInvoke('load-envs')
  async loadEnvs() {
    return await this._dialogs.loadEnvVars()
  }

  @OnInvoke('add-static-service')
  async addStatic(@Payload() data: CreateStaticServiceRequest) {
    return await this._createStatic.execute(data)
  }

  @OnInvoke('get-service')
  async getService(@Payload() data: string) {
    return await this._viewDetails.execute(data)
  }
}
