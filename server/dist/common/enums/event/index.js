"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMapping = exports.Status = void 0;
var Status;
(function (Status) {
    Status["done"] = "done";
    Status["approve"] = "approve";
    Status["reject"] = "reject";
    Status["waiting"] = "waiting";
})(Status || (Status = {}));
exports.Status = Status;
var StatusMapping;
(function (StatusMapping) {
    StatusMapping["done"] = "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E";
    StatusMapping["approve"] = "\u0417\u0430\u043F\u0438\u0441 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u0438\u0439";
    StatusMapping["reject"] = "\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u043D\u043E";
    StatusMapping["waiting"] = "\u041E\u0447\u0456\u043A\u0443\u0454 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F";
})(StatusMapping || (StatusMapping = {}));
exports.StatusMapping = StatusMapping;
//# sourceMappingURL=index.js.map