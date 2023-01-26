import {LegacyDataProvider} from "react-admin";
import {get} from "lodash";

import {FETCH_GET} from "../ra-nest/types";
import {checkUserExistEndpoint, usersResource} from "../constants";

export const checkIfUserExist = async (
	dataProvider: LegacyDataProvider,
	phone: string
) => {
	try {
		const res = await dataProvider(FETCH_GET, `${usersResource}/${checkUserExistEndpoint}`, {phone});
		
		return get(res, 'data', false);
	} catch (e) {
		console.error(e);
	}
};