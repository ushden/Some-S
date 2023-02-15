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
const _enums_1 = require("../common/enums");
const base_controller_1 = require("../base/base.controller");
const user_entity_1 = require("./entities/user.entity");
const create_user_dto_1 = require("./dto/create-user.dto");
const _pipes_1 = require("../common/pipes");
let UserController = class UserController extends (0, base_controller_1.BaseController)(user_entity_1.User, _enums_1.Service.Users) {
    constructor(usersService) {
        super();
        this.usersService = usersService;
    }
    getMasters() {
        return this.usersService.getMasters();
    }
    checkIfExist(phone) {
        return this.usersService.checkIfExist(phone);
    }
    createCustomer(user) {
        return this.usersService.createCustomer(user);
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
__decorate([
    openapi.ApiOperation({ description: "" }),
    (0, common_1.Get)('check-exist'),
    openapi.ApiResponse({ status: 200, type: Boolean }),
    __param(0, (0, common_1.Query)('phone', new _pipes_1.PhoneTransform())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "checkIfExist", null);
__decorate([
    openapi.ApiOperation({ description: "" }),
    (0, common_1.Post)('create-customer'),
    openapi.ApiResponse({ status: 201, type: require("./entities/user.entity").User }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createCustomer", null);
UserController = __decorate([
    (0, common_1.Controller)(_enums_1.Resource.User),
    __param(0, (0, common_1.Inject)(_enums_1.Service.Users)),
    __metadata("design:paramtypes", [Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map