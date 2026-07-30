import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Image,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { 
  ArrowLeft, 
  Search, 
  UserX, 
  Snowflake, 
  AlertCircle, 
  Lock 
} from 'lucide-react-native';

// Local avatars from the project's assets folder
const AVATAR_2 = require('../../assets/Avatar-2.jpg'); // Marcus Vance
const AVATAR_1 = require('../../assets/Avatar-1.jpg'); // Elena Rostova

export default function RestrictedAccounts() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f6fa" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Account')}>
          <ArrowLeft size={20} color="#0d4756" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restricted Accounts</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- SEARCH BAR --- */}
        <TouchableOpacity style={styles.searchContainer} onPress={() => navigation.navigate('Search')}>
          <Search size={18} color="#8a99a8" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search accounts..." 
            placeholderTextColor="#8a99a8"
            style={styles.searchInput}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>

        {/* --- FILTER TABS --- */}
        <View style={styles.tabContainer}>
          {/* Active Tab (Banned) */}
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <UserX size={14} color="#0d4756" style={styles.tabIcon} />
            <Text style={styles.activeTabText}>Banned</Text>
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>12</Text>
            </View>
          </TouchableOpacity>

          {/* Inactive Tab (Frozen) */}
          <TouchableOpacity style={[styles.tab, styles.inactiveTab]}>
            <Snowflake size={14} color="#718096" style={styles.tabIcon} />
            <Text style={styles.inactiveTabText}>Frozen</Text>
            <View style={styles.inactiveBadgeContainer}>
              <Text style={styles.inactiveBadgeText}>45</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* --- CARD 1: MARCUS VANCE --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={AVATAR_2} style={styles.avatar} />
              {/* Small red cross indicator */}
              <View style={styles.statusDot}>
                <Text style={styles.statusDotText}>×</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Marcus Vance</Text>
                <View style={styles.bannedTag}>
                  <UserX size={10} color="#e53e3e" style={{ marginRight: 2 }} />
                  <Text style={styles.bannedTagText}>BANNED</Text>
                </View>
              </View>
              <Text style={styles.userId}>ID: WRK-8924</Text>
            </View>
          </View>

          <View style={styles.reasonBox}>
            <View style={styles.reasonHeader}>
              <AlertCircle size={12} color="#4a5568" style={{ marginRight: 4 }} />
              <Text style={styles.reasonHeaderText}>RESTRICTION REASON</Text>
            </View>
            <Text style={styles.reasonBody}>
              Multiple severe policy violations regarding client confidentiality and unauthorized access to secure zones. Escalated by HR.
            </Text>
            <Text style={styles.dateText}>Restricted on: Oct 12, 2023</Text>
          </View>

          <TouchableOpacity style={styles.unbanButton}>
            <Lock size={14} color="#ffffff" style={{ marginRight: 6 }} />
            <Text style={styles.unbanButtonText}>Unban Account</Text>
          </TouchableOpacity>
        </View>

        {/* --- CARD 2: ELENA ROSTOVA --- */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.avatarWrapper}>
              <Image source={AVATAR_1} style={styles.avatar} />
              <View style={styles.statusDot}>
                <Text style={styles.statusDotText}>×</Text>
              </View>
            </View>
            <View style={styles.userInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Elena Rostova</Text>
                <View style={styles.bannedTag}>
                  <UserX size={10} color="#e53e3e" style={{ marginRight: 2 }} />
                  <Text style={styles.bannedTagText}>BANNED</Text>
                </View>
              </View>
              <Text style={styles.userId}>ID: WRK-7102</Text>
            </View>
          </View>

          <View style={styles.reasonBox}>
            <View style={styles.reasonHeader}>
              <AlertCircle size={12} color="#4a5568" style={{ marginRight: 4 }} />
              <Text style={styles.reasonHeaderText}>RESTRICTION REASON</Text>
            </View>
            <Text style={styles.reasonBody}>
              Failed mandatory compliance recertification. Repeated missed deadlines for security training modules.
            </Text>
            <Text style={styles.dateText}>Restricted on: Nov 04, 2023</Text>
          </View>

          <TouchableOpacity style={styles.unbanButton}>
            <Lock size={14} color="#ffffff" style={{ marginRight: 6 }} />
            <Text style={styles.unbanButtonText}>Unban Account</Text>
          </TouchableOpacity>
        </View>

        {/* --- END OF RESULTS CARD --- */}
        <View style={styles.endResultsCard}>
          <View style={styles.endSearchCircle}>
            <Search size={20} color="#4a5568" />
          </View>
          <Text style={styles.endTitle}>End of Results</Text>
          <Text style={styles.endSubtitle}>
            No more banned accounts found matching current filters.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f2f7', // Pale blue tint backdrop
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  /* Header Styles */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#edf6f9',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0e1f24',
    marginLeft: 15,
  },
  /* Search Input Styles */
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 46,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
  },
  /* Tab Filter Styles */
  tabContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  activeTabText: {
    color: '#0d4756',
    fontWeight: '600',
    fontSize: 13,
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  inactiveTabText: {
    color: '#5a6e7f',
    fontWeight: '500',
    fontSize: 13,
  },
  tabIcon: {
    marginRight: 6,
  },
  badgeContainer: {
    backgroundColor: '#ffe3e3',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 6,
  },
  badgeText: {
    color: '#e53e3e',
    fontSize: 10,
    fontWeight: '700',
  },
  inactiveBadgeContainer: {
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    marginLeft: 6,
  },
  inactiveBadgeText: {
    color: '#718096',
    fontSize: 10,
    fontWeight: '700',
  },
  /* Card Styles */
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginTop: 16,
    shadowColor: '#0d4756',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#cbd5e0',
  },
  statusDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#c53030',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  statusDotText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a202c',
  },
  bannedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe5e5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  bannedTagText: {
    color: '#e53e3e',
    fontSize: 8,
    fontWeight: '800',
  },
  userId: {
    fontSize: 11,
    color: '#718096',
    marginTop: 2,
  },
  reasonBox: {
    backgroundColor: '#f7fafc',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  reasonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  reasonHeaderText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#718096',
    letterSpacing: 0.5,
  },
  reasonBody: {
    fontSize: 12,
    color: '#2d3748',
    lineHeight: 16,
  },
  dateText: {
    fontSize: 10,
    color: '#a0aec0',
    marginTop: 12,
  },
  unbanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#004d5a', // Deep Teal custom styling
    borderRadius: 20,
    height: 42,
  },
  unbanButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  /* End of Results Styles */
  endResultsCard: {
    backgroundColor: '#f7fafc',
    borderRadius: 18,
    padding: 24,
    marginTop: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#e2e8f0',
  },
  endSearchCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#edf2f7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  endTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: 6,
  },
  endSubtitle: {
    fontSize: 11,
    color: '#718096',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 16,
  },
});