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
import {
  ChevronLeft,
  Settings,
  Check,
  Award,
  Users,
  FolderKanban,
  TrendingUp,
  Target,
  Clock,
} from 'lucide-react-native';
import { theme } from '../theme/colors';

const colors = theme.light;

const EARNINGS = {
  month: {
    label: 'THIS MONTH',
    value: '$2,400',
    delta: '+12%',
    deltaColor: '#2ECC71',
    DeltaIcon: TrendingUp,
  },
  year: {
    label: 'THIS YEAR',
    value: '$28,500',
    delta: 'In Target',
    deltaColor: '#8E96A3',
    DeltaIcon: Target,
  },
};

const RANKING_STATS = [
  {
    id: '1',
    Icon: Award,
    iconBg: '#DFF6E8',
    iconColor: '#2ECC71',
    title: 'Season Progress',
    subtitle: 'Ranks improved',
    value: '+3',
    valueColor: '#2ECC71',
  },
  {
    id: '2',
    Icon: Users,
    iconBg: '#E4EEFC',
    iconColor: '#3B82F6',
    title: 'Team Rank',
    subtitle: 'Global Engineering',
    value: '12 / 50',
    valueColor: colors.text,
  },
  {
    id: '3',
    Icon: FolderKanban,
    iconBg: '#FCEFD9',
    iconColor: '#D4A017',
    title: 'Department Rank',
    subtitle: 'Sales Engineering',
    value: '432 / 1500',
    valueColor: colors.text,
  },
];

function StatRow({ stat }) {
  const { Icon } = stat;
  return (
    <View style={styles.statRow}>
      <View style={[styles.statIcon, { backgroundColor: stat.iconBg }]}>
        <Icon size={18} color={stat.iconColor} strokeWidth={2.25} />
      </View>
      <View style={styles.statTextWrap}>
        <Text style={styles.statTitle}>{stat.title}</Text>
        <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
      </View>
      <Text style={[styles.statValue, { color: stat.valueColor }]}>{stat.value}</Text>
    </View>
  );
}

export default function ProfileRankScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.eyebrow}>Rank & Profile Overview</Text>

      <View style={styles.sheet}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <ChevronLeft size={22} color={colors.text} strokeWidth={2.25} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Rank</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Settings size={19} color={colors.text} strokeWidth={2.1} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileCard}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>AR</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              </View>
            </View>

            <Text style={styles.profileName}>Alex Rivera</Text>
            <Text style={styles.profileRank}>GOLD II RANK</Text>

            <View style={styles.xpRow}>
              <Text style={styles.xpLabel}>XP Progress to Gold III</Text>
              <Text style={styles.xpValue}>1,500 / 2,000 XP</Text>
            </View>

            <View style={styles.xpTrack}>
              <View style={[styles.xpFill, { width: '75%' }]} />
            </View>

            <Text style={styles.xpRemaining}>500 XP to next rank</Text>
          </View>

          <Text style={styles.sectionTitle}>Earnings Summary</Text>
          <View style={styles.earningsRow}>
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>{EARNINGS.month.label}</Text>
              <Text style={styles.earningsValue}>{EARNINGS.month.value}</Text>
              <View style={styles.earningsDeltaRow}>
                <EARNINGS.month.DeltaIcon
                  size={12}
                  color={EARNINGS.month.deltaColor}
                  strokeWidth={2.5}
                />
                <Text style={[styles.earningsDelta, { color: EARNINGS.month.deltaColor }]}>
                  {EARNINGS.month.delta}
                </Text>
              </View>
            </View>
            <View style={styles.earningsCard}>
              <Text style={styles.earningsLabel}>{EARNINGS.year.label}</Text>
              <Text style={styles.earningsValue}>{EARNINGS.year.value}</Text>
              <View style={styles.earningsDeltaRow}>
                <EARNINGS.year.DeltaIcon
                  size={12}
                  color={EARNINGS.year.deltaColor}
                  strokeWidth={2.5}
                />
                <Text style={[styles.earningsDelta, { color: EARNINGS.year.deltaColor }]}>
                  {EARNINGS.year.delta}
                </Text>
              </View>
            </View>
          </View>

          <Text style={[styles.sectionTitle, styles.statsHeading]}>Ranking Stats</Text>
          <View style={styles.statsCard}>
            {RANKING_STATS.map((stat, index) => (
              <View key={stat.id}>
                <StatRow stat={stat} />
                {index < RANKING_STATS.length - 1 && <View style={styles.statDivider} />}
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.historyBtn}>
            <Clock size={16} color="#FFFFFF" strokeWidth={2.25} />
            <Text style={styles.historyBtnText}>View XP History</Text>
          </TouchableOpacity>
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
  profileCard: {
    backgroundColor: '#F3F7FC',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  avatarWrap: {
    marginBottom: 12,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#2D3A4E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.accent,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  profileRank: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D4A017',
    letterSpacing: 0.5,
    marginBottom: 18,
  },
  xpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  xpLabel: {
    fontSize: 12,
    color: colors.textSub,
  },
  xpValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  xpTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DCE6F5',
    overflow: 'hidden',
    marginBottom: 8,
  },
  xpFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  xpRemaining: {
    fontSize: 11,
    color: colors.textSub,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  earningsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  earningsCard: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 14,
  },
  earningsLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.textSub,
    marginBottom: 6,
  },
  earningsValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  earningsDeltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  earningsDelta: {
    fontSize: 11,
    fontWeight: '600',
  },
  statsHeading: {
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  statTextWrap: {
    flex: 1,
  },
  statTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  statSubtitle: {
    fontSize: 11,
    color: colors.textSub,
    marginTop: 2,
  },
  statValue: {
    fontSize: 13,
    fontWeight: '700',
  },
  statDivider: {
    height: 1,
    backgroundColor: colors.cardBorder,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    borderRadius: 26,
    paddingVertical: 16,
    gap: 8,
  },
  historyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});