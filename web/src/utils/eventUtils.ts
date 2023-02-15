import {ICreateEvent, ICurrentUser, IEvent} from '../interfaces';
import {EventInput} from '@fullcalendar/core';
import {Dayjs} from 'dayjs';
import {DateTime} from 'luxon';
import {get} from 'lodash';
import {Translate} from "react-admin";

import {eventStatusApprove, eventStatusDone, eventStatusWaiting, userRoleAdmin} from '../constants';

const isDateBetweenTwoDates = (start: number | string, end: number | string, date: number | string) =>
  +start <= +date && +end >= +date;

const getEventColors = (status: string, background: boolean): string | undefined => {
  if (!background) {
    return '#d1b5f5';
  }
  
  switch (status) {
    case eventStatusWaiting:
      return '#f9e095';
    case eventStatusApprove:
      return '#abede8';
    case eventStatusDone:
      return '#c3ebba';
    default:
      return '#d1b5f5';
  }
};

const isEventEditable = (userId: number, masterId: number, customerId: number) => {
  if (!userId) {
    return false;
  }
  
  return userId === customerId || masterId === userId;
};

const parseEvents = (events: IEvent[], currentUser: ICurrentUser): EventInput[] => {
  const {roles = [], userId} = currentUser;
  const isAdmin = roles.includes(userRoleAdmin);
  
  return events.map(event => {
    const {id, start, end, status, masterId, customerId, master, customer, services, price, created} = event;

    return {
      id,
      title: customer?.name,
      allDay: false,
      editable: isAdmin || isEventEditable(userId, masterId, customerId),
      interactive: isAdmin,
      start: Number(start),
      end: Number(end),
      backgroundColor: getEventColors(status, isAdmin || isEventEditable(userId, masterId, customerId)),
      borderColor: getEventColors(status, isAdmin || isEventEditable(userId, masterId, customerId)),
      className: 'custom-event',
      textColor: 'rgba(0, 0, 0, 0.6)',
      display: isAdmin || isEventEditable(userId, masterId, customerId) ? 'auto' : 'background',
      extendedProps: {
        masterName: master?.name,
        customerName: customer?.name,
        phone: customer?.phone,
        services,
        price,
        status,
        masterId,
        customerId,
        created,
      },
    };
  });
};

const parseCombinedValue = (value: string, separator = '&'): Array<string> => {
  if (!value) {
    return [];
  }

  return value.split(separator);
};

const checkIfTimeIsAvailable = (filteredEvents: EventInput[], currentStartDate: DateTime, currentEndDate: DateTime) => {
  if (!filteredEvents.length) {
    return true;
  }

  const startInMillis = currentStartDate.toMillis();
  const endInMillis = currentEndDate.toMillis();

  return !filteredEvents.some(({start, end}) => {
    if (!Number(start) || !Number(end)) {
      return;
    }

    return (
      isDateBetweenTwoDates(start as number, end as number, startInMillis) ||
      isDateBetweenTwoDates(start as number, end as number, endInMillis) ||
      isDateBetweenTwoDates(startInMillis, endInMillis, start as number) ||
      isDateBetweenTwoDates(startInMillis, endInMillis, end as number)
    );
  });
};

const getTimeSlots = (date: Dayjs, events: EventInput[], masterId: string, totalLeadTime: number) => {
  const startDate = date.startOf('day').valueOf();
  const endDate = date.endOf('day').valueOf();
  const filteredEvents = events.filter(
    e =>
      +get(e, 'extendedProps.masterId') === +masterId &&
      isDateBetweenTwoDates(startDate, endDate, e.extendedProps?.created),
  );
  const timeSlots = [];
  let startDay = DateTime.fromMillis(date.valueOf()).set({hour: 8, minute: 0, second: 0, millisecond: 0}).toMillis();
  let endDay = DateTime.fromMillis(date.valueOf()).set({hour: 20, minute: 0, second: 0, millisecond: 0}).toMillis();

  do {
    const currentStartDate = DateTime.fromMillis(startDay);
    const currentEndDate = DateTime.fromMillis(startDay).plus({
      minutes: +totalLeadTime,
    });

    if (checkIfTimeIsAvailable(filteredEvents, currentStartDate, currentEndDate)) {
      timeSlots.push({
        display: `${currentStartDate.hour}:${currentStartDate.minute || '00'}`,
        start: currentStartDate.toMillis(),
        end: currentEndDate.toMillis(),
      });
    }

    startDay = currentStartDate.plus({minute: 30}).toMillis();
  } while (startDay < endDay);

  return timeSlots;
};

const validateEvent = (event: ICreateEvent, translate: Translate): string | undefined => {
  const {date, time, services, master, phone, name, permissions, isNewCustomer} = event;
  console.log(name)
  const isAdmin = Array.isArray(permissions) && permissions?.includes(userRoleAdmin);
  
  if (isAdmin && !phone) {
    return translate('events.errors.empty_phone');
  }
  
  if (isAdmin && isNewCustomer && !name) {
    return translate('events.errors.empty_name');
  }

  if (!date) {
    return translate('events.errors.empty_date');
  }

  if (!master) {
    return translate('events.errors.empty_master');
  }

  if (!services.length) {
    return translate('events.errors.empty_services');
  }

  if (!time) {
    return translate('events.errors.empty_time');
  }
};

export {parseEvents, parseCombinedValue, getTimeSlots, validateEvent, isDateBetweenTwoDates};
