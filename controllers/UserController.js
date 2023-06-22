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
const createUserTokenTS_1 = require("../helpers/createUserTokenTS");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const UserModelTS_1 = require("../models/UserModelTS");
const data_1 = __importDefault(require("../data-function/data"));
const saltLenght = 128;
const getOnly_token_1 = require("../helpers/getOnly-token");
const jwt = require("jsonwebtoken");
class UserController {
    //=========== Controller para Logar Usuário ===============================================//
    static userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email && !password) {
                res.status(422).json({ message: 'O e-mail/ senha é obrigatório!' });
                return;
            }
            const emailSHA1 = criptopass_1.default.sha256(email);
            // check if user exists
            const user = yield UserModelTS_1.UserModel.findOne({ where: { email: emailSHA1 } });
            if (!user) {
                return res
                    .status(422)
                    .json({ message: 'Não há usuário cadastrado com este e-mail!' });
            }
            data_1.default.userEmail(email).then((AfuckingPromise) => {
                const passwordDB = AfuckingPromise.password;
                const saltdb = AfuckingPromise.salt;
                const passwordConfirm = criptopass_1.default.sha256(password + saltdb);
                if (passwordDB == passwordConfirm) {
                    (0, createUserTokenTS_1.createUserToken)(user, req, res);
                }
                else {
                    res.send({ message: "Deu errado!" });
                }
            });
        });
    }
    //=========== Controller para Registrar Usuário ===========================================//
    static userRegister(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, password, confirmpassword } = req.body;
            if ((0, validationsLogin_1.default)(name, email, phone, password, confirmpassword)) {
                const SHAemail = criptopass_1.default.sha256(email);
                const SHAphone = criptopass_1.default.sha256(phone);
                const SHAname = name;
                const salt = criptopass_1.default.new_salt(saltLenght);
                const databasePassword = criptopass_1.default.sha256(password + salt);
                const user_Id = criptopass_1.default.newUserId();
                const userCreated = {
                    name: SHAname,
                    email: SHAemail,
                    user_Id: user_Id,
                    phone: SHAphone,
                    salt: salt,
                    password: databasePassword,
                };
                const AccountCreated = {
                    name: SHAname,
                    email: SHAemail,
                    user_Id: user_Id,
                    balance: 100,
                    interest_rate: 0,
                    loan: 0,
                    debt: 0,
                    able_to_account: true
                };
                const createdClassUser = new UserModel_1.default(SHAname, SHAemail, user_Id, databasePassword, salt);
                try {
                    const newUser = yield UserModelTS_1.UserModel.create(userCreated);
                    yield (0, createUserTokenTS_1.createUserToken)(createdClassUser, req, res);
                }
                catch (error) {
                    res.status(500).json({ message: error });
                }
            }
            else {
                res.json({ message: 'Problema com o Cadastro' });
                console.log("b");
            }
            //============================ Criptografia dos dados ==============================//
        });
    }
    //============================== UPDATE ===========================================//
    static userUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, phone, password } = req.body;
            const emailSHA = criptopass_1.default.sha256(email);
            const user = {
                phone: phone,
                name: name
            };
            data_1.default.userEmail(email).then((AfuckingPromise) => {
                const passwordDB = AfuckingPromise.password;
                const saltdb = AfuckingPromise.salt;
                const passwordConfirm = criptopass_1.default.sha256(password + saltdb);
                if (passwordDB == passwordConfirm) {
                }
                else {
                    res.send({ message: "Deu errado!" });
                }
            });
            try {
                yield UserModelTS_1.UserModel.update(user, { where: { email: emailSHA } });
                res.send({ message: "Usuário Atualizado" });
            }
            catch (e) {
                console.log(e);
                res.send({ message: "Não deu certo" });
            }
        });
    }
    //============================== DELETE ===========================================//
    static userDelete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_Id } = req.body;
            try {
                yield UserModelTS_1.UserModel.destroy({ where: { user_Id: user_Id } });
                res.send({ message: "Operação Delete deu certo!" });
            }
            catch (e) {
                console.log(e);
                res.send({ message: "Operação Delete não deu certo" });
            }
        });
    }
    //============================= CheckUser =========================================//
    static checkUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUser;
            console.log(req.headers.authorization);
            if (req.headers.authorization) {
                const token = (0, getOnly_token_1.getToken)(req);
                const decoded = jwt.verify(token, 'nossosecret');
                currentUser = yield UserModelTS_1.UserModel.findById(decoded.id);
                currentUser.password = undefined;
            }
            else {
                currentUser = null;
            }
            res.status(200).send(currentUser);
        });
    }
}
exports.default = UserController;
