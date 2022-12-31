import {Op} from "sequelize";

const queryOperatorMapping: Record<string, symbol> = { // INFO: Query operators near and exists aren't represented in Sequelize v6
  eq: Op.eq,
  neq: Op.ne,
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lt,
  lte: Op.lte,
  inq: Op.in,
  nin: Op.notIn,
  between: Op.between,
  and: Op.and,
  or: Op.or,
  like: Op.like,
  nlike: Op.notLike,
  ilike: Op.iLike,
  nilike: Op.notILike,
  regexp: Op.regexp,

  is: Op.is,
  not: Op.not,
  col: Op.col,
  notBetween: Op.notBetween,
  all: Op.all,
  notLike: Op.notLike,
  startsWith: Op.startsWith,
  endsWith: Op.endsWith,
  substring: Op.substring,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  any: Op.any,
  match: Op.match,
};

export {
  queryOperatorMapping,
}