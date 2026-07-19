import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Svg, { Line, Polyline, Circle } from 'react-native-svg';
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
  greenLight: '#E3F5EA',
  red: '#D64545',
  redLight: '#FBE7E7',
  yellow: '#E8A500',
  yellowLight: '#FBF0D9',
  gray: '#8A94A6',
  border: '#EDF1F7',
};

// ---- Data per period (drives the whole screen) ----
const PERIODS = [
  {
    label: 'H1\n2023',
    revenue: 1500000,
    expenses: 649000,
    net: 875000,
    margin: 57.4,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    netProfit: [30, 40, 38, 60, 72, 78],
    revenueTrend: [40, 50, 48, 68, 82, 88],
    expenseTrend: [18, 22, 24, 28, 32, 35],
    sectors: [
      { code: 'AI', name: 'AI Solutions', rev: 450, exp: 171, margin: 62.0, color: '#0B2545', tag: 'green' },
      { code: 'AD', name: 'App Dev', rev: 320, exp: 134, margin: 58.1, color: '#1E8E5A', tag: 'green' },
      { code: 'CS', name: 'Cloud Storage', rev: 280, exp: 140, margin: 50.0, color: '#8B1E2D', tag: 'yellow' },
      { code: 'SS', name: 'Server Services', rev: 150, exp: 111, margin: 26.0, color: '#8FA6C4', tag: 'red' },
    ],
    insights: [
      { text: 'AI Projects maintain the highest margin (62%), driving overall profitability.', bold: 'AI Projects', color: COLORS.navy },
      { text: 'App Dev is the fastest-growing sector, contributing significantly to net revenue with a healthy 58% margin.', bold: 'App Dev', color: COLORS.green },
      { text: 'Server Services are operating below the target margin threshold (26%). Consider reviewing operational costs or pricing structures.', bold: null, color: COLORS.red },
    ],
  },
  {
    label: 'H2\n2023',
    revenue: 1780000,
    expenses: 742000,
    net: 1038000,
    margin: 58.3,
    months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    netProfit: [42, 48, 55, 70, 85, 92],
    revenueTrend: [55, 62, 66, 80, 95, 102],
    expenseTrend: [20, 24, 26, 30, 34, 38],
    sectors: [
      { code: 'AI', name: 'AI Solutions', rev: 520, exp: 187, margin: 64.0, color: '#0B2545', tag: 'green' },
      { code: 'AD', name: 'App Dev', rev: 400, exp: 162, margin: 59.5, color: '#1E8E5A', tag: 'green' },
      { code: 'CS', name: 'Cloud Storage', rev: 310, exp: 149, margin: 51.9, color: '#8B1E2D', tag: 'yellow' },
      { code: 'SS', name: 'Server Services', rev: 190, exp: 130, margin: 31.6, color: '#8FA6C4', tag: 'yellow' },
    ],
    insights: [
      { text: 'AI Projects extended their lead with a 64% margin, now the top contributor to net profit.', bold: 'AI Projects', color: COLORS.navy },
      { text: 'App Dev scaled revenue further while holding a strong 59.5% margin.', bold: 'App Dev', color: COLORS.green },
      { text: 'Server Services improved slightly to 31.6% margin but remain the weakest performer.', bold: null, color: COLORS.red },
    ],
  },
  {
    label: 'Q1\n2024',
    revenue: 960000,
    expenses: 398000,
    net: 562000,
    margin: 58.5,
    months: ['Jan', 'Feb', 'Mar'],
    netProfit: [45, 58, 70],
    revenueTrend: [58, 72, 88],
    expenseTrend: [20, 24, 27],
    sectors: [
      { code: 'AI', name: 'AI Solutions', rev: 300, exp: 105, margin: 65.0, color: '#0B2545', tag: 'green' },
      { code: 'AD', name: 'App Dev', rev: 230, exp: 92, margin: 60.0, color: '#1E8E5A', tag: 'green' },
      { code: 'CS', name: 'Cloud Storage', rev: 175, exp: 86, margin: 50.9, color: '#8B1E2D', tag: 'yellow' },
      { code: 'SS', name: 'Server Services', rev: 110, exp: 79, margin: 28.2, color: '#8FA6C4', tag: 'red' },
    ],
    insights: [
      { text: 'AI Projects opened the year strong with a 65% margin, the highest yet.', bold: 'AI Projects', color: COLORS.navy },
      { text: 'App Dev continues steady growth with a healthy 60% margin.', bold: 'App Dev', color: COLORS.green },
      { text: 'Server Services dipped to 28.2% margin. Consider reviewing operational costs or pricing structures.', bold: null, color: COLORS.red },
    ],
  },
];

