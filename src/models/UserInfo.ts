import Sequelize, { Model } from "sequelize";
const sequelize = require('../db/conn');
// Define a model
const UserInfo = sequelize.define('userInfo', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  photo: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  idUser: {
    type: Sequelize.STRING,
    allowNull: false
  },
  links: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

export {UserInfo}