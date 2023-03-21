import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"
import Sequelize, { Model } from "sequelize";
const saltLenght = 128;

export default class dataOf {

    static  userEmail(email:string){
        return UserModel.findOne({ email: email })
    } 




}