"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saltLenght = 128;
const jwt = require("jsonwebtoken");
class InvestAlgorithm {
    static getRandomNumber(numbers) {
        const index = Math.floor(Math.random() * numbers.length);
        return numbers[index];
    }
    static createListNumbers() {
        const numbers = [];
        for (let i = 0; i < 100; i++) {
            const randomNum = Math.floor(Math.random() * 20) + 1;
            numbers.push(randomNum);
        }
        return numbers;
    }
}
exports.default = InvestAlgorithm;
