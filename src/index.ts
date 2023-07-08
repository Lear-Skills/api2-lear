//===================== IMPORTS ====================================//
import express from "express"                                       //
import { Request, Response, NextFunction } from "express";          //
//==================================================================//
//========================== Instanciar ============================//
const app = express();                                              //
const port = 3333;                                                  //
let isDbConnected = false;                                          //
//==================================================================//
//======================= Express Config ===========================//
app.use(express.json())                                             //
app.use((req: Request, rep: Response, next: NextFunction) => {      //
    if (!isDbConnected) {                                           //
        return rep.status(500).send('DB is not connected');         //
    }                                                               //
    next();                                                         //
});                                                                 //
//==================================================================//
const userRoutes = require('./routes/userRoutes');                  //
//======================== APP Routes ==============================//
app.use('/user' , userRoutes);                                      //
//==================================================================//
const UserModel = require('./models/UserModel');                    //
const Log = require('./models/LogModel');                           //
//==================== DB & Routes Start Script=====================//
const { autoConnectionDB } = require('./db/autoConn');              //
//==================================================================//
try{
    autoConnectionDB()
        .then((data: boolean) => isDbConnected = data)
        .catch((err: Error) => console.error(err));

    console.log('server rodando na porta:', port);
    app.listen(port);
} catch (e: any) {
    console.log(e);
}
//==================================================================//
