"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import User from '../models/UserModel';
const router = require('express').Router();
const UserController_1 = __importDefault(require("../controllers/UserController"));
//router.post('/login' , UserController.userLogin)
router.post('/register', UserController_1.default.userRegister);
module.exports = router;
