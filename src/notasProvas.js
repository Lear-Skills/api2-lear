const express = require('express');
const bodyParser = require('body-parser');
const NotasModel = require('./notasModel.js');

const app = express();
app.use(bodyParser.json());

app.post('/notas', async (req, res) => {
    const { userId, nota, nomeProva } = req.body;
  
    try {
      const novaNota = new NotasModel({
        userId: userId,
        nomeProva: nomeProva,
        nota: nota
      });
  
      await novaNota.save();
  
      res.status(201).json({ message: 'Nota salva com sucesso!' });
    } catch (error) {
      console.error('Erro ao salvar a nota:', error);
      res.status(500).json({ message: 'Erro ao salvar a nota.' });
    }
  });

  app.listen(3000, () => {
    console.log('API rodando na porta 3000');
  });
  