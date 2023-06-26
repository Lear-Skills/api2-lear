import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"

import Sequelize, { Model } from "sequelize";
const saltLenght = 128;

export default class dataOf {

    static async userEmail(email: string): Promise<UserClass> {
        const emailSHA = Auth.sha256(email)
        return await UserModel.findOne({where:{ email: emailSHA }, raw: true})
    }

    static user_Id(user_id: string){
        return UserModel.findOne({where:{ user_Id: user_id }, raw: true})
    }

   







}