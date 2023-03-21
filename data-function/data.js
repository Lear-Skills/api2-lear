"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserModelTS_1 = require("../models/UserModelTS");
const saltLenght = 128;
class dataOf {
    static userEmail(email) {
        return UserModelTS_1.UserModel.findOne({ email: email });
    }
}
exports.default = dataOf;
