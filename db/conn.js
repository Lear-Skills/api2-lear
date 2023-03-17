"use strict";
const Sequelize = require('sequelize');
require('dotenv').config();
// Create a new Sequelize instance
const sequelize = new Sequelize('dbTS', 'postgre', 'gui167', {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});
// Synchronize the model with the database
sequelize.sync()
    .then(() => console.log('Models synchronized with PostgreSQL database'))
    .catch((error) => console.error('Error synchronizing models with PostgreSQL database', error));
module.exports = sequelize;