function money(n) {
  return `$${n.toLocaleString('en-US')}`;
}

function chartPoints(data, w, h, max) {
  if (data.length === 1) return `0,${h - (data[0] / max) * h} ${w},${h - (data[0] / max) * h}`;
  const step = w / (data.length - 1);
  return data.map((v, i) => `${i * step},${h - (v / max) * h}`).join(' ');
}

const CHART_W = width - 80;
const CHART_H = 110;
const MAX = 110;

const RING_SIZE = 150;
const RING_STROKE = 10;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function buildReportHTML(period) {
  const rows = period.sectors
    .map(
      (s) => `<tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${s.name}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">$${s.rev}k</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">$${s.exp}k</td>
        <td style="padding:8px;border-bottom:1px solid #eee;">${s.margin.toFixed(1)}%</td>
      </tr>`
    )
    .join('');

  return `
  <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family:-apple-system,Helvetica,Arial,sans-serif;color:#0B2545;padding:24px;">
      <h1 style="margin-bottom:0;">Profit Analysis</h1>
      <p style="color:#8A94A6;margin-top:4px;">${period.label.replace('\n', ' ')}</p>

      <h2>Overall Profit (Net)</h2>
      <p>Revenue: <b style="color:#1E8E5A;">${money(period.revenue)}</b></p>
      <p>Expenses: <b style="color:#D64545;">${money(period.expenses)}</b></p>
      <p>Net Profit: <b style="font-size:20px;">${money(period.net)}</b></p>
      <p>Margin: <b>${period.margin}%</b></p>

      <h2>Profit by Sector</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #0B2545;">Sector</th>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #0B2545;">Revenue</th>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #0B2545;">Expenses</th>
          <th style="text-align:left;padding:8px;border-bottom:2px solid #0B2545;">Margin</th>
        </tr>
        ${rows}
      </table>

      <h2>Investment Insight</h2>
      ${period.insights.map((i) => `<p>${i.text}</p>`).join('')}
    </body>
  </html>`;
}

