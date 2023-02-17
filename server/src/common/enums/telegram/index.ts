enum AdminMenuButtons {
	eventsToday = '📆 Записи на сьогодні',
	mustConfirmed = '🔔 Очікують підтвердження',
	createEvent = '📋 Створити запис',
}

enum MessageTypesForUser {
	eventApprove = 'approve',
	eventReject = 'reject',
	waitingApprove = 'waiting',
}

enum MessageTypesForAdmin {
	events = 'events',
	confirmBeforeDelete = 'confirmDeleting'
}

export {
	AdminMenuButtons,
	MessageTypesForUser,
	MessageTypesForAdmin,
};