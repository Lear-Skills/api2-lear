import Sequelize, { Model } from "sequelize";
const sequelize = require('../db/conn');
// Define a model
const LogModel = sequelize.define('log', {
  log: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  data: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: true},
  
});

export {LogModel}