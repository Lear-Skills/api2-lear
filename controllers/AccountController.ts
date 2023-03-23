import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"
import { AccountModel } from '../models/AccountModel';
import Sequelize, { Model } from "sequelize";
import dataOf from '../data-function/data';
const saltLenght = 128;
import {getUserByToken} from '../helpers/getUser-token'
import {getToken} from '../helpers/getOnly-token'
const jwt = require("jsonwebtoken");



export default class AccountController {

    static async deposit( req:Request ,res:Response ){
        const {value} = req.body

        const token = getToken(req)// pega o token
        console.log(token)
        const user :typeof UserModel = await getUserByToken(token ,res)
        console.log("era pra ser o user total em baixo")
        console.log(user)
        const account = await dataOf.accountByUserId(user.user_Id)
        console.log("account em baixo")
        console.log(account)
        const old_balance : number = account.balance;
        const new_balance : number = value + old_balance
        try{
            await AccountModel.update({balance:new_balance} , {where:{user_Id:account.user_Id}})
            res.send({message: "Saldo depositado de", saldo:new_balance})
        }catch(e:any){
            console.log(e)
        }
    }




}