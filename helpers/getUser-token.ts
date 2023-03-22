const jwt = require("jsonwebtoken");
import {UserModel}  from "../models/UserModelTS"
import { Request , Response } from 'express'


// get user by jwt token
const getUserByToken = async (token :any , res:Response , req:Request) => {
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  // find user
  const decoded = jwt.verify(token, "nossosecret");

  const userId = decoded.id;

  const user = await UserModel.findOne({ userId: userId });

  return user;
};

module.exports = getUserByToken;