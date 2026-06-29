import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, TextInput, StatusBar, Dimensions,
  PanResponder, Modal, FlatList, Alert,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: W } = Dimensions.get('window');
const TRACK_W = W - 32; // padding 16 each side

const ALL_SKILLS = [
  'JavaScript','TypeScript','Python','Java','Kotlin','Swift','Go','Rust','C++','C#',
  'PHP','Ruby','Scala','Dart','R','MATLAB',
  'React','React Native','Vue.js','Angular','Next.js','Svelte','Flutter',
  'Node.js','Express.js','Django','FastAPI','Spring Boot','Laravel','Rails',
  'PostgreSQL','MySQL','MongoDB','Redis','Firebase','Supabase','SQLite','DynamoDB',
  'GraphQL','REST API','gRPC','WebSockets',
  'AWS','Google Cloud','Azure','Docker','Kubernetes','Terraform','CI/CD',
  'Git','Linux','Nginx','Jest','Cypress','Figma','Tailwind CSS',
];

function Slider({ min, max, value, onChange, step = 1 }) {
  const pct    = (value - min) / (max - min);
  const fillW  = pct * TRACK_W;
  const thumbX = fillW - 10; // center thumb (thumb width=20)

  const clamp = (x) => {
    const raw = (Math.min(Math.max(x, 0), TRACK_W) / TRACK_W) * (max - min) + min;
    return Math.round(raw / step) * step;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder:  () => true,
      onPanResponderGrant: (e) => onChange(clamp(e.nativeEvent.locationX)),
      onPanResponderMove:  (e) => onChange(clamp(e.nativeEvent.locationX)),
    })
  ).current;

  return (
    <View style={styles.sliderHitArea} {...panResponder.panHandlers}>
      <View style={styles.sliderTrack}>
        <View style={[styles.sliderFill, { width: fillW }]} />
        <View style={[styles.sliderThumb, { left: thumbX }]} />
      </View>
    </View>
  );
}

