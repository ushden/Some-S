import React from 'react';
import {EventInput} from "@fullcalendar/core";

import {IEvent} from "../../interfaces";
import {forceEventsUpdateType, setEventsType, setEventType} from "../types";

type Types = typeof forceEventsUpdateType | typeof setEventsType | typeof setEventType;
type Action = {type: Types, payload?: any};
export type Dispatch = (action: Action) => void;
type State = {event: IEvent | null, events: Array<EventInput> | [], forceUpdate: boolean};
type EventProviderProps = {children: React.ReactNode};

const EventStateContext = React.createContext<{state: State; dispatch: Dispatch} | undefined>(undefined);

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

const EventProvider = ({children}: EventProviderProps) => {
	const [state, dispatch] = React.useReducer(eventReducer, initialState);
	const value = {state, dispatch};
	
	return <EventStateContext.Provider value={value}>{children}</EventStateContext.Provider>;
}

const useEventContext = () => {
	const context = React.useContext(EventStateContext);
	
	if (context === undefined) {
		throw new Error('Context for event not found');
	}
	
	return context;
}

export {EventProvider, useEventContext};
