import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavbar';

const CommunityCard = ({ title, role, icon, color, onPress }) => (
  <View style={styles.sectionWrapper}>
    <View style={styles.headerRow}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.sectionLabel}>{title.toUpperCase()}</Text>
    </View>
    <TouchableOpacity style={styles.card} onPress={onPress}> 
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardRole}>{role}</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Communities = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.mainTitle}>Communities</Text>
<CommunityCard 
          title="AYASC" 
          role="CHIEF EXECUTIVE OFFICER" 
          icon="globe-outline" 
          color="#00D2FF" 
          onPress={() => navigation.navigate('HeadOffice')} 
        />
        <CommunityCard title="Sales and Marketing" role="SUPREME HEAD OF DEPARTMENT" icon="flag-outline" color="#9B51E0" />
        <CommunityCard title="Sales Engineering" role="HEAD OF DEPARTMENT" icon="map-outline" color="#1DD1A1" />
        <CommunityCard title="Team Alpha" role="MANAGER" icon="business-outline" color="#FF9F43" />
        
      </ScrollView>
      <BottomNavBar navigation={navigation} activeTab="People" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  mainTitle: { fontSize: 32, fontWeight: 'bold', color: '#1C1F26', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  sectionWrapper: { paddingHorizontal: 20, marginBottom: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  sectionLabel: { fontSize: 12, fontWeight: 'bold', color: '#8E8E8E', letterSpacing: 1 },
  card: { 
    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
    borderRadius: 25, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  iconContainer: { width: 60, height: 60, borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  textContainer: { marginLeft: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  cardRole: { fontSize: 11, color: '#aaa', marginTop: 2 },
});

export default Communities;