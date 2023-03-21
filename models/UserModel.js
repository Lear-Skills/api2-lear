"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserClass {
    constructor(name, email, userId, password, salt) {
        this.name = name;
        this.email = email;
        this.user_Id = userId;
        this.password = password;
        this.salt = salt;
    }
}
exports.default = UserClass;
