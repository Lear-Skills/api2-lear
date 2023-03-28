"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const saltLenght = 128;
const jwt = require("jsonwebtoken");
const LogModel_1 = require("../models/LogModel");
class Log {
    static register(action, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth() + 1; // Adicione 1 porque os meses são indexados a partir de 0
            const ano = dataAtual.getFullYear();
            const dataFormatada = `${dia}/${mes}/${ano}`;
            const logRegister = {
                log: action,
                type: type,
                data: dataFormatada
            };
            try {
                yield LogModel_1.LogModel.create(logRegister);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = Log;
