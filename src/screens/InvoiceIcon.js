import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ArrowLeft, Send, Pencil } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function MilestoneInvoices() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <ArrowLeft size={24} color="#004D40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AYASC Invoicing</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Project Meta */}
        <View style={styles.metaContainer}>
          <Text style={styles.mainTitle}>Milestone Invoices</Text>
          <Text style={styles.projectText}>Project: Nexus Redesign</Text>
          <Text style={styles.totalText}>Total: $125,000</Text>
        </View>

        {/* Invoice Card #1 */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={[styles.badge, { backgroundColor: '#22D3EE' }]}>
              <Text style={[styles.badgeText, { color: '#000' }]}>✓ Ready to Send</Text>
            </View>
            <Text style={styles.invNumber}>#INV-001</Text>
          </View>
          <Text style={styles.cardTitle}>Initial Payment</Text>
          <Text style={styles.percentageText}>🕒 20% of Project Total</Text>
          <Text style={styles.label}>AMOUNT DUE</Text>
          <View style={styles.actionRow}>
            <Text style={styles.amount}>$25,000</Text>
            <TouchableOpacity style={styles.actionIconButton} onPress={() => navigation.navigate('Preview')}>
              <Send size={20} color="#004D40" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Invoice Card #2 */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={[styles.badge, { backgroundColor: '#22D3EE' }]}>
              <Text style={[styles.badgeText, { color: '#000' }]}>✓ Ready to Send</Text>
            </View>
            <Text style={styles.invNumber}>#INV-002</Text>
          </View>
          <Text style={styles.cardTitle}>Design Phase</Text>
          <Text style={styles.percentageText}>🕒 15% of Project Total</Text>
          <Text style={styles.label}>AMOUNT DUE</Text>
          <View style={styles.actionRow}>
            <Text style={styles.amount}>$18,750</Text>
            <TouchableOpacity style={styles.actionIconButton} onPress={() => navigation.navigate('Preview')}>
              <Send size={20} color="#004D40" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Invoice Card #3 (Draft) */}
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={[styles.badge, { backgroundColor: '#CBD5E1' }]}>
              <Text style={[styles.badgeText, { color: '#475569' }]}>💬 Draft</Text>
            </View>
            <Text style={styles.invNumber}>#INV-003</Text>
          </View>
          <Text style={styles.cardTitle}>Frontend</Text>
          <Text style={styles.percentageText}>🕒 25% of Project Total</Text>
          <Text style={styles.label}>AMOUNT DUE</Text>
          <View style={styles.actionRow}>
            <Text style={styles.amount}>$31,250</Text>
            <TouchableOpacity style={styles.actionIconButton} onPress={() => navigation.navigate('Editor')}>
              <Pencil size={20} color="#004D40" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#D0EFFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backButton: { padding: 4, marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#004D40' },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },
  metaContainer: { marginVertical: 20 },
  mainTitle: { fontSize: 32, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  projectText: { fontSize: 18, color: '#64748B', marginBottom: 4 },
  totalText: { fontSize: 16, color: '#64748B' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 32, padding: 24, marginBottom: 20 },
  badge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#FFFFFF' },
  invNumber: { fontSize: 14, color: '#64748B', fontWeight: '600' },
  cardTitle: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginTop: 16 },
  percentageText: { fontSize: 14, color: '#64748B', marginTop: 4, marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 0.5 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  amount: { fontSize: 28, fontWeight: '800', color: '#004D40' },
  actionIconButton: { backgroundColor: '#E0F2F1', padding: 14, borderRadius: 50 },
});