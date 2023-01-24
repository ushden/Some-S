"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenModule = void 0;
const common_1 = require("@nestjs/common");
const access_token_service_1 = require("./access-token.service");
const access_token_controller_1 = require("./access-token.controller");
const _enums_1 = require("../common/enums");
const sequelize_1 = require("@nestjs/sequelize");
const access_token_entity_1 = require("./entities/access-token.entity");
let AccessTokenModule = class AccessTokenModule {
};
AccessTokenModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([access_token_entity_1.AccessToken])],
        controllers: [access_token_controller_1.AccessTokenController],
        providers: [{
                provide: _enums_1.Service.Token,
                useClass: access_token_service_1.AccessTokenService,
            }],
        exports: [_enums_1.Service.Token],
    })
], AccessTokenModule);
exports.AccessTokenModule = AccessTokenModule;
//# sourceMappingURL=access-token.module.js.map