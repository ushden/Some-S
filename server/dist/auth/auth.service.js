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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const _enums_1 = require("../common/enums");
const jwt_1 = require("@nestjs/jwt");
const _constants_1 = require("../common/constants");
const common_utils_1 = require("../common/utils/common-utils");
let AuthService = class AuthService {
    constructor(jwtService, userService, accessTokenService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.accessTokenService = accessTokenService;
    }
    async login(userDto) {
        userDto.phone = common_utils_1.CommonUtilsService.transformPhone(userDto.phone);
        try {
            const candidate = await this.userService.findOne({
                where: { phone: userDto.phone },
                include: ['roles', 'token'],
            });
            if (!candidate) {
                const user = await this.userService.createCustomer(userDto);
                return await this.generateToken(user);
            }
            if (!candidate.token) {
                return await this.generateToken(candidate);
            }
            const { token, id: userId, roles, email, phone, verified, name } = candidate;
            return {
                id: token.id,
                ttl: _constants_1.tokenTtlMilliseconds,
                userId,
                roles: roles.map(r => r.name),
                email,
                phone,
                verified,
                name,
            };
        }
        catch (e) {
            throw new common_1.HttpException(e.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async generateToken(user) {
        const { id: userId, roles, email, phone, verified, name } = user;
        const payload = { userId, roles, email: email || '', phone, verified, name };
        const token = await this.jwtService.signAsync(payload);
        const accessToken = { id: token, userId, ttl: _constants_1.tokenTtlMilliseconds };
        await this.accessTokenService.create(accessToken);
        return {
            ttl: _constants_1.tokenTtlMilliseconds,
            id: token,
            userId,
            roles: roles.map(r => r.name),
            email,
            phone,
            verified,
            name,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(_enums_1.Service.Users)),
    __param(2, (0, common_1.Inject)(_enums_1.Service.Token)),
    __metadata("design:paramtypes", [jwt_1.JwtService, Object, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map