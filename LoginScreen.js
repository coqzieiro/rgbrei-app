import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, Button, StyleSheet } from 'react-native';

const LoginScreen = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const handleLogin = () => {
        // Lógica de autenticação aqui
    };
    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                />
                <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                />
                <Button title="Login" onPress={handleLogin} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    input: {
        width: '100%',
        heigth: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default LoginScreen;