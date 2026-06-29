import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  Modal, 
  TextInput 
} from 'react-native';
import { 
  ArrowLeft, 
  MoreVertical, 
  Bell, 
  Contact2, 
  PenTool, 
  FileText, 
  Briefcase, 
  FileSpreadsheet,
  Star
} from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function VisitProfile() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { user } = route.params || {
    user: {
      name: 'Sarah Jenkins',
      username: '@sjenkins',
      image: 'https://i.pravatar.cc/150?u=1',
    },
  };

  // State controls
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState('Media'); // 'Media' or 'Starred'
  
  // Custom interactive titles/nicknames
  const [clientType, setClientType] = useState('Mentor'); 
  const [nickname, setNickname] = useState('None set');

  // Modal Visibility States
  const [clientTypeModalVisible, setClientTypeModalVisible] = useState(false);
  const [nicknameModalVisible, setNicknameModalVisible] = useState(false);

  // Temporary picker selection states
  const [selectedType, setSelectedType] = useState('Corporate Client');
  const [tempNickname, setTempNickname] = useState('');

  // Handle saving configurations
  const handleSaveClientType = () => {
    setClientType(selectedType);
    setClientTypeModalVisible(false);
  };

  const handleSaveNickname = () => {
    if (tempNickname.trim()) {
      setNickname(tempNickname);
    }
    setNicknameModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreBtn}>
          <MoreVertical size={24} color="#1F2937" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* AVATAR & BASIC DETAILS */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={typeof user.image === 'number' ? user.image : { uri: user.image }} 
              style={styles.avatar} 
            />
            <View style={styles.onlineBadge} />
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileUsername}>{user.username || '@sjenkins'}</Text>
        </View>

        {/* NOTIFICATIONS ROW */}
        <View style={styles.settingCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#EEF2FF' }]}>
            <Bell size={20} color="#3B82F6" />
          </View>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{ false: '#E2E8F0', true: '#38BDF8' }}
            thumbColor="#FFFFFF"
          />
        </View>

        {/* GIVE TITLE CARD */}
        <View style={styles.settingCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#F5F3FF' }]}>
            <Contact2 size={20} color="#8B5CF6" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Give Title</Text>
            <Text style={styles.settingValue}>{clientType}</Text>
          </View>
          <TouchableOpacity onPress={() => setClientTypeModalVisible(true)}>
            <Text style={styles.actionLinkText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* GIVE NICKNAME CARD */}
        <View style={styles.settingCard}>
          <View style={[styles.iconContainer, { backgroundColor: '#FFF1F2' }]}>
            <PenTool size={20} color="#F43F5E" />
          </View>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingLabel}>Give Nickname</Text>
            <Text style={styles.settingValue}>{nickname}</Text>
          </View>
          <TouchableOpacity onPress={() => { setTempNickname(nickname === 'None set' ? '' : nickname); setNicknameModalVisible(true); }}>
            <Text style={styles.actionLinkText}>Set</Text>
          </TouchableOpacity>
        </View>

        {/* TAB NAVIGATION ROUTER */}
        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'Media' && styles.activeTabItem]} 
            onPress={() => setActiveTab('Media')}
          >
            <Text style={[styles.tabText, activeTab === 'Media' && styles.activeTabText]}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabItem, activeTab === 'Starred' && styles.activeTabItem]} 
            onPress={() => setActiveTab('Starred')}
          >
            <Text style={[styles.tabText, activeTab === 'Starred' && styles.activeTabText]}>Starred</Text>
          </TouchableOpacity>
        </View>

        {/* TAB RENDERING SEGMENT */}
        {activeTab === 'Media' ? (
          <View style={styles.mediaContainer}>
            <Text style={styles.timeHeading}>THIS WEEK</Text>
            <View style={styles.mediaGrid}>
              <View style={[styles.mediaSquare, { backgroundColor: '#E6F4EA' }]}>
                {/* Fallback to local asset, displaying placeholder styled icon container as safety */}
                <Image source={require('../../assets/Post1.jpg')} style={styles.gridImage} onError={() => {}} />
              </View>
              <View style={[styles.mediaSquare, { backgroundColor: '#FEF3C7' }]}>
                <Image source={require('../../assets/Post2.jpg')} style={styles.gridImage} onError={() => {}} />
              </View>
              <View style={[styles.mediaSquare, { backgroundColor: '#EFF6FF' }]}>
                <FileText size={32} color="#2563EB" />
                <Text style={styles.docLabel}>DOCX</Text>
              </View>
            </View>

            <Text style={styles.timeHeading}>LAST MONTH</Text>
            <View style={styles.mediaGrid}>
              <View style={[styles.mediaSquare, { backgroundColor: '#FEF2F2' }]}>
                <FileText size={32} color="#DC2626" />
                <Text style={[styles.docLabel, { color: '#DC2626' }]}>PDF</Text>
              </View>
              <View style={styles.mediaSquare}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=150' }} style={styles.gridImage} />
              </View>
              <View style={styles.mediaSquare}>
                <Image source={{ uri: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=150' }} style={styles.gridImage} />
              </View>
              <View style={[styles.mediaSquare, { backgroundColor: '#F0FDF4' }]}>
                <FileSpreadsheet size={32} color="#16A34A" />
                <Text style={[styles.docLabel, { color: '#16A34A' }]}>XLSX</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.starredContainer}>
            <View style={styles.starCard}>
              <View style={styles.starCardHeader}>
                <Text style={styles.starAuthorText}>SARAH JENKINS</Text>
                <Text style={styles.starTimeText}>Yesterday, 2:30 PM</Text>
                <Star size={16} color="#EAB308" fill="#EAB308" style={styles.starIconPosition} />
              </View>
              <Text style={styles.starBodyMessage}>
                Absolutely! Let's schedule the mentorship session for next Tuesday. I've prepared some notes on the career transition strategy we discussed.
              </Text>
            </View>

            <View style={styles.starCard}>
              <View style={styles.starCardHeader}>
                <Text style={styles.starAuthorText}>YOU</Text>
                <Text style={styles.starTimeText}>Oct 24, 10:15 AM</Text>
                <Star size={16} color="#EAB308" fill="#EAB308" style={styles.starIconPosition} />
              </View>
              <Text style={styles.starBodyMessage}>
                Here is the updated project timeline PDF. Could you review the milestones for Phase 2?
              </Text>
            </View>

            <View style={styles.starCard}>
              <View style={styles.starCardHeader}>
                <Text style={styles.starAuthorText}>SARAH JENKINS</Text>
                <Text style={styles.starTimeText}>Oct 18, 4:45 PM</Text>
                <Star size={16} color="#EAB308" fill="#EAB308" style={styles.starIconPosition} />
              </View>
              <Text style={styles.starBodyMessage}>
                Great work on the networking event! I think connecting with those three key contacts will be very beneficial for your long-term goals. Keep it up!
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* MODAL 1: ASSIGN CLIENT TYPE (IMAGE 3) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={clientTypeModalVisible}
        onRequestClose={() => setClientTypeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.bottomCardModal}>
            <View style={styles.modalHeaderRow}>
              <View>
                <Text style={styles.modalTitle}>Assign Client Type</Text>
                <Text style={styles.modalSubtitle}>Categorize {user.name}'s account</Text>
              </View>
              <View style={styles.modalTitleIconBadge}>
                <Briefcase size={20} color="#8B5CF6" />
              </View>
            </View>

            {/* Selection Options List */}
            {[
              'Corporate Client',
              'Government Entity',
              'Individual Account',
              'Non-Profit Organization',
              'Small Business (SMB)',
            ].map((type) => (
              <TouchableOpacity 
                key={type} 
                style={[styles.radioRow, selectedType === type && styles.radioRowSelected]}
                onPress={() => setSelectedType(type)}
              >
                <View style={[styles.radioButtonOuter, selectedType === type && styles.radioOuterSelected]}>
                  {selectedType === type && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={[styles.radioLabel, selectedType === type && styles.radioLabelSelected]}>{type}</Text>
              </TouchableOpacity>
            ))}

            {/* Bottom Action Sheet Controls */}
            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setClientTypeModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSaveClientType}>
                <Text style={styles.submitBtnText}>Set Client Type</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: SET NICKNAME (IMAGE 4) */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={nicknameModalVisible}
        onRequestClose={() => setNicknameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredCardModal}>
            <View style={styles.pencilIconWrapper}>
              <PenTool size={20} color="#38BDF8" />
            </View>
            
            <Text style={styles.centerModalTitle}>Set Nickname</Text>
            <Text style={styles.centerModalSubtitle}>Nicknames are only visible to you.</Text>

            <TextInput
              style={styles.modalTextInput}
              placeholder="Enter nickname"
              placeholderTextColor="#94A3B8"
              value={tempNickname}
              onChangeText={setTempNickname}
              autoFocus
            />

            <View style={styles.modalActionRow}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setNicknameModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleSaveNickname}>
                <Text style={styles.submitBtnText}>Save Nickname</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EBF7FF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 12 },
  backBtn: { padding: 8 },
  moreBtn: { padding: 8 },
  scrollContent: { paddingBottom: 40 },
  
  // Profile Meta Styles
  avatarSection: { alignItems: 'center', marginVertical: 10 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 110, height: 110, borderRadius: 55, borderWidth: 3, borderColor: '#FFFFFF' },
  onlineBadge: { position: 'absolute', bottom: 4, right: 6, width: 16, height: 16, borderRadius: 8, backgroundColor: '#22C55E', borderWidth: 2, borderColor: '#FFFFFF' },
  profileName: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginTop: 12 },
  profileUsername: { fontSize: 14, color: '#64748B', marginTop: 4 },

  // Control Setting Cards
  settingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16, marginHorizontal: 20, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 10, elevation: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  settingTextContainer: { flex: 1 },
  settingLabel: { fontSize: 16, fontWeight: '600', color: '#1E293B', flex: 1 },
  settingValue: { fontSize: 13, color: '#94A3B8', marginTop: 2 },
  actionLinkText: { fontSize: 13, fontWeight: '700', color: '#0EA5E9', paddingHorizontal: 4 },

  // Segmented Control Tabs Layout
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', marginTop: 32, marginHorizontal: 20 },
  tabItem: { flex: 1, alignItems: 'center', paddingBottom: 12 },
  activeTabItem: { borderBottomWidth: 2, borderBottomColor: '#0EA5E9' },
  tabText: { fontSize: 15, fontWeight: '600', color: '#94A3B8' },
  activeTabText: { color: '#0EA5E9' },

  // Media Gallery Rendering
  mediaContainer: { paddingHorizontal: 20, paddingTop: 20 },
  timeHeading: { fontSize: 11, fontWeight: '700', color: '#64748B', letterSpacing: 1, marginBottom: 12 },
  mediaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  mediaSquare: { width: '30.5%', aspectRatio: 1, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  gridImage: { width: '100%', height: '100%' },
  docLabel: { fontSize: 10, fontWeight: '800', color: '#2563EB', marginTop: 4 },

  // Starred Tab Item Blocks
  starredContainer: { paddingHorizontal: 20, paddingTop: 20 },
  starCard: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: '#F1F5F9' },
  starCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, position: 'relative', width: '100%' },
  starAuthorText: { fontSize: 11, fontWeight: '800', color: '#0EA5E9', marginRight: 8 },
  starTimeText: { fontSize: 11, color: '#94A3B8' },
  starIconPosition: { marginLeft: 'auto' },
  starBodyMessage: { fontSize: 14, color: '#334155', lineHeight: 22, fontWeight: '400' },

  // SYSTEM MODALS BASIC & INNER OVERLAY STYLES
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.4)', justifyContent: 'center', alignItems: 'center' },
  
  // Assign Client Type (Bottom Style Layer Asset)
  bottomCardModal: { width: '90%', backgroundColor: 'rgba(255,255,255,0.96)', borderRadius: 32, padding: 24, shadowColor: '#000', shadowRadius: 30, elevation: 10 },
  modalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  modalSubtitle: { fontSize: 13, color: '#64748B', marginTop: 4 },
  modalTitleIconBadge: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  
  radioRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 16, marginBottom: 8 },
  radioRowSelected: { backgroundColor: '#EFF6FF', borderWidth: 1, borderColor: '#DBEAFE' },
  radioButtonOuter: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  radioOuterSelected: { borderColor: '#0EA5E9' },
  radioInnerCircle: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#0EA5E9' },
  radioLabel: { fontSize: 15, fontWeight: '500', color: '#334155' },
  radioLabelSelected: { fontWeight: '700', color: '#0F172A' },

  // Save Config Call-To-Actions (Shared standard layout)
  modalActionRow: { flexDirection: 'row', gap: 12, marginTop: 24 },
  cancelBtn: { flex: 1, height: 50, borderRadius: 16, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  cancelBtnText: { color: '#64748B', fontWeight: '700', fontSize: 14 },
  submitBtn: { flex: 1.3, height: 50, borderRadius: 16, backgroundColor: '#0EA5E9', alignItems: 'center', justifyContent: 'center' },
  submitBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },

  // Set Nickname (Centered Card Layout)
  centeredCardModal: { width: '86%', backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, alignItems: 'center' },
  pencilIconWrapper: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F0F9FF', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  centerModalTitle: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  centerModalSubtitle: { fontSize: 13, color: '#64748B', marginTop: 6, marginBottom: 20 },
  modalTextInput: { width: '100%', height: 50, backgroundColor: '#F8FAFC', borderRadius: 14, paddingHorizontal: 16, fontSize: 15, color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0' }
});