import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {MessageTypesForAdmin, MessageTypesForUser, Service} from '@enums';
import {Event} from '../event/entities/event.entity';
import {TelegramUtilsService} from '@utils/telegram';
import {InjectBot} from 'nestjs-telegraf';
import {Telegraf} from 'telegraf';
import {ITelegrafContext} from '@interfaces';
import {IUserService} from '../user/user.service';
import {WINSTON_MODULE_PROVIDER} from "nest-winston";
import {Logger} from "winston";
import {eventAdminButtons} from "../telergam/telegram.buttons";

export interface INotificationService {
  sendTelegramMessageForAdmin: (type: MessageTypesForAdmin, event: Event) => Promise<void>;
  sendTelegramMessageForUser: (type: MessageTypesForUser, event: Event, chatId?: string) => Promise<void>;
}

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @InjectBot() private readonly telegramBot: Telegraf<ITelegrafContext>,
    @Inject(Service.Users) private readonly userService: IUserService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  public async sendTelegramMessageForAdmin(type: MessageTypesForAdmin, event: Event): Promise<void> {
    try {
      const admins = await this.userService.getAdmins();
      const chatIds = admins.map(admin => admin.telegramChatId);
      const message = TelegramUtilsService.generateHtmlEventForAdmin(event, type);

      for (const chatId of chatIds) {
        if (type === MessageTypesForAdmin.events) {
          await this.telegramBot.telegram.sendMessage(chatId, '😻 Новий запис, потрібне підтвердження ⬇⬇⬇');
          await this.telegramBot.telegram.sendMessage(chatId, message, {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: eventAdminButtons(event.id),
            },
          });
        }
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  
  public async sendTelegramMessageForUser(type: MessageTypesForUser, event: Event, chatId: string | undefined): Promise<void> {
    try {
      if (!chatId) {
        const user = await this.userService.findById(event.customerId, {attributes: ['telegramChatId']});
        
        chatId = user?.telegramChatId;
      }
  
      if (!chatId) {
        this.logger.info(`NSSTMFU001: Telegram chat id not exist. Message not send`);
        
        return;
      }
  
      const message = TelegramUtilsService.generateHtmlMessageForUser(event, type);
      
      if (!message) {
        this.logger.info(`NSSTMFU002: Message for type ${type} not implemented`);
        
        return;
      }
  
      await this.telegramBot.telegram.sendMessage(chatId, message, {parse_mode: 'HTML'});
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
