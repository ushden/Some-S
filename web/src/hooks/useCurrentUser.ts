import {ICurrentUser} from "../interfaces";
import storage from "../ra-nest/storage";
import {accessTokenLocalStorageKey} from "../constants";

export const useCurrentUser = (): ICurrentUser => {
	const data = storage.load(accessTokenLocalStorageKey);
	
	return {
		userId: data?.userId,
		roles: data?.roles,
		phone: data?.phone,
		email: data?.email,
		name: data?.name,
		verified: data?.verified,
		id: data?.id,
	}
};