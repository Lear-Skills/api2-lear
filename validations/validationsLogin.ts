

export default function validationCredential (
    name:string , 
    email:string , 
    phone:string , 
    password:string, 
    confirmpassword:string) { 
    
    if (!name || !email || !phone || !password || !confirmpassword) {
        return false
      }else if(password != confirmpassword) {
        return false
      }else{
        return true
      }
}