import {CREATE} from "../ra-nest/types";
import {eventsResource} from "../constants";
import {get} from "lodash";
import {LegacyDataProvider, NotificationType} from "react-admin";
import {IEvent} from "../interfaces";
import {Dispatch} from "../context/eventContext";
import {forceEventsUpdateType} from "../context/types";

export const createEvent = async (
	dataProvider: LegacyDataProvider,
	data: IEvent,
	notify: (message: string, options?: ((NotificationOptions & {type?: NotificationType | undefined}) | undefined)) => void,
	dispatch: Dispatch
	) => {
	try {
		const res = await dataProvider(CREATE, eventsResource, {data});
		
		dispatch({type: forceEventsUpdateType});
		notify('events.success', {type: 'success'});
		
		return get(res, 'data', [])
	} catch (e) {
		console.error(e);
	}
};