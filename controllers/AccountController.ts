import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"
import Sequelize, { Model } from "sequelize";
import dataOf from '../data-function/data';
const saltLenght = 128;
const {getUserByToken} from '../helpers/getUser-token'
import {getToken} from '../helpers/getOnly-token'
const jwt = require("jsonwebtoken");



export default class AccountController {

    static async deposit(req:Request ,res:Response){
        const {value} = req.body
        const token = getToken(req)// pega o token
        const user = await getUserByToken(token)
        const account = await dataOf.accountByUserId(user.user_Id)
        const old_balance = account.balance;
        const new_balance = value + old_balance
        try{
            
        }
    }




}