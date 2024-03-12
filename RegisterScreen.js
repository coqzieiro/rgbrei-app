import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [position, setPosition] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    const API_URL = 'http://10.0.2.2:3001'; 
  
    if (!name || !birthdate || !position || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
  
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
  
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, birthdate, position, phone, email, password }),
      });
  
      if (response.ok) {
        Alert.alert('Sucesso', 'Registro bem-sucedido.');
      } else {
        Alert.alert('Erro', 'Erro ao registrar usuário.');
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Erro ao registrar usuário. Por favor, tente novamente.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite as suas informações pessoais</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={birthdate}
        onChangeText={setBirthdate}
      />
      <TextInput
        style={styles.input}
        placeholder="Cargo"
        value={position}
        onChangeText={setPosition}
      />
      <TextInput
        style={styles.input}
        placeholder="Celular"
        value={phone}
        onChangeText={setPhone}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
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
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default RegisterScreen;
