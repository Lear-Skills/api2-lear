"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validationCredential(name, email, phone, password, confirmpassword) {
    if (!name || !email || !phone || !password || !confirmpassword) {
        return false;
    }
    else if (password != confirmpassword) {
        return false;
    }
    else {
        return true;
    }
}
exports.default = validationCredential;
