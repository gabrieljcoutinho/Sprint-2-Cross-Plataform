import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { styles } from '../Css/styleHome';

const { width } = Dimensions.get('window');
const isTablet = width > 600;

export default function HomeContent({ onSelectRodovia }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const cardAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const animations = cardAnims.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 450,
        delay: index * 120,
        useNativeDriver: true,
      })
    );

    Animated.stagger(100, animations).start();
  }, []);

  const metrics = [
    {
      id: '1',
      title: 'Autoban',
      subtitle: 'SP | SP-330, SP-348, SP-300, SP-330 e SPI-102/330',
      value: '1',
    },
    {
      id: '2',
      title: 'RodoAnel',
      subtitle: 'SP | SP-021',
      value: '2',
    },
    {
      id: '3',
      title: 'SPVias',
      subtitle: 'SP | SP-228, SP-227, SP-255, SP-158 e SPI-127',
      value: '3',
    },
    {
      id: '4',
      title: 'RioSP',
      subtitle: 'SP e RJ | BR-116 e BR-101',
      value: '4',
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        style={[
          styles.mainWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            flexDirection: isTablet ? 'row' : 'column',
            flexWrap: isTablet ? 'wrap' : 'nowrap',
          },
        ]}
      >
        {metrics.map((item, index) => {
          const translateY = cardAnims[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.cardAnimatedContainer,
                {
                  width: isTablet ? '48.5%' : '100%',
                  opacity: cardAnims[index],
                  transform: [{ translateY }],
                },
              ]}
            >
              <TouchableOpacity
                activeOpacity={0.85}
                style={styles.cardTouch}
                onPress={() => onSelectRodovia(item)}
              >
                <View style={styles.cardDecorativeCircle} />

                <View style={styles.cardLeftContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.cardSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <View style={styles.cardBadge}>
                  <Text style={styles.cardBadgeText}>{item.value}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </Animated.View>
    </ScrollView>
  );
}