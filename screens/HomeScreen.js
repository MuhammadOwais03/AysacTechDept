import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { NAV } from '../constants';

export function HomeScreen({ onNavigate }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.homeContent}>
        <Text style={styles.homeTitle}>📱 App Screens</Text>
        <Text style={styles.homeSub}>Tap a screen to preview</Text>
        {NAV.map(n => (
          <TouchableOpacity key={n.key} style={styles.homeCard} onPress={() => onNavigate(n.key)} activeOpacity={0.8}>
            <Text style={styles.homeCardText}>{n.label}</Text>
            <Text style={{ color: '#3b9ddd', fontSize: 20 }}>→</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
