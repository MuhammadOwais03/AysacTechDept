import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
  bg: '#DCEBFA',
  headerBg: '#FFFFFF',
  card: '#FFFFFF',
  navy: '#0B2545',
  gray: '#6B7787',
  grayLight: '#8A94A6',
  iconBg: '#EFEFF2',
  chipBg: '#EDEEF1',
  red: '#C41E3A',
  redLight: '#FADADD',
  border: '#EDF1F7',
  blue: '#2E6FE0',
  slotBg: '#F3F6FA',
};

const INITIAL_SHOD = {
  name: 'Dr. Evelyn Vance',
  role: 'Global Strategy & Revenue',
  initials: 'EV',
};

const INITIAL_MINOR_DEPTS = [
  {
    id: 'm1',
    name: 'Sales Engineers',
    subtitle: 'Technical Presales & Solutions',
    icon: 'people-circle-outline',
    manager: { name: 'Marcus Chen', initials: 'MC' },
  },
  {
    id: 'm2',
    name: 'Business Analysts',
    subtitle: 'Market Research & Data Modeling',
    icon: 'bar-chart-outline',
    manager: { name: 'Sarah Jenkins', initials: 'SJ' },
  },
  {
    id: 'm3',
    name: 'Govt Tender Specialists',
    subtitle: 'Public Sector Procurement',
    icon: 'briefcase-outline',
    manager: null,
  },
];

