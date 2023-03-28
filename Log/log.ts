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

import {LogModel} from "../models/LogModel"



export default class Log {

    static async register(action:string , type: string){

        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1; // Adicione 1 porque os meses são indexados a partir de 0
        const ano = dataAtual.getFullYear();
        const dataFormatada = `${dia}/${mes}/${ano}`;

        const logRegister = {
            log : action,
            type: type,
            data: dataFormatada
        }

        try{
            await LogModel.create(logRegister)
        }catch(e:any){
            console.log(e)
        }
    }

}