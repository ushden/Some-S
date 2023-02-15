export const accessTokenLocalStorageKey = 'token';

export const eventsResource = 'events';
export const usersResource = 'users';
export const servicesResource = 'services';

export const getMastersEndpoint = 'get-masters';
export const checkUserExistEndpoint = 'check-exist';
export const createCustomerEndpoint = 'create-customer';

export const eventStatusWaiting = 'waiting';
export const eventStatusApprove = 'approve';
export const eventStatusDone = 'done';
export const eventStatusReject = 'reject';

export const eventStatuses = [
	eventStatusApprove,
	eventStatusDone,
	eventStatusWaiting,
	eventStatusReject,
];

export const calendarHeadDateFormat = 'DD MMMM YYYY';
export const standardPhoneLength = 10;

export const userRoleAdmin = 'admin';
export const userRoleMaster = 'master'
export const userRoleCustomer = 'customer';
