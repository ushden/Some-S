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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const base_service_1 = require("../base/base.service");
const _enums_1 = require("../common/enums");
const lodash_1 = require("lodash");
let UserService = class UserService extends (0, base_service_1.BaseService)(user_entity_1.User) {
    constructor(roleService, roleMappingService) {
        super();
        this.roleService = roleService;
        this.roleMappingService = roleMappingService;
    }
    async getMasters() {
        try {
            const roles = await this.roleService.find({
                where: { name: _enums_1.HighestRole.Master },
                include: ['users'],
            });
            return {
                rows: (0, lodash_1.get)(roles[0], 'users', []),
            };
        }
        catch (e) {
            throw new common_1.BadRequestException();
        }
    }
    async createCustomer(userDto) {
        try {
            const user = await this.create(userDto);
            const role = await this.roleService.getRoleByName(_enums_1.HighestRole.Customer);
            await this.roleMappingService.create({ roleId: role.id, userId: user.id });
            user.roles = [role];
            return user;
        }
        catch (e) {
            throw new common_1.BadRequestException();
        }
    }
    async checkIfExist(phone) {
        try {
            const count = await this.count({ where: { phone } });
            return !!count;
        }
        catch (e) {
            throw new common_1.BadRequestException();
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(_enums_1.Service.Roles)),
    __param(1, (0, common_1.Inject)(_enums_1.Service.RolesMapping)),
    __metadata("design:paramtypes", [Object, Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map