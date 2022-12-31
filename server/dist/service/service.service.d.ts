import { IBaseService } from '../base/base.service';
import { Service } from './entities/service.entity';
export interface IServiceService extends IBaseService<Service> {
}
declare const ServiceService_base: import("@nestjs/common").Type<IBaseService<Service>>;
export declare class ServiceService extends ServiceService_base implements IServiceService {
}
export {};
