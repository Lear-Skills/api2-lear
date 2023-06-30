const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('lear', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

// testar conexão
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  });

  module.exports = sequelize;
