import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
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
  border: '#EDF1F7',
};

const INITIAL_DEPARTMENTS = [
  { id: '1', name: 'Sales & Marketing', workers: 84, icon: 'trending-up-outline', accent: '#0B2545' },
  { id: '2', name: 'Project Management', workers: 32, icon: 'clipboard-outline', accent: '#5B7290' },
  { id: '3', name: 'Technical & Engineering', workers: 156, icon: 'people-outline', accent: '#000000' },
];

export default function Departments() {
  const navigation = useNavigation();
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [newWorkers, setNewWorkers] = useState('');
  const [unassignedCount] = useState(12);

  const filteredDepartments = useMemo(() => {
    if (!search.trim()) return departments;
    return departments.filter((d) => d.name.toLowerCase().includes(search.trim().toLowerCase()));
  }, [departments, search]);

  const openDepartment = (dept) => {
    if (dept.name === 'Sales & Marketing') {
      navigation.navigate('SalesAndMarketing', { departmentId: dept.id });
      return;
    }
    navigation.navigate('DepartmentDetail', { departmentId: dept.id, name: dept.name });
  };

  const openUnassignedManagers = () => {
    navigation.navigate('UnassignedManagers');
  };

  const addDepartment = () => {
    if (!newName.trim()) return;
    const workersNum = parseInt(newWorkers, 10) || 0;
    setDepartments((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: newName.trim(),
        workers: workersNum,
        icon: 'briefcase-outline',
        accent: '#334155',
      },
    ]);
    setNewName('');
    setNewWorkers('');
    setModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconCircle}>
            <Ionicons name="business" size={28} color="#fff" />
          </View>
          <Text style={styles.title}>Departments</Text>
          <Text style={styles.subtitle}>Manage organisational structure</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <Text style={styles.eyebrow}>DEPARTMENTS</Text>

          {filteredDepartments.length === 0 ? (
            <Text style={styles.emptyText}>No departments match "{search}".</Text>
          ) : (
            filteredDepartments.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                style={[styles.deptCard, { borderLeftColor: dept.accent }]}
                onPress={() => openDepartment(dept)}
                activeOpacity={0.7}
              >
                <View style={styles.deptIconCircle}>
                  <Ionicons name={dept.icon} size={20} color={COLORS.navy} />
                </View>
                <View style={{ flex: 1, marginLeft: 14 }}>
                  <Text style={styles.deptName}>{dept.name}</Text>
                  <View style={styles.workersChip}>
                    <Text style={styles.workersChipText}>{dept.workers} workers</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.grayLight} />
              </TouchableOpacity>
            ))
          )}

          <Text style={[styles.eyebrow, { marginTop: 20 }]}>QUICK ACTIONS</Text>

          <View style={styles.searchCard}>
            <Ionicons name="search" size={18} color={COLORS.grayLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Any Manager"
              placeholderTextColor={COLORS.grayLight}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={18} color={COLORS.grayLight} />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity style={styles.unassignedCard} onPress={openUnassignedManagers} activeOpacity={0.7}>
            <Ionicons name="person-remove-outline" size={20} color={COLORS.red} />
            <Text style={styles.unassignedText}>Unassigned Managers</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{unassignedCount}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)} activeOpacity={0.8}>
            <Ionicons name="add-circle-outline" size={18} color="#fff" />
            <Text style={styles.addBtnText}>  ADD NEW MAJOR DEPARTMENT</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Add Department Modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add New Department</Text>

            <Text style={styles.modalLabel}>Department Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Customer Success"
              placeholderTextColor={COLORS.grayLight}
              value={newName}
              onChangeText={setNewName}
            />

            <Text style={styles.modalLabel}>Number of Workers</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. 20"
              placeholderTextColor={COLORS.grayLight}
              keyboardType="number-pad"
              value={newWorkers}
              onChangeText={setNewWorkers}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
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
    backgroundColor: COLORS.headerBg,
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 34,
    paddingHorizontal: 24,
  },
  headerIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: { fontSize: 30, fontWeight: '800', color: COLORS.navy },
  subtitle: { fontSize: 14, color: COLORS.gray, marginTop: 6 },

  body: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 36 },
  eyebrow: { fontSize: 12, fontWeight: '700', color: COLORS.gray, letterSpacing: 0.6, marginBottom: 12 },
  emptyText: { color: COLORS.grayLight, fontSize: 13, marginBottom: 10 },

  deptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderLeftWidth: 5,
  },
  deptIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.iconBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deptName: { fontSize: 17, fontWeight: '700', color: '#1A1F29' },
  workersChip: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.chipBg,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 8,
  },
  workersChipText: { fontSize: 12.5, fontWeight: '700', color: '#3A4250' },

  searchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 14,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 14.5, color: COLORS.navy },

  unassignedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  unassignedText: { flex: 1, marginLeft: 12, fontSize: 14.5, fontWeight: '600', color: '#1A1F29' },
  countBadge: { backgroundColor: COLORS.red, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, minWidth: 28, alignItems: 'center' },
  countBadgeText: { color: '#fff', fontWeight: '800', fontSize: 12.5 },

  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A2130',
    borderRadius: 30,
    paddingVertical: 18,
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