import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { styles } from '../Css/styleCadastro.js';

export default function CadastroScreen({ goToLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCadastro = () => {
    if (!email || !password || !confirmPassword) {
      if (Platform.OS === 'web') {
        window.alert('Erro: Preencha todos os campos.');
      } else {
        Alert.alert('Erro', 'Preencha todos os campos.');
      }
      return;
    }

    if (password !== confirmPassword) {
      if (Platform.OS === 'web') {
        window.alert('Erro: As senhas não coincidem.');
      } else {
        Alert.alert('Erro', 'As senhas não coincidem.');
      }
      return;
    }

    if (Platform.OS === 'web') {
      window.alert('Cadastro realizado com sucesso!');
      goToLogin();
    } else {
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!', [
        { text: 'OK', onPress: () => goToLogin() }
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../imgs/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha:</Text>
          <TextInput
            placeholder="Digite sua senha"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirmar Senha:</Text>
          <TextInput
            placeholder="Confirme sua senha"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>
            CADASTRAR
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Já tem conta ?
          </Text>

          <TouchableOpacity onPress={goToLogin}>
            <Text style={styles.link}>
              Entrar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}