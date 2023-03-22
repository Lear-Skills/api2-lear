import Sequelize, { Model } from "sequelize";
const sequelize = require('../db/conn');
// Define a model
const AccountModel = sequelize.define('accountUser', {
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
  balance: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  interest_rate: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  loan: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  debt: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  able_to_account: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

  

});

export {AccountModel}