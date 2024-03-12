import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira um endereço de e-mail válido.');
      return;
    }

    await forgotPassword(email); 

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Digite seu e-mail para recuperar a conta</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Button title="RECUPERAR CONTA" onPress={handleForgotPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default ForgotPasswordScreen;