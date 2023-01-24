// @ts-ignore
import ukraineMessages from 'ra-language-ukrainian';

export const ua = {
  ...ukraineMessages,
  calendar: {
    today: 'Сьогодні',
    month: 'Місяць',
    week: 'Неділя',
    day: 'День',
    all_day: 'Весь день',
    next: 'Наступний',
    prev: 'Попередній',
    next_year: 'Наступний рік',
    prev_year: 'Попередній рік',
  },
  events: {
    success: 'Дякую! Чекайте на підтвердження',
    create_event: 'Записатися',
  },
  users: {
    customer: 'Клієнт',
    master: 'Майстер',
    login: {
      content: 'Вкажіть, будь ласка, Ваш номер телефону та им\'я',
      title: 'Вхід',
      save: 'Зберегти',
      cancel: 'Відміна',
    },
    fields: {
      name: 'Им\'я',
      phone: 'Номер телефону'
    },
    errors: {
      name: 'Им\'я обов\'язкове',
      phone: 'Телефон обов\'язковий',
      invalid_phone: 'Невірний формат номеру',
    }
  }
};