import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { styles } from '../Css/styleLogin';

export default function LoginScreen({ onLogin, goToRegister }) {
  const [emailType, setEmailType] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (onLogin) {
      onLogin({
        email,
        password,
        type: emailType,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.logoArea}>
        <Image
          source={require('../imgs/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.form}>
        <View style={styles.typeSelectorContainer}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              emailType === 'admin' && styles.typeButtonActive,
            ]}
            onPress={() => setEmailType('admin')}
          >
            <Text
              style={[
                styles.typeButtonText,
                emailType === 'admin' && styles.typeButtonTextActive,
              ]}
            >
              Email Administrativo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              emailType === 'team' && styles.typeButtonActive,
            ]}
            onPress={() => setEmailType('team')}
          >
            <Text
              style={[
                styles.typeButtonText,
                emailType === 'team' && styles.typeButtonTextActive,
              ]}
            >
              Email de Equipe
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder={
              emailType === 'admin'
                ? 'admin@empresa.com'
                : 'equipe@empresa.com'
            }
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={[styles.inputField, { paddingRight: 40 }]}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            style={styles.eyeBtnContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeBtn}>
              {showPassword ? '◉' : '◎'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
        >
          <Text style={styles.loginBtnText}>
            ENTRAR
          </Text>
        </TouchableOpacity>

        <View style={styles.registerRow}>
          <Text style={styles.registerText}>
            Não tem conta?
          </Text>
          <TouchableOpacity onPress={goToRegister}>
            <Text style={styles.registerLink}>
              Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}