"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryOperatorMapping = void 0;
const sequelize_1 = require("sequelize");
const queryOperatorMapping = {
    eq: sequelize_1.Op.eq,
    neq: sequelize_1.Op.ne,
    gt: sequelize_1.Op.gt,
    gte: sequelize_1.Op.gte,
    lt: sequelize_1.Op.lt,
    lte: sequelize_1.Op.lte,
    inq: sequelize_1.Op.in,
    nin: sequelize_1.Op.notIn,
    between: sequelize_1.Op.between,
    and: sequelize_1.Op.and,
    or: sequelize_1.Op.or,
    like: sequelize_1.Op.like,
    nlike: sequelize_1.Op.notLike,
    ilike: sequelize_1.Op.iLike,
    nilike: sequelize_1.Op.notILike,
    regexp: sequelize_1.Op.regexp,
    is: sequelize_1.Op.is,
    not: sequelize_1.Op.not,
    col: sequelize_1.Op.col,
    notBetween: sequelize_1.Op.notBetween,
    all: sequelize_1.Op.all,
    notLike: sequelize_1.Op.notLike,
    startsWith: sequelize_1.Op.startsWith,
    endsWith: sequelize_1.Op.endsWith,
    substring: sequelize_1.Op.substring,
    notRegexp: sequelize_1.Op.notRegexp,
    iRegexp: sequelize_1.Op.iRegexp,
    notIRegexp: sequelize_1.Op.notIRegexp,
    any: sequelize_1.Op.any,
    match: sequelize_1.Op.match,
};
exports.queryOperatorMapping = queryOperatorMapping;
//# sourceMappingURL=index.js.map