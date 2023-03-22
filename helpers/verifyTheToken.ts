const jwt = require("jsonwebtoken");
const getToken = require("./getOnly-token")
import {UserModel}  from "../models/UserModelTS"
import { NextFunction, Request , Response  } from 'express'
// middleware to validate token
const checkToken = (req : Request, res : Response, next : NextFunction) => {

  if(!req.headers.authorization){
    return res.status(401).json({ message: "Acesso negado!" });
  }

  const token = getToken(req);

  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  try {
    const verified = jwt.verify(token, "nossosecret");
    //req.user = verified;
    next(); // to continue the flow
  } catch (err) {
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

module.exports = checkToken;