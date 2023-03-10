"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const sequelize_1 = require("@nestjs/sequelize");
const user_entity_1 = require("./entities/user.entity");
const _enums_1 = require("../common/enums");
const role_module_1 = require("../role/role.module");
const role_mapping_module_1 = require("../role-mapping/role-mapping.module");
const access_token_module_1 = require("../access-token/access-token.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([user_entity_1.User]), role_module_1.RoleModule, role_mapping_module_1.RoleMappingModule, access_token_module_1.AccessTokenModule],
        controllers: [user_controller_1.UserController],
        providers: [
            {
                provide: _enums_1.Service.Users,
                useClass: user_service_1.UserService,
            },
        ],
        exports: [_enums_1.Service.Users],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map