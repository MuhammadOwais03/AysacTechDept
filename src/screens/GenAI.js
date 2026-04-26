import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProjectDetail({ navigation }) {
  // Helper for Team Member rows
  const TeamMember = ({ name, role, tags }) => (
    <View style={styles.memberCard}>
      <View style={styles.avatarCircle}>
        <FontAwesome5 name="user-alt" size={18} color="#94A3B8" />
      </View>
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{name}</Text>
        <Text style={styles.memberRole}>{role}</Text>
      </View>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <View key={index} style={[styles.tag, { backgroundColor: tag.bg }]}>
            <Text style={[styles.tagText, { color: tag.color }]}>{tag.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#D6EFFF', '#F0F9FF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="arrow-back" size={24} color="#5A6B87" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NexGen Realty</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Main Project Card */}
          <View style={styles.mainCard}>
            <View style={styles.mainCardHeader}>
              <View style={styles.projectIconBox}>
                <MaterialCommunityIcons name="office-building" size={28} color="#6366F1" />
              </View>
              <View>
                <Text style={styles.mainTitle}>NexGen Realty</Text>
                <View style={styles.activeBadge}>
                  <Text style={styles.activeText}>ACTIVE PROJECT</Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Started</Text>
                <Text style={styles.statValue}>Jan 2023</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>Status</Text>
                <Text style={styles.statValue}>Ongoing</Text>
              </View>
            </View>
          </View>

          {/* The Team Section */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="account-group" size={20} color="#0EA5E9" />
            <Text style={styles.sectionTitle}>The Team</Text>
          </View>

          <TeamMember 
            name="Alex Morgan" 
            role="Sales Agent" 
            tags={[{ label: 'Lead Gen', bg: '#EEF2FF', color: '#6366F1' }, { label: 'CRM', bg: '#FDF2F8', color: '#DB2777' }]} 
          />
          <TeamMember 
            name="Sarah Jenkins" 
            role="Project Developer" 
            tags={[{ label: 'Strategy', bg: '#FFF7ED', color: '#EA580C' }]} 
          />
          <TeamMember 
            name="David Chen" 
            role="Tech Lead" 
            tags={[{ label: 'Full-stack', bg: '#F0FDF4', color: '#16A34A' }, { label: 'UI/UX', bg: '#ECFEFF', color: '#0891B2' }]} 
          />

          {/* Project Summary Section */}
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color="#0EA5E9" />
            <Text style={styles.sectionTitle}>Project Summary</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryHeading}>WHAT HAPPENED</Text>
            <Text style={styles.summaryBody}>
              The primary goal for NexGen Realty was to overhaul their client acquisition pipeline for the luxury apartment sector in downtown NYC.
            </Text>
            <Text style={styles.summaryBody}>
              We implemented a targeted lead generation strategy leveraging LinkedIn Sales Navigator and local networking events. The tech team developed a custom CRM dashboard to track high-value prospects.
            </Text>

            {/* Key Outcomes Box */}
            <View style={styles.outcomesBox}>
              <Text style={styles.outcomesTitle}>KEY OUTCOMES</Text>
              <Text style={styles.outcomeItem}>• 35% increase in qualified leads within Q1</Text>
              <Text style={styles.outcomeItem}>• Streamlined onboarding process reducing time by 20%</Text>
              <Text style={styles.outcomeItem}>• Secured 3 major enterprise contracts</Text>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 19, fontWeight: '800', color: '#1E293B' },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  mainCard: { backgroundColor: '#FFF', borderRadius: 30, padding: 25, marginBottom: 25, elevation: 3, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 15 },
  mainCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  projectIconBox: { width: 54, height: 54, borderRadius: 15, backgroundColor: '#F8FAFC', justifyContent: 'center', alignItems: 'center', marginRight: 15, borderWidth: 1, borderColor: '#F1F5F9' },
  mainTitle: { fontSize: 22, fontWeight: '800', color: '#1E293B' },
  activeBadge: { backgroundColor: '#F0FDF4', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 5, alignSelf: 'flex-start' },
  activeText: { color: '#16A34A', fontSize: 10, fontWeight: '800' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { flex: 0.47, backgroundColor: '#F1F9FF', padding: 15, borderRadius: 20 },
  statLabel: { fontSize: 12, color: '#94A3B8', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: '700', color: '#334155' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 15 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#1E293B', marginLeft: 10 },
  memberCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 22, marginBottom: 12 },
  avatarCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  memberInfo: { flex: 1 },
  memberName: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  memberRole: { fontSize: 12, color: '#94A3B8' },
  tagContainer: { flexDirection: 'row' },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginLeft: 6 },
  tagText: { fontSize: 10, fontWeight: '700' },
  summaryCard: { backgroundColor: '#FFF', borderRadius: 28, padding: 25, elevation: 2 },
  summaryHeading: { fontSize: 12, fontWeight: '800', color: '#475569', marginBottom: 15, letterSpacing: 0.5 },
  summaryBody: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 15 },
  outcomesBox: { backgroundColor: '#F0F9FF', borderRadius: 20, padding: 20, marginTop: 10 },
  outcomesTitle: { color: '#0EA5E9', fontSize: 11, fontWeight: '800', marginBottom: 12 },
  outcomeItem: { fontSize: 13, color: '#334155', lineHeight: 20, marginBottom: 8 },
});