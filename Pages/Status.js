import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  StatusBar,
  Dimensions,
  Modal,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function Status({ routeData, onBack }) {
  const [activeModule, setActiveModule] = useState(null);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(40)).current;
  const modalScale = useRef(new Animated.Value(0.95)).current;
  const modalFade = useRef(new Animated.Value(0)).current;

  const cardsAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 45,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.stagger(
      120,
      cardsAnim.map((anim) =>
        Animated.spring(anim, {
          toValue: 1,
          tension: 50,
          friction: 8,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  const openModal = (module) => {
    setActiveModule(module);
    modalFade.setValue(0);
    modalScale.setValue(0.95);
    Animated.parallel([
      Animated.timing(modalFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(modalScale, {
        toValue: 1,
        tension: 60,
        friction: 9,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(modalFade, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(modalScale, {
        toValue: 0.95,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setActiveModule(null));
  };

  const modules = [
    {
      id: 'Altura',
      title: 'Altura',
      desc: 'Monitoramento vertical da vegetação',
      color: '#10b981',
      icon: '⬒',
    },
    {
      id: 'Saúde',
      title: 'Saúde',
      desc: 'Análise fitossanitária inteligente',
      color: '#f43f5e',
      icon: '✚',
    },
    {
      id: 'KM',
      title: 'KM',
      desc: 'Controle e métricas de trecho',
      color: '#3b82f6',
      icon: '⌖',
    },
  ];

  // Dados reais mapeados por Kilometragem (KM)
  const graphPoints = [
    { km: '1', v: 4 }, { km: '2', v: 1.5 }, { km: '3', v: 3.5 }, { km: '4', v: 2 },
    { km: '5', v: 6 }, { km: '6', v: 7.2 }, { km: '7', v: 7 }, { km: '8', v: 8.5 },
    { km: '9', v: 6.3 }, { km: '10', v: 5.8 }, { km: '11', v: 10.7 }, { km: '12', v: 11.4 },
    { km: '13', v: 13.4 }, { km: '14', v: 12.5 }, { km: '15', v: 12 }, { km: '16', v: 5.2 },
    { km: '17', v: 6 }, { km: '18', v: 5.1 }
  ];

  const getColorByValue = (val) => {
    if (val > 10) return '#f43f5e';
    if (val >= 5) return '#eab308';
    return '#10b981';
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        {/* HEADER PRINCIPAL */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} activeOpacity={0.8} onPress={onBack}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerMini}>ROUTE ANALYTICS</Text>
            <Text style={styles.headerTitle}>Status da Rota</Text>
          </View>

          <View style={{ width: 48 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* CARD HERO */}
          <View style={styles.heroCard}>
            <View style={styles.heroTop}>
              <View style={styles.liveBadge}>
                <View style={styles.liveDot} />
                <Text style={styles.liveText}>ONLINE</Text>
              </View>
              <Text style={styles.heroMini}>TELEMETRIA</Text>
            </View>

            <Text style={styles.heroTitle}>Monitoramento Inteligente</Text>

            <Text style={styles.heroDescription}>
              {routeData?.subtitle || 'Painel avançado com análise operacional, inspeções e dados em tempo real da rota monitorada.'}
            </Text>

            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statValue}>98%</Text>
                <Text style={styles.statLabel}>Precisão</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>24h</Text>
                <Text style={styles.statLabel}>Atualização</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statBox}>
                <Text style={styles.statValue}>AI</Text>
                <Text style={styles.statLabel}>Análise</Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionMini}>MÓDULOS</Text>
            <Text style={styles.sectionTitle}>Inspeções Disponíveis</Text>
          </View>

          {/* LISTA DE MÓDULOS */}
          {modules.map((item, index) => {
            const scale = cardsAnim[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.94, 1],
            });

            return (
              <Animated.View key={item.id} style={{ opacity: cardsAnim[index], transform: [{ scale }], marginBottom: 18 }}>
                <TouchableOpacity activeOpacity={0.88} style={styles.moduleCard} onPress={() => openModal(item)}>
                  <View style={[styles.iconWrapper, { backgroundColor: item.color + '15', borderColor: item.color + '25' }]}>
                    <Text style={[styles.iconText, { color: item.color }]}>{item.icon}</Text>
                  </View>

                  <View style={styles.moduleContent}>
                    <Text style={styles.moduleTitle}>{item.title}</Text>
                    <Text style={styles.moduleDesc}>{item.desc}</Text>
                  </View>

                  <View style={styles.arrowButton}>
                    <Text style={styles.arrowText}>→</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </ScrollView>
      </Animated.View>

      {/* MODAL GLOBAL */}
      <Modal visible={activeModule !== null} transparent animationType="none" onRequestClose={closeModal}>
        <Animated.View style={[styles.modalOverlay, { opacity: modalFade }]}>
          <Animated.View style={[styles.modalContainer, activeModule?.id === 'KM' && styles.modalContainerLarge, { transform: [{ scale: modalScale }] }]}>

            <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>

            {/* ALTURA */}
            {activeModule?.id === 'Altura' && (
              <View style={styles.modalInnerContent}>
                <Text style={styles.imageTitleSpec}>Altura</Text>
                <View style={styles.imageMainValueContainer}>
                  <Text style={styles.imageMainValueText}>30</Text>
                </View>
                <View style={styles.imageLabelRow}>
                  <Text style={[styles.imageLabelItem, { color: '#10b981' }]}>Baixo</Text>
                  <Text style={styles.imageLabelDivider}>•</Text>
                  <Text style={[styles.imageLabelItem, { color: '#fbbf24' }]}>Médio</Text>
                  <Text style={styles.imageLabelDivider}>•</Text>
                  <Text style={[styles.imageLabelItem, { color: '#ef4444' }]}>Alto</Text>
                </View>
              </View>
            )}

            {/* SAÚDE */}
            {activeModule?.id === 'Saúde' && (
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalInnerContent}>
                <View style={styles.leafContainer}>
                  <View style={styles.leafBody}>
                    <View style={styles.leafLineMain} />
                    <View style={[styles.leafLineBranch, { top: 25, transform: [{ rotate: '35deg' }] }]} />
                    <View style={[styles.leafLineBranch, { top: 45, transform: [{ rotate: '35deg' }] }]} />
                    <View style={[styles.leafLineBranch, { top: 65, transform: [{ rotate: '35deg' }] }]} />
                    <View style={[styles.leafLineBranch, { top: 35, left: 45, width: 25, transform: [{ rotate: '-35deg' }] }]} />
                    <View style={[styles.leafLineBranch, { top: 55, left: 45, width: 25, transform: [{ rotate: '-35deg' }] }]} />
                  </View>
                  <View style={styles.leafStem} />
                </View>

                <View style={styles.healthList}>
                  <View style={styles.healthItemBlock}>
                    <View style={styles.healthItemHeader}>
                      <View style={[styles.healthItemCircle, { borderColor: '#10b981' }]}>
                        <Text style={[styles.healthItemCircleText, { color: '#10b981' }]}>🍃</Text>
                      </View>
                      <Text style={[styles.healthItemTitleText, { color: '#10b981' }]}>SAUDÁVEL</Text>
                    </View>
                    <Text style={styles.healthItemSubtext}>• Cor verde vibrante</Text>
                    <Text style={styles.healthItemSubtext}>• Folhas firmes e eretas</Text>
                    <Text style={styles.healthItemSubtext}>• Crescimento uniforme</Text>
                    <Text style={styles.healthItemSubtext}>• Sem sinais de pragas ou doenças</Text>
                  </View>

                  <View style={styles.healthItemBlock}>
                    <View style={styles.healthItemHeader}>
                      <View style={[styles.healthItemCircle, { borderColor: '#fbbf24' }]}>
                        <Text style={[styles.healthItemCircleText, { color: '#fbbf24', fontWeight: 'bold' }]}>!</Text>
                      </View>
                      <Text style={[styles.healthItemTitleText, { color: '#fbbf24' }]}>EM ALERTA</Text>
                    </View>
                    <Text style={styles.healthItemSubtext}>• Algumas folhas amareladas</Text>
                    <Text style={styles.healthItemSubtext}>• Pontas levemente secas</Text>
                    <Text style={styles.healthItemSubtext}>• Crescimento irregular</Text>
                    <Text style={styles.healthItemSubtext}>• Possível início de estresse</Text>
                  </View>

                  <View style={styles.healthItemBlock}>
                    <View style={styles.healthItemHeader}>
                      <View style={[styles.healthItemCircle, { borderColor: '#ef4444' }]}>
                        <Text style={[styles.healthItemCircleText, { color: '#ef4444' }]}>✕</Text>
                      </View>
                      <Text style={[styles.healthItemTitleText, { color: '#ef4444' }]}>DOENTE</Text>
                    </View>
                    <Text style={styles.healthItemSubtext}>• Folhas amareladas ou marrons</Text>
                    <Text style={styles.healthItemSubtext}>• Folhas secas ou murchas</Text>
                    <Text style={styles.healthItemSubtext}>• Presença de manchas ou fungos</Text>
                    <Text style={styles.healthItemSubtext}>• Crescimento fraco ou falhado</Text>
                  </View>
                </View>
              </ScrollView>
            )}

            {/* KM - GRÁFICO PROFISSIONAL MAPEADO POR KILOMETRAGEM */}
            {activeModule?.id === 'KM' && (
              <View style={styles.modalInnerContent}>
                <Text style={styles.chartMainTitleText}>Gráfico de Variação de Altura Dinâmica</Text>

                {/* HEAD LEGEND */}
                <View style={styles.graphTopLegendSpec}>
                  <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: '#ef4444' }]} /><Text style={styles.legendText}>Alto (&gt;10m)</Text></View>
                  <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: '#eab308' }]} /><Text style={styles.legendText}>Médio (5-10m)</Text></View>
                  <View style={styles.legendItem}><View style={[styles.legendIndicator, { backgroundColor: '#10b981' }]} /><Text style={styles.legendText}>Baixo (0-5m)</Text></View>
                </View>

                <View style={styles.graphWrapperStructure}>
                  {/* Y AXIS TITLE */}
                  <Text style={styles.graphYAxisLabelText}>Altura (cm)</Text>

                  <View style={styles.imageGraphContainerProfessional}>
                    {/* Zonas de Background */}
                    <View style={styles.professionalZoneHigh} />
                    <View style={styles.professionalZoneMedium} />
                    <View style={styles.professionalZoneLow} />

                    {/* Linhas de Grade e Valores Y */}
                    <View style={styles.absoluteGridContainer}>
                      {[15, 12, 9, 6, 3, 0].map((val, i) => (
                        <View key={i} style={styles.professionalGridRow}>
                          <Text style={styles.professionalGridRowText}>{val}</Text>
                          <View style={styles.professionalGridLine} />
                        </View>
                      ))}
                    </View>

                    {/* Plotagem do Gráfico */}
                    <View style={styles.professionalPlotArea}>
                      {graphPoints.map((point, idx) => {
                        const heightPercentage = `${(point.v / 15) * 100}%`;
                        const currentColor = getColorByValue(point.v);

                        return (
                          <View key={idx} style={styles.professionalColumnWrapper}>
                            <View style={[styles.professionalBarFill, { height: heightPercentage, backgroundColor: currentColor + '15', borderColor: currentColor }]} />
                            <View style={[styles.professionalNodeDot, { bottom: heightPercentage, backgroundColor: currentColor, marginBottom: -4 }]} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>

                {/* EIXO X - KILOMETRAGEM */}
                <View style={styles.graphXAxisLabelsRow}>
                  {graphPoints.map((point, idx) => (
                    <Text key={idx} style={styles.graphXAxisLabelTextItem}>{point.km}</Text>
                  ))}
                </View>
                <Text style={styles.graphXAxisBottomTitle}>Kilometragem</Text>
              </View>
            )}

          </Animated.View>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    paddingTop: 58,
  },
  header: {
    paddingHorizontal: 24,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.05)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 5,
  },
  backText: {
    color: '#0f172a',
    fontSize: 20,
    fontWeight: '700',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerMini: {
    color: '#3b82f6',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 34,
    padding: 26,
    marginBottom: 36,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 6,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16,185,129,0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  liveText: {
    color: '#10b981',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroMini: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#0f172a',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginTop: 22,
    width: width * 0.72,
  },
  heroDescription: {
    marginTop: 14,
    color: '#64748b',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
  },
  statsContainer: {
    marginTop: 28,
    backgroundColor: '#f8fafc',
    borderRadius: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    color: '#0f172a',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  statLabel: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: 'rgba(15,23,42,0.08)',
  },
  sectionHeader: {
    marginBottom: 22,
  },
  sectionMini: {
    color: '#3b82f6',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#0f172a',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 30,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.04)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 18,
    elevation: 5,
  },
  iconWrapper: {
    width: 62,
    height: 62,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginRight: 18,
  },
  iconText: {
    fontSize: 24,
    fontWeight: '700',
  },
  moduleContent: {
    flex: 1,
  },
  moduleTitle: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  moduleDesc: {
    color: '#64748b',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '500',
  },
  arrowButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '800',
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.82,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 24,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 24 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 12,
    position: 'relative',
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.05)',
  },
  modalContainerLarge: {
    width: width * 0.95,
    paddingHorizontal: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
  },
  modalCloseText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '800',
  },
  modalInnerContent: {
    alignItems: 'center',
    paddingTop: 10,
  },

  /* ALTURA */
  imageTitleSpec: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0f172a',
    marginBottom: 20,
  },
  imageMainValueContainer: {
    marginVertical: 35,
  },
  imageMainValueText: {
    fontSize: 110,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -4,
  },
  imageLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  imageLabelItem: {
    fontSize: 16,
    fontWeight: '800',
  },
  imageLabelDivider: {
    marginHorizontal: 10,
    color: '#cbd5e1',
    fontSize: 16,
  },

  /* SAÚDE */
  leafContainer: {
    alignItems: 'center',
    marginVertical: 20,
    height: 110,
    justifyContent: 'center',
  },
  leafBody: {
    width: 90,
    height: 90,
    backgroundColor: '#8ade36',
    borderTopLeftRadius: 90,
    borderBottomRightRadius: 90,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'relative',
    transform: [{ rotate: '-45deg' }],
  },
  leafLineMain: {
    position: 'absolute',
    backgroundColor: '#589e1a',
    width: 4,
    height: '100%',
    left: '50%',
    marginLeft: -2,
  },
  leafLineBranch: {
    position: 'absolute',
    backgroundColor: '#589e1a',
    width: 20,
    height: 3,
    left: 25,
  },
  leafStem: {
    width: 6,
    height: 20,
    backgroundColor: '#589e1a',
    marginTop: -5,
    borderRadius: 3,
  },
  healthList: {
    width: '100%',
    marginTop: 15,
  },
  healthItemBlock: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.03)',
  },
  healthItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  healthItemCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  healthItemCircleText: {
    fontSize: 11,
  },
  healthItemTitleText: {
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  healthItemSubtext: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '500',
    lineHeight: 19,
    marginLeft: 36,
  },

  /* KM - ESTRUTURA REFORMULADA PROFISSIONAL */
  chartMainTitleText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  graphTopLegendSpec: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#f8fafc',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
  },
  graphWrapperStructure: {
    flexDirection: 'row',
    width: '100%',
    height: 240,
    alignItems: 'stretch',
  },
  graphYAxisLabelText: {
    position: 'absolute',
    left: -40,
    top: '45%',
    transform: [{ rotate: '-90deg' }],
    fontSize: 10,
    color: '#94a3b8',
    fontWeight: '800',
    letterSpacing: 1,
  },
  imageGraphContainerProfessional: {
    flex: 1,
    marginLeft: 24,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  professionalZoneHigh: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '33.33%',
    backgroundColor: 'rgba(244,63,94,0.04)',
  },
  professionalZoneMedium: {
    position: 'absolute',
    top: '33.33%',
    left: 0,
    right: 0,
    height: '33.33%',
    backgroundColor: 'rgba(234,179,8,0.03)',
  },
  professionalZoneLow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '33.33%',
    backgroundColor: 'rgba(16,185,129,0.04)',
  },
  absoluteGridContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingVertical: 8,
    zIndex: 1,
  },
  professionalGridRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 14,
  },
  professionalGridRowText: {
    fontSize: 10,
    color: '#94a3b8',
    width: 22,
    textAlign: 'right',
    paddingRight: 6,
    fontWeight: '700',
  },
  professionalGridLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#f1f5f9',
  },
  professionalPlotArea: {
    ...StyleSheet.absoluteFillObject,
    left: 22,
    right: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  professionalColumnWrapper: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  professionalBarFill: {
    width: '100%',
    borderTopWidth: 2,
    opacity: 0.85,
  },
  professionalNodeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    zIndex: 5,
  },
  graphXAxisLabelsRow: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: 46,
    paddingRight: 8,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  graphXAxisLabelTextItem: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '800',
    width: 14,
    textAlign: 'center',
  },
  graphXAxisBottomTitle: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '900',
    marginTop: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});