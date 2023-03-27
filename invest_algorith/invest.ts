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



export default class InvestAlgorithm { 
        
    static getRandomNumber(numbers: number[])  {
        const index = Math.floor(Math.random() * numbers.length);
        return numbers[index];
    }

    static createListNumbers(){
        const numbers = [];
        for (let i = 0; i < 100; i++) {
            const randomNum = Math.floor(Math.random() * 20) + 1;
            numbers.push(randomNum);
          }
        return numbers

    }


}