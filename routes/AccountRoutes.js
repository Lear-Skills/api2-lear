"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const AccountController_1 = __importDefault(require("../controllers/AccountController"));
router.post('/deposit', AccountController_1.default.deposit);
module.exports = router;
