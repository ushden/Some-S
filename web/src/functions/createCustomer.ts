import {ICurrentUser} from "../interfaces";
import {LegacyDataProvider} from "react-admin";
import {FETCH} from "../ra-nest/types";
import {createCustomerEndpoint, usersResource} from "../constants";

export const createCustomer = async (name: string, phone: string, dataProvider: LegacyDataProvider): ICurrentUser => {
	try {
		const res = await dataProvider(
			FETCH,
			`${usersResource}/${createCustomerEndpoint}`,
			{data: {name, phone}}
		);
		console.log(res, 'create user response');
	} catch (e) {
		console.error(e);
	}
};