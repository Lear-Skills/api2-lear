"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const saltLenght = 128;
class Auth {
    //============================Funções De "Criptografia"=======================
    static sha256(password) {
        return crypto_1.default.createHash("sha256").update(password).digest("hex");
    }
    //============================ Criar salt =====================================
    static new_salt(length) {
        return crypto_1.default
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }
    //============================ Autenticação ====================================
    static auth_pass(sha256, salt) {
        return (sha256 + salt);
    }
    //============================ Verificar Auth ==================================
    static verify_auth(password, salt, auth_pass) {
        const password256 = Auth.sha256(password);
        if (password256 + salt == auth_pass) {
            return true;
        }
        else {
            return false;
        }
    }
    static newUserId() {
        return (Math.floor(Math.random() * 256)).toString();
    }
}
exports.default = Auth;
