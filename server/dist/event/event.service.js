"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const event_entity_1 = require("./entities/event.entity");
const _enums_1 = require("../common/enums");
let EventService = class EventService extends (0, base_service_1.BaseService)(event_entity_1.Event) {
    constructor(userService, notificationService) {
        super();
        this.userService = userService;
        this.notificationService = notificationService;
    }
    async createWithNotifications(data) {
        try {
            const event = await this.create(data, { include: ['master', 'customer'] });
            const customer = await this.userService.findById(event.customerId);
            const master = await this.userService.findById(event.masterId);
            event.customer = customer;
            event.master = master;
            await this.notificationService.sendTelegramMessageForAdmin(_enums_1.MessageTypesForAdmin.newEvent, event);
            await this.notificationService.sendTelegramMessageForUser(_enums_1.MessageTypesForUser.waitingApprove, event, customer.telegramChatId);
            return event;
        }
        catch (e) {
            console.log(e.message);
            return Promise.reject(new common_1.BadRequestException(e.message));
        }
    }
};
EventService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(_enums_1.Service.Users)),
    __param(1, (0, common_1.Inject)(_enums_1.Service.Notification)),
    __metadata("design:paramtypes", [Object, Object])
], EventService);
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map