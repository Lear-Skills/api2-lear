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
const criptopass_1 = __importDefault(require("../auth/criptopass"));
const validationsLogin_1 = __importDefault(require("../validations/validationsLogin"));
const createUserTokenTS_1 = __importDefault(require("../helpers/createUserTokenTS"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserModelTS_1 = require("../models/UserModelTS");
const saltLenght = 128;
class UserController {
    //=========== Controller para Logar Usuário ===============================================//
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const SHApass = criptopass_1.default.sha256(password);
        });
    }
    //=========== Controller para Registrar Usuário ===========================================//
    static userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, password, confirmpassword } = req.body;
            if ((0, validationsLogin_1.default)(name, email, phone, password, confirmpassword)) {
            }
            else {
                res.json({ message: 'Problema com o Cadastro' });
            }
            //================ Criptografia dos dados ===============//
            const SHAemail = criptopass_1.default.sha256(email);
            const SHAphone = criptopass_1.default.sha256(phone);
            const SHAname = criptopass_1.default.sha256(name);
            const salt = criptopass_1.default.new_salt(saltLenght);
            const databasePassword = criptopass_1.default.sha256(password + salt);
            const userId = criptopass_1.default.newUserId();
            // create user
            //PAREI AQUI
            //const usercreated = new UserClass(SHAname , SHAemail ,userId ,databasePassword, salt )
            const userCreated = {
                name: SHAname,
                email: SHAemail,
                user_Id: userId,
                phone: SHAphone,
                salt: salt,
                password: databasePassword,
            };
            const createdClassUser = new UserModel_1.default(SHAname, SHAemail, userId, databasePassword, salt);
            try {
                const newUser = yield UserModelTS_1.UserModel.create(userCreated);
                res.send({ newUser });
                yield (0, createUserTokenTS_1.default)(createdClassUser, req, res);
                res.status(200).json({ message: "deu bom", userCreated });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.default = UserController;
