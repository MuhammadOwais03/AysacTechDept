import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { NotificationItem } from '../components/NotificationItem';
import { notifToday, notifEarlier } from '../data/notifications';

export function Screen1_Notifications({ onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>
        <Text style={styles.sectionLabel}>TODAY</Text>
        {notifToday.map(item => <NotificationItem key={item.id} item={item} />)}
        <Text style={[styles.sectionLabel, { marginTop: 18 }]}>EARLIER</Text>
        {notifEarlier.map(item => <NotificationItem key={item.id} item={item} />)}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
