const UserModel = require('./src/Models/UserModel.ts');

async function getProvasENotasPorIdUsuario(userId) {
    try {
      // Encontre o usuário pelo ID
      const user = await UserModel.findById(userId);
  
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
  
      // Obtenha o nome do usuário
      const userName = user.name;
  
      // Obtenha todas as provas e notas do usuário pelo ID
      const provasENotas = await NotasModel.find({ userId });
  
      // Junte as informações e retorne o resultado
      const resultado = {
        userId,
        userName,
        provasENotas
      };
  
      return resultado;
    } catch (error) {
      console.error('Erro ao obter provas e notas:', error);
      throw error;
    }
  }

  module.exports = {
    getProvasENotasPorIdUsuario
  };
  