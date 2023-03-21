const Sequelize = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize('apiTSdb' , 'gui' ,'guigui167', {
  host: 'localhost' ,
  dialect: 'mysql'
})



// Synchronize the model with the database
sequelize.sync()
  .then(() => console.log('Models synchronized with PostgreSQL database'))
  .catch((error : any)=> console.error('Error synchronizing models with PostgreSQL database', error));


module.exports = sequelize