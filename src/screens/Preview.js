import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Edit2, Download, Send } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Preview() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Layout */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#004D40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Preview</Text>
        <TouchableOpacity style={styles.exportBtn}>
          <Text style={styles.exportBtnText}>Export</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Actions Button Bar */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('Editor')}>
            <Edit2 size={16} color="#006673" />
            <Text style={styles.outlineBtnText}>Edit Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.outlineBtn}>
            <Download size={16} color="#006673" />
            <Text style={styles.outlineBtnText}>Download PDF</Text>
          </TouchableOpacity>
        </View>

        {/* Send Action Bar */}
        <TouchableOpacity style={styles.sendButton} onPress={() => navigation.pop(2)}>
          <Send size={18} color="#FFFFFF" />
          <Text style={[styles.sendButtonText, { marginLeft: 8 }]}>Send to Client</Text>
        </TouchableOpacity>

        {/* Premium Paper Sheet Container */}
        <View style={styles.invoicePaper}>
          <Text style={styles.mainInvLabel}>INVOICE</Text>
          <Text style={styles.metaLabelText}>INV-2023-089</Text>
          <Text style={styles.metaLabelText}>Issue Date: Oct 15, 2023</Text>
          <Text style={[styles.metaLabelText, { color: '#006673', fontWeight: '700' }]}>Due Date: Oct 30, 2023</Text>

          <Text style={styles.studioTitle}>AYASC Studios</Text>
          <Text style={styles.studioSub}>1200 Crystalline Blvd, Suite 400{"\n"}San Francisco, CA 94105{"\n"}hello@ayasc.com</Text>

          <View style={styles.divider} />

          <Text style={styles.billedToLabel}>BILLED TO</Text>
          <View style={styles.clientDetailBox}>
            <Text style={styles.clientNameText}>Nexus Dynamics Corp.</Text>
            <Text style={styles.clientSubText}>Attn: Sarah Jenkins, VP of Product{"\n"}880 Innovation Parkway{"\n"}Austin, TX 78701</Text>
          </View>

          {/* Badges */}
          <View style={{ flexDirection: 'row', gap: 8, marginVertical: 20 }}>
            <View style={styles.milestoneBadge}><Text style={styles.milestoneBadgeText}>🚩 Milestone: Design Phase - 30%</Text></View>
            <View style={styles.projectBadge}><Text style={styles.projectBadgeText}>Project: ND-Apollo Redesign</Text></View>
          </View>

          {/* Clean Invoice Data Table Layout */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>SERVICE DESCRIPTION</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>HRS/QTY</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>RATE</Text>
            <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'right' }]}>AMOUNT</Text>
          </View>

          {/* Row 1 */}
          <View style={styles.tableRow}>
            <View style={{ flex: 2 }}>
              <Text style={styles.rowProdTitle}>UX Research & Discovery</Text>
              <Text style={styles.rowProdDesc}>User interviews, persona development, and competitive analysis.</Text>
            </View>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'center' }]}>40</Text>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'right' }]}>$150.00</Text>
            <Text style={[styles.rowCellAmount, { flex: 1, textAlign: 'right' }]}>$6,000.00</Text>
          </View>

          {/* Row 2 */}
          <View style={styles.tableRow}>
            <View style={{ flex: 2 }}>
              <Text style={styles.rowProdTitle}>Wireframing (Low-Fidelity)</Text>
              <Text style={styles.rowProdDesc}>Structural layouts for 12 core screens.</Text>
            </View>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'center' }]}>25</Text>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'right' }]}>$150.00</Text>
            <Text style={[styles.rowCellAmount, { flex: 1, textAlign: 'right' }]}>$3,750.00</Text>
          </View>

          {/* Row 3 */}
          <View style={styles.tableRow}>
            <View style={{ flex: 2 }}>
              <Text style={styles.rowProdTitle}>Design System Foundation</Text>
              <Text style={styles.rowProdDesc}>Color palette, typography scale, and core component definitions.</Text>
            </View>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'center' }]}>1</Text>
            <Text style={[styles.rowCellText, { flex: 1, textAlign: 'right' }]}>$2,500.00</Text>
            <Text style={[styles.rowCellAmount, { flex: 1, textAlign: 'right' }]}>$2,500.00</Text>
          </View>

          {/* Accounting Block */}
          <View style={{ borderTopWidth: 1, borderColor: '#F1F5F9', marginTop: 20, paddingTop: 16 }}>
            <View style={styles.sumLine}><Text style={styles.sumLabel}>Subtotal</Text><Text style={styles.sumVal}>$12,250.00</Text></View>
            <View style={styles.sumLine}><Text style={styles.sumLabel}>Tax (0%)</Text><Text style={styles.sumVal}>$0.00</Text></View>
            <View style={[styles.sumLine, { marginTop: 16 }]}><Text style={styles.totalLabel}>Total Amount</Text><Text style={styles.totalValue}>$12,250.00</Text></View>
          </View>

          {/* Footer Terms */}
          <View style={styles.footerNoteBox}>
            <Text style={styles.footerNoteText}>Please remit payment within 5 days of receiving this invoice. Thank you for your business.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D0EFFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, justifyContent: 'space-between' },
  backButton: { padding: 4 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#004D40' },
  exportBtn: { backgroundColor: '#22D3EE', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  exportBtnText: { color: '#004D40', fontWeight: '700', fontSize: 14 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 16, marginBottom: 12 },
  outlineBtn: { flex: 1, backgroundColor: '#FFFFFF', padding: 14, borderRadius: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  outlineBtnText: { color: '#006673', fontWeight: '700', fontSize: 14 },
  sendButton: { backgroundColor: '#005F6A', padding: 16, borderRadius: 30, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginBottom: 24 },
  sendButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  invoicePaper: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24 },
  mainInvLabel: { fontSize: 28, fontWeight: '800', color: '#1E293B', marginBottom: 6 },
  metaLabelText: { fontSize: 14, color: '#64748B', marginBottom: 4 },
  studioTitle: { fontSize: 18, fontWeight: '700', color: '#334155', marginTop: 16 },
  studioSub: { fontSize: 14, color: '#64748B', lineHeight: 20 },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 20 },
  billedToLabel: { fontSize: 11, fontWeight: '700', color: '#94A3B8', marginBottom: 8 },
  clientDetailBox: { backgroundColor: '#E2E8F0', padding: 16, borderRadius: 16 },
  clientNameText: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 4 },
  clientSubText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  milestoneBadge: { backgroundColor: '#E0F2F1', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, flex: 1 },
  milestoneBadgeText: { fontSize: 12, color: '#004D40', fontWeight: '700' },
  projectBadge: { backgroundColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  projectBadgeText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  tableHeader: { flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1, borderColor: '#E2E8F0', marginTop: 16 },
  tableHeaderText: { fontSize: 11, fontWeight: '700', color: '#94A3B8' },
  tableRow: { flexDirection: 'row', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', alignItems: 'flex-start' },
  rowProdTitle: { fontSize: 14, fontWeight: '700', color: '#334155' },
  rowProdDesc: { fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 16 },
  rowCellText: { fontSize: 14, color: '#475569', paddingTop: 2 },
  rowCellAmount: { fontSize: 14, fontWeight: '700', color: '#334155', paddingTop: 2 },
  sumLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  sumLabel: { color: '#64748B', fontSize: 14 },
  sumVal: { color: '#334155', fontSize: 14, fontWeight: '600' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#1E293B' },
  totalValue: { fontSize: 22, fontWeight: '800', color: '#006673' },
  footerNoteBox: { backgroundColor: '#F0F9FF', padding: 16, borderRadius: 16, marginTop: 24 },
  footerNoteText: { fontSize: 13, color: '#475569', textAlign: 'center', lineHeight: 18 }
});