"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMappingModule = void 0;
const common_1 = require("@nestjs/common");
const role_mapping_service_1 = require("./role-mapping.service");
const role_mapping_controller_1 = require("./role-mapping.controller");
const _enums_1 = require("../common/enums");
const sequelize_1 = require("@nestjs/sequelize");
const role_mapping_entity_1 = require("./entities/role-mapping.entity");
let RoleMappingModule = class RoleMappingModule {
};
RoleMappingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forFeature([role_mapping_entity_1.RoleMapping]),
        ],
        controllers: [role_mapping_controller_1.RoleMappingController],
        providers: [{
                provide: _enums_1.Service.RolesMapping,
                useClass: role_mapping_service_1.RoleMappingService,
            }],
        exports: [_enums_1.Service.RolesMapping]
    })
], RoleMappingModule);
exports.RoleMappingModule = RoleMappingModule;
//# sourceMappingURL=role-mapping.module.js.map