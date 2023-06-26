"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const UserController_1 = __importDefault(require("../controllers/UserController"));
router.post('/register', UserController_1.default.userRegister);
router.post('/login', UserController_1.default.userLogin);
router.post('/update', UserController_1.default.userUpdate);
router.post('/updatePassword', UserController_1.default.userUpdatePassword);
router.post('/delete', UserController_1.default.userDelete);
router.post('/checkUser', UserController_1.default.checkUser);
module.exports = router;
