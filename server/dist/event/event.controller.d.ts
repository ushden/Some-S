import { IEventService } from './event.service';
import { Event } from "./entities/event.entity";
import { CreateEventDto } from "./dto/create-event.dto";
declare const EventController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<Event>>;
export declare class EventController extends EventController_base {
    private readonly eventService;
    constructor(eventService: IEventService);
    createWithNotifications(event: CreateEventDto): Promise<Event>;
}
export {};
