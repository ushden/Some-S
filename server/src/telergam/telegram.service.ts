import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectBot} from 'nestjs-telegraf';
import {Telegraf} from 'telegraf';
import {DateTime} from 'luxon';
import {Op} from 'sequelize';
import {ITelegrafContext} from '@interfaces';
import {HighestRole, MessageTypesForAdmin, MessageTypesForUser, Service, Status} from '@enums';

import {Event} from '../event/entities/event.entity';
import {IUserService} from '../user/user.service';
import {IEventService} from '../event/event.service';
import {TelegramUtilsService} from '@utils/telegram';

interface IDeleteEventResponse {
  permissionDenied?: boolean;
  success?: boolean;
  notFound?: boolean;
}

interface IApproveEventResponse {
  alreadyApprove?: boolean;
  permissionDenied?: boolean;
  event?: Event | null;
}

interface IGetEvents {
  events?: Event[];
  permissionDenied?: boolean;
}

export interface ITelegramService {
  getContact: (phone: string, chatId: number, name: string) => Promise<string[]>;
  getEventsToday: (chatId: number) => Promise<IGetEvents>;
  approveEvent: (eventId: number, chatId: number) => Promise<IApproveEventResponse>;
  deleteEvent: (eventId: number, chatId: number) => Promise<IDeleteEventResponse>;
}

@Injectable()
export class TelegramService implements ITelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<ITelegrafContext>,
    @Inject(Service.Users) private readonly userService: IUserService,
    @Inject(Service.Events) private readonly eventService: IEventService,
  ) {}

  private async checkAdminPermission(chatId: string) {
    const user = await this.userService.findOne({
      where: {telegramChatId: chatId.toString()},
      include: ['roles'],
    });

    return !(!user || !user.roles.map(r => r.name).includes(HighestRole.Admin));
  }

  public async getContact(phone: string, chatId: number, name: string): Promise<string[]> {
    let user = await this.userService.findOne({
      where: {phone},
      include: ['roles'],
    });

    if (!user) {
      user = await this.userService.createCustomer({name, phone});
    }

    await this.userService.updateTelegramChatId(user.id, chatId);

    const {roles} = user;

    return roles.map(r => r.name);
  }

  public async getEventsToday(chatId: number): Promise<IGetEvents> {
    try {
      const isAvailable = await this.checkAdminPermission(chatId.toString());

      if (!isAvailable) {
        return {permissionDenied: true, events: []};
      }

      const startDay = DateTime.now().startOf('day').toMillis();
      const endDay = DateTime.now().endOf('day').toMillis();

      const events = await this.eventService.find({
        where: {
          created: {[Op.between]: [startDay, endDay]},
        },
        include: ['customer', 'master'],
      });
      
      return {events};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  public async deleteEvent(eventId: number, chatId: number): Promise<IDeleteEventResponse> {
    try {
      const isAvailable = await this.checkAdminPermission(chatId.toString());
  
      if (!isAvailable) {
        return {permissionDenied: true};
      }
  
      const event = await this.eventService.findById(eventId);
  
      if (!event) {
        return {notFound: true};
      }
      
      await this.eventService.delete({where: {id: eventId}});
      
      return {success: true};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  public async approveEvent(eventId: number, chatId: number): Promise<IApproveEventResponse> {
    try {
      const isAvailable = await this.checkAdminPermission(chatId.toString());

      if (!isAvailable) {
        return {permissionDenied: true};
      }

      const event = await this.eventService.findById(eventId, {include: ['master', 'customer']});

      if (!event) {
        return {event: null};
      }
      
      if (event.status === Status.approve) {
        return {alreadyApprove: true};
      }

      event.status = Status.approve;
      await event.save();

      return {event};
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
