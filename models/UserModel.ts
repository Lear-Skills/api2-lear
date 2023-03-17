import Sequelize from "sequelize";

export default class UserClass {
    name : Promise<string> ;
    email : Promise<string>;
    userId : string;
    salt : Promise<string>;
    password : Promise<string>;

    constructor(name : Promise<string> , email : Promise<string> , userId : string , password : Promise<string>, salt : Promise<string> ) {
        this.name = name
        this.email = email;
        this.userId = userId;
        this.password = password
        this.salt = salt;
      }

}
const sequelize = require('../db/conn');
// Define a model
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User
