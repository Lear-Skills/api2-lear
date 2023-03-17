"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
class UserClass {
    constructor(name, email, userId, password, salt) {
        this.name = name;
        this.email = email;
        this.userId = userId;
        this.password = password;
        this.salt = salt;
    }
}
exports.default = UserClass;
const sequelize = require('../db/conn');
// Define a model
const User = sequelize.define('user', {
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    userId: {
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
module.exports = User;
