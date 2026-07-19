import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Svg, { Polyline, Line, Circle } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#DCE8F7',
  card: '#FFFFFF',
  navy: '#0B2545',
  green: '#1E8E5A',
  greenLight: '#DDF3E7',
  red: '#D64545',
  redLight: '#FBE7E7',
  gray: '#8A94A6',
  lightBlue: '#E9F0FB',
  border: '#EEF2F8',
};

// ---- Data per period ----
const PERIODS = {
  YTD: {
    revenue: 487840,
    growth: 24,
    shareOfPortfolio: 32,
    trend: [30, 26, 34, 40, 46, 48, 55, 58, 62, 68, 74, 90],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    margin: 62.0,
    netProfit: 302260,
    expenses: 185580,
  },
  Q2: {
    revenue: 268400,
    growth: 18,
    shareOfPortfolio: 34,
    trend: [40, 44, 50, 58, 66, 72],
    months: ['Apr', 'May', 'Jun'],
    margin: 63.5,
    netProfit: 170430,
    expenses: 97970,
  },
  Q1: {
    revenue: 219440,
    growth: 12,
    shareOfPortfolio: 30,
    trend: [30, 26, 34, 40, 38, 45],
    months: ['Jan', 'Feb', 'Mar'],
    margin: 60.1,
    netProfit: 131880,
    expenses: 87560,
  },
};

const ALL_PROJECTS = [
  { name: 'Alpha AI Suite', status: 'Live T&E', live: true, amount: 68400, icon: 'search-outline' },
  { name: 'NLP Engine v2', status: 'Live T&E', live: true, amount: 54200, icon: 'language-outline' },
  { name: 'Smart Retail Bot', status: 'Live T&E', live: true, amount: 47800, icon: 'pricetag-outline' },
  { name: 'Vision Analytics', status: 'Closing T&E', live: false, amount: 89600, icon: 'eye-outline' },
  { name: 'AI QA Automation', status: 'Live T&E + PM', live: true, amount: 93840, icon: 'sync-outline' },
  { name: 'Voice Assistant Pro', status: 'Live T&E', live: true, amount: 39600, icon: 'mic-outline' },
  { name: 'Fraud Detection AI', status: 'Live T&E', live: true, amount: 74400, icon: 'shield-checkmark-outline' },
];

const CONTRIBUTORS = [
  { name: 'Ahmad Raza', amount: 4820, initials: 'AR', rank: 1 },
  { name: 'Sara Khan', amount: 3960, initials: 'SK', rank: 2 },
  { name: 'Bilal Hassan', amount: 3110, initials: 'BH', rank: 3 },
];

function money(n) {
  return `$${n.toLocaleString('en-US')}`;
}

const CHART_W = width - 80;
const CHART_H = 90;

function chartPoints(data, w, h, max, min) {
  const step = w / (data.length - 1);
  const range = max - min || 1;
  return data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ');
}

