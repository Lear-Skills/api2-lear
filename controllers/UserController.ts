import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
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
        const {  email , password  } = req.body;
        
        if (!email && !password) {
          res.status(422).json({ message: 'O e-mail/ senha é obrigatório!' })
          return
        }
        const emailSHA1 = Auth.sha256(email)
        // check if user exists
        const user = await UserModel.findOne({where: { email: emailSHA1 }})
        if (!user) {
          return res
            .status(422)
            .json({ message: 'Não há usuário cadastrado com este e-mail!' })
        }
        
          dataOf.userEmail(email).then((AfuckingPromise:any) => {
            const passwordDB:string = AfuckingPromise.password 
            const saltdb:string = AfuckingPromise.salt
            const passwordConfirm:string = Auth.sha256(password + saltdb)    
            if(passwordDB == passwordConfirm){
              createUserToken(user, req, res)
            }else{
              res.send({message: "Deu errado!"})
            }
        })
        


    }

    //=========== Controller para Registrar Usuário ===========================================//
    static async userRegister(req:Request , res:Response){
        const {name, email, phone , password, confirmpassword} = req.body

        if(validationCredential (name ,email , phone , password, confirmpassword)){
          const SHAemail = Auth.sha256(email)
          const SHAphone = Auth.sha256(phone);
          const SHAname = name;
          const salt = Auth.new_salt(saltLenght);
          const databasePassword = Auth.sha256(password+salt)
          const user_Id = Auth.newUserId()
        
          const userCreated  = {
            name : SHAname , 
            email : SHAemail ,
            user_Id : user_Id ,
            phone : SHAphone , 
            salt : salt , 
            password: databasePassword , 
          }

          const createdClassUser = new UserClass(SHAname,SHAemail,user_Id,databasePassword,salt,)
        try {
          const newUser = await UserModel.create(userCreated)
          
          await createUserToken(createdClassUser , req, res)
    
        } catch (error) {
          res.status(500).json({ message: error })
        }   
        }else{
            res.json({ message: 'Problema com o Cadastro' })
            console.log("b")
        }
    //============================ Criptografia dos dados ==============================//
        
    }


    //============================== UPDATE ===========================================//
    static async userUpdate(req:Request , res:Response){
      const {name, email, phone , password} = req.body;
      const emailSHA = Auth.sha256(email)
      const user  = {
        phone: phone,
        name: name
      }
      dataOf.userEmail(email).then((AfuckingPromise:any) => {
        const passwordDB:string = AfuckingPromise.password 
        const saltdb:string = AfuckingPromise.salt
        const passwordConfirm:string = Auth.sha256(password + saltdb)    
        if(passwordDB == passwordConfirm){
        }else{
          res.send({message: "Deu errado!"})
        }
      })
        try{
          await UserModel.update(user, {where: {email: emailSHA}});
          res.send({message:"Usuário Atualizado"})
        }catch(e:any){
          console.log(e)
          res.send({message : "Não deu certo"})
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
