"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerBaseUrls = exports.Env = void 0;
var Env;
(function (Env) {
    Env["Prod"] = "prod";
    Env["Local"] = "local";
})(Env || (Env = {}));
exports.Env = Env;
var ServerBaseUrls;
(function (ServerBaseUrls) {
    ServerBaseUrls["default"] = "http://localhost:4848";
    ServerBaseUrls["prod"] = "";
})(ServerBaseUrls || (ServerBaseUrls = {}));
exports.ServerBaseUrls = ServerBaseUrls;
//# sourceMappingURL=index.js.map