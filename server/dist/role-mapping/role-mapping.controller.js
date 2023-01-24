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
exports.RoleMappingController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const role_mapping_service_1 = require("./role-mapping.service");
const _enums_1 = require("../common/enums");
const base_controller_1 = require("../base/base.controller");
const role_mapping_entity_1 = require("./entities/role-mapping.entity");
let RoleMappingController = class RoleMappingController extends (0, base_controller_1.BaseController)(role_mapping_entity_1.RoleMapping, _enums_1.Service.RolesMapping) {
    constructor(roleMappingService) {
        super();
        this.roleMappingService = roleMappingService;
    }
};
RoleMappingController = __decorate([
    (0, common_1.Controller)(_enums_1.Resource.RoleMapping),
    __param(0, (0, common_1.Inject)(_enums_1.Service.RolesMapping)),
    __metadata("design:paramtypes", [role_mapping_service_1.RoleMappingService])
], RoleMappingController);
exports.RoleMappingController = RoleMappingController;
//# sourceMappingURL=role-mapping.controller.js.map