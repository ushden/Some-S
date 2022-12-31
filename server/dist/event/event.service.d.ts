import { IBaseService } from "../base/base.service";
import { Event } from "./entities/event.entity";
interface IEventService extends IBaseService<Event> {
}
declare const EventService_base: import("@nestjs/common").Type<IBaseService<Event>>;
export declare class EventService extends EventService_base implements IEventService {
}
export {};
