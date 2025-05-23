import { IPCError } from 'electron-di'

export default class ServiceAlreadyExist extends IPCError {
  constructor(serviceName: string) {
    super({
      message: `El servicio ${serviceName} ya existe`
    })
  }
}
