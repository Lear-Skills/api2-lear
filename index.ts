//===================== IMPORTS ====================================//
import express from 'express'                                       //
import { Router, Request, Response } from 'express';                //                        
//==================================================================//
//========================== Instanciar ============================//
const app = express();                                              //
const route = Router()                                              //
//==================================================================//
//======================= Express Config ===========================//
app.use(express.json())                                             //
route.get('/', (req: Request, res: Response) => {                   //        
  res.json({ message: 'hello world with Typescript' })              //
})                                                                  //
//==================================================================//
//======================== APP Routes ==============================//
app.use(route)                                                      //
                                                                    //
//==================================================================//
//==================== DB & Routes Start Script=====================//
try{
    app.listen(3333);
    console.log("Rodando na porta 3333");
}catch(e:any){
    console.log(e)
}