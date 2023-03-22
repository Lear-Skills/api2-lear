"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
// get token from headers
const getToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    //A função de cima serve para separar em um array o header e pegar só
    //o segundo item , o token de fato, pois a primeira parte vem do postman
    return token;
};
module.exports = getToken;
