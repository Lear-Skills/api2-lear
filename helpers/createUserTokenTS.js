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
exports.createUserToken = void 0;
const jwt = require("jsonwebtoken");
const createUserToken = (User, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jwt.sign(
    // payload data
    {
        name: User.name,
        id: User.user_Id,
    }, "nossosecret" // para deixar o token único - usar strings únicas
    );
    // return token
    try {
        res.status(200).json({
            message: "Você está autenticado!",
            token: token,
            userId: User.user_Id,
        });
    }
    catch (e) {
        console.log(e);
    }
});
exports.createUserToken = createUserToken;
