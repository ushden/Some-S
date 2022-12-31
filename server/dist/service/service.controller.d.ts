import { IServiceService } from './service.service';
import { Service } from './entities/service.entity';
declare const ServiceController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<Service>>;
export declare class ServiceController extends ServiceController_base {
    private readonly serviceService;
    constructor(serviceService: IServiceService);
}
export {};
