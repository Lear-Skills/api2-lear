const jwt = require("jsonwebtoken");
import {UserModel}  from "../models/UserModelTS"
import { Request , Response } from 'express'

const createUserToken = async ( User: typeof UserModel, req : Request, res : Response) => {
  const token = jwt.sign(
    // payload data
    {
      name: User.name,
      id: User.user_Id,
    },
    "nossosecret" // para deixar o token único - usar strings únicas
  );

  // return token
  try{
    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: User.user_Id,
      });
  }catch(e){
    console.log(e)
  }
};




export {createUserToken}