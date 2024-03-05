const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');

const app = express();
const port = 3001;

// conectar ao banco de dados MongoDB
mongoose.connect('mongodb+srv://felipecoqueiro:123lipe@cluster0.vixqlzc.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexão bem-sucedida ao banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });

// define o schema do usuario
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

// cria modelo de usuario
const User = mongoose.model('User', UserSchema);

// middleware para analisar o corpo da solicitacao
app.use(bodyParser.json());

// rota de registro
app.post('/register', async (req, res) => {
  try {
    const { nome, dataNascimento, cargo, celular, email, password, confirmPassword } = req.body;

    // verificar se a senha e a confirmacao de senha coincidem
    if (password !== confirmPassword) {
      return res.status(400).send('As senhas não coincidem.');
    }

    // verificar se o email ja ta registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('E-mail já registrado.');
    }

    // hash da senha
    const hashedPassword = await hash(password, 10);

    // criar novo usuário
    const user = new User({ nome, dataNascimento, cargo, celular, email, password: hashedPassword });
    await user.save();

    res.status(201).send('Usuário registrado com sucesso.');
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error);
    res.status(500).send('Erro ao registrar o usuário.');
  }
});


// rota de login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send('Usuário não encontrado.');
    }
    const validPassword = await compare(password, user.password);
    if (validPassword) {
      res.send('Login bem-sucedido.');
    } else {
      res.status(401).send('Credenciais inválidas.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).send('Erro ao fazer login.');
  }
});

app.listen(port, () => {
  console.log(`Servidor ouvindo em http://localhost:${port}`);
});