export default function AIProjects() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('YTD');
  const [customVisible, setCustomVisible] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);

  const period = PERIODS[activeTab] || PERIODS.YTD;

  const chartMax = Math.max(...period.trend);
  const chartMin = Math.min(...period.trend);

  const revenuePct = 100;
  const expensePct = Math.round((period.expenses / period.revenue) * 100);

  const visibleProjects = showAllProjects ? ALL_PROJECTS : ALL_PROJECTS.slice(0, 5);

  const podium = useMemo(() => {
    const first = CONTRIBUTORS.find((c) => c.rank === 1);
    const second = CONTRIBUTORS.find((c) => c.rank === 2);
    const third = CONTRIBUTORS.find((c) => c.rank === 3);
    return [second, first, third];
  }, []);

  const handleTabPress = (tab) => {
    if (tab === 'Custom') {
      setCustomVisible(true);
      return;
    }
    setActiveTab(tab);
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
        <Text style={styles.headerTitle}>AI Projects</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="share-outline" size={19} color={COLORS.navy} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <Ionicons name="settings-outline" size={19} color={COLORS.navy} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          {['YTD', 'Q2', 'Q1'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tab, activeTab === t && styles.tabActive]}
              onPress={() => handleTabPress(t)}
            >
              <Text style={[styles.tabText, activeTab === t && styles.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
          <View style={styles.tabDivider} />
          <TouchableOpacity style={styles.customTab} onPress={() => handleTabPress('Custom')}>
            <Ionicons name="calendar-outline" size={14} color={COLORS.navy} />
            <Text style={styles.customText}>  Custom</Text>
          </TouchableOpacity>
        </View>

        {/* Executive badge */}
        <View style={styles.execBadge}>
          <Ionicons name="lock-closed" size={12} color={COLORS.green} />
          <Text style={styles.execText}>  Executive Financial Data</Text>
        </View>

        {/* Sector Revenue */}
        <View style={styles.card}>
          <Text style={styles.eyebrow}>SECTOR REVENUE (YTD)</Text>
          <View style={styles.revenueRow}>
            <Text style={styles.bigValue}>{money(period.revenue)}</Text>
            <View style={styles.growthPill}>
              <Ionicons name="arrow-up" size={11} color={COLORS.green} />
              <Text style={styles.growthText}> {period.growth}%</Text>
            </View>
          </View>
          <Text style={styles.subText}>Represents {period.shareOfPortfolio}% of total portfolio revenue.</Text>

          <Svg width={CHART_W} height={CHART_H} style={{ marginTop: 14 }}>
            <Line x1={0} y1={0} x2={CHART_W} y2={0} stroke="#E3ECFA" strokeDasharray="3,4" strokeWidth={1} />
            <Line x1={0} y1={CHART_H} x2={CHART_W} y2={CHART_H} stroke="#E3ECFA" strokeDasharray="3,4" strokeWidth={1} />
            <Polyline
              points={chartPoints(period.trend, CHART_W, CHART_H, chartMax, chartMin)}
              fill="none"
              stroke={COLORS.green}
              strokeWidth={2.5}
            />
          </Svg>
          <View style={styles.monthsRow}>
            {period.months.map((m) => (
              <Text key={m} style={styles.monthText}>{m}</Text>
            ))}
          </View>
        </View>

        {/* Profitability */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.eyebrow}>PROFITABILITY</Text>
            <View style={styles.marginPill}>
              <Text style={styles.marginPillText}>{period.margin.toFixed(1)}% Margin</Text>
            </View>
          </View>

          <Text style={[styles.subText, { marginTop: 10 }]}>Net Profit</Text>
          <Text style={styles.bigValue}>{money(period.netProfit)}</Text>

          <View style={{ marginTop: 16 }}>
            <View style={styles.barLabelRow}>
              <Text style={styles.barLabel}>Revenue</Text>
              <Text style={[styles.barValue, { color: COLORS.green }]}>{money(period.revenue)}</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${revenuePct}%`, backgroundColor: COLORS.green }]} />
            </View>
          </View>

          <View style={{ marginTop: 14 }}>
            <View style={styles.barLabelRow}>
              <Text style={styles.barLabel}>Expenses</Text>
              <Text style={[styles.barValue, { color: COLORS.red }]}>{money(period.expenses)}</Text>
            </View>
            <View style={styles.barTrack}>
              <View style={[styles.barFill, { width: `${expensePct}%`, backgroundColor: COLORS.red }]} />
            </View>
          </View>
        </View>

        {/* Active Projects */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Active Projects</Text>
            <View style={styles.countPill}>
              <Text style={styles.countPillText}>{ALL_PROJECTS.length} Projects</Text>
            </View>
          </View>

          {visibleProjects.map((p, idx) => (
            <View key={p.name}>
              <View style={styles.projectRow}>
                <View style={styles.projectIconWrap}>
                  <Ionicons name={p.icon} size={17} color={COLORS.navy} />
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.projectName}>{p.name}</Text>
                  <View style={styles.statusRow}>
                    <View style={[styles.statusDot, { backgroundColor: p.live ? COLORS.green : COLORS.red }]} />
                    <Text style={styles.statusText}>  {p.status}</Text>
                  </View>
                </View>
                <Text style={styles.projectAmount}>{money(p.amount)}</Text>
              </View>
              {idx !== visibleProjects.length - 1 && <View style={styles.rowDivider} />}
            </View>
          ))}

          <TouchableOpacity style={styles.viewAllBtn} onPress={() => setShowAllProjects((v) => !v)}>
            <Text style={styles.viewAllText}>
              {showAllProjects ? 'Show Less' : `View All ${ALL_PROJECTS.length} Projects`}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Contributors */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Top Contributors</Text>
          <View style={styles.podiumRow}>
            {podium.map((c) => {
              const isFirst = c.rank === 1;
              return (
                <View key={c.name} style={styles.podiumCol}>
                  {isFirst && <Text style={styles.podiumAmount}>{money(c.amount).replace('$', '$')}</Text>}
                  <View
                    style={[
                      styles.avatar,
                      isFirst && styles.avatarFirst,
                      { backgroundColor: isFirst ? COLORS.navy : '#B9C6DC' },
                    ]}
                  >
                    <Text style={[styles.avatarInitials, isFirst && { color: '#fff' }]}>{c.initials}</Text>
                  </View>
                  <View
                    style={[
                      styles.podiumBase,
                      {
                        height: isFirst ? 70 : 46,
                        backgroundColor: isFirst ? COLORS.navy : COLORS.lightBlue,
                      },
                    ]}
                  >
                    <View style={styles.rankBadge}>
                      <Text style={styles.rankBadgeText}>{c.rank}</Text>
                    </View>
                    {isFirst && <Ionicons name="trophy" size={20} color="rgba(255,255,255,0.35)" style={{ marginTop: 'auto', marginBottom: 8 }} />}
                  </View>
                  <Text style={styles.podiumName}>{c.name}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Custom range modal */}
      <Modal visible={customVisible} transparent animationType="fade" onRequestClose={() => setCustomVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Custom Range</Text>
            <Text style={styles.modalSub}>Custom date-range filtering isn't wired to live data yet — hook this up to your date picker and refetch logic.</Text>
            <TouchableOpacity style={styles.modalClose} onPress={() => setCustomVisible(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
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
    paddingBottom: 14,
    backgroundColor: '#F3F7FC',
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  scroll: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 30 },

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  tab: { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.navy },
  tabText: { color: COLORS.navy, fontSize: 12.5, fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  tabDivider: { width: 1, height: 18, backgroundColor: COLORS.border, marginHorizontal: 4 },
  customTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 9 },
  customText: { color: COLORS.navy, fontSize: 12.5, fontWeight: '600' },

  execBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EFF3FA',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    marginBottom: 14,
  },
  execText: { color: COLORS.navy, fontWeight: '700', fontSize: 11.5 },

  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 16, marginBottom: 14 },
  eyebrow: { color: COLORS.gray, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  revenueRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  bigValue: { fontSize: 26, fontWeight: '800', color: COLORS.navy },
  growthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginLeft: 10,
  },
  growthText: { color: COLORS.green, fontWeight: '700', fontSize: 12 },
  subText: { color: COLORS.gray, fontSize: 12, marginTop: 6 },

  monthsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  monthText: { color: COLORS.gray, fontSize: 10.5 },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  marginPill: { backgroundColor: COLORS.greenLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  marginPillText: { color: COLORS.green, fontWeight: '700', fontSize: 12 },

  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  barLabel: { color: COLORS.navy, fontSize: 12.5, fontWeight: '600' },
  barValue: { fontSize: 12.5, fontWeight: '700' },
  barTrack: { height: 6, borderRadius: 4, backgroundColor: '#E7ECF5', overflow: 'hidden' },
  barFill: { height: 6, borderRadius: 4 },

  sectionTitle: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
  countPill: { backgroundColor: COLORS.navy, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  countPillText: { color: '#fff', fontWeight: '700', fontSize: 11.5 },

  projectRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  projectIconWrap: { width: 38, height: 38, borderRadius: 10, backgroundColor: COLORS.lightBlue, alignItems: 'center', justifyContent: 'center' },
  projectName: { color: COLORS.navy, fontWeight: '700', fontSize: 13.5 },
  statusRow: { flexDirection: 'row', alignItems: 'center', marginTop: 3 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { color: COLORS.gray, fontSize: 11 },
  projectAmount: { color: COLORS.navy, fontWeight: '700', fontSize: 13 },
  rowDivider: { height: 1, backgroundColor: COLORS.border },

  viewAllBtn: { alignItems: 'center', paddingTop: 14 },
  viewAllText: { color: COLORS.navy, fontWeight: '700', fontSize: 12.5 },

  podiumRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginTop: 26 },
  podiumCol: { alignItems: 'center', width: (width - 90) / 3 },
  podiumAmount: { color: COLORS.navy, fontWeight: '700', fontSize: 12, marginBottom: 6 },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -20,
    zIndex: 2,
    borderWidth: 3,
    borderColor: '#fff',
  },
  avatarFirst: { width: 62, height: 62, borderRadius: 31, borderColor: COLORS.green, borderWidth: 3 },
  avatarInitials: { color: COLORS.navy, fontWeight: '700', fontSize: 14 },
  podiumBase: { width: '100%', borderRadius: 12, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 24 },
  rankBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  rankBadgeText: { color: COLORS.navy, fontWeight: '800', fontSize: 11 },
  podiumName: { marginTop: 8, color: COLORS.navy, fontWeight: '700', fontSize: 12 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(11,37,69,0.5)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, width: '100%' },
  modalTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy, marginBottom: 8 },
  modalSub: { color: COLORS.gray, fontSize: 12.5, lineHeight: 18, marginBottom: 16 },
  modalClose: { backgroundColor: COLORS.navy, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  modalCloseText: { color: '#fff', fontWeight: '700' },
});