import {ICreateEvent, IEvent} from '../interfaces';
import {EventInput} from '@fullcalendar/core';
import {Dayjs} from 'dayjs';
import {DateTime} from 'luxon';
import {get} from 'lodash';

const isDateBetweenTwoDates = (start: number | string, end: number | string, date: number | string) =>
  +start <= +date && +end >= +date;

const parseEvents = (events: IEvent[]): EventInput[] => {
  return events.map((event, i) => {
    const {id, start, end, status, masterId, customerId} = event;

    return {
      id,
      title: `Test title - ${i + 1}`,
      allDay: false,
      editable: true,
      interactive: true,
      start: Number(start),
      end: Number(end),
      backgroundColor: 'lightblue',
      borderColor: 'blue',
      className: 'event-custom-class',
      textColor: '#fff',
      color: 'black',
      extendedProps: {
        status,
        masterId,
        customerId,
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

  // current slot: s - 11:00, plus services - 11:45
  // event data: s - 11:30, e - 12:15
  return !filteredEvents.some(({start, end}) => {
    if (!start || !end) {
      return;
    }

    return (
      isDateBetweenTwoDates(start as number, end as number, startInMillis) ||
      isDateBetweenTwoDates(start as number, end as number, endInMillis)
    );
  });
};

const getTimeSlots = (date: Dayjs, events: EventInput[], masterId: string, totalLeadTime: number) => {
  const filteredEvents = events.filter(e => +get(e, 'extendedProps.masterId') === +masterId);
  const timeSlots = [];
  let startDay = DateTime.now().set({hour: 8, minute: 0, second: 0, millisecond: 0}).toMillis();
  let endDay = DateTime.now().set({hour: 20, minute: 0, second: 0, millisecond: 0}).toMillis();

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

const validateEvent = (event: ICreateEvent): string | undefined => {
  const {date, time, services, master} = event;

  if (!date) {
    return 'Date req';
  }

  if (!time) {
    return 'Time req';
  }

  if (!master) {
    return 'MAster req';
  }

  if (!services.length) {
    return 'Service req';
  }
};

export {parseEvents, parseCombinedValue, getTimeSlots, validateEvent, isDateBetweenTwoDates};
