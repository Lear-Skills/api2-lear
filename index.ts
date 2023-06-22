//===================== IMPORTS ====================================//
import express from "express"                                     //
import { Request, Response } from "express";                //                        
//==================================================================//
//========================== Instanciar ============================//
const app = express();                                              //
const port = 3333                                          //
//==================================================================//
//======================= Express Config ===========================//
app.use(express.json())                                             //                                                                //
//==================================================================//
const userRoutes = require('./routes/userRoutes')
//======================== APP Routes ==============================//                                                   //
app.use('/user' , userRoutes)                                   //
//==================================================================//
const UserModel = require('./models/UserModel')
const Log = require('./models/LogModel')
//==================== DB & Routes Start Script=====================//
const conn = require('./db/conn');
//==================================================================//
try{
    conn.sync()// colocar {force: true} ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err : any)=> {console.log(err)})
}catch(e:any){
    console.log(e)
}


//===================================================================