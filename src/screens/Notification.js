import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NOTIF_DATA = [
  { id: 'header1', type: 'section', title: 'TODAY' },
  { 
    id: '1', 
    type: 'award', 
    title: 'Sales Engineer of the Month', 
    desc: "Congratulations! You've been awarded the badge for outstanding performance in Q3.",
    time: '2h ago',
    icon: 'trophy',
    iconBg: '#FFF9C4',
    iconColor: '#F5B042',
    isNew: true
  },
  { 
    id: '2', 
    type: 'rank', 
    title: 'Rank Upgraded!', 
    desc: 'You are now Senior Sales Engineer. New permissions unlocked.',
    time: '4h ago',
    icon: 'arrow-up',
    iconBg: '#F3E5F5',
    iconColor: '#9C27B0',
    isNew: true
  },
  { id: 'header2', type: 'section', title: 'EARLIER' },
  { 
    id: '3', 
    type: 'goal', 
    title: 'Weekly Goal Met', 
    desc: '10/10 projects active. You are on track for the quarterly bonus.',
    time: '2 days ago',
    icon: 'check-circle',
    iconBg: '#E8F5E9',
    iconColor: '#4CAF50',
    isNew: false
  },
];

export default function Notification() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.type === 'section') {
      return <Text style={styles.sectionHeader}>{item.title}</Text>;
    }

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => item.id === '1' && navigation.navigate('EngineerOfMonth')}
      >
        <View style={[styles.iconBox, { backgroundColor: item.iconBg }]}>
          <FontAwesome5 name={item.icon} size={18} color={item.iconColor} />
        </View>
        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
        {item.isNew && <View style={styles.blueDot} />}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.arrowButton} onPress={() => navigation.navigate('Home')}>
          <Ionicons name="arrow-back" size={24} color="#142036" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={NOTIF_DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 14 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#142036', marginLeft: 15 },
  arrowButton: { paddingVertical: 6 },
  sectionHeader: { fontSize: 12, fontWeight: '800', color: '#8AACCA', marginHorizontal: 20, marginTop: 15, marginBottom: 10, letterSpacing: 1 },
  list: { paddingHorizontal: 15 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 10, flexDirection: 'row', alignItems: 'flex-start' },
  iconBox: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  content: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#142036' },
  timeText: { fontSize: 11, color: '#8AACCA' },
  cardDesc: { fontSize: 13, color: '#5A7A99', lineHeight: 18 },
  blueDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginTop: 6, marginLeft: 10 }
});