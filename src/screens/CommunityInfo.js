import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CommunityInfo = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.navHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1F26" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Community Info</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.imageWrapper}>
            {/* Replace with your local plasma/office image asset */}
            <View style={styles.mainImagePlaceholder}>
               <Ionicons name="aperture" size={50} color="#00D2FF" />
            </View>
          </View>
          <Text style={styles.communityName}>AYASC Head Office</Text>
          <Text style={styles.description}>
            Connecting software professionals worldwide. Discuss trends, find partners, and grow your business network.
          </Text>
          <View style={styles.memberBadge}>
             <Ionicons name="people" size={16} color="#00D2FF" />
             <Text style={styles.memberText}>12,405 Members</Text>
          </View>
        </View>

        {/* Admins Section */}
        <Text style={styles.sectionTitle}>ADMINS</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <AdminCard initials="AC" name="AdminCorp" color="#6C5CE7" />
          <AdminCard initials="NS" name="NetSec Ltd" color="#0984E3" />
          <AdminCard initials="GL" name="Global" color="#A29BFE" />
        </ScrollView>

        {/* Moderators Section */}
        <Text style={styles.sectionTitle}>MODERATORS</Text>
        <View style={styles.moderatorRow}>
          <ModCircle initials="JS" color="#FF7675" status="#55E6C1" />
          <ModCircle initials="MK" color="#00CEC9" status="#ccc" />
          <ModCircle initials="AL" color="#EF4444" status="#55E6C1" />
          <ModCircle initials="..." color="#636E72" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AdminCard = ({ initials, name, color }) => (
  <View style={styles.adminCard}>
    <View style={[styles.adminCircle, { backgroundColor: color }]}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
    <Text style={styles.adminName}>{name}</Text>
  </View>
);

const ModCircle = ({ initials, color, status }) => (
  <View style={styles.modContainer}>
    <View style={[styles.modCircle, { backgroundColor: color }]}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
    {status && <View style={[styles.statusDot, { backgroundColor: status }]} />}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  navHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15 },
  navTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  scrollContent: { paddingHorizontal: 20 },
  profileCard: { backgroundColor: '#fff', borderRadius: 30, padding: 25, alignItems: 'center', elevation: 2, marginBottom: 30 },
  mainImagePlaceholder: { width: 100, height: 100, borderRadius: 20, backgroundColor: '#1C1F26', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  communityName: { fontSize: 22, fontWeight: 'bold', color: '#1C1F26', marginBottom: 10 },
  description: { textAlign: 'center', color: '#888', fontSize: 13, lineHeight: 20, marginBottom: 15 },
  memberBadge: { flexDirection: 'row', backgroundColor: '#F0F8FF', paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  memberText: { color: '#1C1F26', fontWeight: 'bold', fontSize: 12, marginLeft: 8 },
  sectionTitle: { fontSize: 12, fontWeight: 'bold', color: '#8E8E8E', marginBottom: 15, letterSpacing: 1 },
  horizontalScroll: { marginBottom: 30 },
  adminCard: { backgroundColor: '#fff', borderRadius: 20, padding: 15, alignItems: 'center', marginRight: 15, width: 110 },
  adminCircle: { width: 45, height: 45, borderRadius: 22.5, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  adminName: { fontSize: 12, fontWeight: 'bold', color: '#2C3E50' },
  initialsText: { color: '#fff', fontWeight: 'bold' },
  moderatorRow: { flexDirection: 'row', gap: 15 },
  modContainer: { position: 'relative' },
  modCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  statusDot: { position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: '#fff' }
});

export default CommunityInfo;