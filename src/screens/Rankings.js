import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Local Image Assets
const GIRL_AVATAR = require('../../assets/Avatar-1.jpg');
const GUY_AVATAR = require('../../assets/Avatar-2.jpg');

// Updated Team Data with local images
const TEAM_DATA = [
  { id: 1, name: 'Alex P.', salary: '$189.2k', rank: 1, avatar: GUY_AVATAR },
  { id: 2, name: 'Jordan', salary: '$142.5k', rank: 2, avatar: GUY_AVATAR },
  { id: 3, name: 'Casey', salary: '$128.9k', rank: 3, avatar: GIRL_AVATAR },
  { id: 4, name: 'Sarah Jenkins', salary: '$115.0k', rank: 4, avatar: GIRL_AVATAR },
  { id: 5, name: 'Marcus Chen', salary: '$108.4k', rank: 5, avatar: GUY_AVATAR },
  { id: 6, name: 'Elena Rodriguez', salary: '$102.1k', rank: 6, avatar: GIRL_AVATAR },
  { id: 12, name: 'You (Current Rank)', salary: '$92.1k', rank: 12, avatar: GIRL_AVATAR, isCurrentUser: true },
];

// Updated Department Data with local images
const DEPT_DATA = [
  { id: 1, name: 'Engineering', salary: '$950.0k', rank: 1, avatar: GUY_AVATAR },
  { id: 2, name: 'Design', salary: '$820.5k', rank: 2, avatar: GIRL_AVATAR },
  { id: 3, name: 'Marketing', salary: '$710.2k', rank: 3, avatar: GIRL_AVATAR },
  { id: 4, name: 'Sales', salary: '$650.0k', rank: 4, avatar: GUY_AVATAR },
  { id: 5, name: 'Finance', salary: '$610.4k', rank: 5, avatar: GUY_AVATAR },
  { id: 10, name: 'Your Dept (Product)', salary: '$580.1k', rank: 10, avatar: GIRL_AVATAR, isCurrentUser: true },
];

