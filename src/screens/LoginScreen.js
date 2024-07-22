import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth } from '../Components/services/connectionFirebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCadastro, setIsCadastro] = useState(true);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const goToCadastro = () => {
    setIsCadastro(true);
  };

  const goToLogin = () => {
    setIsCadastro(false);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleAuth = () => {
    if (!validateEmail(email)) {
      Alert.alert("Erro", "Formato de e-mail inválido.");
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (isCadastro) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          Alert.alert("Usuário cadastrado com sucesso!");
          navigation.replace('HomeDrawer');
        })
        .catch((error) => {
          Alert.alert("Erro ao cadastrar: ", error.message);
        });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          Alert.alert("Login realizado com sucesso!");
          navigation.replace('HomeDrawer');
        })
        .catch((error) => {
          Alert.alert("Erro ao entrar: ", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{isCadastro ? 'Crie sua conta' : 'Entre com sua conta'}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.subtitulo}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.subtitulo}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIconContainer}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isCadastro ? 'Cadastrar' : 'Entrar'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={isCadastro ? goToLogin : goToCadastro}>
          <Text style={styles.aviso}>
            {isCadastro ? 'Já tem uma conta? Faça login' : 'Ainda não tem uma conta? Cadastre-se'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    color: 'black',
    fontSize: 26,
    fontFamily: 'Quicksand',
    marginTop: 100,
  },
  subtitulo: {
    color: 'black',
    fontSize: 16,
    fontFamily: 'Quicksand',
    marginTop: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  aviso: {
    color: '#6EC071',
    fontSize: 12,
    fontFamily: 'Quicksand',
    marginTop: 20,
    textAlign: 'left',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Quicksand',
  },
  input: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: '#FFF',
    borderRadius: 6,
    height: 45,
    width: 320,
    padding: 10,
    borderWidth: 2,
    borderColor: '#6EC071',
    placeholderTextColor: '#A9A9A9',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 10,
  },
});

export default LoginScreen;
