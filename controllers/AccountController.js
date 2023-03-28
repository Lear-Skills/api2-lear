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
const invest_1 = __importDefault(require("../invest_algorith/invest"));
class AccountController {
    static deposit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
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
    //Necessário Testar
    static withdraw(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            //500
            //300
            const old_balance = account.balance;
            if (value > old_balance) {
                const balance_zero = 0;
                const debt_value = value - old_balance;
                try {
                    yield AccountModel_1.AccountModel.update({ debt: debt_value }, { where: { user_Id: account.user_Id } });
                    res.send({ message: "Saldo retirado, você está no Negativo já que o valor que retirou é maior que o valor atual" });
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                const new_balance = old_balance - value;
                try {
                    yield AccountModel_1.AccountModel.update({ balance: new_balance }, { where: { user_Id: account.user_Id } });
                    res.send({ message: "Saldo agora é", saldo: new_balance });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    //Necessário Testar
    static black_list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const userid = account.user_Id;
            try {
                yield AccountModel_1.AccountModel.update({ able_to_account: false }, { where: { user_Id: account.user_Id } });
                res.send({ message: "Usuário Está na Lista Negra" });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    //Necessário Testar //
    static give_loan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const old_balance = account.balance;
            const new_balance = old_balance + value;
            const old_loan = account.loan;
            const new_loan = old_loan + value;
            const status_black_list = account.able_to_account;
            if (status_black_list) {
                res.send({ message: "Status Negado, Usuário está na Lista Negra!" });
            }
            else {
                try {
                    yield AccountModel_1.AccountModel.update({ balance: new_balance, loan: new_loan }, { where: { user_Id: account.user_Id } });
                    res.send({ message: "Adicionado Empréstimo" });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    //Necessário Testar
    static pay_loan(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const old_loan = account.loan;
            const new_loan = old_loan - value;
            const old_balance = account.balance;
            const new_balance = old_balance - value;
            if (value > old_loan) {
                try {
                    const zero_loan = 0;
                    yield AccountModel_1.AccountModel.update({ loan: zero_loan, balance: new_balance }, { where: { user_Id: account.user_Id } });
                    res.send({ message: "Empréstimo Quitado" });
                }
                catch (e) {
                    console.log(e);
                }
            }
            else {
                try {
                    yield AccountModel_1.AccountModel.update({ balance: new_balance, loan: new_loan }, { where: { user_Id: account.user_Id } });
                    res.send({ message: "Parte do Empréstimo quitado" });
                }
                catch (e) {
                    console.log(e);
                }
            }
        });
    }
    static add_int_rate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, interest_rate } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const old_ir = account.interest_rate;
            const new_ir = old_ir + interest_rate;
            try {
                yield AccountModel_1.AccountModel.update({ interest_rate: new_ir }, { where: { user_Id: account.user_Id } });
                res.send({ message: "interest_rate aumentado" });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    static Gold_invest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const tax = account.interest_rate;
            const returnValue = invest_1.default.GoldInvestiment(value, tax);
        });
    }
    static Bronze_invest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const tax = account.interest_rate;
            const returnValue = invest_1.default.BronzeInvestiment(value, tax);
        });
    }
    static Cooper_invest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { value } = req.body;
            const token = (0, getOnly_token_1.getToken)(req); // pega o token
            const user = yield (0, getUser_token_1.getUserByToken)(token, res);
            const account = yield data_1.default.accountByUserId(user.user_Id);
            const tax = account.interest_rate;
            const returnValue = invest_1.default.CooperInvestiment(value, tax);
        });
    }
}
exports.default = AccountController;
