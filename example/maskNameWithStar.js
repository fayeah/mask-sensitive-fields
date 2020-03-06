var maskSensitiveFields = require("../index");

const source={email: "lixufeichn@163.com", bio: "愿世界和平"};
maskSensitiveFields(source, ["email"]);