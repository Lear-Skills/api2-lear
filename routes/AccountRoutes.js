"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
router.post('/deposit', AccountController_1.default.deposit);
router.post('/withdraw', AccountController_1.default.withdraw);
router.post('/black_list', AccountController_1.default.black_list);
router.post('/give_loan', AccountController_1.default.give_loan);
router.post('/pay_loan', AccountController_1.default.pay_loan);
router.post('/add_int_rate', AccountController_1.default.add_int_rate);
router.post('/gold_invest', AccountController_1.default.Gold_invest);
router.post('/bronze_invest', AccountController_1.default.Bronze_invest);
router.post('/cooper_invest', AccountController_1.default.Cooper_invest);
module.exports = router;
