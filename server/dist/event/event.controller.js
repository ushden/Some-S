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
exports.EventController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const _enums_1 = require("../common/enums");
const base_controller_1 = require("../base/base.controller");
const event_entity_1 = require("./entities/event.entity");
const create_event_dto_1 = require("./dto/create-event.dto");
let EventController = class EventController extends (0, base_controller_1.BaseController)(event_entity_1.Event, _enums_1.Service.Events) {
    constructor(eventService) {
        super();
        this.eventService = eventService;
    }
    async createWithNotifications(event) {
        return this.eventService.createWithNotifications(event);
    }
};
__decorate([
    openapi.ApiOperation({ description: "" }),
    (0, common_1.Post)('create-with-notifications'),
    openapi.ApiResponse({ status: 201, type: require("./entities/event.entity").Event }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventController.prototype, "createWithNotifications", null);
EventController = __decorate([
    (0, common_1.Controller)(_enums_1.Resource.Event),
    __param(0, (0, common_1.Inject)(_enums_1.Service.Events)),
    __metadata("design:paramtypes", [Object])
], EventController);
exports.EventController = EventController;
//# sourceMappingURL=event.controller.js.map