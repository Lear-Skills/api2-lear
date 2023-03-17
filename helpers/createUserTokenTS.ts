const jwt = require("jsonwebtoken");
import User  from "../models/UserModel"
import { Request , Response } from 'express'

export default async function  createUserToken( User: User, req : Request, res : Response) {
  const token = jwt.sign(
    // payload data
    {
      name: User.name,
      id: User.userId,
    },
    "nossosecret" // para deixar o token único - usar strings únicas
  );

  // return token
  try{
    res.status(200).json({
        message: "Você está autenticado!",
        token: token,
        userId: User.userId,
      });
  }catch(e){
    console.log(e)
  }
};
