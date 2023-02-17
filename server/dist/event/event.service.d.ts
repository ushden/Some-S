import { IBaseService } from '../base/base.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { IUserService } from '../user/user.service';
import { INotificationService } from '../notification/notification.service';
export interface IEventService extends IBaseService<Event> {
    createWithNotifications: (data: CreateEventDto) => Promise<Event>;
}
declare const EventService_base: import("@nestjs/common").Type<IBaseService<Event>>;
export declare class EventService extends EventService_base implements IEventService {
    private readonly userService;
    private readonly notificationService;
    constructor(userService: IUserService, notificationService: INotificationService);
    createWithNotifications(data: CreateEventDto): Promise<Event>;
}
export {};
