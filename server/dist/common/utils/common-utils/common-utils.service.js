"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var CommonUtilsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonUtilsService = void 0;
const common_1 = require("@nestjs/common");
const _enums_1 = require("../../enums");
const sequelize_1 = require("sequelize");
const ts_jest_1 = require("ts-jest");
let CommonUtilsService = CommonUtilsService_1 = class CommonUtilsService {
    static isLocalEnvironment(environment) {
        return ![_enums_1.Env.Prod].includes(environment);
    }
    static concatIdWithOptions(id, _a) {
        var { where } = _a, rest = __rest(_a, ["where"]);
        if (CommonUtilsService_1.isEmptyObject(where)) {
            return Object.assign({ where: { id } }, rest);
        }
        return Object.assign({ where: { id, [sequelize_1.Op.and]: where } }, rest);
    }
    static isEmptyObject(obj = {}) {
        return (Object.getPrototypeOf(obj) === Object.prototype &&
            Object.getOwnPropertyNames(obj).length === 0 &&
            Object.getOwnPropertySymbols(obj).length === 0);
    }
    static compareTwoValues(firstValue, secondValue) {
        return CommonUtilsService_1.convertValueToString(firstValue) === CommonUtilsService_1.convertValueToString(secondValue);
    }
    static convertValueToString(value) {
        return typeof value === 'object' ? (0, ts_jest_1.stringify)(value) : value.toString();
    }
    static parseJsonString(jsonString) {
        if (typeof jsonString !== 'string') {
            return jsonString;
        }
        try {
            JSON.parse(jsonString);
        }
        catch (e) {
            return jsonString;
        }
        return JSON.parse(jsonString);
    }
};
CommonUtilsService = CommonUtilsService_1 = __decorate([
    (0, common_1.Injectable)()
], CommonUtilsService);
exports.CommonUtilsService = CommonUtilsService;
//# sourceMappingURL=common-utils.service.js.map