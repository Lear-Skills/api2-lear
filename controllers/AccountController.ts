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
import InvestAlgorithm from '../invest_algorith/invest'
import Log from "../Log/log"



export default class AccountController {

    static async deposit( req:Request ,res:Response ){
        const {value} = req.body

        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        
        const account = await dataOf.accountByUserId(user.user_Id)
        
        const old_balance : number = account.balance;
        const new_balance : number = value + old_balance

        try{
            await AccountModel.update({balance:new_balance} , {where:{user_Id:account.user_Id}})
            res.send({message: "Saldo depositado de", saldo:new_balance})
            Log.register("Saldo depositado de" + new_balance + "ID do usuário:" + user.user_Id , "Depósito")
        }catch(e:any){
            console.log(e)
        }
    }
    //Necessário Testar
    static async withdraw(req:Request , res:Response){
        const {value} = req.body

        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        
        const account = await dataOf.accountByUserId(user.user_Id)
        //500
        //300
        const old_balance : number = account.balance;

        if(value>old_balance){
            
            const balance_zero : number = 0
            const debt_value = value - old_balance;
            try{
                await AccountModel.update({debt:debt_value} , {where:{user_Id:account.user_Id}})
                res.send({message:"Saldo retirado, você está no Negativo já que o valor que retirou é maior que o valor atual"})
                Log.register("Débito de" + debt_value + "ID do usuário:" + user.user_Id , "Quitação de Dívida")
            }catch(e:any){
                console.log(e)
            }

        }else{
            const new_balance = old_balance - value;
            try{
                await AccountModel.update({balance:new_balance} , {where:{user_Id:account.user_Id}})
                res.send({message: "Saldo agora é", saldo:new_balance})
                Log.register("Saldo novo de " + new_balance + "ID do usuário:" + user.user_Id , "Quitação Parcial de Dívida")
            }catch(e:any){
                console.log(e)
            }
        }

       
    }
    //Necessário Testar
    static async black_list(req:Request , res:Response){
        const {email} = req.body
        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        const userid = account.user_Id

        try{
            await AccountModel.update({able_to_account:false} , {where:{user_Id:account.user_Id}})
            res.send({message: "Usuário Está na Lista Negra"})
            Log.register("Usuário na Black-List " + "ID do usuário:" + user.user_Id , "Black_list")
        }catch(e:any){
            console.log(e)
        }

    }

    //Necessário Testar //
    static async give_loan(req:Request , res:Response){
        const {email , value} = req.body
        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        const old_balance : number = account.balance;
        const new_balance : number = old_balance + value
        const old_loan : number = account.loan;
        const new_loan : number = old_loan + value
        const status_black_list : boolean = account.able_to_account
        if(status_black_list){
            res.send({message:"Status Negado, Usuário está na Lista Negra!"})
        }else{
            try{
                await AccountModel.update({balance:new_balance ,  loan : new_loan} , {where:{user_Id:account.user_Id}})
                res.send({message: "Adicionado Empréstimo"})
                Log.register("Empréstimo de " + value + "ID do usuário:" + user.user_Id , "Empréstimo")
            }catch(e:any){
                console.log(e)
            }
        }

    }

    //Necessário Testar
    static async pay_loan(req:Request , res:Response){

        const {email , value} = req.body
        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)

        const old_loan = account.loan;
        const new_loan = old_loan - value;
        const old_balance = account.balance;
        const new_balance = old_balance - value

        if(value>old_loan){
            try{
                const zero_loan = 0;
                await AccountModel.update({loan : zero_loan , balance:new_balance} , {where:{user_Id:account.user_Id}})
                res.send({message: "Empréstimo Quitado"})
            }catch(e:any){
                console.log(e)
            }
        }else{
            try{
                await AccountModel.update({balance:new_balance ,  loan : new_loan} , {where:{user_Id:account.user_Id}})
                res.send({message: "Parte do Empréstimo quitado"})
            }catch(e:any){
                console.log(e)
            }

        }
    }



    static async add_int_rate(req:Request , res:Response){

        const {email , interest_rate} = req.body
        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        const old_ir = account.interest_rate;
        const new_ir = old_ir + interest_rate

        try{
            await AccountModel.update({interest_rate :  new_ir} , {where:{user_Id:account.user_Id}})
            res.send({message: "interest_rate aumentado"})
            Log.register("Nova taxa de Interesse de : " + new_ir + "ID do usuário:" + user.user_Id , "interest_rate")
        }catch(e:any){
            console.log(e)
        }


    }

    static async Gold_invest(req:Request , res:Response){
        const {value} = req.body

        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        
        const tax = account.interest_rate;
        
        const returnValue = InvestAlgorithm.GoldInvestiment(value , tax);
        Log.register("Gold_invest : " +returnValue + "ID do usuário:" + user.user_Id , "Gold_Invest")
        res.send({investimento_return:returnValue})
    }

    static async Bronze_invest(req:Request , res:Response){
        const {value} = req.body

        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        
        const tax = account.interest_rate;

        const returnValue = InvestAlgorithm.BronzeInvestiment(value , tax);
        res.send({investimento_return:returnValue})
        Log.register("Bronze_invest : " +returnValue + "ID do usuário:" + user.user_Id , "Bronze_invest")
    }

    static async Cooper_invest(req:Request , res:Response){
        const {value} = req.body

        const token = getToken(req)// pega o token
        const user :typeof UserModel = await getUserByToken(token ,res)
        const account = await dataOf.accountByUserId(user.user_Id)
        
        const tax = account.interest_rate;
        
        const returnValue = InvestAlgorithm.CooperInvestiment(value , tax);
        Log.register("Cooper_invest : " +returnValue + "ID do usuário:" + user.user_Id , "Cooper_invest")
        res.send({investimento_return:returnValue})
    }


    



}