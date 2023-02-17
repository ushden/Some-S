declare enum Status {
    done = "done",
    approve = "approve",
    reject = "reject",
    waiting = "waiting"
}
declare enum StatusMapping {
    done = "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E",
    approve = "\u0417\u0430\u043F\u0438\u0441 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u0438\u0439",
    reject = "\u0412\u0456\u0434\u0445\u0438\u043B\u0438\u043D\u043E",
    waiting = "\u041E\u0447\u0456\u043A\u0443\u0454 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F"
}
export { Status, StatusMapping, };