export default function TechnicalTask() {
  const navigation = useNavigation();

  const [taskName,     setTaskName]     = useState('Backend API Development');
  const [skillModal,   setSkillModal]   = useState(false);
  const [skillSearch,  setSkillSearch]  = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [taskDetails,  setTaskDetails]  = useState('');
  const [skills,       setSkills]       = useState(['Node.js', 'PostgreSQL', 'TypeScript']);
  const [seniority,    setSeniority]    = useState(35);
  const [timelineMode, setTimelineMode] = useState('DAYS');
  const [timeline,     setTimeline]     = useState(15);

  const removeSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: false,
      });
      if (res.assets && res.assets.length > 0) {
        const file = res.assets[0];
        const sizeMB = file.size / (1024 * 1024);
        if (sizeMB > 10) {
          Alert.alert('File Too Large', 'Please upload a file under 10MB.');
          return;
        }
        setUploadedFile(file);
      }
    } catch (e) {
      Alert.alert('Error', 'Could not open file picker');
    }
  };

  const filteredSkills = ALL_SKILLS.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase()) && !skills.includes(s)
  );

  // Calculated amount based on seniority + timeline
  const base   = 500;
  const amount = (base + seniority * 10 + timeline * 5).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={18} color="#1A3A5C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Technical Task</Text>
        <View style={styles.draftBadge}><Text style={styles.draftTxt}>DRAFTS</Text></View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Task Name */}
        <Text style={styles.label}>TASK NAME</Text>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.inputText}
            value={taskName}
            onChangeText={setTaskName}
            placeholderTextColor="#A0B4C8"
          />
        </View>

        {/* Task Details */}
        <Text style={styles.label}>TASK DETAILS</Text>
        <View style={[styles.inputBox, { minHeight: 100 }]}>
          <TextInput
            style={[styles.inputText, { textAlignVertical: 'top', minHeight: 80 }]}
            value={taskDetails}
            onChangeText={setTaskDetails}
            placeholder="Describe the technical requirements and deliverables..."
            placeholderTextColor="#A0B4C8"
            multiline
          />
        </View>

        {/* Upload Documentation */}
        <View style={styles.uploadBox}>
          <View style={styles.uploadIcon}>
            <Ionicons name="document-text-outline" size={22} color="#3A78C9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.uploadTitle} numberOfLines={1}>{uploadedFile ? uploadedFile.name : 'Upload Documentation'}</Text>
            <Text style={styles.uploadSub}>{uploadedFile ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : 'PDF, DOCX UP TO 10MB'}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TouchableOpacity style={styles.browseBtn} onPress={pickDocument}>
              <Text style={styles.browseTxt}>{uploadedFile ? 'Change' : 'Browse'}</Text>
            </TouchableOpacity>
            {uploadedFile && (
              <TouchableOpacity onPress={() => setUploadedFile(null)} style={styles.removeFileBtn}>
                <Ionicons name="close" size={14} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Skills */}
        <Text style={styles.label}>REQUIRED SKILLS & LANGUAGES</Text>
        <View style={styles.skillsRow}>
          {skills.map(s => (
            <View key={s} style={styles.skillChip}>
              <Text style={styles.skillTxt}>{s}</Text>
              <TouchableOpacity onPress={() => removeSkill(s)} style={{ marginLeft: 6 }}>
                <Ionicons name="close" size={12} color="#3A78C9" />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.addSkill} onPress={() => { setSkillSearch(''); setSkillModal(true); }}>
            <Text style={styles.addSkillTxt}>+ Add Skill</Text>
          </TouchableOpacity>
        </View>

        {/* Seniority */}
        <View style={styles.sliderHeader}>
          <Text style={styles.label}>WORKER SENIORITY LEVEL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.lvlPre}>LV. </Text>
            <Text style={styles.lvlNum}>{seniority}</Text>
          </View>
        </View>
        <Slider min={10} max={50} value={seniority} onChange={setSeniority} step={1} />
        <View style={[styles.sliderRow, { justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={() => setSeniority(10)}><Text style={[styles.sliderLbl, seniority === 10 && styles.sliderLblActive]}>L10 (JUNIOR)</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setSeniority(30)}><Text style={[styles.sliderLbl, seniority === 30 && styles.sliderLblActive]}>L30 (MID)</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setSeniority(50)}><Text style={[styles.sliderLbl, seniority === 50 && styles.sliderLblActive]}>L50 (SENIOR)</Text></TouchableOpacity>
        </View>

        {/* Timeline */}
        <View style={styles.sliderHeader}>
          <View>
            <Text style={styles.label}>TASK TIMELINE</Text>
            <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
              {['DAYS', 'HOURS'].map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.toggleBtn, timelineMode === m && styles.toggleBtnActive]}
                  onPress={() => { setTimelineMode(m); setTimeline(m === 'DAYS' ? 15 : 12); }}
                >
                  <Text style={[styles.toggleTxt, timelineMode === m && styles.toggleTxtActive]}>{m}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.lvlNum}>{timeline}</Text>
            <Text style={styles.lvlPre}> {timelineMode === 'DAYS' ? 'DAYS' : 'HRS'}</Text>
          </View>
        </View>
        <Slider
          min={1}
          max={timelineMode === 'DAYS' ? 30 : 24}
          value={timeline}
          onChange={setTimeline}
          step={1}
        />
        <View style={[styles.sliderRow, { justifyContent: 'space-between' }]}>
          <Text style={styles.sliderLbl}>1 {timelineMode === 'DAYS' ? 'DAY' : 'HR'}</Text>
          <Text style={[styles.sliderLbl, styles.sliderLblActive]}>{timeline} {timelineMode}</Text>
          <Text style={styles.sliderLbl}>{timelineMode === 'DAYS' ? '30 DAYS' : '24 HRS'}</Text>
        </View>

        {/* Calculated Amount */}
        <LinearGradient colors={['#1A2E4A', '#0D1E35']} style={styles.amountCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={styles.amountLabel}>CALCULATED AMOUNT</Text>
            <View style={styles.allocBadge}><Text style={styles.allocTxt}>ALLOCATION: 15%</Text></View>
          </View>
          <Text style={styles.amountValue}>{amount}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <Ionicons name="information-circle-outline" size={14} color="rgba(255,255,255,0.4)" />
            <Text style={styles.amountNote}>  Based on project budget and seniority level</Text>
          </View>
        </LinearGradient>

      </ScrollView>

      {/* Skill Picker Modal */}
      <Modal visible={skillModal} transparent animationType="slide" onRequestClose={() => setSkillModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Skill</Text>
              <TouchableOpacity onPress={() => setSkillModal(false)}>
                <Ionicons name="close" size={22} color="#1A3A5C" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalSearch}>
              <Ionicons name="search-outline" size={16} color="#8AACCA" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search skills..."
                placeholderTextColor="#A0B4C8"
                value={skillSearch}
                onChangeText={setSkillSearch}
                autoFocus
              />
            </View>
            <FlatList
              data={filteredSkills}
              keyExtractor={s => s}
              style={{ maxHeight: 340 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => { setSkills(prev => [...prev, item]); setSkillModal(false); }}
                >
                  <Text style={styles.modalItemTxt}>{item}</Text>
                  <Ionicons name="add-circle-outline" size={18} color="#3A78C9" />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.modalSep} />}
              ListEmptyComponent={<Text style={styles.modalEmpty}>No matching skills</Text>}
            />
          </View>
        </View>
      </Modal>

      {/* Footer Button */}
      <View style={styles.footer}>
        <LinearGradient colors={['#00C6FF', '#3A7BD5']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderRadius: 30, overflow: 'hidden' }}>
          <TouchableOpacity style={styles.uploadBtnInner} activeOpacity={0.85}>
            <Text style={styles.uploadBtnTxt}>UPLOAD TO TECH TASKS</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#EEF4FA' },
  header:      { flexDirection: 'row', alignItems: 'center', paddingTop: 52, paddingHorizontal: 16, paddingBottom: 14 },
  backBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  headerTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1A3A5C' },
  draftBadge:  { backgroundColor: '#E0ECFF', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  draftTxt:    { fontSize: 10, fontWeight: '800', color: '#3A78C9', letterSpacing: 1 },

  scrollContent: { paddingHorizontal: 16, paddingBottom: 20 },
  label:         { fontSize: 10, fontWeight: '800', color: '#8AACCA', letterSpacing: 1.5, marginBottom: 8, marginTop: 18 },

  inputBox:    { backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14 },
  inputText:   { fontSize: 15, fontWeight: '600', color: '#1A3A5C' },

  uploadBox:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginTop: 14 },
  uploadIcon:  { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EEF4FA', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  uploadTitle: { fontSize: 14, fontWeight: '700', color: '#1A3A5C' },
  uploadSub:   { fontSize: 10, color: '#8AACCA', marginTop: 2 },
  browseBtn:   { backgroundColor: '#EEF4FA', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  browseTxt:   { fontSize: 12, fontWeight: '700', color: '#3A78C9' },
  removeFileBtn: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FF5252', alignItems: 'center', justifyContent: 'center' },

  skillsRow:   { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip:   { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E0ECFF', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 },
  skillTxt:    { fontSize: 12, fontWeight: '700', color: '#3A78C9' },
  addSkill:    { paddingHorizontal: 12, paddingVertical: 6 },
  addSkillTxt: { fontSize: 12, fontWeight: '700', color: '#8AACCA' },

  sliderHeader:   { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 18, marginBottom: 4 },
  lvlPre:         { fontSize: 11, fontWeight: '700', color: '#8AACCA' },
  lvlNum:         { fontSize: 28, fontWeight: '800', color: '#1A3A5C' },

  // Slider
  sliderHitArea:  { height: 32, justifyContent: 'center', marginBottom: 6 },
  sliderTrack:    { height: 4, backgroundColor: '#D6E8F5', borderRadius: 2, position: 'relative', justifyContent: 'center' },
  sliderFill:     { position: 'absolute', left: 0, height: 4, backgroundColor: '#3A78C9', borderRadius: 2 },
  sliderThumb:    { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#3A78C9', marginLeft: -10, top: -8, borderWidth: 3, borderColor: '#fff', shadowColor: '#3A78C9', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 5 },
  sliderRow:      { flexDirection: 'row', marginBottom: 4 },
  sliderLbl:      { fontSize: 9, fontWeight: '700', color: '#A0B4C8', letterSpacing: 0.5 },
  sliderLblActive:{ color: '#3A78C9' },

  toggleBtn:       { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20, backgroundColor: '#E0ECFF' },
  toggleBtnActive: { backgroundColor: '#3A78C9' },
  toggleTxt:       { fontSize: 10, fontWeight: '800', color: '#3A78C9' },
  toggleTxtActive: { color: '#fff' },

  amountCard:   { borderRadius: 20, padding: 18, marginTop: 22 },
  amountLabel:  { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.5)', letterSpacing: 1.2 },
  allocBadge:   { backgroundColor: '#3A78C9', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
  allocTxt:     { fontSize: 9, fontWeight: '800', color: '#fff', letterSpacing: 0.8 },
  amountValue:  { fontSize: 36, fontWeight: '800', color: '#fff', letterSpacing: -1 },
  amountNote:   { fontSize: 11, color: 'rgba(255,255,255,0.4)' },

  footer:          { paddingHorizontal: 16, paddingBottom: 32, paddingTop: 12 },
  uploadBtnInner:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16 },
  uploadBtnTxt:    { fontSize: 14, fontWeight: '800', color: '#fff', letterSpacing: 1.5 },

  // Modal
  modalOverlay:     { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalBox:         { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
  modalHeader:      { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  modalTitle:       { fontSize: 16, fontWeight: '800', color: '#1A3A5C' },
  modalSearch:      { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF4FA', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
  modalSearchInput: { flex: 1, fontSize: 14, color: '#1A3A5C' },
  modalItem:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12, paddingHorizontal: 4 },
  modalItemTxt:     { fontSize: 14, fontWeight: '600', color: '#1A3A5C' },
  modalSep:         { height: 1, backgroundColor: '#EEF4FA' },
  modalEmpty:       { textAlign: 'center', color: '#8AACCA', padding: 20, fontSize: 13 },
});