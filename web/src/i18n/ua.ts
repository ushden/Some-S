// @ts-ignore
import ukraineMessages from 'ra-language-ukrainian';

export const ua = {
  ...ukraineMessages,
  calendar: {
    today: 'Сьогодні',
    month: 'Місяць',
    week: 'Неділя',
    day: 'День',
    list: 'Список',
    all_day: 'Весь день',
    next: 'Наступний',
    prev: 'Попередній',
    next_year: 'Наступний рік',
    prev_year: 'Попередній рік',
    no_events: 'Записів намає',
    events: 'Записи',
  },
  events: {
    success: 'Дякую! Чекайте на підтвердження',
    create_event: 'Створити запис',
    modal_admin_create_content_text: 'Створіть запис для клієнта',
    edit_event: 'Редагувати запис',
    not_available_time: 'Немає вільного часу для запису. Спробуйте вибрати іншу дату, майстра аюо послуги',
    modal_create_content_text: 'Виберіть зручний для Вас час, мастера та послуги',
    modal_edit_content_text: 'Ви можете змінити запис, якщо це потрібно',
    client: 'Клієнт',
    phone: 'Номер телефону',
    buttons: {
      create: 'Створити',
      close: 'Закрити',
      edit: 'Редагувати',
    },
    errors: {
      user_not_exist: 'Це новий клієнт, будь ласка, ііедить им\'я',
      empty_phone: 'Для створення запису введіть номер телефону клієнта',
      empty_name: 'Для нового клієнта укажіть ім\'я',
      empty_date: 'Виберіть, будь ласка, дату запису',
      empty_master: 'Виберіть, будь ласка, майстра',
      empty_services: 'Виберіть, будь ласка, послуги',
      empty_time: 'Виберіть, будь ласка, час запису',
    }
  },
  users: {
    customer: 'Клієнт',
    master: 'Майстер',
    login: {
      content: 'Вкажіть, будь ласка, Ваш номер телефону',
      registration_content: 'Для реестрації необхідно вказати ваше ім\'я',
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