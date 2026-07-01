import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: W } = Dimensions.get('window');

const INITIAL_ROLES = [
  {
    id: '1',
    icon: '🎨',
    iconBg: '#FF8C42',
    title: 'UI/UX Design',
    subtitle: 'Visual Identity & Prototype',
    percent: 25,
    budget: '$1,500',
    headcount: 2,
    workers: [
      { id: 'w1', name: 'Sahil', role: 'SENIOR DESIGNER', avatar: null, status: 'view_update', statusLabel: 'View Update' },
      { id: 'w2', name: 'Worker 1', role: '4 APPLICANTS WAITING', avatar: null, status: 'view', statusLabel: 'View' },
    ],
    applicants: [
      { id: 'a1', name: 'Felix Chen', badge: 'Top Match' },
      { id: 'a2', name: 'Sarah Miller', badge: null },
    ],
  },
  {
    id: '2',
    icon: '🗄️',
    iconBg: '#3A78C9',
    title: 'Backend Systems',
    subtitle: 'Node.js API & Database',
    percent: 40,
    budget: '$2,400',
    headcount: 2,
    workers: [
      { id: 'w3', name: 'Ali', role: 'LEAD ENGINEER', avatar: null, status: 'completed', statusLabel: 'Review' },
      { id: 'w4', name: 'Worker 2', role: '', avatar: null, status: 'upload', statusLabel: 'Upload Task' },
    ],
    applicants: [],
  },
];