export default function SalesAndMarketing() {
  const navigation = useNavigation();
  const [shod, setShod] = useState(INITIAL_SHOD);
  const [minorDepts, setMinorDepts] = useState(INITIAL_MINOR_DEPTS);

  const [assignModal, setAssignModal] = useState(null); // deptId or null
  const [assignName, setAssignName] = useState('');

  const [addDeptModal, setAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [newDeptSubtitle, setNewDeptSubtitle] = useState('');

  // Navigates to the Executive Portfolio screen with everything it needs to render.
  const viewPortfolio = ({ name, role, isSHOD, onRemove }) => {
    navigation.navigate('ExecutivePortfolio', { name, role, isSHOD, onRemove });
  };

  const removeShod = () => {
    Alert.alert('Remove SHOD', `Remove ${shod.name} as Supreme Head of Department?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => setShod(null) },
    ]);
  };

  const removeManager = (deptId, managerName) => {
    Alert.alert('Remove Manager', `Remove ${managerName} as HOD?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () =>
          setMinorDepts((prev) => prev.map((d) => (d.id === deptId ? { ...d, manager: null } : d))),
      },
    ]);
  };

  const removeDept = (deptId, deptName) => {
    Alert.alert('Remove Department', `Remove "${deptName}" from Sales & Marketing?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setMinorDepts((prev) => prev.filter((d) => d.id !== deptId)),
      },
    ]);
  };

  const openAssign = (deptId) => {
    setAssignName('');
    setAssignModal(deptId);
  };

  const confirmAssign = () => {
    if (!assignName.trim()) return;
    const initials = assignName
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    setMinorDepts((prev) =>
      prev.map((d) => (d.id === assignModal ? { ...d, manager: { name: assignName.trim(), initials } } : d))
    );
    setAssignModal(null);
    setAssignName('');
  };

  const addDepartment = () => {
    if (!newDeptName.trim()) return;
    setMinorDepts((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newDeptName.trim(),
        subtitle: newDeptSubtitle.trim() || 'No description yet',
        icon: 'layers-outline',
        manager: null,
      },
    ]);
    setNewDeptName('');
    setNewDeptSubtitle('');
    setAddDeptModal(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Departments'))}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Department Details</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Sales & Marketing</Text>
        <Text style={styles.subtitle}>Major Department Overview</Text>

        <Text style={styles.eyebrow}>SUPREME HEAD OF DEPARTMENT</Text>

        {shod ? (
          <View style={styles.shodCard}>
            <View style={styles.shodTopRow}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarInitials}>{shod.initials}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.nameRow}>
                  <Text style={styles.shodName}>{shod.name}</Text>
                  <View style={styles.shodBadge}>
                    <Text style={styles.shodBadgeText}>SHOD</Text>
                  </View>
                </View>
                <Text style={styles.shodRole}>{shod.role}</Text>
              </View>
            </View>

            <View style={styles.shodActionsRow}>
              <TouchableOpacity
                style={styles.portfolioBtn}
                onPress={() => viewPortfolio({ name: shod.name, role: shod.role, isSHOD: true, onRemove: removeShod })}
              >
                <Ionicons name="person-outline" size={15} color={COLORS.navy} />
                <Text style={styles.portfolioBtnText}>  View Portfolio</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeBtn} onPress={removeShod}>
                <Ionicons name="person-remove-outline" size={15} color={COLORS.red} />
                <Text style={styles.removeBtnText}>  Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.vacantShodCard}>
            <Text style={styles.vacantText}>No Supreme Head of Department assigned.</Text>
            <TouchableOpacity style={styles.assignBtnSmall} onPress={() => setShod(INITIAL_SHOD)}>
              <Text style={styles.assignBtnSmallText}>+ Assign SHOD</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.minorHeadRow}>
          <Text style={styles.eyebrow}>MINOR DEPARTMENTS</Text>
          <View style={styles.totalPill}>
            <Text style={styles.totalPillText}>{minorDepts.length} TOTAL</Text>
          </View>
        </View>

        {minorDepts.map((dept) => (
          <View key={dept.id} style={[styles.minorCard, !dept.manager && styles.minorCardVacant]}>
            <View style={styles.minorHeadInner}>
              <View style={styles.minorIconWrap}>
                <Ionicons name={dept.icon} size={20} color={COLORS.navy} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.minorName}>{dept.name}</Text>
                <Text style={styles.minorSubtitle}>{dept.subtitle}</Text>
              </View>
            </View>

            {dept.manager ? (
              <>
                <View style={styles.managerSlot}>
                  <View style={styles.avatarCircleSmall}>
                    <Text style={styles.avatarInitialsSmall}>{dept.manager.initials}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.nameRow}>
                      <Text style={styles.managerName}>{dept.manager.name}</Text>
                      <View style={styles.hodBadge}>
                        <Text style={styles.hodBadgeText}>HOD</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        viewPortfolio({
                          name: dept.manager.name,
                          role: dept.name,
                          isSHOD: false,
                          onRemove: () => removeManager(dept.id, dept.manager.name),
                        })
                      }
                    >
                      <Text style={styles.linkText}>View Portfolio  <Ionicons name="open-outline" size={11} /></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeManager(dept.id, dept.manager.name)}>
                      <Text style={styles.removeLinkText}>
                        <Ionicons name="person-remove-outline" size={11} color={COLORS.red} />  Remove Manager
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.divider} />
                <TouchableOpacity style={styles.removeDeptRow} onPress={() => removeDept(dept.id, dept.name)}>
                  <Ionicons name="trash-outline" size={14} color={COLORS.red} />
                  <Text style={styles.removeDeptText}>  Remove Dept</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.vacantSlot}>
                <View style={styles.vacantAvatar}>
                  <Ionicons name="person-outline" size={18} color={COLORS.grayLight} />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.managerName}>Position Vacant</Text>
                  <Text style={styles.minorSubtitle}>No HOD Assigned</Text>
                </View>
                <TouchableOpacity style={styles.assignBtn} onPress={() => openAssign(dept.id)}>
                  <Ionicons name="add" size={14} color="#fff" />
                  <Text style={styles.assignBtnText}>  Assign</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={() => setAddDeptModal(true)} activeOpacity={0.8}>
          <Ionicons name="add-circle-outline" size={18} color="#fff" />
          <Text style={styles.addBtnText}>  ADD NEW DEPARTMENT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Assign manager modal */}
      <Modal visible={!!assignModal} transparent animationType="fade" onRequestClose={() => setAssignModal(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Assign Manager</Text>
            <Text style={styles.modalLabel}>Manager Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Aisha Malik"
              placeholderTextColor={COLORS.grayLight}
              value={assignName}
              onChangeText={setAssignName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setAssignModal(null)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={confirmAssign}>
                <Text style={styles.modalSaveText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Add department modal */}
      <Modal visible={addDeptModal} transparent animationType="fade" onRequestClose={() => setAddDeptModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add New Department</Text>
            <Text style={styles.modalLabel}>Department Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Digital Marketing"
              placeholderTextColor={COLORS.grayLight}
              value={newDeptName}
              onChangeText={setNewDeptName}
            />
            <Text style={styles.modalLabel}>Description</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Paid Media & SEO"
              placeholderTextColor={COLORS.grayLight}
              value={newDeptSubtitle}
              onChangeText={setNewDeptSubtitle}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setAddDeptModal(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={addDepartment}>
                <Text style={styles.modalSaveText}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.headerBg,
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1F29' },
  scroll: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 36 },

  title: { fontSize: 27, fontWeight: '800', color: COLORS.navy },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 4, marginBottom: 20 },
  eyebrow: { fontSize: 12, fontWeight: '700', color: COLORS.gray, letterSpacing: 0.6 },

  shodCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    marginBottom: 24,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.navy,
  },
  shodTopRow: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center' },
  avatarInitials: { color: '#fff', fontWeight: '700', fontSize: 15 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  shodName: { fontSize: 16, fontWeight: '700', color: '#1A1F29' },
  shodBadge: { backgroundColor: COLORS.navy, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  shodBadgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  shodRole: { color: COLORS.gray, fontSize: 12.5, marginTop: 2 },

  shodActionsRow: { flexDirection: 'row', marginTop: 14, gap: 10 },
  portfolioBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 12, paddingVertical: 12 },
  portfolioBtnText: { color: '#1A1F29', fontWeight: '600', fontSize: 13 },
  removeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.redLight, borderRadius: 12, paddingVertical: 12 },
  removeBtnText: { color: COLORS.red, fontWeight: '700', fontSize: 13 },

  vacantShodCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 18, marginTop: 12, marginBottom: 24, alignItems: 'center', borderStyle: 'dashed', borderWidth: 1.5, borderColor: COLORS.border },
  vacantText: { color: COLORS.gray, fontSize: 13, marginBottom: 10 },
  assignBtnSmall: { backgroundColor: COLORS.navy, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16 },
  assignBtnSmallText: { color: '#fff', fontWeight: '700', fontSize: 12.5 },

  minorHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  totalPill: { backgroundColor: '#D6E4FB', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  totalPillText: { color: COLORS.navy, fontWeight: '700', fontSize: 11 },

  minorCard: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 16 },
  minorCardVacant: { borderStyle: 'dashed', borderWidth: 1.5, borderColor: '#C6D3E5' },
  minorHeadInner: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  minorIconWrap: { width: 42, height: 42, borderRadius: 12, backgroundColor: COLORS.iconBg, alignItems: 'center', justifyContent: 'center' },
  minorName: { fontSize: 15.5, fontWeight: '700', color: '#1A1F29' },
  minorSubtitle: { fontSize: 12, color: COLORS.gray, marginTop: 2 },

  managerSlot: { flexDirection: 'row', backgroundColor: COLORS.slotBg, borderRadius: 12, padding: 12 },
  avatarCircleSmall: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#B9C6DC', alignItems: 'center', justifyContent: 'center' },
  avatarInitialsSmall: { color: COLORS.navy, fontWeight: '700', fontSize: 12.5 },
  managerName: { fontSize: 14, fontWeight: '700', color: '#1A1F29' },
  hodBadge: { backgroundColor: '#1A1F29', borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2 },
  hodBadgeText: { color: '#fff', fontSize: 9.5, fontWeight: '800' },
  linkText: { color: COLORS.blue, fontSize: 12.5, fontWeight: '600', marginTop: 4 },
  removeLinkText: { color: COLORS.red, fontSize: 12.5, fontWeight: '600', marginTop: 4 },

  divider: { height: 1, backgroundColor: COLORS.border, marginTop: 14, marginBottom: 4 },
  removeDeptRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 12 },
  removeDeptText: { color: COLORS.red, fontWeight: '700', fontSize: 13 },

  vacantSlot: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.slotBg, borderRadius: 12, padding: 12 },
  vacantAvatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 1.5, borderColor: '#C6D3E5', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  assignBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.navy, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8 },
  assignBtnText: { color: '#fff', fontWeight: '700', fontSize: 12 },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2130',
    borderRadius: 30,
    paddingVertical: 18,
    marginTop: 6,
  },
  addBtnText: { color: '#fff', fontWeight: '700', fontSize: 13, letterSpacing: 0.4 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(11,37,69,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 18, padding: 20, width: '100%' },
  modalTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy, marginBottom: 16 },
  modalLabel: { fontSize: 12.5, fontWeight: '700', color: COLORS.gray, marginBottom: 6, marginTop: 10 },
  modalInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 12, color: COLORS.navy, fontSize: 14 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 12 },
  modalCancel: { paddingVertical: 10, paddingHorizontal: 16 },
  modalCancelText: { color: COLORS.gray, fontWeight: '700' },
  modalSave: { backgroundColor: COLORS.navy, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20 },
  modalSaveText: { color: '#fff', fontWeight: '700' },
});