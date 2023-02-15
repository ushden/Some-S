import {Injectable} from "@nestjs/common";
import {DateTime} from "luxon";

import {Event} from "../../../event/entities/event.entity";
import {StatusMapping} from "@enums";

export interface ITelegramUtilsService {}

@Injectable()
export class TelegramUtilsService implements ITelegramUtilsService {
	public static getEventIdFromActionData(data: string): number | null {
		if (data) {
			return null;
		}
		
		const parts = data.split('-');
		const eventId = Number(parts[parts.length - 1]);
		
		return eventId || null;
	}
	
	public static generateHtmlEvent(event: Event): string {
		const services = event.services.map(({name}, i) => `\n<i>🈯${name}</i>`).join('');
		const time = `<b>${DateTime.fromMillis(+event.start).toFormat('HH:mm')} - ${DateTime.fromMillis(+event.end).toFormat('HH:mm')}</b>`;
		const customer = `<b>${event.customer.name} - ${event.customer.phone}</b>`;
		const master = `<b>Майстер - ${event.master.name}</b>`;
		const price = `<i>💳Вартість</i> - <b>${event.price}</b> грн.`;
		const leadTime = `<i>⏳Потрібно часу</i> - ${event.leadTime} хв.`
		
		return `
			${time}\n<i>🌟Статус запису - ${StatusMapping[event.status]}</i>\n\n${customer}\n${master}\n${services}\n\n${price}\n${leadTime}
			\n\n
			Тут нужно подумать как красиво сделать
		`;
	}
}