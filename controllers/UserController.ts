import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import createUserToken from "../helpers/"

const saltLenght = 128;

module.exports =  class UserController {

    static async showHome(req:Request , res:Response){
        res.json({ message: 'hello world with Typescript' })
    }

    static async userLogin(req:Request , res:Response){
        const {   email , password  } = req.body;
        const SHApass = Auth.sha256(password)


    }


    static async userRegister(req:Request , res:Response){
        const {name, email, phone , password, confirmpassword} = req.body

        if(validationCredential (name ,email , phone , password, confirmpassword)){

        }else{
            res.json({ message: 'Problema com o Cadastro' })
        }
        //================ Criptografia dos dados ===============//
        const SHAemail = Auth.sha256(email);
        const SHAphone = Auth.sha256(email);
        const SHAname = Auth.sha256(email);
        const salt = Auth.new_salt(saltLenght);
        const databasePassword = Auth.sha256(password+salt)
        // create user
        const createdUser : object = {
            name : SHAname,
            email : SHAemail,
            salt : salt,
            dbPassword : databasePassword,


        }
  
      try {
        const newUser = await user.save()
  
        await createUserToken(newUser, req, res)
        res.status(200).json({message: "deu bom" , newUser})
  
      } catch (error) {
        res.status(500).json({ message: error })
      }
    }















}