export default function ProfitAnalysis() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [sortDesc, setSortDesc] = useState(true);
  const [exporting, setExporting] = useState(false);

  const period = PERIODS[activeTab];

  const sortedSectors = useMemo(() => {
    const arr = [...period.sectors];
    arr.sort((a, b) => (sortDesc ? b.margin - a.margin : a.margin - b.margin));
    return arr;
  }, [period, sortDesc]);

  const handleExport = async () => {
    try {
      setExporting(true);
      const html = buildReportHTML(period);
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Export Profit Analysis',
          UTI: 'com.adobe.pdf',
        });
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
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('HomeScreen');
            }
          }}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profit Analysis</Text>
        <TouchableOpacity>
          <Ionicons name="open-outline" size={20} color={COLORS.navy} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Executive Access Verified */}
        <View style={styles.accessCard}>
          <Ionicons name="lock-closed" size={18} color={COLORS.navy} style={{ marginRight: 10 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.accessTitle}>Executive Access Verified</Text>
            <Text style={styles.accessSub}>Sensitive financial data decrypted for your session.</Text>
          </View>
          <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {PERIODS.map((p, i) => (
            <TouchableOpacity
              key={p.label}
              style={[styles.tab, activeTab === i && styles.tabActive]}
              onPress={() => setActiveTab(i)}
            >
              <Text style={[styles.tabText, activeTab === i && styles.tabTextActive]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.calendarBtn}>
            <Ionicons name="calendar-outline" size={18} color={COLORS.navy} />
          </TouchableOpacity>
        </View>

        {/* Overall Profit */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Overall Profit (Net)</Text>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.label}>Revenue</Text>
              <Text style={[styles.value, { color: COLORS.green }]}>{money(period.revenue)}</Text>
            </View>
            <Text style={styles.opSign}>—</Text>
            <View>
              <Text style={styles.label}>Expenses</Text>
              <Text style={[styles.value, { color: COLORS.red }]}>{money(period.expenses)}</Text>
            </View>
            <Text style={styles.opSign}>=</Text>
          </View>

          <Text style={[styles.label, { marginTop: 14 }]}>Net Profit</Text>
          <Text style={styles.netProfit}>{money(period.net)}</Text>

          <View style={styles.marginPill}>
            <Ionicons name="trending-up" size={13} color={COLORS.green} />
            <Text style={styles.marginPillText}>  {period.margin}% Margin</Text>
          </View>

          <View style={styles.ringWrap}>
            <Svg width={RING_SIZE} height={RING_SIZE}>
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                stroke="#E3ECFA"
                strokeWidth={RING_STROKE}
                fill="none"
              />
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                stroke={COLORS.green}
                strokeWidth={RING_STROKE}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${RING_CIRCUMFERENCE}, ${RING_CIRCUMFERENCE}`}
                strokeDashoffset={RING_CIRCUMFERENCE * (1 - period.margin / 100)}
                rotation={-90}
                origin={`${RING_SIZE / 2}, ${RING_SIZE / 2}`}
              />
            </Svg>
            <View style={styles.ringLabelWrap}>
              <Text style={styles.ringLabel}>Profit Share</Text>
              <Text style={styles.ringValue}>{period.margin}%</Text>
            </View>
          </View>
        </View>

        {/* Profit by Sector */}
        <View style={styles.card}>
          <View style={styles.rowBetweenHead}>
            <Text style={styles.sectionTitle}>Profit by Sector</Text>
            <TouchableOpacity onPress={() => setSortDesc((v) => !v)}>
              <Ionicons name="filter-outline" size={18} color={COLORS.gray} />
            </TouchableOpacity>
          </View>

          {sortedSectors.map((s, idx) => (
            <View key={s.code}>
              <View style={styles.sectorRow}>
                <View style={[styles.sectorIcon, { backgroundColor: s.color }]}>
                  <Text style={styles.sectorIconText}>{s.code}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.sectorName}>{s.name}</Text>
                  <Text style={styles.sectorSub}>${s.rev}k Rev - ${s.exp}k Exp</Text>
                </View>
                <View
                  style={[
                    styles.marginTag,
                    {
                      backgroundColor:
                        s.tag === 'green' ? COLORS.greenLight : s.tag === 'yellow' ? COLORS.yellowLight : COLORS.redLight,
                    },
                  ]}
                >
                  <Text
                    style={{
                      color: s.tag === 'green' ? COLORS.green : s.tag === 'yellow' ? '#B8860B' : COLORS.red,
                      fontWeight: '700',
                      fontSize: 12,
                    }}
                  >
                    {s.margin.toFixed(1)}%
                  </Text>
                </View>
              </View>
              {idx !== sortedSectors.length - 1 && <View style={styles.rowDivider} />}
            </View>
          ))}

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.green }]} />
              <Text style={styles.legendText}>{'>'}50%{'\n'}Margin</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.yellow }]} />
              <Text style={styles.legendText}>30-50%{'\n'}Margin</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: COLORS.red }]} />
              <Text style={styles.legendText}>{'<'}30%{'\n'}Margin</Text>
            </View>
          </View>
        </View>

        {/* Investment Insight */}
        <View style={styles.card}>
          <View style={styles.insightHeader}>
            <Ionicons name="bulb-outline" size={17} color={COLORS.navy} />
            <Text style={[styles.sectionTitle, { marginLeft: 6 }]}>Investment Insight</Text>
          </View>
          {period.insights.map((ins, i) => (
            <Text key={i} style={[styles.insightText, { color: ins.color }]}>
              {ins.bold ? <Text style={[styles.bold, { color: ins.color }]}>{ins.bold}</Text> : null}
              {ins.bold ? ins.text.replace(ins.bold, '') : ins.text}
            </Text>
          ))}
        </View>

        {/* 6-Month Trend */}
        <View style={styles.card}>
          <View style={styles.rowBetweenHead}>
            <Text style={styles.sectionTitle}>6-Month Combined Trend</Text>
            <Ionicons name="ellipsis-horizontal" size={16} color={COLORS.gray} />
          </View>

          <Svg width={CHART_W} height={CHART_H + 20}>
            {[0, 1, 2, 3].map((i) => (
              <Line key={i} x1={0} y1={(CHART_H / 3) * i} x2={CHART_W} y2={(CHART_H / 3) * i} stroke="#EEF1F6" strokeWidth={1} />
            ))}
            <Polyline points={chartPoints(period.revenueTrend, CHART_W, CHART_H, MAX)} fill="none" stroke={COLORS.green} strokeWidth={2.5} />
            <Polyline points={chartPoints(period.netProfit, CHART_W, CHART_H, MAX)} fill="none" stroke="#0F5132" strokeWidth={2.5} />
            <Polyline
              points={chartPoints(period.expenseTrend, CHART_W, CHART_H, MAX)}
              fill="none"
              stroke={COLORS.red}
              strokeWidth={2}
              strokeDasharray="4,4"
            />
          </Svg>

          <View style={styles.monthsRow}>
            {period.months.map((m) => (
              <Text key={m} style={styles.monthText}>{m}</Text>
            ))}
          </View>

          <View style={styles.chartLegend}>
            <View style={styles.legendItem}>
              <View style={[styles.lineDot, { backgroundColor: '#0F5132' }]} />
              <Text style={styles.legendSmallText}>Net Profit</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.lineDot, { backgroundColor: COLORS.green }]} />
              <Text style={styles.legendSmallText}>Revenue</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.lineDot, { backgroundColor: COLORS.red }]} />
              <Text style={styles.legendSmallText}>Expenses</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.exportBtn} onPress={handleExport} disabled={exporting}>
          <Ionicons name="download-outline" size={16} color={COLORS.green} style={{ marginRight: 8 }} />
          <Text style={styles.exportText}>{exporting ? 'Preparing PDF…' : 'Export Profit Analysis as PDF'}</Text>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.navy },
  scroll: { paddingHorizontal: 14, paddingBottom: 30 },

  accessCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.navy,
    marginBottom: 14,
  },
  accessTitle: { fontWeight: '700', color: COLORS.navy, fontSize: 13.5 },
  accessSub: { color: COLORS.gray, fontSize: 11.5, marginTop: 2 },

  tabsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    borderRadius: 30,
    padding: 5,
    alignItems: 'center',
    marginBottom: 14,
  },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 24, alignItems: 'center' },
  tabActive: { backgroundColor: COLORS.navy },
  tabText: { color: COLORS.navy, fontSize: 11.5, textAlign: 'center', fontWeight: '600' },
  tabTextActive: { color: '#fff' },
  calendarBtn: { paddingHorizontal: 10 },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.navy },
  rowBetween: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 },
  rowBetweenHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  label: { color: COLORS.gray, fontSize: 12 },
  value: { fontSize: 15, fontWeight: '700', marginTop: 2 },
  opSign: { color: COLORS.gray, fontSize: 16, marginHorizontal: 14, marginBottom: 6 },
  netProfit: { fontSize: 26, fontWeight: '800', color: COLORS.navy, marginTop: 2 },
  marginPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.greenLight,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
  },
  marginPillText: { color: COLORS.green, fontWeight: '700', fontSize: 12.5 },
  ringWrap: { alignItems: 'center', marginTop: 22 },
  ringLabelWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  ringLabel: { color: COLORS.gray, fontSize: 12 },
  ringValue: { color: COLORS.navy, fontSize: 20, fontWeight: '800', marginTop: 4 },

  sectorRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  sectorIcon: { width: 38, height: 38, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectorIconText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  sectorName: { color: COLORS.navy, fontWeight: '700', fontSize: 13.5 },
  sectorSub: { color: COLORS.gray, fontSize: 11.5, marginTop: 2 },
  marginTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14 },
  rowDivider: { height: 1, backgroundColor: COLORS.border },

  legendRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 14 },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  legendText: { color: COLORS.gray, fontSize: 10.5, lineHeight: 13 },

  insightHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  insightText: { fontSize: 12.5, lineHeight: 19, marginBottom: 10 },
  bold: { fontWeight: '700' },

  monthsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  monthText: { color: COLORS.gray, fontSize: 10.5 },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', marginTop: 14, gap: 18 },
  lineDot: { width: 16, height: 3, borderRadius: 2, marginRight: 6 },
  legendSmallText: { color: COLORS.gray, fontSize: 11 },

  exportBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.green,
    borderRadius: 30,
    paddingVertical: 14,
    marginTop: 4,
  },
  exportText: { color: COLORS.green, fontWeight: '700', fontSize: 13.5 },
});