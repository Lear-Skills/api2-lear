import Sequelize, { Model } from "sequelize";
const sequelize = require('../db/conn');
// Define a model
const UserModel = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  user_Id: {
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

export {UserModel}