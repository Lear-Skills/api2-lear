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
    static GoldInvestiment(value, tax_rate) {
        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);
        if (N <= 2) {
            const new_value = value * 1;
            return new_value;
        }
        else if (N >= 2 && N <= 9) {
            const new_value = value * (tax_rate - 1);
            return new_value;
        }
        else if (N >= 10 && N <= 15) {
            const new_value = value * (tax_rate);
            return new_value;
        }
        else if (N <= 19 && N >= 16) {
            const new_value = value * ((tax_rate) ** 2);
            return new_value;
        }
        else if (N == 20) {
            const new_value = value * ((tax_rate) ** 3);
            return new_value;
        }
    }
    static CooperInvestiment(value, tax_rate) {
        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);
        if (N <= 2) {
            const new_value = value * 1;
            return new_value;
        }
        else if (N >= 2 && N <= 9) {
            const new_value = value * (tax_rate - 2);
            return new_value;
        }
        else if (N >= 10 && N <= 15) {
            const new_value = value * (tax_rate - 1);
            return new_value;
        }
        else if (N <= 19 && N >= 16) {
            const new_value = value * ((tax_rate + 1));
            return new_value;
        }
        else if (N == 20) {
            const new_value = value * ((tax_rate) ** 2);
            return new_value;
        }
    }
    static BronzeInvestiment(value, tax_rate) {
        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);
        if (N <= 2) {
            const new_value = value / 2;
            return new_value;
        }
        else if (N >= 2 && N <= 9) {
            const new_value = value * (tax_rate - 2);
            return new_value;
        }
        else if (N >= 10 && N <= 15) {
            const new_value = value * (tax_rate - 1);
            return new_value;
        }
        else if (N <= 19 && N >= 16) {
            const new_value = value * ((tax_rate + 1));
            return new_value;
        }
        else if (N == 20) {
            const new_value = value * ((tax_rate));
            return new_value;
        }
    }
}
exports.default = InvestAlgorithm;
console.log(InvestAlgorithm.GoldInvestiment(34, 2));
