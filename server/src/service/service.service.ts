import { Injectable } from '@nestjs/common';
import { BaseService, IBaseService } from '../base/base.service';
import { Service } from './entities/service.entity';

export interface IServiceService extends IBaseService<Service> {}
@Injectable()
export class ServiceService
  extends BaseService<Service>(Service)
  implements IServiceService {}
