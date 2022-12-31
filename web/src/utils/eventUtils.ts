import { IEvent } from "../interfaces";
import { EventInput } from "@fullcalendar/core";

const parseEvents = (events: IEvent[]): EventInput[] => {
  return events.map((event, i) => {
    const { id, start, end, status, masterId, customerId } = event;

    return {
      id,
      title: `Test title - ${i + 1}`,
      allDay: false,
      editable: true,
      interactive: true,
      start: Number(start),
      end: Number(end),
      backgroundColor: "lightblue",
      borderColor: "blue",
      className: "event-custom-class",
      textColor: "#fff",
      color: "black",
      extendedProps: {
        status,
        masterId,
        customerId,
      },
    };
  });
};

const parseCombinedValue = (value: string, separator = "&"): Array<string> => {
  if (!value) {
    return [];
  }

  return value.split(separator);
};

export { parseEvents, parseCombinedValue };
