import { Inject, Injectable } from 'electron-di'
import { ServiceRepository } from '../../Domain/Ports/Outputs'

@Injectable()
export default class ViewDetails {
  constructor(@Inject(ServiceRepository) private readonly repository: ServiceRepository) {}
  async execute(serviceId: string) {
    const service = await this.repository.findById(serviceId)
    if (!service) throw new Error('Service not found')
    return service
  }
}
