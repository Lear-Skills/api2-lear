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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const saltLenght = 128;
class Auth {
    //============================Funções De "Criptografia"=======================
    static sha256(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto_1.default.createHash("sha256").update(password).digest("hex");
        });
    }
    //============================ Criar salt =====================================
    static new_salt(length) {
        return __awaiter(this, void 0, void 0, function* () {
            return crypto_1.default
                .randomBytes(Math.ceil(length / 2))
                .toString("hex")
                .slice(0, length);
        });
    }
    //============================ Autenticação ====================================
    static auth_pass(sha256, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return (sha256 + salt);
        });
    }
    //============================ Verificar Auth ==================================
    static verify_auth(password, salt, auth_pass) {
        return __awaiter(this, void 0, void 0, function* () {
            const password256 = Auth.sha256(password);
            if (password256 + salt == auth_pass) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.default = Auth;
