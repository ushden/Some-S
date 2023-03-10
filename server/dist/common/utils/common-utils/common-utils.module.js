"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtilsModule = void 0;
const common_1 = require("@nestjs/common");
const _enums_1 = require("../../enums");
const common_utils_service_1 = require("./common-utils.service");
let CommonUtilsModule = class CommonUtilsModule {
};
CommonUtilsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: _enums_1.Service.CommonUtils,
                useClass: common_utils_service_1.CommonUtilsService,
            },
        ],
        exports: [_enums_1.Service.CommonUtils],
    })
], CommonUtilsModule);
exports.CommonUtilsModule = CommonUtilsModule;
//# sourceMappingURL=common-utils.module.js.map