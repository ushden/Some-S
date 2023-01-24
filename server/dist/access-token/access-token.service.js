"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessTokenService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../base/base.service");
const access_token_entity_1 = require("./entities/access-token.entity");
let AccessTokenService = class AccessTokenService extends (0, base_service_1.BaseService)(access_token_entity_1.AccessToken) {
};
AccessTokenService = __decorate([
    (0, common_1.Injectable)()
], AccessTokenService);
exports.AccessTokenService = AccessTokenService;
//# sourceMappingURL=access-token.service.js.map