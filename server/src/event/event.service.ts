import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {BaseService, IBaseService} from '../base/base.service';
import {Event} from './entities/event.entity';
import {CreateEventDto} from './dto/create-event.dto';
import {MessageTypesForAdmin, MessageTypesForUser, Service} from '@enums';
import {IUserService} from '../user/user.service';
import {INotificationService} from '../notification/notification.service';

export interface IEventService extends IBaseService<Event> {
  createWithNotifications: (data: CreateEventDto) => Promise<Event>;
}

@Injectable()
export class EventService extends BaseService<Event>(Event) implements IEventService {
  constructor(
    @Inject(Service.Users) private readonly userService: IUserService,
    @Inject(Service.Notification) private readonly notificationService: INotificationService,
  ) {
    super();
  }

  public async createWithNotifications(data: CreateEventDto): Promise<Event> {
    try {
      const event = await this.create(data, {include: ['master', 'customer']});
      const customer = await this.userService.findById(event.customerId);
      const master = await this.userService.findById(event.masterId);
      
      event.customer = customer;
      event.master = master;

      await this.notificationService.sendTelegramMessageForAdmin(MessageTypesForAdmin.newEvent, event);
      await this.notificationService.sendTelegramMessageForUser(
        MessageTypesForUser.waitingApprove,
        event,
        customer.telegramChatId
      );

      return event;
    } catch (e) {
      console.log(e.message);

      return Promise.reject(new BadRequestException(e.message));
    }
  }
}
