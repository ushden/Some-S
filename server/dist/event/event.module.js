"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_controller_1 = require("./event.controller");
const sequelize_1 = require("@nestjs/sequelize");
const event_entity_1 = require("./entities/event.entity");
const _enums_1 = require("../common/enums");
const user_module_1 = require("../user/user.module");
const notification_module_1 = require("../notification/notification.module");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([event_entity_1.Event]),
            user_module_1.UserModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [event_controller_1.EventController],
        providers: [{
                provide: _enums_1.Service.Events,
                useClass: event_service_1.EventService,
            }],
        exports: [_enums_1.Service.Events],
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map