"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const criptopass_1 = __importDefault(require("../auth/criptopass"));
const UserModelTS_1 = require("../models/UserModelTS");
const saltLenght = 128;
class dataOf {
    static userEmail(email) {
        const emailSHA = criptopass_1.default.sha256(email);
        return UserModelTS_1.UserModel.findOne({ where: { email: emailSHA }, raw: true });
    }
}
exports.default = dataOf;
