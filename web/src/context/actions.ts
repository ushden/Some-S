import {forceEventsUpdateType, setEventsType, setEventType, toggleLoginModalType} from './types';
import {EventInput} from "@fullcalendar/core";
import {IEvent} from "../interfaces";

export const toggleLoginModalAction = (): {type: typeof toggleLoginModalType} => ({
  type: toggleLoginModalType,
});

export const forceEventsUpdateAction = (): {type: typeof forceEventsUpdateType} => ({
  type: forceEventsUpdateType,
});

export const setEventsAction = (payload: EventInput[]): {type: typeof setEventsType, payload: EventInput[]} => ({
  payload,
  type: setEventsType,
});

export const setEventAction = (payload: IEvent | null): {type: typeof setEventType, payload: IEvent | null} => ({
 payload,
 type: setEventType,
});