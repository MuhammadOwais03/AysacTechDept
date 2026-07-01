import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, StatusBar, Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const theme = {
  background: '#F0F8FF',
  card: '#FFFFFF',
  cardBorder: '#E1E9F5',
  text: '#000000',
  textSub: '#666666',
  accent: '#3393f9',
};

const DAYS = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const MONTHS = ['January','February','March','April','May','June',
  'July','August','September','October','November','December'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function ProjectTimeline() {
  const navigation = useNavigation();
  const [year, setYear]   = useState(2026);
  const [month, setMonth] = useState(1); // February
  const [selected, setSelected] = useState(5);

  const startDate = 'Jan 15, 2026';
  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDay(year, month);
  const endLabel     = `Feb ${String(selected).padStart(2,'0')}, ${year}`;

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <View style={s.root}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
          <Ionicons name="arrow-back" size={22} color={theme.text} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Set Project Timeline</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* Section title */}
        <Text style={s.sectionTitle}>Select End Date</Text>
        <Text style={s.sectionSub}>Choose the final deadline for this project</Text>

        {/* Calendar card */}
        <View style={s.card}>
          {/* Month nav */}
          <View style={s.monthRow}>
            <TouchableOpacity onPress={prevMonth} style={s.arrowBtn}>
              <Ionicons name="chevron-back" size={18} color={theme.accent} />
            </TouchableOpacity>
            <Text style={s.monthLabel}>{MONTHS[month]} {year}</Text>
            <TouchableOpacity onPress={nextMonth} style={s.arrowBtn}>
              <Ionicons name="chevron-forward" size={18} color={theme.accent} />
            </TouchableOpacity>
          </View>

          {/* Day headers */}
          <View style={s.dayRow}>
            {DAYS.map(d => (
              <Text key={d} style={s.dayLabel}>{d}</Text>
            ))}
          </View>

          {/* Date grid */}
          {Array.from({ length: cells.length / 7 }, (_, wi) => (
            <View key={wi} style={s.weekRow}>
              {cells.slice(wi * 7, wi * 7 + 7).map((day, di) => {
                const isSelected = day === selected;
                return (
                  <TouchableOpacity
                    key={di}
                    style={[s.dayCell, isSelected && s.dayCellSelected]}
                    onPress={() => day && setSelected(day)}
                    activeOpacity={day ? 0.7 : 1}
                  >
                    {day ? (
                      <Text style={[s.dayNum, isSelected && s.dayNumSelected]}>
                        {day}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>

        {/* Timeline summary */}
        <View style={[s.card, s.summaryCard]}>
          <View style={s.summaryHeader}>
            <Ionicons name="calendar-outline" size={16} color={theme.accent} />
            <Text style={s.summaryTitle}> Timeline Summary</Text>
          </View>

          <View style={s.summaryRow}>
            <View style={s.summaryCol}>
              <Text style={s.summaryKey}>START DATE</Text>
              <View style={s.summaryValRow}>
                <Ionicons name="square-outline" size={13} color={theme.textSub} />
                <Text style={s.summaryVal}> {startDate}</Text>
              </View>
            </View>
            <View style={s.summaryCol}>
              <Text style={[s.summaryKey, { color: theme.accent }]}>END DATE</Text>
              <View style={s.summaryValRow}>
                <Ionicons name="refresh-circle-outline" size={14} color={theme.accent} />
                <Text style={[s.summaryVal, { color: theme.accent, fontWeight: '700' }]}> {endLabel}</Text>
              </View>
            </View>
          </View>

          <View style={s.divider} />

          <View style={s.durationRow}>
            <Ionicons name="time-outline" size={16} color={theme.textSub} />
            <View style={{ marginLeft: 8 }}>
              <Text style={s.durationLabel}>Duration</Text>
              <Text style={s.durationVal}>21 Working Days</Text>
            </View>
          </View>
        </View>

        {/* Banner image placeholder */}
        <View style={s.banner}>
          <View style={s.bannerOverlay} />
        </View>

      </ScrollView>

      {/* CTA */}
      <View style={s.ctaWrapper}>
        <TouchableOpacity style={s.ctaBtn} activeOpacity={0.85}>
          <Text style={s.ctaText}>Update Timeline</Text>
          <Ionicons name="checkmark-circle-outline" size={20} color="#fff" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const CELL = 40;

const s = StyleSheet.create({
  root:       { flex: 1, backgroundColor: theme.background },
  scroll:     { paddingHorizontal: 16, paddingBottom: 100 },

  header:     { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: 52, paddingBottom: 12, paddingHorizontal: 16,
                backgroundColor: theme.background },
  backBtn:    { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle:{ fontSize: 17, fontWeight: '700', color: theme.text },

  sectionTitle:{ fontSize: 20, fontWeight: '700', color: theme.text, marginTop: 8, marginBottom: 4 },
  sectionSub:  { fontSize: 13, color: theme.textSub, marginBottom: 16 },

  card:       { backgroundColor: theme.card, borderRadius: 10, padding: 16,
                borderWidth: 1, borderColor: theme.cardBorder,
                marginBottom: 14,
                shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 },
                elevation: 2 },

  monthRow:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  arrowBtn:   { padding: 4 },
  monthLabel: { fontSize: 15, fontWeight: '700', color: theme.text },

  dayRow:     { flexDirection: 'row', marginBottom: 6 },
  dayLabel:   { flex: 1, textAlign: 'center', fontSize: 11, fontWeight: '600', color: theme.textSub },

  weekRow:    { flexDirection: 'row', marginBottom: 4 },
  dayCell:    { flex: 1, height: CELL, alignItems: 'center', justifyContent: 'center', borderRadius: CELL / 3 },
  dayCellSelected: { backgroundColor: theme.accent },
  dayNum:     { fontSize: 14, color: theme.text },
  dayNumSelected: { color: '#fff', fontWeight: '700' },

  summaryCard: { },
  summaryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  summaryTitle:  { fontSize: 15, fontWeight: '700', color: theme.text },

  summaryRow:    { flexDirection: 'row' },
  summaryCol:    { flex: 1 },
  summaryKey:    { fontSize: 10, fontWeight: '700', color: theme.textSub, letterSpacing: 0.8, marginBottom: 4 },
  summaryValRow: { flexDirection: 'row', alignItems: 'center' },
  summaryVal:    { fontSize: 13, color: theme.text },

  divider:       { height: 1, backgroundColor: theme.cardBorder, marginVertical: 12 },
  durationRow:   { flexDirection: 'row', alignItems: 'center' },
  durationLabel: { fontSize: 11, color: theme.textSub },
  durationVal:   { fontSize: 14, fontWeight: '700', color: theme.text },

  banner:        { height: 110, borderRadius: 10, backgroundColor: '#d0e8f5', overflow: 'hidden', marginBottom: 8 },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(200,225,245,0.4)' },

  ctaWrapper:    { position: 'absolute', bottom: 0, left: 0, right: 0,
                   padding: 16, paddingBottom: 32, backgroundColor: theme.background },
  ctaBtn:        { backgroundColor: theme.accent, borderRadius: 14, height: 52,
                   flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  ctaText:       { color: '#fff', fontSize: 16, fontWeight: '700' },
});