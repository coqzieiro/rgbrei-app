import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

const LoginScreen = () => {
  const navigation = useNavigation(); // Obtendo o objeto de navegação
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleLogin = async () => {
  const API_URL = 'http://10.0.2.2:3001';
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: email, password }),
    });      
    if (response.ok) {
      Alert.alert('Sucesso', 'Login bem-sucedido.');
      // Redirecionar para a próxima tela após o login bem-sucedido
      // Exemplo: navigation.navigate('Home');
    } else {
      Alert.alert('Erro', 'Credenciais inválidas.');
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    Alert.alert('Erro', 'Erro ao fazer login. Por favor, tente novamente.');
  }
};


  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./Logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="LOGAR" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegister} style={styles.registerButtonContainer}>
        <Text style={styles.registerButtonText}>REGISTRAR</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Esqueci a senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3FF",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  logo: {
    width: 300,
    height: 94, 
    resizeMode: 'contain',
    marginBottom: 20,
  },
  registerButtonContainer: {
    marginTop: 20,
    backgroundColor: 'green', // Cor de fundo verde
    paddingVertical: 10, // Espaçamento vertical interno
    paddingHorizontal: 20, // Espaçamento horizontal interno
  },
  registerButtonText: {
    color: 'white', // Cor do texto branco
    fontWeight: 'bold', // Texto em negrito
  },
  forgotPassword: {
    marginTop: 10,
    color: 'blue', // Alterado para azul
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
