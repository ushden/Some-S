import {ICurrentUser} from "../interfaces";
import {LegacyDataProvider} from "react-admin";
import {CREATE} from "../ra-nest/types";
import {createCustomerEndpoint, usersResource} from "../constants";
import {get} from "lodash";

export const createCustomer = async (
	name: string,
	phone: string,
	dataProvider: LegacyDataProvider
): Promise<ICurrentUser | undefined> => {
	try {
		const res: {data: ICurrentUser} = await dataProvider(
			CREATE,
			`${usersResource}/${createCustomerEndpoint}`,
			{data: {name, phone}}
		);
		console.log(res, 'create user response');
		
		return res.data;
	} catch (e) {
		console.error(e);
	}
};