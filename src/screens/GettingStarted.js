import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function GettingStarted({ navigation }) {
  // Helper for checklist items
  const ChecklistItem = ({ icon, color, title, desc, actionText, isCompleted }) => (
    <View style={styles.card}>
      <View style={[styles.iconCircle, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={24} color={color} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          {isCompleted && <Ionicons name="checkmark-circle" size={18} color="#4CAF50" />}
        </View>
        <Text style={styles.cardDesc} numberOfLines={2}>{desc}</Text>
        <TouchableOpacity style={styles.actionBtn}>
          <Text style={[styles.actionText, { color: color }]}>{actionText} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#E3F2FD', '#F8FBFF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="arrow-back" size={24} color="#142036" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Getting Started</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#8AACCA" />
            <TextInput placeholder="Search guides..." placeholderTextColor="#8AACCA" style={styles.searchInput} />
          </View>

          {/* Welcome Card */}
          <View style={styles.welcomeCard}>
            <View style={styles.rocketIconBox}>
              <FontAwesome5 name="rocket" size={30} color="#4A90D9" />
            </View>
            <Text style={styles.welcomeTitle}>Welcome Aboard!</Text>
            <Text style={styles.welcomeSubtitle}>
              Follow this step-by-step guide to set up your account and start closing deals.
            </Text>
            
            <View style={styles.progressContainer}>
               <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '25%' }]} />
               </View>
               <Text style={styles.progressText}>1 of 4 completed</Text>
            </View>
          </View>

          <Text style={styles.sectionLabel}>YOUR CHECKLIST</Text>

          {/* Checklist Items */}
          <ChecklistItem 
            icon="shield-check-outline" 
            color="#4CAF50" 
            title="Account Registration" 
            desc="Verify your identity and upload necessary business documents to..." 
            actionText="Review Details"
            isCompleted={true}
          />

          <ChecklistItem 
            icon="email-outline" 
            color="#E91E63" 
            title="Connect Email Client" 
            desc="Sync your professional email to track communications and automate follow-up." 
            actionText="Start Setup"
          />

          <ChecklistItem 
            icon="account-group-outline" 
            color="#9C27B0" 
            title="Join Local Community" 
            desc="Find and join your regional sales group to network and share leads." 
            actionText="Learn More"
          />

          <ChecklistItem 
            icon="briefcase-outline" 
            color="#FF9800" 
            title="Set Up Sales Portfolio" 
            desc="Customize your digital sales kit with your best case studies and sheets." 
            actionText="Learn More"
          />

          {/* Footer Help */}
          <View style={styles.footerHelp}>
             <Text style={styles.footerTitle}>Stuck somewhere?</Text>
             <Text style={styles.footerSubtitle}>Our onboarding specialists are ready to help you get set up.</Text>
             <View style={styles.footerBtns}>
                <TouchableOpacity style={styles.chatBtn}>
                   <MaterialCommunityIcons name="message-text" size={20} color="#FFF" />
                   <Text style={styles.chatBtnText}>Chat Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.emailBtn}>
                   <MaterialCommunityIcons name="email" size={20} color="#142036" />
                   <Text style={styles.emailBtnText}>Email Us</Text>
                </TouchableOpacity>
             </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#142036' },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 30 },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    height: 50, 
    alignItems: 'center', 
    marginTop: 20,
    elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#142036' },
  welcomeCard: { backgroundColor: '#FFF', borderRadius: 25, padding: 25, marginTop: 25, alignItems: 'center', elevation: 3 },
  rocketIconBox: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  welcomeTitle: { fontSize: 22, fontWeight: '800', color: '#142036' },
  welcomeSubtitle: { fontSize: 14, color: '#5A7A99', textAlign: 'center', marginTop: 10, lineHeight: 20 },
  progressContainer: { width: '100%', marginTop: 20 },
  progressBarBg: { height: 8, backgroundColor: '#F0F5FA', borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: '#00D2FF', borderRadius: 4 },
  progressText: { fontSize: 12, color: '#8AACCA', textAlign: 'right', marginTop: 8 },
  sectionLabel: { fontSize: 13, fontWeight: '800', color: '#8AACCA', marginTop: 30, marginBottom: 15, letterSpacing: 0.5 },
  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 15, flexDirection: 'row', marginBottom: 15, elevation: 2 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' },
  cardContent: { flex: 1, marginLeft: 15 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#142036' },
  cardDesc: { fontSize: 13, color: '#5A7A99', marginTop: 4, lineHeight: 18 },
  actionBtn: { marginTop: 10 },
  actionText: { fontSize: 13, fontWeight: '700' },
  footerHelp: { marginTop: 20, backgroundColor: '#FFF', borderRadius: 25, padding: 20, elevation: 2 },
  footerTitle: { fontSize: 18, fontWeight: '800', color: '#142036' },
  footerSubtitle: { fontSize: 13, color: '#5A7A99', marginTop: 5 },
  footerBtns: { flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' },
  chatBtn: { flex: 0.48, backgroundColor: '#00D2FF', height: 45, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  chatBtnText: { color: '#FFF', fontWeight: '700', marginLeft: 8 },
  emailBtn: { flex: 0.48, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E3F2FD', height: 45, borderRadius: 12, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  emailBtnText: { color: '#142036', fontWeight: '700', marginLeft: 8 },
});