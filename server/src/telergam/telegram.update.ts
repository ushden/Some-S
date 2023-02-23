import {Inject} from '@nestjs/common';
import {Action, Ctx, Hears, On, Start, Update} from 'nestjs-telegraf';
import {ITelegrafContext} from '@interfaces';
import {AdminMenuButtons, HighestRole, MessageTypesForAdmin, MessageTypesForUser, Service} from '@enums';
import {CommonUtilsService} from '@utils/common-utils';
import {ITelegramService} from './telegram.service';
import {TelegramUtilsService} from '@utils/telegram';
import {Event} from '../event/entities/event.entity';
import {getButtonsForMessage, getContactButton, mainAdminMenu, mainUserMenu} from './telegram.buttons';
import {INotificationService} from '../notification/notification.service';

@Update()
export class TelegramUpdate {
  constructor(
    @Inject(Service.Telegram) private readonly telegramService: ITelegramService,
    @Inject(Service.Notification) private readonly notificationService: INotificationService,
  ) {}

  private async sendEvent(event: Event, type: MessageTypesForAdmin, ctx: ITelegrafContext) {
    const html = TelegramUtilsService.generateHtmlEventForAdmin(event, type);
    const buttons = getButtonsForMessage(type);

    await ctx.replyWithHTML(html, buttons(event.id, event.status));
  }

  private async sendEvents(events: Event[], type: MessageTypesForAdmin, ctx: ITelegrafContext) {
    for (const event of events) {
      await this.sendEvent(event, type, ctx);
    }
  }

  @Start()
  async start(@Ctx() ctx: ITelegrafContext) {
    await ctx.reply('Вітаємо, для подальшої роботи, натисніть - "Номер телефону"', getContactButton());
  }

  @On('contact')
  async getContact(@Ctx() ctx) {
    const phone: string = CommonUtilsService.transformPhone(ctx.message.contact?.phone_number);
    const chatId: number = ctx.chat.id;
    const name: string = ctx.message?.from?.first_name;

    try {
      const data: string[] = await this.telegramService.getContact(phone, chatId, name);

      if (data.includes(HighestRole.Admin)) {
        await ctx.reply(`Вітання, тестуємо бота. ${name} привіт :)`, mainAdminMenu());
      } else {
        await ctx.reply(`Вітаємо, ${name}`, mainUserMenu());
      }
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);

      return;
    }
  }

  @Hears(AdminMenuButtons.mustConfirmed)
  async getMustConfirmedEvents(@Ctx() ctx: ITelegrafContext) {
    const chatId: number = ctx.chat.id;
    
    try {
      const data = await this.telegramService.getMustConfirmedEvents(chatId);
      
      if (data.permissionDenied) {
        await ctx.reply('Вибачте, у Вас немає доступу 😐');
    
        return;
      }
  
      if (!data.events?.length) {
        await ctx.reply('На стогодні всі записи підтвердженно 😐');
    
        return;
      }
  
      await this.sendEvents(data.events, MessageTypesForAdmin.events, ctx);
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);
  
      return;
    }
  }
  
  @Hears(AdminMenuButtons.eventsToday)
  async getEventsToday(@Ctx() ctx: ITelegrafContext) {
    const chatId: number = ctx.chat.id;

    try {
      const data = await this.telegramService.getEventsToday(chatId);

      if (data.permissionDenied) {
        await ctx.reply('Вибачте, у Вас немає доступу 😐');

        return;
      }

      if (!data.events?.length) {
        await ctx.reply('На сьогодні немає записів 😐');

        return;
      }

      await this.sendEvents(data.events, MessageTypesForAdmin.events, ctx);
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);

      return;
    }
  }

  @Action(/delete-event-\d+/g)
  async deleteEvent(@Ctx() ctx: ITelegrafContext): Promise<void | undefined> {
    const chatId = ctx.callbackQuery.from.id;
    // @ts-ignore
    const eventId = TelegramUtilsService.getEventIdFromActionData(ctx.update?.callback_query?.data);
    const messageId = ctx.callbackQuery.message.message_id;

    try {
      if (!eventId) {
        await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)');

        return;
      }

      const data = await this.telegramService.checkEventBeforeDelete(eventId, chatId);

      if (data.permissionDenied) {
        await ctx.reply('Вибачте, у Вас немає доступу 😐');

        return;
      }

      if (data.notFound) {
        await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)');

        return;
      }

      await ctx.deleteMessage(messageId);
      await this.sendEvent(data.event, MessageTypesForAdmin.confirmBeforeDelete, ctx);
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);

      return;
    }
  }

  @Action(/confirm-removing-\d+/g)
  async confirmDeleteEvent(@Ctx() ctx: ITelegrafContext): Promise<void> {
    try {
      // @ts-ignore
      const eventId = TelegramUtilsService.getEventIdFromActionData(ctx.update?.callback_query?.data);
      const messageId = ctx.callbackQuery.message.message_id;
  
      if (!eventId) {
        await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)');

        return;
      }

      const event = await this.telegramService.deleteEvent(eventId);
      
      await ctx.deleteMessage(messageId);
      await ctx.reply('Запис було скасовано. Клієнт отримає повідомлення');
      await this.notificationService.sendTelegramMessageForUser(MessageTypesForUser.eventReject, event);
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);

      return;
    }
  }

  @Action(/approve-event-\d+/g)
  async approveEvent(@Ctx() ctx: ITelegrafContext): Promise<void | undefined> {
    try {
      const chatId = ctx.callbackQuery.from.id;
      // @ts-ignore
      const eventId = TelegramUtilsService.getEventIdFromActionData(ctx.update?.callback_query?.data);
      const messageId = ctx.callbackQuery.message.message_id;

      if (!eventId) {
        await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)');
      }

      const data = await this.telegramService.approveEvent(eventId, chatId);

      if (data.permissionDenied) {
        await ctx.reply('Вибачте, у Вас немає доступу 😐');

        return;
      }

      if (!data.event) {
        await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)');

        return;
      }

      if (data.alreadyApprove) {
        await ctx.reply('ЗАпис був підтверджений раніше 😐');

        return;
      }

      await ctx.deleteMessage(messageId);
      await this.sendEvent(data.event, MessageTypesForAdmin.events, ctx);
      await ctx.reply('Статус було змінено успішно 🙃. Клієнту буде відправлено інформацію.');

      await this.notificationService.sendTelegramMessageForUser(MessageTypesForUser.eventApprove, data.event);
    } catch (e) {
      await ctx.reply(`Сталася помилка - ${e.message}`);

      return;
    }
  }
}
