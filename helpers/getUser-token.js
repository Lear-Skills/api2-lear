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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const UserModelTS_1 = require("../models/UserModelTS");
// get user by jwt token
const getUserByToken = (token, res, req) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token)
        return res.status(401).json({ error: "Acesso negado!" });
    // find user
    const decoded = jwt.verify(token, "nossosecret");
    const userId = decoded.id;
    const user = yield UserModelTS_1.UserModel.findOne({ userId: userId });
    return user;
});
module.exports = getUserByToken;