const Rankings = ({ colors, isDarkMode }) => {
  const navigation = useNavigation();
  const [activeView, setActiveView] = useState('team'); 
  
  const currentData = activeView === 'team' ? TEAM_DATA : DEPT_DATA;
  const topThree = currentData.slice(0, 3);
  const restList = currentData.slice(3);

  const podium = [topThree[1], topThree[0], topThree[2]];

  const getRankColor = (rank) => {
    if (rank === 1) return '#F5B042';
    if (rank === 2) return '#C0C0C0';
    return '#CD7F32';
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#121212' : '#D9E4EC' }]}>
      {/* Header */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#FFF' : '#5A6E7F'} />
        </TouchableOpacity>
        <Text style={[styles.navTitle, { color: isDarkMode ? '#FFF' : '#5A6E7F' }]}>ELITE RANKINGS</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Toggle Switch */}
        <View style={[styles.headerIndicator, { backgroundColor: isDarkMode ? '#1E1E1E' : 'rgba(255,255,255,0.5)' }]}>
          <TouchableOpacity 
            onPress={() => setActiveView('team')}
            style={[styles.indicatorBtn, activeView === 'team' && styles.indicatorActive]}
          >
            <Text style={[styles.indicatorText, activeView === 'team' ? styles.textWhite : { color: isDarkMode ? '#888' : '#5A6E7F' }]}>
              Team ({TEAM_DATA.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => setActiveView('dept')}
            style={[styles.indicatorBtn, activeView === 'dept' && styles.indicatorActive]}
          >
            <Text style={[styles.indicatorText, activeView === 'dept' ? styles.textWhite : { color: isDarkMode ? '#888' : '#5A6E7F' }]}>
              Department
            </Text>
          </TouchableOpacity>
        </View>

        {/* Podium Section */}
        <View style={styles.podiumWrapper}>
          {podium.map((item, index) => {
            const isFirst = item.rank === 1;
            return (
              <View key={item.id} style={[styles.podiumCard, isFirst && styles.firstPlaceCard]}>
                <View style={[isFirst ? styles.avatarRingFirst : styles.avatarRing, { borderColor: getRankColor(item.rank) }]}>
                  <Image source={item.avatar} style={isFirst ? styles.avatarFirst : styles.avatar} />
                  <View style={[styles.rankBadge, { backgroundColor: getRankColor(item.rank) }]}>
                    {isFirst ? <Ionicons name="trophy" size={12} color="#FFF" /> : <Text style={styles.rankBadgeText}>{item.rank}</Text>}
                  </View>
                </View>
                <Text style={[styles.podiumName, isFirst && styles.podiumNameFirst, { color: isDarkMode ? '#FFF' : '#1A2C3E' }]} numberOfLines={1}>{item.name}</Text>
                <Text style={[styles.podiumSalary, { color: isDarkMode ? '#4dabf7' : '#3B82F6' }]}>{item.salary}</Text>
              </View>
            );
          })}
        </View>

        {/* List Section */}
        <View style={[styles.listContainer, { backgroundColor: isDarkMode ? '#1E1E1E' : '#FFF' }]}>
          {restList.map((item) => (
            <View key={item.id} style={[styles.listItem, item.isCurrentUser && (isDarkMode ? styles.currRowDark : styles.currRowLight)]}>
              <Text style={[styles.itemRank, { color: isDarkMode ? '#888' : '#8E9AAB' }]}>{item.rank}</Text>
              <View style={styles.itemNameWrapper}>
                <Image source={item.avatar} style={styles.itemAvatar} />
                <View style={styles.nameProgressCol}>
                  <Text style={[styles.itemName, { color: isDarkMode ? '#FFF' : '#1A2C3E' }]}>{item.name}</Text>
                  <View style={[styles.progressBarBg, { backgroundColor: isDarkMode ? '#333' : '#E2E8F0' }]}>
                    <View style={[styles.progressBarFill, { width: item.isCurrentUser ? '90%' : '65%' }]} />
                  </View>
                </View>
              </View>
              <Text style={[styles.itemSalary, { color: isDarkMode ? '#FFF' : '#1A2C3E' }]}>{item.salary}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  navBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
  navTitle: { fontSize: 14, fontWeight: '700', letterSpacing: 1 },
  scrollContent: { paddingHorizontal: 15 },
  headerIndicator: { flexDirection: 'row', borderRadius: 25, padding: 4, marginVertical: 15 },
  indicatorBtn: { flex: 1, paddingVertical: 10, borderRadius: 22, alignItems: 'center' },
  indicatorActive: { backgroundColor: '#3B82F6' },
  indicatorText: { fontWeight: '600', fontSize: 13 },
  textWhite: { color: '#FFF' },
  podiumWrapper: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginVertical: 20 },
  podiumCard: { alignItems: 'center', width: '30%' },
  firstPlaceCard: { marginBottom: 10 },
  avatarRing: { width: 65, height: 65, borderRadius: 32.5, borderWidth: 2, padding: 2, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  avatarRingFirst: { width: 85, height: 85, borderRadius: 42.5, borderWidth: 3, padding: 2, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center' },
  avatar: { width: '100%', height: '100%', borderRadius: 32 },
  avatarFirst: { width: '100%', height: '100%', borderRadius: 42 },
  rankBadge: { position: 'absolute', top: -5, right: -5, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  rankBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  podiumName: { fontSize: 12, fontWeight: '600', marginTop: 8 },
  podiumNameFirst: { fontSize: 14, fontWeight: '700' },
  podiumSalary: { fontSize: 11, fontWeight: '700' },
  listContainer: { borderRadius: 20, paddingVertical: 5, marginBottom: 100 },
  listItem: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 0.5, borderBottomColor: 'rgba(128,128,128,0.1)' },
  itemRank: { width: 30, fontSize: 14, fontWeight: '700' },
  itemNameWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  itemAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  nameProgressCol: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '600' },
  progressBarBg: { height: 5, borderRadius: 3, marginTop: 6, width: '85%', overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#3B82F6' },
  itemSalary: { fontSize: 14, fontWeight: '700' },
  currRowLight: { backgroundColor: '#EBF5FF', borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
  currRowDark: { backgroundColor: '#1A2233', borderLeftWidth: 4, borderLeftColor: '#3B82F6' },
});

export default Rankings;