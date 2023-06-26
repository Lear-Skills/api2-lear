"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const criptopass_1 = __importDefault(require("../auth/criptopass"));
const UserModelTS_1 = require("../models/UserModelTS");
const saltLenght = 128;
class dataOf {
    static userEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const emailSHA = criptopass_1.default.sha256(email);
            return yield UserModelTS_1.UserModel.findOne({ where: { email: emailSHA }, raw: true });
        });
    }
    static user_Id(user_id) {
        return UserModelTS_1.UserModel.findOne({ where: { user_Id: user_id }, raw: true });
    }
}
exports.default = dataOf;
