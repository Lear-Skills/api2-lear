"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===================== IMPORTS ====================================//
const express_1 = __importDefault(require("express")); //
const express_2 = require("express"); //                        
//==================================================================//
//========================== Instanciar ============================//
const app = (0, express_1.default)(); //
const route = (0, express_2.Router)();
const port = 3333; //
//==================================================================//
//======================= Express Config ===========================//
app.use(express_1.default.json()); //                                                                //
//==================================================================//
const userRoutes = require('./routes/userRoutes');
//======================== APP Routes ==============================//
app.use(route); //
app.use('/user', userRoutes); //
//==================================================================//
//==================== DB & Routes Start Script=====================//
const conn = require('./db/conn');
//==================================================================//
try {
    conn.sync() // colocar force: true ao alterar dados no BD
        .then(() => {
        console.log('server rodando na porta: ', port);
        app.listen(port);
    })
        .catch((err) => { console.log(err); });
}
catch (e) {
    console.log(e);
}
//===================================================================
