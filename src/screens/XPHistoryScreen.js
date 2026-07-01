import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ChevronLeft,
  Star,
  TrendingUp,
  UserCheck,
  Clock,
  UserCog,
  ShieldCheck,
  CalendarX,
  CheckCircle2,
} from 'lucide-react-native';
import { theme } from '../theme/colors';

const colors = theme.light;

const SUMMARY = {
  label: 'Total Performance Points',
  value: '1,240',
  unit: 'XP',
  delta: '+15% this month',
};

const TRANSACTIONS = [
  {
    id: '1',
    Icon: UserCheck,
    iconBg: '#DFF6E8',
    iconColor: '#2ECC71',
    title: 'Client Review',
    subtitle: 'Today, 2:30 PM • Q3 Pipeline',
    xp: '+10 XP',
    positive: true,
  },
  {
    id: '2',
    Icon: Clock,
    iconBg: '#FCE3E1',
    iconColor: '#E74C3C',
    title: 'Delayed Reply',
    subtitle: 'Yesterday, 10:15 AM • SLA Breach',
    xp: '-2 XP',
    positive: false,
  },
  {
    id: '3',
    Icon: UserCog,
    iconBg: '#E4EEFC',
    iconColor: '#3B82F6',
    title: 'Manager Review',
    subtitle: 'Oct 24, 4:45 PM • Weekly Sync',
    xp: '+7 XP',
    positive: true,
  },
  {
    id: '4',
    Icon: ShieldCheck,
    iconBg: '#E4EEFC',
    iconColor: '#3B82F6',
    title: 'Director Review',
    subtitle: 'Oct 23, 11:00 AM • Strategic Deal',
    xp: '+3 XP',
    positive: true,
  },
  {
    id: '5',
    Icon: CalendarX,
    iconBg: '#FCE3E1',
    iconColor: '#E74C3C',
    title: 'Weekly Goal Missed',
    subtitle: 'Oct 20, 6:00 PM • Outreach Quota',
    xp: '-5 XP',
    positive: false,
  },
  {
    id: '6',
    Icon: CheckCircle2,
    iconBg: '#DFF6E8',
    iconColor: '#2ECC71',
    title: 'Demo Completion',
    subtitle: 'Oct 19, 3:30 PM • New Client',
    xp: '+15 XP',
    positive: true,
  },
];

function TransactionRow({ item }) {
  const { Icon } = item;
  return (
    <View style={styles.txRow}>
      <View style={[styles.txIcon, { backgroundColor: item.iconBg }]}>
        <Icon size={18} color={item.iconColor} strokeWidth={2.25} />
      </View>
      <View style={styles.txTextWrap}>
        <Text style={styles.txTitle}>{item.title}</Text>
        <Text style={styles.txSubtitle}>{item.subtitle}</Text>
      </View>
      <Text style={[styles.txValue, { color: item.positive ? '#2ECC71' : '#E74C3C' }]}>
        {item.xp}
      </Text>
    </View>
  );
}

export default function XPHistoryScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.eyebrow}>XP Transaction History</Text>

      <View style={styles.sheet}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <ChevronLeft size={22} color={colors.text} strokeWidth={2.25} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>XP History</Text>
          <View style={styles.iconBtn} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient
            colors={['#3B82F6', '#5B9DF9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryCard}
          >
            <View style={styles.summaryStar}>
              <Star size={64} color="rgba(255,255,255,0.18)" fill="rgba(255,255,255,0.18)" />
            </View>

            <Text style={styles.summaryLabel}>{SUMMARY.label}</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.summaryValue}>{SUMMARY.value}</Text>
              <Text style={styles.summaryUnit}>{SUMMARY.unit}</Text>
            </View>

            <View style={styles.summaryDeltaPill}>
              <TrendingUp size={12} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.summaryDeltaText}>{SUMMARY.delta}</Text>
            </View>
          </LinearGradient>

          <View style={styles.logHeaderRow}>
            <Text style={styles.sectionTitle}>Transaction Log</Text>
            <Text style={styles.logRange}>Last 7 days</Text>
          </View>

          <View style={styles.txCard}>
            {TRANSACTIONS.map((item, index) => (
              <View key={item.id}>
                <TransactionRow item={item} />
                {index < TRANSACTIONS.length - 1 && <View style={styles.txDivider} />}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eyebrow: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  summaryCard: {
    borderRadius: 20,
    padding: 20,
    marginTop: 8,
    marginBottom: 24,
    overflow: 'hidden',
  },
  summaryStar: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 8,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 14,
  },
  summaryValue: {
    fontSize: 34,
    fontWeight: '800',
    color: '#FFFFFF',
    marginRight: 6,
  },
  summaryUnit: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 5,
  },
  summaryDeltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  summaryDeltaText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  logHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  logRange: {
    fontSize: 12,
    color: colors.textSub,
    fontWeight: '600',
  },
  txCard: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  txIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  txTextWrap: {
    flex: 1,
  },
  txTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  txSubtitle: {
    fontSize: 11,
    color: colors.textSub,
    marginTop: 2,
  },
  txValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  txDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
});