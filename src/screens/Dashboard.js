import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  Easing,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavbar';

const { width: W } = Dimensions.get('window');

const ITEM_HEIGHT = 91; 
const ORB_SIZE = 56;
const ORB_OFFSET = (ITEM_HEIGHT - ORB_SIZE) / 2;

const PROJECTS = [
  { id: '1', title: 'SaaS Migration', subtitle: 'TECHCORP INC.', dot: '#FF5252', urgent: false },
  { id: '2', title: 'Cloud Infrastructure', subtitle: 'NEBULA SYSTEMS', dot: '#4A90D9', urgent: false },
  { id: '3', title: 'Q4 Strategy Rollout', subtitle: 'ALPHA FORCE · URGENT', dot: '#FF9800', urgent: true },
  { id: '4', title: 'Network Security', subtitle: 'CYBERSHIELD CO.', dot: '#4CAF50', urgent: false },
  { id: '5', title: 'Data Analytics', subtitle: 'GLOBAL TRENDS', dot: '#9E9E9E', urgent: false },
  { id: 'add', title: 'Add New Project', subtitle: 'SLOT OPENED', dot: '#4A90D9', urgent: false, isAdd: true },
];

function PaginationOrb() {
  const pulseAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(rotateAnim, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
    ).start();
  }, []);

  const scale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
  const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.orbContainer}>
      <Animated.View style={[styles.orbPulse, { transform: [{ scale }] }]} />
      <Animated.View style={[styles.orbRing, { transform: [{ rotate: spin }] }]}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={[styles.orbRingLine, { transform: [{ rotate: `${i * 45}deg` }] }]} />
        ))}
      </Animated.View>
      <View style={styles.orbCore}>
        <View style={styles.orbInner} />
      </View>
    </View>
  );
}

