import {Injectable} from '@nestjs/common';
import {DateTime} from 'luxon';

import {Event} from '../../../event/entities/event.entity';
import {MessageTypesForAdmin, MessageTypesForUser, StatusMapping} from '@enums';

export interface ITelegramUtilsService {}

@Injectable()
export class TelegramUtilsService implements ITelegramUtilsService {
  public static getEventIdFromActionData(data: string): number | null {
    if (!data) {
      return null;
    }

    const parts = data.split('-');
    const eventId = Number(parts[parts.length - 1]);

    return eventId || null;
  }

  public static generateHtmlEventForAdmin(event: Event, type: MessageTypesForAdmin): string {
    const services = event.services.map(({name}) => `\n<i>🈯${name}</i>`).join('');
    const time = `<b>${DateTime.fromMillis(+event.start).toFormat('HH:mm')} - ${DateTime.fromMillis(
      +event.end,
    ).toFormat('HH:mm')}</b>`;
    const customer = `<b>${event.customer.name} - ${event.customer.phone}</b>`;
    const master = `<b>Майстер - ${event.master.name}</b>`;
    const price = `<i>💳Вартість</i> - <b>${event.price}</b> грн.`;
    const leadTime = `<i>⏳Потрібно часу</i> - ${event.leadTime} хв.`;
    
    if (type === MessageTypesForAdmin.events) {
      return `
			${time}\n<i>🌟Статус запису - ${
        StatusMapping[event.status]
      }</i>\n\n${customer}\n${master}\n${services}\n\n${price}\n${leadTime}
			\n
			Тут нужно подумать как красиво сделать. KEK
		`;
    }
    
    if (type === MessageTypesForAdmin.confirmBeforeDelete) {
      return `Ви впевненні, що хочете скасувати запис? Клієнт отримае повідомлення про відміну`;
    }
  }

  public static generateHtmlMessageForUser(event: Event, type: MessageTypesForUser): string {
    if (!type) {
      return '';
    }

    const date = DateTime.fromMillis(+event.start).toFormat('dd/MM/yyyy HH:mm');
    const services = event.services.map(({name}) => `\n<i>🈯${name}</i>`).join('');

    if (type === MessageTypesForUser.eventApprove) {
      return `Ваш запис на <i>${date}</i> підтвержено. Послуги:\n${services} Обновить сообщение, что-то добавить, подумать`;
    }
    
    if (type === MessageTypesForUser.waitingApprove) {
      return `Ваш запис на <i>${date}</i> надіслано на підтвердження. Вас буде повідомленно про зміну статусу. КЕЕЕК`;
    }
    
    if (type === MessageTypesForUser.eventReject) {
      return `Запис скасовано адміністратором. Вже сил немає, потом придумаю.........`;
    }
  }
}
