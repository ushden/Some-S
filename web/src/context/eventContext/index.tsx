import React, {useReducer} from 'react';
import {EventInput} from "@fullcalendar/core";

import {IEvent} from "../../interfaces";
import {forceEventsUpdateType, setEventsType, setEventType} from "../types";
import {createContainer} from "react-tracked";

type Types = typeof forceEventsUpdateType | typeof setEventsType | typeof setEventType;
type Action = {type: Types, payload?: any};
type State = {event: IEvent | null, events: Array<EventInput> | [], forceUpdate: boolean};
export type Dispatch = (action: Action) => void;

const initialState: State = {
	event: null,
	events: [],
	forceUpdate: false,
};

const eventReducer = (state: State, action: Action) => {
	switch (action.type) {
		case setEventType: {
			return {
				...state,
				event: action.payload || null,
			};
		}
		case setEventsType: {
			return {
				...state,
				events: action.payload || [],
			};
		}
		case forceEventsUpdateType: {
			return {
				...state,
				forceUpdate: !state.forceUpdate,
			};
		}
		default: {
			throw new Error(`Unhandled action type: ${action.type}`);
		}
	}
}

const useValue = () => useReducer(eventReducer, initialState);

export const {
	Provider: EventProvider,
	useTrackedState: useEventState,
	useUpdate: useEventDispatch,
} = createContainer(useValue);
