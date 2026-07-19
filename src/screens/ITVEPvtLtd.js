import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#EAF1FB',
  card: '#FFFFFF',
  navy: '#0B2545',
  green: '#1E8E5A',
  greenLight: '#DDF3E7',
  greenBar: '#8FE3B4',
  greenBarDark: '#1E8E5A',
  gray: '#8A94A6',
  grayBar: '#C7D0DE',
  navyBar: '#16324F',
  border: '#EDF1F7',
};

const COMPANY = {
  name: 'ITVE (Pvt) Ltd',
  reportMonth: 'June 2026 Report',
  status: 'Operational',
  locked: true,
};

const REVENUE = {
  total: 29800,
  items: [
    { label: 'Course Fees', value: 18400 },
    { label: 'Govt Grants', value: 7200 },
    { label: 'Corporate Training', value: 4200 },
  ],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  trend: [14, 15, 17, 19, 22, 29.8],
};

const EXPENSES = {
  total: 11400,
  items: [
    { label: 'Staff Fees', value: 5800 },
    { label: 'Platform', value: 1600 },
    { label: 'Marketing', value: 2200 },
    { label: 'Overhead', value: 1800 },
  ],
  months: ['May', 'Jun'],
  trend: [9.8, 11.4],
};

const NET_PROFIT = { value: 18400, margin: 61.7 };

const HEADCOUNT = {
  total: 24,
  items: [
    { label: 'Instructors', value: 14 },
    { label: 'Support', value: 7 },
    { label: 'Admin', value: 3 },
  ],
};

const INITIAL_NOTES = [
  {
    author: 'Added by CFO',
    date: 'Jul 02, 2026 - 09:15 AM',
    text: 'Strong performance in Course Fees this month. We should look into increasing marketing spend for Q3 to capitalize on this trend. Platform expenses remained stable.',
  },
  {
    author: 'Added by President',
    date: 'Jul 03, 2026 - 11:30 AM',
    text: 'Agreed on the marketing push. Let\u2019s schedule a review of the Govt Grants pipeline next week to ensure we hit our annual targets.',
  },
];

function money(n) {
  return `$${n.toLocaleString('en-US')}`;
}

