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
const common_utils_1 = require("../common/utils/common-utils");
let UserService = class UserService extends (0, base_service_1.BaseService)(user_entity_1.User) {
    constructor(roleService, roleMappingService) {
        super();
        this.roleService = roleService;
        this.roleMappingService = roleMappingService;
    }
    async getAdmins() {
        try {
            const roles = await this.roleService.find({
                where: { name: _enums_1.HighestRole.Admin },
                include: ['users'],
            });
            return (0, lodash_1.get)(roles[0], 'users', []);
        }
        catch (e) {
            throw new common_1.BadRequestException(e.message);
        }
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
            throw new common_1.BadRequestException(e.message);
        }
    }
    async createCustomer(userDto) {
        const { name, phone } = userDto;
        const updatedPhone = common_utils_1.CommonUtilsService.transformPhone(phone);
        try {
            const user = await this.create({ name, phone: updatedPhone });
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
        const updatedPhone = common_utils_1.CommonUtilsService.transformPhone(phone);
        try {
            const count = await this.count({ where: { phone: updatedPhone } });
            return !!count;
        }
        catch (e) {
            throw new common_1.BadRequestException();
        }
    }
    async updateTelegramChatId(id, chatId) {
        const [, user] = await this.update({ telegramChatId: chatId }, { where: { id } });
        return user[0];
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