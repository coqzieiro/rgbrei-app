const express = require('express');
const { json } = require('body-parser');
const mongoose = require('mongoose'); // Alteração: importe a biblioteca mongoose corretamente
const { hash, compare } = require('bcryptjs');
const app = express();
const port = 3001; 

// Conectar ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/auth_example', { useNewUrlParser: true, useUnifiedTopology: true }) // Alteração: use mongoose.connect() em vez de connect()
  .then(() => {
    console.log('Conexão bem-sucedida ao banco de dados MongoDB.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados MongoDB:', error);
  });

// Definir schema do usuário
const UserSchema = new mongoose.Schema({ // Alteração: use mongoose.Schema em vez de Schema
  email: { type: String, unique: true },
  password: String
});

// Criar modelo de usuário
const User = mongoose.model('User', UserSchema); // Alteração: use mongoose.model em vez de model()

// Middleware para analisar o corpo da solicitação
app.use(json());

// Rota de registro
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await hash(req.body.password, 10); // Hash da senha
    const user = new User({
      email: req.body.email,
      password: hashedPassword // Armazenamento do hash da senha no banco de dados
    });
    await user.save();
    res.status(201).send('Usuário registrado com sucesso.');
  } catch {
    res.status(500).send('Erro ao registrar o usuário.');
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Usuário não encontrado.');
  }
  try {
    if (await compare(req.body.password, user.password)) { // Comparação de senha
      res.send('Login bem-sucedido.');
    } else {
      res.status(401).send('Credenciais inválidas.');
    }
  } catch {
    res.status(500).send('Erro ao fazer login.');
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});
