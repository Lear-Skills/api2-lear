"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogModel = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../db/conn');
// Define a model
const LogModel = sequelize.define('log', {
    log: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    type: {
        type: sequelize_1.default.STRING,
        allowNull: false
    },
    data: {
        type: sequelize_1.default.DATE,
        allowNull: false,
        unique: true
    },
});
exports.LogModel = LogModel;
