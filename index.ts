//===================== IMPORTS ====================================//
import express from "express"                                     //
import { Router, Request, Response } from "express";                //                        
//==================================================================//
//========================== Instanciar ============================//
const app = express();                                              //
const route = Router()    
const port = 3333                                          //
//==================================================================//
//======================= Express Config ===========================//
app.use(express.json())                                             //                                                                //
//==================================================================//
const userRoutes = require('./routes/userRoutes')
//======================== APP Routes ==============================//
app.use(route)                                                      //
app.use('/user' , userRoutes)                                       //
//==================================================================//
//==================== DB & Routes Start Script=====================//
const conn = require('./db/conn');
//==================================================================//
try{
    conn.sync()// colocar force: true ao alterar dados no BD
.then( ()=> {
    console.log('server rodando na porta: ', port)
    app.listen(port)
})
.catch((err : any)=> {console.log(err)})
}catch(e:any){
    console.log(e)
}


//===================================================================