function formatNow() {
  const d = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let h = d.getHours();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()} - ${h}:${min} ${ampm}`;
}

const CARD_W = width - 56;
const BAR_CHART_H = 90;

function BarChart({ labels, values, barColorFn }) {
  const max = Math.max(...values);
  const barW = (CARD_W / values.length) * 0.5;
  const gap = (CARD_W - barW * values.length) / (values.length + 1);

  return (
    <View>
      <Svg width={CARD_W} height={BAR_CHART_H}>
        {values.map((v, i) => {
          const h = (v / max) * (BAR_CHART_H - 4);
          const x = gap + i * (barW + gap);
          const y = BAR_CHART_H - h;
          return <Rect key={i} x={x} y={y} width={barW} height={h} rx={4} fill={barColorFn(i, values.length)} />;
        })}
      </Svg>
      <View style={[styles.monthsRow, { width: CARD_W }]}>
        {labels.map((m) => (
          <Text key={m} style={styles.monthText}>{m}</Text>
        ))}
      </View>
    </View>
  );
}

function buildReportHTML() {
  const revRows = REVENUE.items.map((i) => `<tr><td style="padding:6px 0;">${i.label}</td><td style="padding:6px 0;text-align:right;">${money(i.value)}</td></tr>`).join('');
  const expRows = EXPENSES.items.map((i) => `<tr><td style="padding:6px 0;">${i.label}</td><td style="padding:6px 0;text-align:right;">${money(i.value)}</td></tr>`).join('');
  const hcRows = HEADCOUNT.items.map((i) => `<tr><td style="padding:6px 0;">${i.label}</td><td style="padding:6px 0;text-align:right;">${i.value}</td></tr>`).join('');
  const notesHtml = INITIAL_NOTES.map((n) => `<p><b>${n.author}</b> \u2014 ${n.date}<br/>${n.text}</p>`).join('');

  return `
  <html><head><meta charset="utf-8" /></head>
  <body style="font-family:-apple-system,Helvetica,Arial,sans-serif;color:#0B2545;padding:24px;">
    <h1 style="margin-bottom:0;">${COMPANY.name}</h1>
    <p style="color:#8A94A6;margin-top:4px;">${COMPANY.reportMonth} \u2014 ${COMPANY.status}</p>

    <h2>Revenue \u2014 ${money(REVENUE.total)}</h2>
    <table style="width:100%;border-collapse:collapse;">${revRows}</table>

    <h2>Expenses \u2014 ${money(EXPENSES.total)}</h2>
    <table style="width:100%;border-collapse:collapse;">${expRows}</table>

    <h2>Net Profit \u2014 ${money(NET_PROFIT.value)} (Margin ${NET_PROFIT.margin}%)</h2>

    <h2>Headcount \u2014 ${HEADCOUNT.total} staff</h2>
    <table style="width:100%;border-collapse:collapse;">${hcRows}</table>

    <h2>Notes & Remarks</h2>
    ${notesHtml}
  </body></html>`;
}

export default function ITVEPvtLtd() {
  const navigation = useNavigation();
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [modalVisible, setModalVisible] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [exporting, setExporting] = useState(false);

  const addNote = () => {
    if (!noteText.trim()) return;
    setNotes((prev) => [{ author: 'Added by You', date: formatNow(), text: noteText.trim() }, ...prev]);
    setNoteText('');
    setModalVisible(false);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const html = buildReportHTML();
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Export Report', UTI: 'com.adobe.pdf' });
      } else {
        Alert.alert('Exported', `PDF saved at: ${uri}`);
      }
    } catch (err) {
      Alert.alert('Export failed', err.message || 'Could not generate PDF.');
    } finally {
      setExporting(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('HomeScreen'))}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{COMPANY.name}</Text>
        <TouchableOpacity onPress={handleExport} disabled={exporting}>
          <Ionicons name="share-outline" size={20} color={COLORS.navy} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Title block */}
        <Text style={styles.companyName}>{COMPANY.name}</Text>
        <View style={styles.subRow}>
          <Text style={styles.subLabel}>{COMPANY.reportMonth}</Text>
          <View style={styles.statusPill}>
            <Ionicons name="checkmark-circle" size={12} color={COLORS.green} />
            <Text style={styles.statusText}>  {COMPANY.status}</Text>
          </View>
        </View>

        {/* Locked notice */}
        {COMPANY.locked && (
          <View style={styles.lockCard}>
            <Ionicons name="lock-closed" size={16} color={COLORS.navy} style={{ marginRight: 10, marginTop: 2 }} />
            <Text style={styles.lockText}>
              This report is locked. No further modifications can be made to the financial data for this period.
            </Text>
          </View>
        )}

        {/* Revenue */}
        <View style={styles.card}>
          <View style={styles.cardHeadRow}>
            <Ionicons name="trending-up" size={16} color={COLORS.green} />
            <Text style={styles.cardHeadText}>  Revenue</Text>
          </View>
          <Text style={styles.bigValue}>{money(REVENUE.total)}</Text>

          {REVENUE.items.map((it, i) => (
            <View key={it.label} style={[styles.lineRow, i !== 0 && styles.lineRowBorder]}>
              <Text style={styles.lineLabel}>{it.label}</Text>
              <Text style={styles.lineValue}>{money(it.value)}</Text>
            </View>
          ))}

          <View style={{ marginTop: 14 }}>
            <BarChart
              labels={REVENUE.months}
              values={REVENUE.trend}
              barColorFn={(i, n) => (i === n - 1 ? COLORS.greenBarDark : COLORS.greenBar)}
            />
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.card}>
          <View style={styles.cardHeadRow}>
            <Ionicons name="trending-down" size={16} color={COLORS.navy} />
            <Text style={styles.cardHeadText}>  Expenses</Text>
          </View>
          <Text style={styles.bigValue}>{money(EXPENSES.total)}</Text>

          {EXPENSES.items.map((it, i) => (
            <View key={it.label} style={[styles.lineRow, i !== 0 && styles.lineRowBorder]}>
              <Text style={styles.lineLabel}>{it.label}</Text>
              <Text style={styles.lineValue}>{money(it.value)}</Text>
            </View>
          ))}

          <View style={{ marginTop: 14, alignItems: 'center' }}>
            <BarChart
              labels={EXPENSES.months}
              values={EXPENSES.trend}
              barColorFn={(i, n) => (i === n - 1 ? COLORS.navyBar : COLORS.grayBar)}
            />
          </View>
        </View>

        {/* Net Profit */}
        <View style={[styles.card, { alignItems: 'center' }]}>
          <Text style={styles.netHeadText}>Net Profit</Text>
          <Text style={styles.bigValue}>{money(NET_PROFIT.value)}</Text>
          <View style={styles.marginPill}>
            <Text style={styles.marginPillText}>Margin {NET_PROFIT.margin}%</Text>
          </View>

          <View style={styles.miniBarsRow}>
            <View style={styles.miniBarCol}>
              <View style={[styles.miniBar, { height: 70, backgroundColor: COLORS.green }]} />
              <Text style={styles.monthText}>Rev</Text>
            </View>
            <View style={styles.miniBarCol}>
              <View style={[styles.miniBar, { height: 34, backgroundColor: COLORS.navyBar }]} />
              <Text style={styles.monthText}>Exp</Text>
            </View>
          </View>
        </View>

        {/* Headcount */}
        <View style={styles.card}>
          <View style={styles.cardHeadRow}>
            <Ionicons name="people-outline" size={16} color={COLORS.navy} />
            <Text style={styles.cardHeadText}>  Headcount</Text>
          </View>
          <View style={styles.headcountRow}>
            <Text style={styles.headcountNum}>{HEADCOUNT.total}</Text>
            <Text style={styles.headcountLabel}>  staff</Text>
          </View>

          {HEADCOUNT.items.map((it, i) => (
            <View key={it.label} style={[styles.hcLineRow, i !== 0 && styles.lineRowBorder]}>
              <Text style={styles.lineLabel}>{it.label}</Text>
              <Text style={styles.hcValue}>{it.value}</Text>
            </View>
          ))}
        </View>

        {/* Notes & Remarks */}
        <View style={styles.card}>
          <View style={styles.notesHeadRow}>
            <View style={styles.cardHeadRow}>
              <Ionicons name="reader-outline" size={16} color={COLORS.navy} />
              <Text style={styles.cardHeadText}>  Notes &{'\n'}Remarks</Text>
            </View>
            <TouchableOpacity style={styles.addNoteBtn} onPress={() => setModalVisible(true)}>
              <Ionicons name="add" size={14} color={COLORS.navy} />
              <Text style={styles.addNoteText}>  Add Note</Text>
            </TouchableOpacity>
          </View>

          {notes.map((n, i) => (
            <View key={i} style={styles.noteBox}>
              <Text style={styles.noteMeta}>
                <Text style={styles.noteAuthor}>{n.author}</Text>  {n.date}
              </Text>
              <Text style={styles.noteText}>{n.text}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.viewAllBtn}>
          <Text style={styles.viewAllText}>View All Exported Reports</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.exportBtn} onPress={handleExport} disabled={exporting}>
          <Ionicons name="document-outline" size={16} color={COLORS.navy} style={{ marginRight: 8 }} />
          <Text style={styles.exportText}>{exporting ? 'Preparing PDF…' : 'Export as PDF'}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Note modal */}
      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Add Note</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Write a remark…"
              placeholderTextColor={COLORS.gray}
              multiline
              value={noteText}
              onChangeText={setNoteText}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalSave} onPress={addNote}>
                <Text style={styles.modalSaveText}>Save</Text>
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
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  scroll: { paddingHorizontal: 14, paddingBottom: 30 },

  companyName: { fontSize: 20, fontWeight: '800', color: COLORS.navy, marginBottom: 6 },
  subRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  subLabel: { color: COLORS.gray, fontSize: 12.5, marginRight: 10 },
  statusPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.greenLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 14 },
  statusText: { color: COLORS.green, fontWeight: '700', fontSize: 11 },

  lockCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
  },
  lockText: { flex: 1, color: COLORS.gray, fontSize: 12, lineHeight: 17 },

  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 14 },
  cardHeadRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  cardHeadText: { fontSize: 14.5, fontWeight: '700', color: COLORS.navy },
  netHeadText: { fontSize: 14.5, fontWeight: '700', color: COLORS.navy, marginBottom: 4 },
  bigValue: { fontSize: 24, fontWeight: '800', color: COLORS.navy, marginBottom: 8 },

  lineRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  lineRowBorder: { borderTopWidth: 1, borderTopColor: COLORS.border },
  lineLabel: { color: COLORS.gray, fontSize: 12.5 },
  lineValue: { color: COLORS.navy, fontWeight: '700', fontSize: 12.5 },

  monthsRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 4 },
  monthText: { color: COLORS.gray, fontSize: 10.5 },

  marginPill: { backgroundColor: COLORS.greenLight, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, marginTop: 8, marginBottom: 18 },
  marginPillText: { color: COLORS.green, fontWeight: '700', fontSize: 12 },
  miniBarsRow: { flexDirection: 'row', gap: 28, alignItems: 'flex-end' },
  miniBarCol: { alignItems: 'center' },
  miniBar: { width: 34, borderRadius: 6, marginBottom: 6 },

  headcountRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  headcountNum: { fontSize: 26, fontWeight: '800', color: COLORS.navy },
  headcountLabel: { color: COLORS.gray, fontSize: 13 },
  hcLineRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 9 },
  hcValue: { color: COLORS.navy, fontWeight: '700', fontSize: 12.5 },

  notesHeadRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  addNoteBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  addNoteText: { color: COLORS.navy, fontWeight: '700', fontSize: 11.5 },

  noteBox: { backgroundColor: COLORS.bg, borderRadius: 12, padding: 12, marginBottom: 10 },
  noteMeta: { fontSize: 11, color: COLORS.gray, marginBottom: 6 },
  noteAuthor: { fontWeight: '700', color: COLORS.navy },
  noteText: { fontSize: 12, color: COLORS.navy, lineHeight: 17 },

  viewAllBtn: { alignItems: 'center', paddingVertical: 10 },
  viewAllText: { color: COLORS.gray, fontSize: 12.5, textDecorationLine: 'underline' },

  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.card,
    borderWidth: 1.5,
    borderColor: COLORS.navy,
    borderRadius: 14,
    paddingVertical: 14,
  },
  exportText: { color: COLORS.navy, fontWeight: '700', fontSize: 13.5 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(11,37,69,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, width: '100%' },
  modalTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy, marginBottom: 10 },
  modalInput: { borderWidth: 1, borderColor: COLORS.border, borderRadius: 10, padding: 10, minHeight: 80, textAlignVertical: 'top', color: COLORS.navy, fontSize: 13 },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12, gap: 12 },
  modalCancel: { paddingVertical: 8, paddingHorizontal: 14 },
  modalCancelText: { color: COLORS.gray, fontWeight: '600' },
  modalSave: { backgroundColor: COLORS.navy, borderRadius: 10, paddingVertical: 8, paddingHorizontal: 18 },
  modalSaveText: { color: '#fff', fontWeight: '700' },
});