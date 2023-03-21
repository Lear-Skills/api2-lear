"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/conn');
// Define a model
const UserModel = sequelize.define('user', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    user_Id: {
        type: sequelize_1.default.STRING,
        allowNull: false,
        unique: true
    },
    salt: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    password: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.UserModel = UserModel;
