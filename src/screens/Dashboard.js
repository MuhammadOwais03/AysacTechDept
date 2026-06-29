import React, { useRef, useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Animated, Dimensions, StatusBar, FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavbar';
import { LinearGradient } from 'expo-linear-gradient';

const { width: W, height: H } = Dimensions.get('window');
const ITEM_HEIGHT = 80;
const ORB_SIZE    = 300;

const BASE = [
  { id: '1',   title: 'SaaS Migration',       subtitle: 'TECHCORP INC.',       dot: '#FF5252', urgent: false },
  { id: '2',   title: 'Cloud Infrastructure', subtitle: 'NEBULA SYSTEMS',       dot: '#4A90D9', urgent: false },
  { id: '3',   title: 'Q4 Strategy Rollout',  subtitle: 'ALPHA FORCE · URGENT', dot: '#FF9800', urgent: true  },
  { id: '4',   title: 'Network Security',     subtitle: 'CYBERSHIELD CO.',      dot: '#4CAF50', urgent: false },
  { id: '5',   title: 'Data Analytics',       subtitle: 'GLOBAL TRENDS',        dot: '#9E9E9E', urgent: false },
  { id: 'add', title: 'Add New Project',      subtitle: 'SLOT OPENED',          dot: '#4A90D9', urgent: false, isAdd: true },
];
const N    = BASE.length;
const DATA = [
  ...BASE.map(p => ({ ...p, uid: `a-${p.id}` })),
  ...BASE.map(p => ({ ...p, uid: `b-${p.id}` })),
  ...BASE.map(p => ({ ...p, uid: `c-${p.id}` })),
];
const START = N;

export default function Dashboard() {
  const navigation = useNavigation();
  const listRef    = useRef(null);
  const scrollAnim = useRef(new Animated.Value(START * ITEM_HEIGHT)).current;
  const [active,  setActive]  = useState(START);
  const [isBrown, setIsBrown] = useState(false);

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: START, animated: false });
  }, []);

  const orbSpin = scrollAnim.interpolate({
    inputRange: [0, ITEM_HEIGHT * N],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'extend',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollAnim } } }],
    {
      useNativeDriver: false,
      listener: (e) => {
        const idx = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
        setActive(idx);
      },
    }
  );

  const onMomentumEnd = (e) => {
    const raw    = Math.round(e.nativeEvent.contentOffset.y / ITEM_HEIGHT);
    const slot   = ((raw % N) + N) % N;
    const target = START + slot;
    if (target !== raw) {
      scrollAnim.setValue(scrollAnim._value + (target - raw) * ITEM_HEIGHT);
      listRef.current?.scrollToIndex({ index: target, animated: false });
      setActive(target);
    }
  };

  const renderItem = ({ item, index }) => {
    const dist     = Math.abs(index - active);
    const isActive = dist === 2;
const opacity = isActive ? 1 : dist === 1 ? 0.95 : 0.85;
const cardH   = isActive ? 70 : dist === 1 ? 64 : 60;
const fs      = isActive ? 16 : dist === 1 ? 14 : 13;
const bg      = isActive
  ? 'rgba(255,255,255,0.88)'
  : dist === 1
  ? 'rgba(255,255,255,0.52)'
  : 'rgba(255,255,255,0.30)';

    const cardContent = (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14 }}>
        {item.isAdd
          ? <View style={[styles.addCircle, isActive && { borderColor: '#2967b8' }]}>
              <Text style={[styles.addPlus, isActive && { color: '#3A78C9' }]}>+</Text>
            </View>
          : <View style={[styles.dot, { backgroundColor: item.dot }]} />
        }
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { fontSize: fs }, isActive && styles.titleActive]} numberOfLines={1}>
            {item.title}
          </Text>
          {dist <= 4 &&
  <Text style={[styles.sub, isActive && styles.subActive]} numberOfLines={1}>
              {item.subtitle}
            </Text>
          }
        </View>
        {item.urgent && <View style={styles.urgentDot} />}
        {isActive    && <View style={styles.activeDot} />}
      </View>
    );

    const borderRadius = {
      borderTopLeftRadius: 40,
      borderBottomLeftRadius: 40,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };

    return (
      <View style={{ height: ITEM_HEIGHT, justifyContent: 'center', paddingHorizontal: 14 }}>
        {isActive ? (
          <LinearGradient
            colors={["rgba(0, 210, 255, 0.8)", "rgba(58, 123, 213, 0.4)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ ...borderRadius, padding: 1.5, opacity }}
          >
            <View style={{ height: cardH, backgroundColor: bg, ...borderRadius, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
              {cardContent}
            </View>
          </LinearGradient>
        ) : (
          <View style={{ height: cardH, backgroundColor: bg, opacity, ...borderRadius, overflow: 'hidden', flexDirection: 'row', alignItems: 'center' }}>
            {cardContent}
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.top}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Rankings')}>
            <View style={styles.bars}>
              <View style={[styles.bar, { height: 7 }]} />
              <View style={[styles.bar, { height: 13 }]} />
              <View style={[styles.bar, { height: 9 }]} />
            </View>
          </TouchableOpacity>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.dashLabel}>DASHBOARD</Text>
            <View style={styles.levelRow}>
              <Text style={styles.lvl}>LVL 24</Text>
              <View style={styles.pBar}><View style={[styles.pFill, { width: '65%' }]} /></View>
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={[styles.iconBtn, { marginRight: 8 }]}>
              <Ionicons name="add" size={18} color="#5A7A99" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={17} color="#5A7A99" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.timeRow}>
          <View>
            <TouchableOpacity onPress={() => setIsBrown(!isBrown)}>
              <Text style={[styles.clock, isBrown && { color: '#4A1E1B' }]}>08:00</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(isBrown ? 'DutyOff' : 'DutyOn')}>
              <Text style={[styles.date, isBrown && { color: '#633A37' }]}>TUE, OCT 24</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pills}>
            <View style={styles.pill}>
              <View style={[styles.pillDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.pillTxt}>10/10</Text>
            </View>
            <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('Wallet')}>
              <View style={[styles.pillDot, { backgroundColor: '#86baf2' }]} />
              <Text style={styles.pillTxt}>$1,000</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>WEEKLY SALES GOAL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 }}>
            <Text style={styles.goalAmt}>$5,000</Text>
            <Text style={styles.goalTotal}> / $10,000</Text>
            <View style={styles.pctBadge}><Text style={styles.pctTxt}>50%</Text></View>
          </View>
          <View style={styles.gBar}><View style={[styles.gFill, { width: '50%' }]} /></View>
        </View>
      </View>

      {/* PROJECTS */}
      <View style={styles.projects}>
        {/* Orb: bottom-left, half off screen, fixed, only rotates */}
        <Animated.Image
          source={require('../../assets/Animations.png')}
          style={[styles.orb, { transform: [{ rotate: orbSpin }] }]}
          resizeMode="cover"
        />
        <FlatList
          ref={listRef}
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.uid}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          onScroll={onScroll}
          onMomentumScrollEnd={onMomentumEnd}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingBottom: 120 }}
          getItemLayout={(_, i) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * i, index: i })}
          initialScrollIndex={START}
          style={{ zIndex: 2 }}
        />
      </View>

      <BottomNavBar navigation={navigation} activeTab="Center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#b7d9ea' },
  top:       { paddingTop: 52, paddingHorizontal: 16, paddingBottom: 10 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  iconBtn:   { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.45)', alignItems: 'center', justifyContent: 'center' },
  bars:      { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  bar:       { width: 4, backgroundColor: '#4A6A85', borderRadius: 1 },
  dashLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5, color: '#4A6A85' },
  levelRow:  { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  lvl:       { fontSize: 9, fontWeight: '700', color: '#3A78C9' },
  pBar:      { width: 52, height: 4, backgroundColor: 'rgba(58,120,201,0.2)', borderRadius: 2 },
  pFill:     { height: '100%', backgroundColor: '#3A78C9', borderRadius: 2 },
  timeRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 },
  clock:     { fontSize: 60, fontWeight: '200', color: '#0D1B2A', letterSpacing: -4 },
  date:      { fontSize: 11, fontWeight: '700', color: '#4A6A85', letterSpacing: 1.8, marginTop: -6 },
  pills:     { flexDirection: 'row', gap: 8, alignSelf: 'flex-end', marginBottom: 2 },
  pill:      { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.65)', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 22 },
  pillDot:   { width: 7, height: 7, borderRadius: 3.5 },
  pillTxt:   { fontSize: 12, fontWeight: '700', color: '#1A4A80' },
  goalCard:  { backgroundColor: 'rgba(255,255,255,0.78)', borderRadius: 20, padding: 16 },
  goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.8, color: '#8AACCA', marginBottom: 8 },
  goalAmt:   { fontSize: 28, fontWeight: '700', color: '#0D1B2A' },
  goalTotal: { fontSize: 13, color: '#8AACCA', fontWeight: '500', flex: 1, marginLeft: 4 },
  pctBadge:  { backgroundColor: '#3A78C9', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 5 },
  pctTxt:    { color: '#fff', fontSize: 12, fontWeight: '800' },
  gBar:      { height: 5, backgroundColor: 'rgba(58,120,201,0.15)', borderRadius: 2.5 },
  gFill:     { height: '100%', backgroundColor: '#3A78C9', borderRadius: 2.5 },

  projects: { flex: 1, marginTop: 10, overflow: 'hidden' },

  // Orb bottom-left, half off screen — position absolute, does NOT move
  orb: {
    position: 'absolute',
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    bottom: 150,
    left: -(ORB_SIZE * 0.55),
    zIndex: 0,
    opacity: 0.75,
  },

  dot:         { width: 9, height: 9, borderRadius: 4.5, marginRight: 12 },
  title:       { fontWeight: '600', color: 'rgba(255,255,255,0.65)' },
  titleActive: { color: '#0D1B2A', fontWeight: '700' },
sub: { fontSize: 9, fontWeight: '700', color: 'rgba(80,120,160,0.85)', marginTop: 2, letterSpacing: 0.5 },
  subActive:   { color: '#3A78C9', fontSize: 10 },
  activeDot:   { width: 8, height: 8, borderRadius: 4, backgroundColor: '#3A78C9', marginLeft: 10 },
  addCircle:   { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: 'rgba(255,255,255,0.4)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  addPlus:     { fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 22 },
});