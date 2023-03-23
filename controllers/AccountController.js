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
const AccountModel_1 = require("../models/AccountModel");
const data_1 = __importDefault(require("../data-function/data"));
const saltLenght = 128;
const getUser_token_1 = require("../helpers/getUser-token");
const getOnly_token_1 = require("../helpers/getOnly-token");
const jwt = require("jsonwebtoken");
class AccountController {
    static deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            console.log(token);
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            console.log("era pra ser o user total em baixo");
            console.log(user);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            console.log("account em baixo");
            console.log(account);
            const old_balance = account.balance;
            const new_balance = value + old_balance;
            try {
                yield AccountModel_1.AccountModel.update({ balance: new_balance }, { where: { user_Id: account.user_Id } });
                res.send({ message: "Saldo depositado de", saldo: new_balance });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = AccountController;
