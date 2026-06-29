import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { ArrowLeft, Plus, X, User, NotebookText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Editor() {
  const navigation = useNavigation();
  const [clientName, setClientName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#004D40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invoice Editor</Text>
        <TouchableOpacity style={styles.previewBtn} onPress={() => navigation.navigate('Preview')}>
          <Text style={styles.previewBtnText}>Preview</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.projectBadge}>
          <Text style={styles.projectBadgeText}>PROJECT ID: AZ-2024-089</Text>
        </View>

        <Text style={styles.mainTitle}>Website Redesign</Text>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 24 }}>
          <View style={styles.draftTag}><Text style={styles.draftTagText}>📄 Draft</Text></View>
          <View style={styles.dateTag}><Text style={styles.dateTagText}>Due: Oct 15, 2024</Text></View>
        </View>

        {/* Total Amount Box */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>$12,450.00</Text>
        </View>

        {/* Client Details Section */}
        <View style={styles.sectionCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 8 }}>
            <User size={22} color="#22D3EE" />
            <Text style={[styles.sectionHeading, { marginBottom: 0 }]}>Client Details</Text>
          </View>

          <Text style={styles.inputLabel}>Client Name</Text>
          <TextInput style={styles.input} placeholder="Acme Cooperation" value={clientName} onChangeText={setClientName} />

          <Text style={styles.inputLabel}>Contact Person</Text>
          <TextInput style={styles.input} placeholder="Jane Doe" value={contactPerson} onChangeText={setContactPerson} />

          <Text style={styles.inputLabel}>Email</Text>
          <TextInput style={styles.input} placeholder="janedoe@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <Text style={styles.inputLabel}>Issue Date</Text>
          <TextInput style={styles.input} placeholder="Oct 15, 2026" value={issueDate} onChangeText={setIssueDate} />

          <Text style={styles.inputLabel}>Due Date</Text>
          <TextInput style={styles.input} placeholder="Oct 18, 2026" value={dueDate} onChangeText={setDueDate} />

          <Text style={styles.inputLabel}>Billing Address</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressText}>123 Innovation Way{"\n"}Suite 500{"\n"}Tech District, CA 90210{"\n"}United States</Text>
          </View>
        </View>

        {/* Service Descriptions Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            {/* Notebook Icon matching image_cd9320.png */}
            <NotebookText size={24} color="#22D3EE" />
            
            {/* Stacked Layout text block next to it */}
            <View style={{ flexDirection: 'column' }}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1E293B', lineHeight: 24 }}>Service</Text>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1E293B', lineHeight: 24 }}>Descriptions</Text>
            </View>
          </View>

          {/* Add Item Button */}
          <TouchableOpacity style={styles.addItemBtn}>
            <Plus size={16} color="#FFF" />
            <Text style={styles.addItemBtnText}>Add Item</Text>
          </TouchableOpacity>
        </View>

        {/* Dynamic Card 1 */}
        <View style={styles.serviceItemCard}>
          <Text style={styles.itemTitle}>UX/UI Research & Wireframing</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionBoxText}>Comprehensive user research, competitor analysis, and low-fidelity wireframes for core flows.</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Qty:</Text>
            <TextInput style={styles.smallInput} value="40" keyboardType="numeric" />
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Rate:  $</Text>
            <TextInput style={styles.smallInput} value="120" keyboardType="numeric" />
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.calcLabel}>Total:</Text>
            <Text style={styles.rowAmount}>$4,800.00</Text>
            <X size={18} color="#94A3B8" />
          </View>
        </View>

        {/* Dynamic Card 2 */}
        <View style={styles.serviceItemCard}>
          <Text style={styles.itemTitle}>High-Fidelity Visual Design</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionBoxText}>Applying visual design system, creating full-color mockups, and prototyping interactions.</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Qty:</Text>
            <TextInput style={styles.smallInput} value="65" keyboardType="numeric" />
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Rate:  $</Text>
            <TextInput style={styles.smallInput} value="100" keyboardType="numeric" />
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.calcLabel}>Total:</Text>
            <Text style={styles.rowAmount}>$6,500.00</Text>
            <X size={18} color="#94A3B8" />
          </View>
        </View>

        {/* New Invoice Item Card (Design System Documentation) */}
        <View style={styles.serviceItemCard}>
          <Text style={styles.itemTitle}>Design System Documentation</Text>
          <View style={styles.descriptionBox}>
            <Text style={styles.descriptionBoxText}>Component library docs, usage guidelines, and tokens.</Text>
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Qty:</Text>
            <TextInput style={styles.smallInput} placeholder="10" keyboardType="numeric" />
          </View>
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Rate:  $</Text>
            <TextInput style={styles.smallInput} placeholder="115" keyboardType="numeric" />
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.calcLabel}>Total:</Text>
            <Text style={styles.rowAmount}>$1,150.00</Text>
            <X size={18} color="#94A3B8" />
          </View>
        </View>

        {/* Summary Block */}
        <View style={{ paddingHorizontal: 12, marginTop: 16 }}>
          <View style={styles.summaryLine}><Text style={styles.summaryText}>Subtotal</Text><Text style={styles.summaryValue}>$12,450.00</Text></View>
          <View style={styles.summaryLine}><Text style={styles.summaryText}>Tax (0%)</Text><Text style={styles.summaryValue}>$0.00</Text></View>
          <View style={[styles.summaryLine, { marginTop: 16 }]}><Text style={styles.finalDueLabel}>Total Due</Text><Text style={styles.finalDueValue}>$12,450.00</Text></View>
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
  previewBtn: { backgroundColor: '#22D3EE', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  previewBtnText: { color: '#004D40', fontWeight: '700', fontSize: 14 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  projectBadge: { backgroundColor: '#BAE6FD', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, alignSelf: 'flex-start', marginTop: 16 },
  projectBadgeText: { fontSize: 12, fontWeight: '700', color: '#0369A1' },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#1E293B', marginTop: 8, marginBottom: 8 },
  draftTag: { backgroundColor: '#22D3EE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  draftTagText: { fontSize: 12, fontWeight: '700', color: '#004D40' },
  dateTag: { backgroundColor: '#CBD5E1', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  dateTagText: { fontSize: 12, color: '#475569', fontWeight: '600' },
  totalBox: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, marginBottom: 24 },
  totalLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  totalAmount: { fontSize: 36, fontWeight: '800', color: '#006673', marginTop: 4 },
  sectionCard: { backgroundColor: '#F0F9FF', borderRadius: 32, padding: 24 },
  sectionHeading: { fontSize: 20, fontWeight: '700', color: '#1E293B', marginBottom: 16 },
  inputLabel: { fontSize: 13, color: '#64748B', marginTop: 12, marginBottom: 6, fontWeight: '500' },
  input: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 12, fontSize: 16, color: '#1E293B', borderWidth: 1, borderColor: '#E2E8F0' },
  addressBox: { backgroundColor: '#E2E8F0', padding: 16, borderRadius: 16 },
  addressText: { color: '#475569', fontSize: 15, lineHeight: 22 },
  addItemBtn: { backgroundColor: '#005F6A', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, gap: 6 },
  addItemBtnText: { color: '#FFF', fontWeight: '700' },
  serviceItemCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 16 },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#334155', marginBottom: 12 },
  descriptionBox: { backgroundColor: '#E2E8F0', padding: 12, borderRadius: 8, marginBottom: 12 },
  descriptionBoxText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  calcRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  calcLabel: { fontSize: 14, color: '#64748B', width: 60 },
  smallInput: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, width: 80, textAlign: 'center', fontSize: 14 },
  totalRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 12 },
  rowAmount: { fontSize: 16, fontWeight: '700', color: '#1E293B', flex: 1 },
  summaryLine: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryText: { color: '#64748B', fontSize: 15 },
  summaryValue: { color: '#1E293B', fontSize: 15, fontWeight: '600' },
  finalDueLabel: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  finalDueValue: { fontSize: 24, fontWeight: '800', color: '#006673' }
});