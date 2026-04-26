import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const transactions = [
  { id: '1', title: 'Project Alpha', date: 'Oct 24, 2023 • 2:30 PM', amount: '+ $450.00', type: 'income', icon: 'wallet-outline' },
  { id: '2', title: 'Withdrawal', date: 'Oct 22, 2023 • 10:15 AM', amount: '- $200.00', type: 'expense', icon: 'account-balance' },
  { id: '3', title: 'Cloud Migration', date: 'Oct 20, 2023 • 4:45 PM', amount: '+ $1,200.00', type: 'income', icon: 'wallet-outline' },
  { id: '4', title: 'Security Audit', date: 'Oct 18, 2023 • 11:20 AM', amount: '+ $850.00', type: 'income', icon: 'wallet-outline' },
  { id: '5', title: 'Project Delta', date: 'Oct 12, 2023 • 9:00 AM', amount: '+ $300.00', type: 'income', icon: 'wallet-outline' },
  { id: '6', title: 'Withdrawal', date: 'Oct 10, 2023 • 2:15 PM', amount: '- $500.00', type: 'expense', icon: 'account-balance' },
];

const Profile = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}><Ionicons name="arrow-back" size={24} color="#333" /></TouchableOpacity>
        <Text style={styles.headerTitle}>Financial Wallet</Text>
        <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={24} color="#333" /></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Main Balance Section */}
        <View style={styles.balanceContainer}>
          <View style={styles.balanceIconBox}>
            <Ionicons name="wallet" size={24} color="#00CFE8" />
          </View>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceAmount}>$1,000.00</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#00CFE8' }]}>
            <Text style={styles.actionBtnText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E0F7FA' }]}>
            <Text style={[styles.actionBtnText, { color: '#00CFE8' }]}>Add Funds</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="calendar-outline" size={20} color="#999" />
            <Text style={styles.statLabel}>THIS MONTH</Text>
            <Text style={styles.statValue}>$2,500.00</Text>
            <Text style={styles.statPercent}>↗ 12%</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="document-text-outline" size={20} color="#999" />
            <Text style={styles.statLabel}>THIS YEAR</Text>
            <Text style={styles.statValue}>$30,000.00</Text>
            <Text style={[styles.statPercent, { color: '#00CFE8' }]}>↗ 8%</Text>
          </View>
        </View>

        {/* Transactions */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Transaction History</Text>
          {transactions.map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <View style={[styles.iconWrapper, { backgroundColor: item.type === 'income' ? '#E0F7FA' : '#FFEBEE' }]}>
                {item.type === 'income' ? 
                  <Ionicons name="wallet-outline" size={20} color="#00CFE8" /> : 
                  <MaterialIcons name="account-balance" size={20} color="#FF5252" />
                }
              </View>
              <View style={styles.transDetails}>
                <Text style={styles.transTitle}>{item.title}</Text>
                <Text style={styles.transDate}>{item.date}</Text>
              </View>
              <Text style={[styles.transAmount, { color: item.type === 'income' ? '#00CFE8' : '#FF5252' }]}>
                {item.amount}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  balanceContainer: { alignItems: 'center', marginTop: 20 },
  balanceIconBox: { backgroundColor: '#E0F7FA', padding: 12, borderRadius: 12, marginBottom: 10 },
  balanceLabel: { color: '#888', fontSize: 14, marginBottom: 5 },
  balanceAmount: { fontSize: 32, fontWeight: '800', color: '#1A1A1A' },
  actionRow: { flexDirection: 'row', justifyContent: 'center', gap: 15, marginTop: 25 },
  actionBtn: { paddingHorizontal: 40, paddingVertical: 12, borderRadius: 10 },
  actionBtnText: { color: '#FFF', fontWeight: '600', fontSize: 15 },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 15, marginTop: 30 },
  statCard: { flex: 1, backgroundColor: '#F8F9FA', padding: 15, borderRadius: 16 },
  statLabel: { fontSize: 10, color: '#999', marginTop: 8, fontWeight: '700' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#333', marginVertical: 4 },
  statPercent: { fontSize: 12, color: '#00CFE8', fontWeight: '600' },
  historySection: { marginTop: 30, paddingHorizontal: 20 },
  historyTitle: { fontSize: 18, fontWeight: '700', color: '#333', marginBottom: 20 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  iconWrapper: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  transDetails: { flex: 1, marginLeft: 15 },
  transTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  transDate: { fontSize: 12, color: '#AAA', marginTop: 2 },
  transAmount: { fontSize: 16, fontWeight: '700' },
});

export default Profile;