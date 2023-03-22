import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import {createUserToken} from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"
import {UserModel} from "../models/UserModelTS"
import Sequelize, { Model } from "sequelize";
import dataOf from '../data-function/data';
const saltLenght = 128;

export default class UserController {

    
    //=========== Controller para Logar Usuário ===============================================//
    static async userLogin(req:Request , res:Response){
        const {  email , password  } = req.body;

        if (!email && !password) {
          res.status(422).json({ message: 'O e-mail/ senha é obrigatório!' })
          return
        }
    
        // check if user exists
        const user = await UserModel.findOne({ email: email })
        if (!user) {
          return res
            .status(422)
            .json({ message: 'Não há usuário cadastrado com este e-mail!' })
        }
        
          dataOf.userEmail(email).then((AfuckingPromise:any) => {
            const passwordDB:string = AfuckingPromise.password 
            const saltdb:string = AfuckingPromise.salt
            const passwordConfirm:string = Auth.sha256(saltdb + password)
                
            if(passwordDB == passwordConfirm){
              res.send({message: "Usuário Logado"})
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
          const userId = Auth.newUserId()
        
          const userCreated  = {
            name : SHAname , 
            email : SHAemail ,
            user_Id : userId ,
            phone : SHAphone , 
            salt : salt , 
            password: databasePassword , 
          }

          const createdClassUser = new UserClass(SHAname,SHAemail,userId,databasePassword,salt,)
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
        //================ Criptografia dos dados ===============//
        
    }



    static async userUpdate(req:Request , res:Response){

      const {name, email, phone , password, confirmpassword} = req.body
      





    }







}
