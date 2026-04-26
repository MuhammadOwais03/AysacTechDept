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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileAccount({ navigation }) {
  // Helper for Common Topics list items
  const TopicItem = ({ title }) => (
    <TouchableOpacity style={styles.topicItem}>
      <Text style={styles.topicText}>{title}</Text>
      <Feather name="chevron-right" size={20} color="#C4D1D9" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Background Gradient matches the soft sky blue tint */}
      <LinearGradient colors={['#D6EFFF', '#F0F9FF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header - Linked to Settings */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="arrow-back" size={24} color="#5A6B87" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile & Account</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput 
              placeholder="Search profile help..." 
              placeholderTextColor="#A3B8C8" 
              style={styles.searchInput} 
            />
            <Feather name="search" size={20} color="#A3B8C8" />
          </View>

          {/* Manage Your Profile Card */}
          <View style={styles.manageCard}>
            <View style={styles.profileIconBox}>
              <MaterialCommunityIcons name="account-cog-outline" size={26} color="#9C27B0" />
            </View>
            <View>
              <Text style={styles.manageTitle}>Manage Your Profile</Text>
              <Text style={styles.manageSub}>Update personal details & security</Text>
            </View>
          </View>

          {/* Common Topics Section */}
          <View style={styles.topicsCard}>
            <Text style={styles.sectionLabel}>COMMON TOPICS</Text>
            
            <TopicItem title="Changing Your Username" />
            <TopicItem title="Updating Business Details" />
            <TopicItem title="Security & Password Settings" />
            <TopicItem title="Privacy Preferences" />
          </View>

          {/* Help Footer */}
          <View style={styles.helpFooter}>
            <Text style={styles.helpTitle}>Still need help?</Text>
            <Text style={styles.helpSub}>
              Our support team is available 24/7 to assist you with any issues related to your account.
            </Text>
            <View style={styles.footerBtns}>
              <TouchableOpacity style={styles.chatBtn}>
                <Feather name="monitor" size={18} color="#FFF" />
                <Text style={styles.chatBtnText}>Live Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emailBtn}>
                <Feather name="mail" size={18} color="#5A6B87" />
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
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 19, fontWeight: '700', color: '#1E293B' },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    borderRadius: 18, 
    paddingHorizontal: 18, 
    height: 54, 
    alignItems: 'center', 
    marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 2
  },
  searchInput: { flex: 1, fontSize: 16, color: '#334155' },
  manageCard: { 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 242, 253, 0.7)', 
    borderRadius: 24, 
    padding: 20, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D0E9F5'
  },
  profileIconBox: { 
    width: 48, height: 48, borderRadius: 24, 
    backgroundColor: '#F3E5F5', justifyContent: 'center', 
    alignItems: 'center', marginRight: 15 
  },
  manageTitle: { fontSize: 17, fontWeight: '700', color: '#1E293B' },
  manageSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  topicsCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 28, 
    padding: 22, 
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 15, elevation: 3,
    marginBottom: 20
  },
  sectionLabel: { 
    fontSize: 11, 
    fontWeight: '800', 
    color: '#94A3B8', 
    letterSpacing: 1, 
    marginBottom: 15 
  },
  topicItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingVertical: 18,
    borderBottomWidth: 0, // In the image these are clean rows
  },
  topicText: { fontSize: 15, fontWeight: '600', color: '#475569' },
  helpFooter: { 
    backgroundColor: 'rgba(227, 242, 253, 0.5)', 
    borderRadius: 28, 
    padding: 25,
    borderWidth: 1, borderColor: '#D9EEFA'
  },
  helpTitle: { fontSize: 19, fontWeight: '800', color: '#1E293B' },
  helpSub: { fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 20 },
  footerBtns: { flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' },
  chatBtn: { 
    flex: 0.48, backgroundColor: '#0EA5E9', height: 50, 
    borderRadius: 14, flexDirection: 'row', 
    justifyContent: 'center', alignItems: 'center' 
  },
  chatBtnText: { color: '#FFF', fontWeight: '700', marginLeft: 8 },
  emailBtn: { 
    flex: 0.48, backgroundColor: '#FFF', height: 50, borderRadius: 14, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  emailBtnText: { color: '#1E293B', fontWeight: '700', marginLeft: 8 },
});