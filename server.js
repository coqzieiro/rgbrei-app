const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./User');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myapp')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Erro ao conectar no mongoDB', err));

  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      // Verificar se o email fornecido corresponde ao email armazenado
      if (email !== user.email || password !== user.password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
  
      res.status(200).json({ message: 'Login bem-sucedido' });
    } catch (error) {
      console.error('Erro de login:', error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });  
  
app.post('/register', async (req, res) => {
  try {
    const { name, birthdate, position, phone, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Esse e-mail já existe' });
      return;
    }
    const newUser = new User({ name, birthdate, position, phone, email, password });
    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('Erro ao registrar usuário', error);
    res.status(500).json({ message: 'Erro interno do server' });
  }
});

app.listen(PORT, () => console.log(`Server rodando na porta: ${PORT}`));
