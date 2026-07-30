import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  Modal,
  Image
} from 'react-native';
import { 
  ArrowLeft, 
  Search, 
  X, 
  IdCard, 
  Trophy,
  Check,
  AlertTriangle,
  Trash2,
  Snowflake,
  Award,
  Wallet
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

// Asset references based on your project directories
const AVATAR_GUY = require('../../assets/Avatar-2.jpg');
const AVATAR_GIRL = require('../../assets/Avatar-1.jpg');

const WORKERS_DATA = [
  {
    id: '1',
    initials: 'AR',
    name: 'Ahmed Raza',
    role: 'Basic Worker',
    workId: 'WK-00412',
    rank: 'Rank 27',
    department: 'Sales & Marketing',
    avatarBg: '#00667a',
    badgeBg: '#d2e9ff',
    badgeText: '#1877f2',
    gender: 'guy',
  },
  {
    id: '2',
    initials: 'SM',
    name: 'Sara Malik',
    role: 'Senior Worker',
    workId: 'WK-00198',
    rank: 'Rank 35',
    department: 'Tech Dept',
    avatarBg: '#00667a',
    badgeBg: '#e0f7fc',
    badgeText: '#00a3c4',
    gender: 'girl',
  },
  {
    id: '3',
    initials: 'UK',
    name: 'Usman Khan',
    role: 'Principal Worker',
    workId: 'WK-00871',
    rank: 'Rank 44',
    department: 'PM Dept',
    avatarBg: '#47607a',
    badgeBg: '#f1e6ff',
    badgeText: '#9047ff',
    gender: 'guy',
  },
  {
    id: '4',
    initials: 'FN',
    name: 'Fatima Noor',
    role: 'Basic Worker',
    workId: 'WK-00334',
    rank: 'Rank 22',
    department: 'Sales & Marketing',
    avatarBg: '#00667a',
    badgeBg: '#d2e9ff',
    badgeText: '#1877f2',
    gender: 'girl',
  },
];

export default function SearchResults() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleCardPress = (worker) => {
    setSelectedWorker(worker);
    setModalVisible(true);
  };

  const getAvatarSource = (gender) => {
    return gender === 'guy' ? AVATAR_GUY : AVATAR_GIRL;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={22} color="#0d4756" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
      </View>

      {/* --- SEARCH INPUT --- */}
      <View style={styles.searchSection}>
        <View style={styles.searchBarContainer}>
          <Search size={18} color="#7a8b9e" style={styles.searchIcon} />
          <TextInput 
            value=""
            style={styles.searchInput}
            placeholder="Ahmed"
            placeholderTextColor="#2d3748"
          />
          <TouchableOpacity style={styles.clearButton}>
            <X size={16} color="#4a5568" />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- RESULTS LIST --- */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {WORKERS_DATA.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => handleCardPress(item)}
          >
            {/* Avatar Circle */}
            <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>

            {/* Content Area */}
            <View style={styles.cardContent}>
              <View style={styles.rowTop}>
                <Text style={styles.nameText}>{item.name}</Text>
                
                {/* Dynamically styled badge based on role */}
                <View style={[styles.badge, { backgroundColor: item.badgeBg }]}>
                  <Text style={[styles.badgeText, { color: item.badgeText }]}>{item.role}</Text>
                </View>
              </View>

              {/* ID Row */}
              <View style={styles.infoRow}>
                <IdCard size={14} color="#7a8b9e" style={styles.rowIcon} />
                <Text style={styles.infoText}>{item.workId}</Text>
              </View>

              {/* Rank & Dept Row */}
              <View style={styles.infoRow}>
                <Trophy size={14} color="#7a8b9e" style={styles.rowIcon} />
                <Text style={styles.infoText}>
                  {item.rank}  •  <Text style={styles.deptText}>{item.department}</Text>
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* --- DETAIL BOTTOM SHEET MODAL --- */}
      {selectedWorker && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {/* Semi-transparent Backdrop overlay */}
          <View style={styles.modalBackdrop}>
            
            {/* Dismiss Modal on clicking the top overlay region */}
            <TouchableOpacity 
              style={styles.topDismissSpacer} 
              activeOpacity={1} 
              onPress={() => setModalVisible(false)} 
            />

            {/* Bottom Sheet Body */}
            <View style={styles.sheetContainer}>
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.modalScrollContent}>
                
                {/* Drag Handle Indicator */}
                <View style={styles.dragHandle} />

                {/* --- AVATAR & HEADER --- */}
                <View style={styles.avatarSection}>
                  <View style={styles.avatarWrapper}>
                    <Image 
                      source={getAvatarSource(selectedWorker.gender)} 
                      style={styles.modalAvatar} 
                    />
                    <View style={styles.activeDot} />
                  </View>
                  
                  <Text style={styles.modalUserName}>{selectedWorker.name}</Text>
                  <Text style={styles.modalUserSubtitle}>
                    {selectedWorker.role.replace(' Worker', ' Engineer')}  •  {selectedWorker.rank}
                  </Text>
                  
                  <View style={styles.activeBadge}>
                    <Check size={12} color="#0f766e" style={{ marginRight: 4 }} />
                    <Text style={styles.activeBadgeText}>Active</Text>
                  </View>
                </View>

                {/* --- INFO CARD GRID --- */}
                <View style={styles.infoCard}>
                  {/* Row 1: ID & DEPT */}
                  <View style={styles.gridRow}>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>ID</Text>
                      <Text style={styles.infoValue}>{selectedWorker.workId}</Text>
                    </View>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>DEPT</Text>
                      <Text style={styles.infoValue}>{selectedWorker.department}</Text>
                    </View>
                  </View>

                  {/* Row 2: JOINED & LAST ACTIVE */}
                  <View style={styles.gridRow}>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>JOINED</Text>
                      <Text style={styles.infoValue}>March 2025</Text>
                    </View>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>LAST ACTIVE</Text>
                      <Text style={styles.infoValue}>2h ago</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Row 3: PROJECTS & EARNINGS */}
                  <View style={styles.gridRow}>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>PROJECTS</Text>
                      <Text style={styles.infoValue}>14 <Text style={styles.subValue}>(Live: 3)</Text></Text>
                    </View>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>EARNINGS</Text>
                      <Text style={[styles.infoValue, styles.earningsValue]}>USD 48,200</Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  {/* Row 4: RESTRICTIONS & REPORTS */}
                  <View style={styles.gridRow}>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>RESTRICTIONS</Text>
                      <Text style={styles.infoValue}>None</Text>
                    </View>
                    <View style={styles.gridCol}>
                      <Text style={styles.infoLabel}>REPORTS</Text>
                      <View style={styles.reportsWrapper}>
                        <AlertTriangle size={14} color="#b91c1c" style={{ marginRight: 4 }} />
                        <Text style={styles.reportsValue}>1 Flag</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* --- ACTION BUTTONS --- */}
                <View style={styles.actionsGrid}>
                  
                  {/* Delete Account */}
                  <TouchableOpacity style={[styles.actionButton, styles.btnDelete]}>
                    <Trash2 size={20} color="#991b1b" style={styles.actionIcon} />
                    <Text style={[styles.actionText, styles.textDelete]}>Delete Account</Text>
                  </TouchableOpacity>

                  {/* Freeze Account */}
                  <TouchableOpacity style={[styles.actionButton, styles.btnFreeze]}>
                    <Snowflake size={20} color="#1d4ed8" style={styles.actionIcon} />
                    <Text style={[styles.actionText, styles.textFreeze]}>Freeze Account</Text>
                  </TouchableOpacity>

                  {/* Change Rank */}
                  <TouchableOpacity style={[styles.actionButton, styles.btnRank]}>
                    <Award size={20} color="#6b21a8" style={styles.actionIcon} />
                    <Text style={[styles.actionText, styles.textRank]}>Change Rank</Text>
                  </TouchableOpacity>

                  {/* Correct Balance */}
                  <TouchableOpacity style={[styles.actionButton, styles.btnBalance]}>
                    <Wallet size={20} color="#065f46" style={styles.actionIcon} />
                    <Text style={[styles.actionText, styles.textBalance]}>Correct Balance</Text>
                  </TouchableOpacity>

                </View>

                {/* --- CANCEL BUTTON --- */}
                <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f6fb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#1d4d54',
  },
  searchSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6edf4',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#2d3748',
  },
  clearButton: {
    padding: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#0c2f35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardContent: {
    flex: 1,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2d3748',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rowIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 12,
    color: '#718096',
    fontWeight: '500',
  },
  deptText: {
    color: '#4a5568',
  },

  /* --- MODAL BACKDROP & SHEET STYLING --- */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)', // Blur/dim background simulation
    justifyContent: 'flex-end',
  },
  topDismissSpacer: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    maxHeight: '85%',
  },
  modalScrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    alignItems: 'center',
  },
  dragHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#e2e8f0',
    marginTop: 10,
    marginBottom: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrapper: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  modalAvatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  activeDot: {
    position: 'absolute',
    bottom: 3,
    right: 3,
    backgroundColor: '#3ae7ff',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: '#ffffff',
  },
  modalUserName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 10,
  },
  modalUserSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
    marginTop: 3,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6fcf5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#c3fae8',
  },
  activeBadgeText: {
    color: '#0f766e',
    fontSize: 11,
    fontWeight: '700',
  },
  
  /* Modal Card Information */
  infoCard: {
    width: '100%',
    backgroundColor: '#f1f6fa',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 20,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  gridCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#8a99a8',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1f2937',
  },
  subValue: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4b5563',
  },
  earningsValue: {
    color: '#085f63',
  },
  reportsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportsValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#b91c1c',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },

  /* Actions Grid */
  actionsGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    width: '48%',
    borderRadius: 22,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    marginBottom: 3,
  },
  actionText: {
    fontSize: 11,
    fontWeight: '700',
  },
  btnDelete: {
    backgroundColor: '#fff1f2',
  },
  textDelete: {
    color: '#991b1b',
  },
  btnFreeze: {
    backgroundColor: '#eff6ff',
  },
  textFreeze: {
    color: '#1d4ed8',
  },
  btnRank: {
    backgroundColor: '#faf5ff',
  },
  textRank: {
    color: '#6b21a8',
  },
  btnBalance: {
    backgroundColor: '#ecfdf5',
  },
  textBalance: {
    color: '#065f46',
  },
  cancelButton: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '700',
  },
});