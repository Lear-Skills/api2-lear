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

    static GoldInvestiment(value : number, tax_rate:number){

        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);

        if(N<=2){
            const new_value = value * 1;
            return new_value
        }else if(N>=2 && N<=9){
            const new_value = value * (tax_rate-1);
            return new_value
        }else if(N >= 10 &&  N <= 15){
            const new_value = value * (tax_rate);
            return new_value
        }else if( N <= 19 && N >= 16){
            const new_value = value * ((tax_rate)**2);
            return new_value
        }else if(N == 20){
            const new_value = value * ((tax_rate)**3);
            return new_value
        }
    }


    static CooperInvestiment(value : number, tax_rate:number){
        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);

        if(N<=2){
            const new_value = value * 1;
            return new_value
        }else if(N>=2 && N<=9){
            const new_value = value * (tax_rate- 2);
            return new_value
        }else if(N >= 10 &&  N <= 15){
            const new_value = value * (tax_rate - 1);
            return new_value
        }else if( N <= 19 && N >= 16){
            const new_value = value * ((tax_rate + 1));
            return new_value
        }else if(N == 20){
            const new_value = value * ((tax_rate)**2);
            return new_value
        }
    }

    static BronzeInvestiment(value : number, tax_rate:number){

        const list_Number = InvestAlgorithm.createListNumbers();
        const N = InvestAlgorithm.getRandomNumber(list_Number);

        if(N<=2){
            const new_value = value / 2;
            return new_value
        }else if(N>=2 && N<=9){
            const new_value = value * (tax_rate- 2);
            return new_value
        }else if(N >= 10 &&  N <= 15){
            const new_value = value * (tax_rate - 1);
            return new_value
        }else if( N <= 19 && N >= 16){
            const new_value = value * ((tax_rate + 1));
            return new_value
        }else if(N == 20){
            const new_value = value * ((tax_rate));
            return new_value
        }
    }










}


console.log(InvestAlgorithm.GoldInvestiment(34, 2))