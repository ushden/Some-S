import {Inject} from '@nestjs/common';
import {Update, Ctx, Start, On, Hears, Action} from 'nestjs-telegraf';
import {ITelegrafContext} from '@interfaces';
import {AdminMenuButtons, Service} from '@enums';
import {CommonUtilsService} from '@utils/common-utils';
import {ITelegramService} from "./telegram.service";
import {TelegramUtilsService} from "@utils/telegram";

@Update()
export class TelegramUpdate {
  constructor(@Inject(Service.Telegram) private readonly telegramService: ITelegramService) {}

  @Start()
  async start(@Ctx() ctx: ITelegrafContext) {
    await this.telegramService.start(ctx);
  }

  @On('contact')
  async getContact(@Ctx() ctx) {
    const phone: string = CommonUtilsService.transformPhone(ctx.message.contact?.phone_number);

    await this.telegramService.getContact(ctx, phone);
  }
  
  @Hears(AdminMenuButtons.eventsToday)
  async getEventsToday(@Ctx() ctx: ITelegrafContext) {
    const chatId: number  = ctx.chat.id;
    
    await this.telegramService.getEventsToday(chatId, ctx);
  }
  
  @Action(/delete-event-\d+/g)
  async deleteEvent(@Ctx() ctx: ITelegrafContext): Promise<void | undefined> {
    const chatId = ctx.callbackQuery.from.id;
    const eventId = TelegramUtilsService.getEventIdFromActionData(ctx.callback_query?.data);
    
    if (!eventId) {
      await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)')
    }
  }
  
  @Action(/approve-event-\d+/g)
  async approveEvent(@Ctx() ctx: ITelegrafContext): Promise<void | undefined> {
    const chatId = ctx.callbackQuery.from.id;
    const eventId = TelegramUtilsService.getEventIdFromActionData(ctx.callback_query?.data);
    
    if (!eventId) {
      await ctx.reply('Запис не знайдено, щось пішло не так, звернись до Дениса 📟 <-- Пейджер :)')
    }
  }
}
