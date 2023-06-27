

 export default class UserClass {
    name : string ;
    email : string;
    user_Id : string;
    salt : string;
    password : string;

    constructor(name : string, email : string, userId : string , password : string, salt : string) {
        this.name = name
        this.email = email;
        this.user_Id = userId;
        this.password = password
        this.salt = salt;
      }

}


