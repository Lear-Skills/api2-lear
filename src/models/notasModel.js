const { DataTypes } = require('sequelize');
const sequelize = require('../sequelizeInstance');

const NotaProva = sequelize.define('NotaProva', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nomeProva: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  