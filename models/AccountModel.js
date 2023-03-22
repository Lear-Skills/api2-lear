"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/conn');
// Define a model
const AccountModel = sequelize.define('accountUser', {
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
    balance: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    interest_rate: {
        type: sequelize_1.default.DOUBLE,
        allowNull: false
    },
    loan: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    debt: {
        type: sequelize_1.default.INTEGER,
        allowNull: false
    },
    able_to_account: {
        type: sequelize_1.default.BOOLEAN,
        allowNull: false
    },
});
exports.AccountModel = AccountModel;
