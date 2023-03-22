import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"
import { AccountModel } from '../models/AccountModel';
import Sequelize, { Model } from "sequelize";
const saltLenght = 128;

export default class dataOf {

    static  userEmail(email:string){
        const emailSHA = Auth.sha256(email)
        return UserModel.findOne({where:{ email: emailSHA }, raw: true})
    } 

    static user_Id(user_id: string){
        return UserModel.findOne({where:{ user_Id: user_id }, raw: true})
    }

    static accountByUserId(user:typeof UserModel){
        return AccountModel.findOne({where:{user_Id : user.user_Id}})
    }







}