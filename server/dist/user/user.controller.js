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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const _enums_1 = require("../common/enums");
const base_controller_1 = require("../base/base.controller");
const user_entity_1 = require("./entities/user.entity");
let UserController = class UserController extends (0, base_controller_1.BaseController)(user_entity_1.User, _enums_1.Service.Users) {
    constructor(usersService) {
        super(usersService);
        this.usersService = usersService;
    }
    getMasters() {
        return this.usersService.getMasters();
    }
};
__decorate([
    openapi.ApiOperation({ description: "" }),
    (0, common_1.Get)('get-masters'),
    openapi.ApiResponse({ status: 200 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMasters", null);
UserController = __decorate([
    (0, common_1.Controller)(_enums_1.Resource.User),
    __param(0, (0, common_1.Inject)(_enums_1.Service.Users)),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map