function WorkerRow({ worker }) {
  const isCompleted = worker.status === 'completed';
  const isUpload    = worker.status === 'upload';
  const isUpdate    = worker.status === 'view_update';

  return (
    <View style={styles.workerRow}>
      <View style={styles.workerAvatar}>
        <Ionicons name="person" size={18} color="#8AACCA" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.workerName}>{worker.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {isCompleted && <View style={styles.completedDot} />}
          <Text style={[styles.workerRole, isCompleted && { color: '#4CAF50' }]}>{worker.role}</Text>
        </View>
      </View>
      {isUpload ? (
        <LinearGradient colors={['#00C6FF', '#3A7BD5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.uploadTaskBtn}>
          <Ionicons name="cloud-upload-outline" size={13} color="#fff" />
          <Text style={styles.uploadTaskTxt}> Upload Task</Text>
        </LinearGradient>
      ) : (
        <TouchableOpacity style={[styles.workerActionBtn, isCompleted && styles.reviewBtn]}>
          <Text style={[styles.workerActionTxt, isCompleted && { color: '#FF8C42' }]}>
            {worker.statusLabel}
          </Text>
          {worker.status === 'view' && <Ionicons name="chevron-down" size={12} color="#3A78C9" style={{ marginLeft: 2 }} />}
        </TouchableOpacity>
      )}
    </View>
  );
}

function ApplicantRow({ applicant }) {
  return (
    <View style={styles.applicantRow}>
      <View style={styles.applicantAvatar}>
        <Ionicons name="person" size={16} color="#8AACCA" />
      </View>
      <Text style={styles.applicantName}>{applicant.name}</Text>
      {applicant.badge && (
        <View style={styles.topMatchBadge}>
          <Text style={styles.topMatchTxt}>{applicant.badge}</Text>
        </View>
      )}
      <View style={{ flex: 1 }} />
      <TouchableOpacity style={styles.applicantAccept}>
        <Ionicons name="checkmark" size={16} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.applicantDecline}>
        <Ionicons name="close" size={16} color="#8AACCA" />
      </TouchableOpacity>
    </View>
  );
}

function RoleCard({ role, onHeadcountChange }) {
  return (
    <View style={styles.roleCard}>
      {/* Role Header */}
      <View style={styles.roleHeader}>
        <View style={[styles.roleIcon, { backgroundColor: role.iconBg + '22' }]}>
          <Text style={{ fontSize: 20 }}>{role.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.roleTitle}>{role.title}</Text>
          <Text style={styles.roleSub}>{role.subtitle}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={styles.rolePct}>{role.percent}%</Text>
          <Text style={styles.roleBudget}>{role.budget}</Text>
        </View>
      </View>

      {/* Headcount */}
      <View style={styles.headcountRow}>
        <Ionicons name="people-outline" size={14} color="#8AACCA" />
        <Text style={styles.headcountLbl}>  HEADCOUNT</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          style={styles.hcBtn}
          onPress={() => onHeadcountChange(role.id, -1)}
        >
          <Text style={styles.hcBtnTxt}>−</Text>
        </TouchableOpacity>
        <Text style={styles.hcNum}>{role.headcount}</Text>
        <TouchableOpacity
          style={styles.hcBtn}
          onPress={() => onHeadcountChange(role.id, 1)}
        >
          <Text style={styles.hcBtnTxt}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      {/* Workers */}
      {role.workers.map(w => <WorkerRow key={w.id} worker={w} />)}

      {/* Applicants waiting */}
      {role.applicants.length > 0 && (
        <>
          <View style={styles.applicantsHeader}>
            <Text style={styles.applicantsLbl}>{role.applicants.length} APPLICANTS WAITING</Text>
          </View>
          {role.applicants.map(a => <ApplicantRow key={a.id} applicant={a} />)}
        </>
      )}
    </View>
  );
}

export default function HospitalWebsite() {
  const navigation = useNavigation();
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [startDate] = useState('Jan 15, 2026');

  const handleHeadcount = (roleId, delta) => {
    setRoles(prev => prev.map(r =>
      r.id === roleId
        ? { ...r, headcount: Math.max(1, r.headcount + delta) } // min 1
        : r
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#1A3A5C" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSub}>PROJECT DETAILS</Text>
          <Text style={styles.headerTitle}>Hospital Website</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={20} color="#1A3A5C" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* Top Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLbl}>TOTAL VALUE</Text>
              <Text style={styles.infoVal}>$10,000</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLbl}>PM COMMISSION</Text>
              <Text style={styles.infoVal}>$600 <Text style={styles.infoNote}>ON COMPLETION</Text></Text>
            </View>
          </View>
          <View style={styles.divider} />
          <Text style={styles.infoLbl}>PROJECT DOCUMENTS</Text>
          <View style={styles.docsRow}>
            <TouchableOpacity style={styles.docChip}>
              <Ionicons name="document-text" size={14} color="#FF5252" />
              <Text style={styles.docTxt}>Requirements.doc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.docChip}>
              <Ionicons name="document-text" size={14} color="#3A78C9" />
              <Text style={styles.docTxt}>Contract.pdf</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Technical Budget */}
        <LinearGradient colors={['#1A78C9', '#0D5FAA']} style={styles.budgetCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.budgetLbl}>TECHNICAL BUDGET</Text>
            <Text style={styles.budgetVal}>$6,000.00</Text>
          </View>
          <View style={styles.budgetIcon}>
            <Ionicons name="chatbox-outline" size={20} color="#3A78C9" />
          </View>
        </LinearGradient>

        {/* Project Timeline */}
        <View style={styles.card}>
          <Text style={styles.sectionLbl}>PROJECT TIMELINE</Text>
          <View style={styles.timelineRow}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <Ionicons name="calendar-outline" size={12} color="#3A78C9" />
                <Text style={styles.dateLbl}>START DATE</Text>
              </View>
              <Text style={styles.dateVal}>{startDate}</Text>
            </View>
            <Ionicons name="arrow-forward" size={16} color="#8AACCA" style={{ marginHorizontal: 8, marginTop: 16 }} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 }}>
                <Ionicons name="flag-outline" size={12} color="#FF5252" />
                <Text style={styles.dateLbl}>END DATE</Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.dateVal, { color: '#8AACCA' }]}>Input Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Worker Allocation Header */}
        <View style={styles.allocationHeader}>
          <Text style={styles.sectionLbl}>WORKER ALLOCATION</Text>
          <TouchableOpacity
            style={styles.addRoleBtn}
            onPress={() => navigation.navigate('AddRole')}
          >
            <Ionicons name="add-circle-outline" size={14} color="#3A78C9" />
            <Text style={styles.addRoleTxt}> Add Role</Text>
          </TouchableOpacity>
        </View>

        {/* Role Cards */}
        {roles.map(role => (
          <RoleCard
            key={role.id}
            role={role}
            onHeadcountChange={handleHeadcount}
          />
        ))}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#F0F5FB' },

  header:      { flexDirection: 'row', alignItems: 'center', paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14, backgroundColor: '#F0F5FB' },
  backBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  headerSub:   { fontSize: 9, fontWeight: '800', color: '#8AACCA', letterSpacing: 1.5 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#1A3A5C' },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 40 },

  // Info card
  infoCard:    { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 },
  infoRow:     { flexDirection: 'row', marginBottom: 14 },
  infoLbl:     { fontSize: 9, fontWeight: '800', color: '#8AACCA', letterSpacing: 1.2, marginBottom: 4 },
  infoVal:     { fontSize: 20, fontWeight: '800', color: '#3A78C9' },
  infoNote:    { fontSize: 10, fontWeight: '700', color: '#8AACCA' },
  docsRow:     { flexDirection: 'row', gap: 10, marginTop: 8 },
  docChip:     { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F0F5FB', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  docTxt:      { fontSize: 12, fontWeight: '600', color: '#1A3A5C' },

  // Budget
  budgetCard:  { borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  budgetLbl:   { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 1.2, marginBottom: 4 },
  budgetVal:   { fontSize: 28, fontWeight: '800', color: '#fff' },
  budgetIcon:  { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },

  // Card
  card:        { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 },
  sectionLbl:  { fontSize: 10, fontWeight: '800', color: '#8AACCA', letterSpacing: 1.5, marginBottom: 12 },
  divider:     { height: 1, backgroundColor: '#EEF4FA', marginVertical: 12 },

  // Timeline
  timelineRow: { flexDirection: 'row', alignItems: 'flex-start' },
  dateLbl:     { fontSize: 9, fontWeight: '800', color: '#8AACCA', letterSpacing: 1 },
  dateVal:     { fontSize: 15, fontWeight: '700', color: '#1A3A5C' },

  // Allocation header
  allocationHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  addRoleBtn:       { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0ECFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  addRoleTxt:       { fontSize: 12, fontWeight: '700', color: '#3A78C9' },

  // Role card
  roleCard:    { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12 },
  roleHeader:  { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  roleIcon:    { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  roleTitle:   { fontSize: 15, fontWeight: '700', color: '#1A3A5C' },
  roleSub:     { fontSize: 10, color: '#8AACCA', fontWeight: '600', marginTop: 2 },
  rolePct:     { fontSize: 13, fontWeight: '800', color: '#3A78C9' },
  roleBudget:  { fontSize: 16, fontWeight: '800', color: '#1A3A5C' },

  // Headcount
  headcountRow: { flexDirection: 'row', alignItems: 'center' },
  headcountLbl: { fontSize: 10, fontWeight: '800', color: '#8AACCA', letterSpacing: 1 },
  hcBtn:        { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F0F5FB', alignItems: 'center', justifyContent: 'center' },
  hcBtnTxt:     { fontSize: 18, color: '#3A78C9', lineHeight: 22 },
  hcNum:        { fontSize: 16, fontWeight: '800', color: '#1A3A5C', marginHorizontal: 12 },

  // Worker row
  workerRow:       { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  workerAvatar:    { width: 38, height: 38, borderRadius: 19, backgroundColor: '#EEF4FA', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  workerName:      { fontSize: 14, fontWeight: '700', color: '#1A3A5C' },
  workerRole:      { fontSize: 9, fontWeight: '800', color: '#8AACCA', letterSpacing: 0.8 },
  completedDot:    { width: 6, height: 6, borderRadius: 3, backgroundColor: '#4CAF50' },
  workerActionBtn: { borderWidth: 1, borderColor: '#E0ECFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center' },
  reviewBtn:       { borderColor: '#FFE0CC' },
  workerActionTxt: { fontSize: 11, fontWeight: '700', color: '#3A78C9' },
  uploadTaskBtn:   { flexDirection: 'row', alignItems: 'center', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 7 },
  uploadTaskTxt:   { fontSize: 11, fontWeight: '700', color: '#fff' },

  // Applicants
  applicantsHeader: { marginTop: 4, marginBottom: 8 },
  applicantsLbl:    { fontSize: 9, fontWeight: '800', color: '#FF8C42', letterSpacing: 1 },
  applicantRow:     { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, gap: 8 },
  applicantAvatar:  { width: 34, height: 34, borderRadius: 17, backgroundColor: '#EEF4FA', alignItems: 'center', justifyContent: 'center' },
  applicantName:    { fontSize: 13, fontWeight: '700', color: '#1A3A5C' },
  topMatchBadge:    { backgroundColor: '#E0F7E9', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  topMatchTxt:      { fontSize: 9, fontWeight: '800', color: '#4CAF50' },
  applicantAccept:  { width: 32, height: 32, borderRadius: 16, backgroundColor: '#3A78C9', alignItems: 'center', justifyContent: 'center' },
  applicantDecline: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F5FB', alignItems: 'center', justifyContent: 'center' },
});