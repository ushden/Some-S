import {Markup} from "telegraf";
import {Resource, Status} from "@enums";

export const getContactButton = () => {
	return Markup.keyboard([
		Markup.button.contactRequest('📱 Номер телефону', false)
	]).oneTime().resize();
};

export const mainUserMenu = () => {
	return Markup.keyboard([
		Markup.button.text('📅 Мої записи'),
		Markup.button.text('✏️ Записатися'),
	]).resize();
};

export const mainAdminMenu = () => {
	return Markup.keyboard([
		Markup.button.text('📆 Записи на сьогодні'),
		Markup.button.text('🔔 Очікують підтвердження'),
		Markup.button.text('📋 Створити запис'),
	], {columns: 2}).resize();
};

export const eventAdminButtons = (eventId, status) => {
	if (status === Status.waiting) {
		return Markup.inlineKeyboard([
			// Markup.button.url('👀 Деталі', `${process.env.WEB_URL}/${Resource.Event}/${eventId}`),
			Markup.button.callback('✅ Підтвердити запис', `approve-event-${eventId}`),
			Markup.button.callback('🧨 Скасувати запис', `delete-event-${eventId}`),
		], {columns: 1});
	}
	
	return Markup.inlineKeyboard([
		// Markup.button.url('👀 Деталі', `${process.env.WEB_URL}/${Resource.Event}/${eventId}`),
		Markup.button.callback('🧨 Скасувати запис', `delete-event-${eventId}`)
	], {columns: 1});
};