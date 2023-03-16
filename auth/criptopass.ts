import crypto from 'crypto'

const saltLenght = 128;

export default  class Auth {

//============================Funções De "Criptografia"=======================
    static async sha256(password :string) {
        return crypto.createHash("sha256").update(password).digest("hex");
        }
//============================ Criar salt =====================================
    static async  new_salt(length :number) {
        return crypto
            .randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
        }
//============================ Autenticação ====================================
    static async  auth_pass(sha256:string, salt:string){
        return (sha256 + salt)
}
//============================ Verificar Auth ==================================
    static  async  verify_auth(password:string, salt:string , auth_pass:string){
        const password256 = Auth.sha256(password)
        if(password256+salt == auth_pass){
            return true;
        }else{
            return false;
        }
    }
//=========================== Teste ==========================================

}