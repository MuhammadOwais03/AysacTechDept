import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavbar';
import { useNavigation } from '@react-navigation/native';

const DutyOn = () => {
  const navigation = useNavigation();
  const colors = { text: '#1C1F26', card: '#fff', cardBorder: '#F0F0F0', textSub: '#8E8E93' };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#F8FBFF' }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Duty Status</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={[styles.statusBadge, { backgroundColor: '#E3F2FD' }]}>
           <View style={[styles.dot, { backgroundColor: '#007AFF' }]} />
           <Text style={styles.statusText}>DUTY ON</Text>
        </View>

        <View style={[styles.card, styles.shadowCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.centeredContent}>
            <Text style={styles.labelSmall}>NEW YORK, USA</Text>
            <Text style={[styles.bigTime, { color: colors.text }]}>10:45<Text style={styles.amPm}> AM</Text></Text>
            <Text style={styles.dateText}>Thursday, Oct 24</Text>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.labelSmall}>LOCAL TIME ZONE</Text>
              <Text style={[styles.boldVal, { color: colors.text }]}>Karachi, PK</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.timeBlue}>08:45 PM</Text>
              <Text style={styles.labelSmall}>+10 Hours</Text>
            </View>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <View style={styles.rowAlign}>
            <View style={styles.iconCircle}><Ionicons name="time-outline" size={24} color="#007AFF" /></View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.diffTitle, { color: colors.text }]}>Time Difference</Text>
              <Text style={[styles.diffBody, { color: colors.textSub }]}>
                Karachi is <Text style={{ color: '#007AFF', fontWeight: '700' }}>10 hours ahead</Text> of New York.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.imageCard}>
          <Image source={require('../../assets/Home.jpg')} style={styles.cityImg} resizeMode="cover" />
          <View style={styles.imageOverlay}>
            <Ionicons name="location-sharp" size={12} color="#FFF" />
            <Text style={styles.overlayText}>Midtown Manhattan, NY</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavBar navigation={navigation} activeTab="Date" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 140 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20, marginTop: 10 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', flex: 1, textAlign: 'center' },
  statusBadge: { alignSelf: 'center', flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 20, marginBottom: 30 },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { color: '#007AFF', fontSize: 12, fontWeight: 'bold', letterSpacing: 0.5 },
  card: { padding: 24, borderRadius: 28, borderWidth: 1, marginBottom: 16 },
  centeredContent: { alignItems: 'center', justifyContent: 'center' },
  shadowCard: { ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.05, shadowRadius: 15 }, android: { elevation: 4 } }) },
  labelSmall: { fontSize: 11, color: '#A0A0A0', fontWeight: '700', letterSpacing: 1, marginBottom: 8 },
  bigTime: { fontSize: 64, fontWeight: '800', textAlign: 'center', letterSpacing: -2 },
  amPm: { fontSize: 24, fontWeight: '600' },
  dateText: { color: '#007AFF', fontWeight: '600', fontSize: 14, marginTop: 10 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowAlign: { flexDirection: 'row', alignItems: 'center' },
  boldVal: { fontSize: 20, fontWeight: 'bold' },
  timeBlue: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  iconCircle: { width: 50, height: 50, borderRadius: 15, backgroundColor: '#F0F7FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  diffTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  diffBody: { fontSize: 13, lineHeight: 20 },
  imageCard: { width: '100%', height: 200, borderRadius: 30, overflow: 'hidden', marginTop: 10 },
  cityImg: { width: '100%', height: '100%' },
  imageOverlay: { position: 'absolute', bottom: 15, left: 15, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 10 },
  overlayText: { color: '#FFF', fontSize: 11, marginLeft: 5, fontWeight: '600' }
});

export default DutyOn;