import {Controller, Inject} from '@nestjs/common';
import {IServiceService} from './service.service';
import {Resource, Service as EnumService} from '@enums';
import {BaseController} from '../base/base.controller';
import {Service} from './entities/service.entity';

@Controller(Resource.Service)
export class ServiceController extends BaseController<Service>(Service, EnumService.Services) {
  constructor(
    @Inject(EnumService.Services) private readonly serviceService: IServiceService,
  ) {
    super();
  }
}
