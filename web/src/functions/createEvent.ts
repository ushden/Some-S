import {CREATE} from "../ra-nest/types";
import {eventsResource} from "../constants";
import {get} from "lodash";
import {LegacyDataProvider} from "react-admin";
import {IEvent} from "../interfaces";

export const createEvent = async (dataProvider: LegacyDataProvider, data: IEvent) => {
	try {
		const res = await dataProvider(CREATE, eventsResource, {data});
		
		return get(res, 'data', [])
	} catch (e) {
		console.error(e);
	}
};