"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const regExEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regExpPhone = /^([0-9]{2})([0-9]{8,9})$/;
class Validation {
    static Login(email, password) {
        if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
            throw new Error('Informe um email válido');
        }
        if (!password || password.length < 6) {
            throw new Error('Informe uma senha com no mínimo de 6 digitos');
        }
        return true;
    }
    static Credential(name, email, phone, password, confirmpassword) {
        if (!name || name.length < 4) {
            throw new Error('Informe um nome com no mínimo de 4 caractéries');
        }
        if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
            throw new Error('Informe um email válido');
        }
        if (!phone || !(regExpPhone.test(phone.replace(/\D/g, '')))) {
            throw new Error('Informe um telefone válido');
        }
        if (!password || password.length < 6) {
            throw new Error('Informe uma senha com no mínimo de 6 digitos');
        }
        if (!password || !confirmpassword || password != confirmpassword) {
            throw new Error('A senha não é igual a conformação da senha');
        }
        return true;
    }
    static CredentialUpdate(name, email, phone) {
        if (!name || name.length < 4) {
            throw new Error('Informe um nome com no mínimo de 4 caractéries');
        }
        if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
            throw new Error('Informe um email válido');
        }
        if (!phone || !(regExpPhone.test(phone.replace(/\D/g, '')))) {
            throw new Error('Informe um telefone válido');
        }
        return true;
    }
    static CredentialPassword(email, password, newPassword, confirmpassword) {
        if (!email || typeof email !== 'string' || !(regExEmail.test(email.toLowerCase()))) {
            throw new Error('Informe um email válido');
        }
        if (!password || password.length < 6) {
            throw new Error('Informe sua senha atual');
        }
        if (!newPassword || newPassword.length < 6) {
            throw new Error('Informe uma nova senha com no mínimo de 6 digitos');
        }
        if (!newPassword || !confirmpassword || newPassword != confirmpassword) {
            throw new Error('A senha não é igual a conformação da senha');
        }
        return true;
    }
}
exports.Validation = Validation;
