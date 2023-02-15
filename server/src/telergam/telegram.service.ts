import {BadRequestException, Inject, Injectable} from '@nestjs/common';
import {InjectBot} from 'nestjs-telegraf';
import {Telegraf} from 'telegraf';
import {DateTime} from 'luxon';
import {Op} from "sequelize";
import {ITelegrafContext} from '@interfaces';
import {HighestRole, Service} from "@enums";

import {eventAdminButtons, getContactButton, mainAdminMenu, mainUserMenu} from "./telegram.buttons";
import {Event} from "../event/entities/event.entity";
import {IUserService} from "../user/user.service";
import {IEventService} from "../event/event.service";
import {TelegramUtilsService} from "@utils/telegram";

export interface ITelegramService {
  start: (ctx: ITelegrafContext) => Promise<void>;
  getContact: (ctx: ITelegrafContext, phone: string) => Promise<void>;
  getEventsToday: (chatId: number, ctx: ITelegrafContext) => Promise<void> | undefined;
}

@Injectable()
export class TelegramService implements ITelegramService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<ITelegrafContext>,
    @Inject(Service.Users) private readonly userService: IUserService,
    @Inject(Service.Events) private readonly eventService: IEventService,
  ) {}
  
  private async sendEvent(event: Event, ctx: ITelegrafContext) {
    const html = TelegramUtilsService.generateHtmlEvent(event);
    
    await ctx.replyWithHTML(html, eventAdminButtons(event.id, event.status));
  }

  public async start(ctx: ITelegrafContext): Promise<void> {
    await ctx.reply('Вітаємо, для подальшої роботи, натисніть - "Номер телефону"', getContactButton());
  }
  
  public async getContact(ctx: ITelegrafContext, phone: string): Promise<void> {
    const chatId: number = ctx.chat.id;
    const name: string = ctx.message?.from?.first_name;
  
    let user = await this.userService.findOne({
      where: {phone},
      include: ['roles'],
    });
  
    if (!user) {
      user = await this.userService.createCustomer({name, phone});
    }
  
    await this.userService.updateTelegramChatId(user.id, chatId);
    
    const {roles} = user;
    const roleNames = roles.map(r => r.name);
    
    if (roleNames.includes(HighestRole.Admin)) {
      await ctx.reply(`Вітання, тестуємо бота. ${name} привіт :)`, mainAdminMenu());
    } else {
      await ctx.reply(`Вітаємо, ${name}`, mainUserMenu());
    }
  }
  
  public async getEventsToday(chatId: number, ctx: ITelegrafContext) {
    try {
      const user = await this.userService.findOne({
        where: {telegramChatId: chatId.toString()},
        include: ['roles']
      });
  
      if (!user || !user.roles.map(r => r.name).includes(HighestRole.Admin)) {
        await ctx.reply('Вибачте, у Вас немає доступу 😐');
    
        return;
      }
  
      const startDay = DateTime.now().startOf('day').toMillis();
      const endDay = DateTime.now().endOf('day').toMillis();
  
      const events = await this.eventService.find({
        where: {
          created: {[Op.between]: [startDay, endDay]},
        },
        include: ['customer', 'master'],
      });
      
      if (!events.length) {
        await ctx.reply('На сьогодні немає записів 😐');
        
        return;
      }
  
      for (const event of events) {
        await this.sendEvent(event, ctx);
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}