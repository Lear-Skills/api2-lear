import crypto from 'crypto'

const saltLenght = 128;

export default  class Auth {

//============================Funções De "Criptografia"=======================
    static  sha256(password :string) {
        return crypto.createHash("sha256").update(password).digest("hex");
        }
//============================ Criar salt =====================================
    static  new_salt(length :number) {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
        }
//============================ Autenticação ====================================
    static auth_pass(sha256:string, salt:string){
        return (sha256 + salt)
}
//============================ Verificar Auth ==================================
    static verify_auth(password:string, salt:string , auth_pass:string){
        const password256 = Auth.sha256(password)
        if(password256+salt == auth_pass){
            return true;
        }else{
            return false;
        }
    }



    static newUserId(){
        return (Math.floor(Math.random() * 256)).toString()
    }
//=========================== Teste ==========================================

}