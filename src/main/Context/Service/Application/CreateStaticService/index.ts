import { Inject, Injectable } from 'electron-di'
import { CreateStaticServiceInput } from '../../Domain/Ports/Inputs'
import { StaticServiceRepository } from '../../Domain/Ports/Outputs'
import { StaticService } from '@main/Common/entities.classes'
import ServiceAlreadyExist from '../../Domain/Exceptions/ServiceAlreadyExist'

@Injectable()
export default class CreateStaticService {
  constructor(
    @Inject(StaticServiceRepository) private readonly repository: StaticServiceRepository
  ) {}
  async execute(data: CreateStaticServiceInput) {
    const service = StaticService.new(
      data.name,
      data.projectPath,
      data.rootDir || null,
      data.buildCommand || null,
      data.publishDir || null,
      data.port,
      data.envVars || null
    )
    const existingService = await this.repository.findBySlug(service.slug)
    if (existingService) throw new ServiceAlreadyExist(service.name)
    await this.repository.create(service)
  }

  private async createDockerfile() {}

  private async createDockerCompose() {}
}
