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
import { theme } from '../theme/colors';

const colors = theme.light;

const CONTRIBUTIONS = [
  {
    id: '1',
    title: 'Cloud Migration Phase 2',
    amount: '$3,200',
    icon: '🛰️',
    iconBg: '#E7E4FB',
  },
  {
    id: '2',
    title: 'Security Audit Bundle',
    amount: '$1,800',
    icon: '🛡️',
    iconBg: '#DFF6F3',
  },
];

const PREVIOUS_WEEKS = [
  {
    id: '08',
    achieved: '$11,500 achieved',
    goal: 'Goal: $10,000',
    badgeLabel: '115% ACHIEVED',
    badgeColor: '#2ECC71',
    progress: 1,
    progressColor: '#2ECC71',
  },
  {
    id: '07',
    achieved: '$10,200 achieved',
    goal: 'Goal: $10,000',
    badgeLabel: 'TARGET MET',
    badgeColor: '#3498db',
    progress: 1,
    progressColor: '#3498db',
  },
  {
    id: '06',
    achieved: '$7,800 achieved',
    goal: 'Goal: $10,000',
    badgeLabel: 'MISSED',
    badgeColor: '#E74C3C',
    progress: 0.78,
    progressColor: '#E74C3C',
  },
];

function ContributionRow({ item }) {
  return (
    <View style={styles.contribRow}>
      <View style={[styles.contribIcon, { backgroundColor: item.iconBg }]}>
        <Text style={styles.contribEmoji}>{item.icon}</Text>
      </View>
      <Text style={styles.contribTitle}>{item.title}</Text>
      <Text style={styles.contribAmount}>{item.amount}</Text>
    </View>
  );
}

function PreviousWeekCard({ week }) {
  return (
    <View style={styles.weekCard}>
      <View style={styles.weekTopRow}>
        <View style={styles.weekBadge}>
          <Text style={styles.weekBadgeLabel}>WK</Text>
          <Text style={styles.weekBadgeNumber}>{week.id}</Text>
        </View>

        <View style={styles.weekInfo}>
          <Text style={styles.weekAchieved}>{week.achieved}</Text>
          <Text style={styles.weekGoal}>{week.goal}</Text>
        </View>

        <View style={[styles.statusPill, { backgroundColor: week.badgeColor }]}>
          <Text style={styles.statusPillText}>{week.badgeLabel}</Text>
        </View>
      </View>

      <View style={styles.weekProgressTrack}>
        <View
          style={[
            styles.weekProgressFill,
            { width: `${week.progress * 100}%`, backgroundColor: week.progressColor },
          ]}
        />
      </View>
    </View>
  );
}

export default function WeeklyGoalsScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.eyebrow}>Weekly Goals History</Text>

      <View style={styles.sheet}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Weekly Goals</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.moreDots}>⋮</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statusCard}>
            <View style={styles.statusLeft}>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusTitle}>On Track</Text>
              </View>
              <Text style={styles.statusSubtitle}>
                82% of monthly target reached
              </Text>
            </View>
            <TouchableOpacity style={styles.detailsBtn}>
              <Text style={styles.detailsBtnText}>Details</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Current Week</Text>
            <Text style={styles.weekPill}>Week 9</Text>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressCardTopRow}>
              <View>
                <Text style={styles.progressLabel}>SALES PROGRESS</Text>
                <Text style={styles.progressValue}>
                  $5,000 <Text style={styles.progressTarget}>/ $10,000</Text>
                </Text>
              </View>
              <View style={styles.timeLeftWrap}>
                <Text style={styles.progressLabel}>TIME LEFT</Text>
                <Text style={styles.timeLeftValue}>2d 14h</Text>
              </View>
            </View>

            <View style={styles.mainProgressTrack}>
              <View style={[styles.mainProgressFill, { width: '50%' }]} />
            </View>
          </View>

          <Text style={[styles.sectionTitle, styles.contribHeading]}>
            Project Contributions
          </Text>
          {CONTRIBUTIONS.map((item) => (
            <ContributionRow key={item.id} item={item} />
          ))}

          <Text style={[styles.sectionTitle, styles.prevWeeksHeading]}>
            Previous Weeks
          </Text>
          {PREVIOUS_WEEKS.map((week) => (
            <PreviousWeekCard key={week.id} week={week} />
          ))}
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
  backArrow: {
    fontSize: 20,
    color: colors.text,
  },
  moreDots: {
    fontSize: 20,
    color: colors.text,
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
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EAF6FF',
    borderRadius: 16,
    padding: 14,
    marginTop: 8,
    marginBottom: 22,
  },
  statusLeft: {
    flex: 1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2ECC71',
    marginRight: 6,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  statusSubtitle: {
    fontSize: 12,
    color: colors.textSub,
  },
  detailsBtn: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  detailsBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  weekPill: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.accent,
  },
  progressCard: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 22,
  },
  progressCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.textSub,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  progressTarget: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSub,
  },
  timeLeftWrap: {
    alignItems: 'flex-end',
  },
  timeLeftValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  mainProgressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#DCE6F5',
    overflow: 'hidden',
  },
  mainProgressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.accent,
  },
  contribHeading: {
    marginBottom: 12,
  },
  contribRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  contribIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contribEmoji: {
    fontSize: 16,
  },
  contribTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
  contribAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  prevWeeksHeading: {
    marginTop: 8,
    marginBottom: 12,
  },
  weekCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  weekTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  weekBadgeLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.accent,
  },
  weekBadgeNumber: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.accent,
  },
  weekInfo: {
    flex: 1,
  },
  weekAchieved: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  weekGoal: {
    fontSize: 11,
    color: colors.textSub,
    marginTop: 2,
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusPillText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  weekProgressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDF1F7',
    overflow: 'hidden',
  },
  weekProgressFill: {
    height: 4,
    borderRadius: 2,
  },
});