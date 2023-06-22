"use strict";
const Sequelize = require('sequelize');
require('dotenv').config();
// Create a new Sequelize instance
const sequelize = new Sequelize('apiTSdb', 'gui', '', {
    host: 'localhost',
    dialect: 'mysql'
});
// Synchronize the model with the database
sequelize.sync()
    .then(() => console.log('Models synchronized with MySQL database'))
    .catch((error) => console.error('Error synchronizing models with MySQL database', error));
module.exports = sequelize;
