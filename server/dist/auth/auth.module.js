"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const _enums_1 = require("../common/enums");
const jwt_1 = require("@nestjs/jwt");
const user_module_1 = require("../user/user.module");
const role_mapping_module_1 = require("../role-mapping/role-mapping.module");
const role_module_1 = require("../role/role.module");
const access_token_module_1 = require("../access-token/access-token.module");
const process = require("process");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: _enums_1.Service.Auth,
                useClass: auth_service_1.AuthService,
            },
        ],
        controllers: [auth_controller_1.AuthController],
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET_KEY || 'SECRET',
                signOptions: {
                    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
                },
            }),
            user_module_1.UserModule,
            role_mapping_module_1.RoleMappingModule,
            role_module_1.RoleModule,
            access_token_module_1.AccessTokenModule,
        ],
        exports: [_enums_1.Service.Auth],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map