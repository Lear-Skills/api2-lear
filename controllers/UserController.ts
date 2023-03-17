import { Request , Response } from 'express'
import Auth from '../auth/criptopass';
import validationCredential from '../validations/validationsLogin'
import createUserToken from "../helpers/createUserTokenTS"
import UserClass  from "../models/UserModel"

const saltLenght = 128;

module.exports =  class UserController {

    
    //=========== Controller para Logar Usuário ===============================================//
    static async userLogin(req:Request , res:Response){
        const {   email , password  } = req.body;
        const SHApass = Auth.sha256(password)


    }

    //=========== Controller para Registrar Usuário ===========================================//
    static async userRegister(req:Request , res:Response){
        const {name, email, phone , password, confirmpassword} = req.body

        if(validationCredential (name ,email , phone , password, confirmpassword)){

        }else{
            res.json({ message: 'Problema com o Cadastro' })
        }
        //================ Criptografia dos dados ===============//
        const SHAemail = Auth.sha256(email);
        const SHAphone = Auth.sha256(phone);
        const SHAname = Auth.sha256(name);
        const salt = Auth.new_salt(saltLenght);
        const databasePassword = Auth.sha256(password+salt)
        const userId = "id"
        // create user
        //PAREI AQUI
        const usercreated = new UserClass(SHAname , SHAemail ,userId ,databasePassword, salt )
  
      try {
        //const newUser = await user.save()
  
        await createUserToken(usercreated , req, res)
        res.status(200).json({message: "deu bom" , usercreated})
  
      } catch (error) {
        res.status(500).json({ message: error })
      }
    }















}