export default function Dashboard() {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const [activeIndex, setActiveIndex] = useState(0);
  // Persistent color state for the toggle logic
  const [isBrown, setIsBrown] = useState(false);

  const orbTranslateY = scrollY.interpolate({
    inputRange: PROJECTS.map((_, i) => i * ITEM_HEIGHT),
    outputRange: PROJECTS.map((_, i) => (i * ITEM_HEIGHT) + ORB_OFFSET),
    extrapolate: 'clamp',
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const index = Math.round(offsetY / ITEM_HEIGHT);
        if (index !== activeIndex && index >= 0 && index < PROJECTS.length) {
          setActiveIndex(index);
        }
      },
    }
  );

  const renderItem = ({ item, index }) => {
    const isActive = index === activeIndex;
    if (item.isAdd) {
      return (
        <TouchableOpacity style={[styles.addCard, isActive && styles.projectCardActive]} activeOpacity={0.8}>
          <View style={styles.addCircle}><Text style={styles.addPlus}>+</Text></View>
          <View>
            <Text style={[styles.addTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
            <Text style={[styles.addSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <View style={[styles.projectCard, isActive && styles.projectCardActive]}>
        <View style={[styles.projectDot, { backgroundColor: item.dot }]} />
        <View style={styles.projectInfo}>
          <Text style={[styles.projectTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
          <Text style={[styles.projectSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
        </View>
        {item.urgent && <View style={styles.urgentBadge} />}
        {isActive && <View style={styles.activeBadge} />}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          {/* BAR CHART ICON: Now navigates to Rankings */}
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => navigation.navigate('Rankings')}
          >
            <View style={styles.barChart}>
                <View style={[styles.bar, { height: 8 }]} />
                <View style={[styles.bar, { height: 14 }]} />
                <View style={[styles.bar, { height: 10 }]} />
            </View>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.dashboardLabel}>DASHBOARD</Text>
            <View style={styles.levelRow}>
              <Text style={styles.levelText}>LVL 24</Text>
              <View style={styles.progressBar}><View style={[styles.progressFill, { width: '65%' }]} /></View>
            </View>
          </View>

          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={20} color="#5A7A99" />
          </TouchableOpacity>
        </View>

        <View style={styles.timeRow}>
          <View>
            {/* TIME: Toggles color between Black and Dark Brown */}
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={() => setIsBrown(!isBrown)}
            >
              <Text style={[
                styles.clockText, 
                isBrown && { color: '#4A1E1B' } 
              ]}>
                08:00
              </Text>
            </TouchableOpacity>

            {/* DATE: Navigation Logic based on current color */}
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={() => {
                if (isBrown) {
                  navigation.navigate('DutyOff');
                } else {
                  navigation.navigate('DutyOn');
                }
              }}
            >
              <Text style={[
                styles.dateText, 
                isBrown && { color: '#633A37' } 
              ]}>
                TUE, OCT 24
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pillsContainer}>
            <View style={styles.pill}><View style={[styles.pillDot, { backgroundColor: '#4CAF50' }]} /><Text style={styles.pillText}>10/10</Text></View>
            <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('Wallet')}><View style={[styles.pillDot, { backgroundColor: '#4A90D9' }]} /><Text style={styles.pillText}>$1,000</Text></TouchableOpacity>
          </View>
        </View>

        <View style={styles.goalCard}>
          <Text style={styles.goalLabel}>WEEKLY SALES GOAL</Text>
          <View style={styles.goalRow}>
            <Text style={styles.goalAmount}>$5,000</Text>
            <Text style={styles.goalTotal}> / $10,000</Text>
            <View style={styles.percentBadge}><Text style={styles.percentText}>50%</Text></View>
          </View>
          <View style={styles.goalProgressBar}><View style={[styles.goalProgressFill, { width: '50%' }]} /></View>
        </View>
      </View>

      <View style={styles.projectsSection}>
        <View style={styles.paginationTrack}>
          <View style={[styles.trackLine, { height: (PROJECTS.length - 1) * ITEM_HEIGHT }]} />
          <Animated.View style={[styles.orbWrapper, { transform: [{ translateY: orbTranslateY }] }]}>
            <PaginationOrb />
          </Animated.View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            ref={flatListRef}
            data={PROJECTS}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            snapToAlignment="start"
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={styles.listContent}
            getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
          />
        </View>
      </View>

      <BottomNavBar navigation={navigation} activeTab="Center" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#C4DDEF' },
  topSection: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
  barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
  bar: { width: 4, backgroundColor: '#5A7A99', borderRadius: 1 },
  headerCenter: { alignItems: 'center' },
  dashboardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5, color: '#5A7A99' },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  levelText: { fontSize: 9, fontWeight: '700', color: '#4A90D9' },
  progressBar: { width: 54, height: 4, backgroundColor: 'rgba(74,144,217,0.2)', borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2 },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
  clockText: { fontSize: 56, fontWeight: '200', color: '#142036', letterSpacing: -3 },
  dateText: { fontSize: 11, fontWeight: '700', color: '#5A7A99', letterSpacing: 1.8 },
  pillsContainer: { flexDirection: 'row', gap: 8 },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  pillDot: { width: 7, height: 7, borderRadius: 3.5 },
  pillText: { fontSize: 12, fontWeight: '700', color: '#1A4A80' },
  goalCard: { backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 18, padding: 16 },
  goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.6, color: '#8AACCA', marginBottom: 8 },
  goalRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  goalAmount: { fontSize: 24, fontWeight: '700', color: '#142036' },
  goalTotal: { fontSize: 13, color: '#8AACCA', fontWeight: '500', flex: 1, marginLeft: 4 },
  percentBadge: { backgroundColor: '#4A90D9', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  percentText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  goalProgressBar: { height: 5, backgroundColor: 'rgba(74,144,217,0.15)', borderRadius: 2.5 },
  goalProgressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2.5 },
  projectsSection: { flex: 1, flexDirection: 'row', marginTop: 8 },
  paginationTrack: { width: 65, alignItems: 'center' },
  trackLine: { position: 'absolute', top: ITEM_HEIGHT / 2, width: 2, backgroundColor: 'rgba(74,180,255,0.25)' },
  orbWrapper: { position: 'absolute', width: 56, alignItems: 'center' },
  orbContainer: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  orbPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(74,180,255,0.25)' },
  orbRing: { position: 'absolute', width: 48, height: 48 },
  orbRingLine: { position: 'absolute', width: 48, height: 1.5, backgroundColor: 'rgba(160,220,255,0.5)', top: 23.25 },
  orbCore: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
  orbInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ABAFF', margin: 5 },
  listContainer: { flex: 1, marginRight: 12 },
  listContent: { paddingBottom: 100 },
  projectCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
  projectCardActive: { backgroundColor: '#fff' },
  projectDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  projectInfo: { flex: 1 },
  projectTitle: { fontSize: 15, fontWeight: '600', color: 'rgba(74,111,165,0.7)' },
  projectTitleActive: { color: '#142036', fontWeight: '700' },
  projectSubtitle: { fontSize: 10, fontWeight: '700', color: 'rgba(138,172,202,0.7)' },
  projectSubtitleActive: { color: '#4A90D9' },
  urgentBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
  activeBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginLeft: 10 },
  addCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
  addCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  addPlus: { fontSize: 20, color: '#4A90D9' },
  addTitle: { fontSize: 15, fontWeight: '600', color: '#5A7A99' },
  addSubtitle: { fontSize: 10, fontWeight: '700', color: '#8AACCA' },
});