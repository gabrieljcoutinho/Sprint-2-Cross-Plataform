import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { styles } from '../Css/styleHome';

// Importação das páginas
import HomeContent from './HomeContent.js';
import KanbanScreen from './KanbanContent.js';
import CalendarScreen from './CalendarContent.js';
import Status from './Status.js'; // Importação da tela de detalhes

export default function HomeScreen({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Estados para controlar a sub-tela de detalhes da rodovia
  const [subScreen, setSubScreen] = useState('list'); // 'list' ou 'details'
  const [selectedRodovia, setSelectedRodovia] = useState(null);

  // Função para abrir os detalhes de uma rodovia específica
  const handleSelectRodovia = (rodovia) => {
    setSelectedRodovia(rodovia);
    setSubScreen('details');
  };

  // Função para voltar para a listagem principal
  const handleBackToList = () => {
    setSubScreen('list');
    setSelectedRodovia(null);
  };

  // Redireciona a aba e resguarda o estado interno da Home
  const handleNavigateTab = (tabName) => {
    setActiveTab(tabName);
    setMenuOpen(false);
    if (tabName !== 'Home') {
      setSubScreen('list');
      setSelectedRodovia(null);
    }
  };

  // Função para renderizar a página selecionada
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return subScreen === 'list' ? (
          <HomeContent onSelectRodovia={handleSelectRodovia} />
        ) : (
          <Status routeData={selectedRodovia} onBack={handleBackToList} />
        );
      case 'Kanban':
        return <KanbanScreen />;
      case 'Calendário':
        return <CalendarScreen />;
      default:
        return <HomeContent onSelectRodovia={handleSelectRodovia} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Customizado */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.burgerButton}
          onPress={() => setMenuOpen(true)}
          activeOpacity={0.7}
        >
          <View style={styles.burgerLine} />
          <View style={[styles.burgerLine, { width: 18 }]} />
          <View style={styles.burgerLine} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          {activeTab === 'Home' && subScreen === 'details' ? selectedRodovia?.title : activeTab}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Renderização Dinâmica do Conteúdo das Páginas */}
      {renderContent()}

      {/* Modal do Menu Lateral */}
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setMenuOpen(false)}>
            <View style={styles.blurBackground} />
          </TouchableWithoutFeedback>

          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <View style={{ width: 20 }} />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMenuOpen(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerBody}>
              <TouchableOpacity
                style={[styles.drawerItem, activeTab === 'Home' && styles.drawerItemActive]}
                onPress={() => handleNavigateTab('Home')}
              >
                <Text style={activeTab === 'Home' ? styles.drawerItemTextActive : styles.drawerItemText}>
                  Home
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.drawerItem, activeTab === 'Kanban' && styles.drawerItemActive]}
                onPress={() => handleNavigateTab('Kanban')}
              >
                <Text style={activeTab === 'Kanban' ? styles.drawerItemTextActive : styles.drawerItemText}>
                  Kanban
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.drawerItem, activeTab === 'Calendário' && styles.drawerItemActive]}
                onPress={() => handleNavigateTab('Calendário')}
              >
                <Text style={activeTab === 'Calendário' ? styles.drawerItemTextActive : styles.drawerItemText}>
                  Calendário
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.drawerFooter}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
              >
                <Text style={styles.logoutBtnText}>SAIR DA CONTA</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}