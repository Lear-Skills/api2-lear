import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import { Validation } from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"

import Sequelize, { Model } from "sequelize";
import dataOf from '../data-function/data';
const saltLenght = 128;
import {getToken} from '../helpers/getOnly-token'
const jwt = require("jsonwebtoken");



export default class UserController {

    
    //=========== Controller para Logar Usuário ===============================================//
    static async userLogin(req:Request , res:Response){
      try {
        const {  email , password  } = req.body;
        Validation.Login(email, password);
        
        const emailSHA1 = Auth.sha256(email);
        const user = await dataOf.userEmail(email);
        if (!user) {
          throw new Error('Usuário ou senha inválidos');
        }
        const passwordDB:string = user.password;
        const saltdb:string = user.salt;
        const passwordConfirm:string = Auth.sha256(password + saltdb);
        if (passwordDB != passwordConfirm) {
          throw new Error('Usuário ou senha inválidos');
        }
        createUserToken(user, req, res);
        
      } catch (error: Error | any) {
        let messenge = 'Ocorreu erro no login';
        if (error?.message) {
          messenge = error.message;
        }
        res.status(500).json({ messenge });
      }

    }

    //=========== Controller para Registrar Usuário ===========================================//
    static async userRegister(req:Request , res:Response) {
      try {
        const {name, email, phone , password, confirmPassword} = req.body

        Validation.Credential(name, email, phone, password, confirmPassword);
        const SHAemail = Auth.sha256(email);
        const SHAphone = Auth.sha256(phone);
        const SHAname = name;
        const salt = Auth.new_salt(saltLenght);
        const databasePassword = Auth.sha256(password+salt);
        const user_Id = Auth.newUserId();

        const userCreated = {
          name : SHAname, 
          email : SHAemail,
          user_Id : user_Id,
          phone : SHAphone, 
          salt : salt, 
          password: databasePassword, 
        };

        const AccountCreated = {
          name: SHAname,
          email : SHAemail ,
          user_Id : user_Id , 
          balance : 100,
          interest_rate : 0,
          loan: 0,
          debt: 0,
          able_to_account: true
        };

        const createdClassUser = new UserClass(SHAname, SHAemail, user_Id, databasePassword, salt);
        const newUser = await UserModel.create(userCreated);
        await createUserToken(createdClassUser , req, res);
      } catch (error: Error | any) {
        let messenge = 'Ocorreu erro ao criar o usuário';
        if (error?.message) {
          messenge = error.message;
        }
        res.status(500).json({ messenge });
      }
    //============================ Criptografia dos dados ==============================//
        
    }


    //============================== UPDATE ===========================================//
    static async userUpdate(req:Request , res:Response){
      try{
        const {name, email, phone} = req.body;
        Validation.CredentialUpdate(name, email, phone);
        const emailSHA = Auth.sha256(email)
        const user  = {
          phone: phone,
          name: name
        }
        const dataUser = await dataOf.userEmail(email);
        if (!dataUser || dataUser.email != emailSHA) {
          res.send({message: "Deu errado!"});
          return;
        }
        await UserModel.update(user, {where: {email: emailSHA}});
        res.send({message:"Usuário Atualizado"});
      } catch(error: Error | any) {
        console.error(error);
        let messenge = 'Ocorreu erro ao atualizar o usuário';
        if (error?.message) {
          messenge = error.message;
        }
        res.status(500).json({ messenge });
      }
    }

    static async userUpdatePassword(req:Request , res:Response){
      try{
        const {email, password, newPassword, confirmPassword} = req.body;
        Validation.CredentialPassword(email, password, newPassword, confirmPassword);
        const emailSHA = Auth.sha256(email);
        const dataUser = await dataOf.userEmail(email);
        const saltdb: string = dataUser.salt;
        const passwordLogin: string = Auth.sha256(password + saltdb);
        if (!dataUser || dataUser.password != passwordLogin) {
          throw new Error('Usuário ou senha inválidos');
        }
        const user  = {
          password: Auth.sha256(newPassword + saltdb)
        }
        await UserModel.update(user, {where: {email: emailSHA}});
        res.send({message:"Senha Atualizada"});
      } catch(error: Error | any) {
        console.error(error);
        let messenge = 'Ocorreu erro ao atualizar a senha do usuário';
        if (error?.message) {
          messenge = error.message;
        }
        res.status(500).json({ messenge });
      }
    }

    //============================== DELETE ===========================================//
    static async userDelete(req:Request , res:Response){
      const {user_Id} = req.body;
      try{
        await UserModel.destroy({where: {user_Id: user_Id}})
        res.send({message: "Operação Delete deu certo!"})
      }catch(e:any){
        console.log(e)
        res.send( {message:"Operação Delete não deu certo"} )}
    }

    //============================= CheckUser =========================================//
    static async checkUser(req: Request, res:Response) {
      let currentUser
  
      console.log(req.headers.authorization)
  
      if (req.headers.authorization) {
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await UserModel.findById(decoded.id)
        currentUser.password = undefined
      } else {
        currentUser = null
      }
      res.status(200).send(currentUser)
    }



}
