import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

import LoginScreen from './Pages/LoginScreen';
import CadastroScreen from './Pages/CadastroScreen';
import HomeScreen from './Pages/HomeScreen'; // Importação da nova tela

export default function App() {
  const [screen, setScreen] = useState('login');

  const handleLogin = ({ email, password, type }) => {
    console.log('Login:', email, password, type);

    // Aqui você faria a validação com sua API.
    // Se o login for bem-sucedido, muda o estado para 'home':
    if (email && password) {
      setScreen('home');
    }
  };

  const handleLogout = () => {
    setScreen('login');
  };

  return (
    <>
      <StatusBar style="light" />

      {screen === 'home' ? (
        <HomeScreen onLogout={handleLogout} />
      ) : screen === 'login' ? (
        <LoginScreen
          onLogin={handleLogin}
          goToRegister={() => setScreen('cadastro')}
        />
      ) : (
        <CadastroScreen
          goToLogin={() => setScreen('login')}
        />
      )}
    </>
  );
}