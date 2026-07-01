// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Animated,
// //   Dimensions,
// //   StatusBar,
// //   Easing,
// //   FlatList,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons';
// // import BottomNavBar from '../components/BottomNavbar';

// // const { width: W } = Dimensions.get('window');

// // const ITEM_HEIGHT = 91; 
// // const ORB_SIZE = 56;
// // const ORB_OFFSET = (ITEM_HEIGHT - ORB_SIZE) / 2;

// // const PROJECTS = [
// //   { id: '1', title: 'SaaS Migration', subtitle: 'TECHCORP INC.', dot: '#FF5252', urgent: false },
// //   { id: '2', title: 'Cloud Infrastructure', subtitle: 'NEBULA SYSTEMS', dot: '#4A90D9', urgent: false },
// //   { id: '3', title: 'Q4 Strategy Rollout', subtitle: 'ALPHA FORCE · URGENT', dot: '#FF9800', urgent: true },
// //   { id: '4', title: 'Network Security', subtitle: 'CYBERSHIELD CO.', dot: '#4CAF50', urgent: false },
// //   { id: '5', title: 'Data Analytics', subtitle: 'GLOBAL TRENDS', dot: '#9E9E9E', urgent: false },
// //   { id: 'add', title: 'Add New Project', subtitle: 'SLOT OPENED', dot: '#4A90D9', urgent: false, isAdd: true },
// // ];

// // function PaginationOrb() {
// //   const pulseAnim = useRef(new Animated.Value(0)).current;
// //   const rotateAnim = useRef(new Animated.Value(0)).current;

// //   useEffect(() => {
// //     Animated.loop(
// //       Animated.sequence([
// //         Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
// //         Animated.timing(pulseAnim, { toValue: 0, duration: 1500, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
// //       ])
// //     ).start();

// //     Animated.loop(
// //       Animated.timing(rotateAnim, { toValue: 1, duration: 6000, easing: Easing.linear, useNativeDriver: true })
// //     ).start();
// //   }, []);

// //   const scale = pulseAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.15] });
// //   const spin = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

// //   return (
// //     <View style={styles.orbContainer}>
// //       <Animated.View style={[styles.orbPulse, { transform: [{ scale }] }]} />
// //       <Animated.View style={[styles.orbRing, { transform: [{ rotate: spin }] }]}>
// //         {[...Array(4)].map((_, i) => (
// //           <View key={i} style={[styles.orbRingLine, { transform: [{ rotate: `${i * 45}deg` }] }]} />
// //         ))}
// //       </Animated.View>
// //       <View style={styles.orbCore}>
// //         <View style={styles.orbInner} />
// //       </View>
// //     </View>
// //   );
// // }

// // export default function Dashboard() {
// //   const navigation = useNavigation();
// //   const flatListRef = useRef(null);
// //   const scrollY = useRef(new Animated.Value(0)).current;
  
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   // Persistent color state for the toggle logic
// //   const [isBrown, setIsBrown] = useState(false);

// //   const orbTranslateY = scrollY.interpolate({
// //     inputRange: PROJECTS.map((_, i) => i * ITEM_HEIGHT),
// //     outputRange: PROJECTS.map((_, i) => (i * ITEM_HEIGHT) + ORB_OFFSET),
// //     extrapolate: 'clamp',
// //   });

// //   const handleScroll = Animated.event(
// //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
// //     {
// //       useNativeDriver: false,
// //       listener: (event) => {
// //         const offsetY = event.nativeEvent.contentOffset.y;
// //         const index = Math.round(offsetY / ITEM_HEIGHT);
// //         if (index !== activeIndex && index >= 0 && index < PROJECTS.length) {
// //           setActiveIndex(index);
// //         }
// //       },
// //     }
// //   );

// //   const renderItem = ({ item, index }) => {
// //     const isActive = index === activeIndex;
// //     if (item.isAdd) {
// //       return (
// //         <TouchableOpacity style={[styles.addCard, isActive && styles.projectCardActive]} activeOpacity={0.8}>
// //           <View style={styles.addCircle}><Text style={styles.addPlus}>+</Text></View>
// //           <View>
// //             <Text style={[styles.addTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
// //             <Text style={[styles.addSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
// //           </View>
// //         </TouchableOpacity>
// //       );
// //     }
// //     return (
// //       <View style={[styles.projectCard, isActive && styles.projectCardActive]}>
// //         <View style={[styles.projectDot, { backgroundColor: item.dot }]} />
// //         <View style={styles.projectInfo}>
// //           <Text style={[styles.projectTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
// //           <Text style={[styles.projectSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
// //         </View>
// //         {item.urgent && <View style={styles.urgentBadge} />}
// //         {isActive && <View style={styles.activeBadge} />}
// //       </View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="dark-content" />

// //       <View style={styles.topSection}>
// //         <View style={styles.headerRow}>
// //           {/* BAR CHART ICON: Now navigates to Rankings */}
// //           <TouchableOpacity 
// //             style={styles.iconButton} 
// //             onPress={() => navigation.navigate('Rankings')}
// //           >
// //             <View style={styles.barChart}>
// //                 <View style={[styles.bar, { height: 8 }]} />
// //                 <View style={[styles.bar, { height: 14 }]} />
// //                 <View style={[styles.bar, { height: 10 }]} />
// //             </View>
// //           </TouchableOpacity>

// //           <View style={styles.headerCenter}>
// //             <Text style={styles.dashboardLabel}>DASHBOARD</Text>
// //             <View style={styles.levelRow}>
// //               <Text style={styles.levelText}>LVL 24</Text>
// //               <View style={styles.progressBar}><View style={[styles.progressFill, { width: '65%' }]} /></View>
// //             </View>
// //           </View>

// //           <TouchableOpacity style={styles.iconButton}>
// //             <Ionicons name="settings-outline" size={20} color="#5A7A99" />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.timeRow}>
// //           <View>
// //             {/* TIME: Toggles color between Black and Dark Brown */}
// //             <TouchableOpacity 
// //               activeOpacity={0.8} 
// //               onPress={() => setIsBrown(!isBrown)}
// //             >
// //               <Text style={[
// //                 styles.clockText, 
// //                 isBrown && { color: '#4A1E1B' } 
// //               ]}>
// //                 08:00
// //               </Text>
// //             </TouchableOpacity>

// //             {/* DATE: Navigation Logic based on current color */}
// //             <TouchableOpacity 
// //               activeOpacity={0.7}
// //               onPress={() => {
// //                 if (isBrown) {
// //                   navigation.navigate('DutyOff');
// //                 } else {
// //                   navigation.navigate('DutyOn');
// //                 }
// //               }}
// //             >
// //               <Text style={[
// //                 styles.dateText, 
// //                 isBrown && { color: '#633A37' } 
// //               ]}>
// //                 TUE, OCT 24
// //               </Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.pillsContainer}>
// //             <View style={styles.pill}><View style={[styles.pillDot, { backgroundColor: '#4CAF50' }]} /><Text style={styles.pillText}>10/10</Text></View>
// //             <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('Wallet')}><View style={[styles.pillDot, { backgroundColor: '#4A90D9' }]} /><Text style={styles.pillText}>$1,000</Text></TouchableOpacity>
// //           </View>
// //         </View>

// //         <View style={styles.goalCard}>
// //           <Text style={styles.goalLabel}>WEEKLY SALES GOAL</Text>
// //           <View style={styles.goalRow}>
// //             <Text style={styles.goalAmount}>$5,000</Text>
// //             <Text style={styles.goalTotal}> / $10,000</Text>
// //             <View style={styles.percentBadge}><Text style={styles.percentText}>50%</Text></View>
// //           </View>
// //           <View style={styles.goalProgressBar}><View style={[styles.goalProgressFill, { width: '50%' }]} /></View>
// //         </View>
// //       </View>

// //       <View style={styles.projectsSection}>
// //         <View style={styles.paginationTrack}>
// //           <View style={[styles.trackLine, { height: (PROJECTS.length - 1) * ITEM_HEIGHT }]} />
// //           <Animated.View style={[styles.orbWrapper, { transform: [{ translateY: orbTranslateY }] }]}>
// //             <PaginationOrb />
// //           </Animated.View>
// //         </View>

// //         <View style={styles.listContainer}>
// //           <FlatList
// //             ref={flatListRef}
// //             data={PROJECTS}
// //             renderItem={renderItem}
// //             keyExtractor={(item) => item.id}
// //             showsVerticalScrollIndicator={false}
// //             snapToInterval={ITEM_HEIGHT}
// //             snapToAlignment="start"
// //             decelerationRate="fast"
// //             onScroll={handleScroll}
// //             scrollEventThrottle={16}
// //             contentContainerStyle={styles.listContent}
// //             getItemLayout={(_, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
// //           />
// //         </View>
// //       </View>

// //       <BottomNavBar navigation={navigation} activeTab="Center" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#C4DDEF' },
// //   topSection: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
// //   headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
// //   iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
// //   barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
// //   bar: { width: 4, backgroundColor: '#5A7A99', borderRadius: 1 },
// //   headerCenter: { alignItems: 'center' },
// //   dashboardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5, color: '#5A7A99' },
// //   levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
// //   levelText: { fontSize: 9, fontWeight: '700', color: '#4A90D9' },
// //   progressBar: { width: 54, height: 4, backgroundColor: 'rgba(74,144,217,0.2)', borderRadius: 2 },
// //   progressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2 },
// //   timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
// //   clockText: { fontSize: 56, fontWeight: '200', color: '#142036', letterSpacing: -3 },
// //   dateText: { fontSize: 11, fontWeight: '700', color: '#5A7A99', letterSpacing: 1.8 },
// //   pillsContainer: { flexDirection: 'row', gap: 8 },
// //   pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
// //   pillDot: { width: 7, height: 7, borderRadius: 3.5 },
// //   pillText: { fontSize: 12, fontWeight: '700', color: '#1A4A80' },
// //   goalCard: { backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 18, padding: 16 },
// //   goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.6, color: '#8AACCA', marginBottom: 8 },
// //   goalRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
// //   goalAmount: { fontSize: 24, fontWeight: '700', color: '#142036' },
// //   goalTotal: { fontSize: 13, color: '#8AACCA', fontWeight: '500', flex: 1, marginLeft: 4 },
// //   percentBadge: { backgroundColor: '#4A90D9', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
// //   percentText: { color: '#fff', fontSize: 12, fontWeight: '800' },
// //   goalProgressBar: { height: 5, backgroundColor: 'rgba(74,144,217,0.15)', borderRadius: 2.5 },
// //   goalProgressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2.5 },
// //   projectsSection: { flex: 1, flexDirection: 'row', marginTop: 8 },
// //   paginationTrack: { width: 65, alignItems: 'center' },
// //   trackLine: { position: 'absolute', top: ITEM_HEIGHT / 2, width: 2, backgroundColor: 'rgba(74,180,255,0.25)' },
// //   orbWrapper: { position: 'absolute', width: 56, alignItems: 'center' },
// //   orbContainer: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
// //   orbPulse: { position: 'absolute', width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(74,180,255,0.25)' },
// //   orbRing: { position: 'absolute', width: 48, height: 48 },
// //   orbRingLine: { position: 'absolute', width: 48, height: 1.5, backgroundColor: 'rgba(160,220,255,0.5)', top: 23.25 },
// //   orbCore: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },
// //   orbInner: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4ABAFF', margin: 5 },
// //   listContainer: { flex: 1, marginRight: 12 },
// //   listContent: { paddingBottom: 100 },
// //   projectCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
// //   projectCardActive: { backgroundColor: '#fff' },
// //   projectDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
// //   projectInfo: { flex: 1 },
// //   projectTitle: { fontSize: 15, fontWeight: '600', color: 'rgba(74,111,165,0.7)' },
// //   projectTitleActive: { color: '#142036', fontWeight: '700' },
// //   projectSubtitle: { fontSize: 10, fontWeight: '700', color: 'rgba(138,172,202,0.7)' },
// //   projectSubtitleActive: { color: '#4A90D9' },
// //   urgentBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
// //   activeBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginLeft: 10 },
// //   addCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
// //   addCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
// //   addPlus: { fontSize: 20, color: '#4A90D9' },
// //   addTitle: { fontSize: 15, fontWeight: '600', color: '#5A7A99' },
// //   addSubtitle: { fontSize: 10, fontWeight: '700', color: '#8AACCA' },
// // });










// // import React, { useRef, useState, useEffect } from 'react';
// // import {
// //   View,
// //   Text,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Animated,
// //   Dimensions,
// //   StatusBar,
// //   Easing,
// //   FlatList,
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { Ionicons } from '@expo/vector-icons';
// // import BottomNavBar from '../components/BottomNavbar';
// // import NeuralOrb from '../components/NeuralOrb'; // 👈 your SVG

// // const { width: W, height: H } = Dimensions.get('window');

// // const ITEM_HEIGHT = 91;
// // const VISIBLE_ITEMS = 5;
// // const ORB_SIZE = 600; // adjust to your SVG's natural size

// // const PROJECTS = [
// //   { id: '1', title: 'SaaS Migration', subtitle: 'TECHCORP INC.', dot: '#FF5252', urgent: false },
// //   { id: '2', title: 'Cloud Infrastructure', subtitle: 'NEBULA SYSTEMS', dot: '#4A90D9', urgent: false },
// //   { id: '3', title: 'Q4 Strategy Rollout', subtitle: 'ALPHA FORCE · URGENT', dot: '#FF9800', urgent: true },
// //   { id: '4', title: 'Network Security', subtitle: 'CYBERSHIELD CO.', dot: '#4CAF50', urgent: false },
// //   { id: '5', title: 'Data Analytics', subtitle: 'GLOBAL TRENDS', dot: '#9E9E9E', urgent: false },
// //   { id: 'add', title: 'Add New Project', subtitle: 'SLOT OPENED', dot: '#4A90D9', urgent: false, isAdd: true },
// // ];

// // export default function Dashboard() {
// //   const navigation = useNavigation();
// //   const flatListRef = useRef(null);
// //   const scrollY = useRef(new Animated.Value(0)).current;
// //   const orbRotation = useRef(new Animated.Value(0)).current;
// //   const [activeIndex, setActiveIndex] = useState(0);
// //   const [isBrown, setIsBrown] = useState(false);
// //   const lastScrollY = useRef(0);

// //   // Spin the orb as scroll moves
// //   useEffect(() => {
// //     const id = scrollY.addListener(({ value }) => {
// //       const delta = value - lastScrollY.current;
// //       lastScrollY.current = value;
// //       orbRotation.setValue(orbRotation._value + delta * 0.5);
// //     });
// //     return () => scrollY.removeListener(id);
// //   }, []);

// //   const spin = orbRotation.interpolate({
// //     inputRange: [-9999, 9999],
// //     outputRange: ['-9999deg', '9999deg'],
// //   });

// //   // Each card's vertical position arcs around the orb circumference
// //   // Cards are laid out in a curved/arc path on the right side of the orb
// //   const getCardStyle = (index) => {
// //     const offset = index - activeIndex; // -2, -1, 0, 1, 2
// //     const angle = offset * 8; // degrees apart on the wheel (adjust for tighter/looser)
// //     const angleRad = (angle * Math.PI) / 180;
// //     const radius = ORB_SIZE * 0.5; // how far cards sit from orb center
// //     const translateY = Math.sin(angleRad) * radius;
// //     const translateX = (1 - Math.cos(angleRad)) * 30; // slight curve inward
// //     const isActive = index === activeIndex;

// //     return {
// //       transform: [{ translateY }, { translateX }],
// //       opacity: isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.2),
// //     };
// //   };

// //   const handleScroll = Animated.event(
// //     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
// //     {
// //       useNativeDriver: false,
// //       listener: (event) => {
// //         const offsetY = event.nativeEvent.contentOffset.y;
// //         const index = Math.round(offsetY / ITEM_HEIGHT);
// //         if (index !== activeIndex && index >= 0 && index < PROJECTS.length) {
// //           setActiveIndex(index);
// //         }
// //       },
// //     }
// //   );

// //   const renderItem = ({ item, index }) => {
// //     const isActive = index === activeIndex;
// //     const cardStyle = getCardStyle(index);

// //     if (item.isAdd) {
// //       return (
// //         <Animated.View style={[styles.addCard, isActive && styles.projectCardActive, cardStyle]}>
// //           <TouchableOpacity style={styles.addInner} activeOpacity={0.8}>
// //             <View style={styles.addCircle}>
// //               <Text style={styles.addPlus}>+</Text>
// //             </View>
// //             <View>
// //               <Text style={[styles.addTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
// //               <Text style={[styles.addSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
// //             </View>
// //           </TouchableOpacity>
// //         </Animated.View>
// //       );
// //     }

// //     return (
// //       <Animated.View style={[styles.projectCard, isActive && styles.projectCardActive, cardStyle]}>
// //         <View style={[styles.projectDot, { backgroundColor: item.dot }]} />
// //         <View style={styles.projectInfo}>
// //           <Text style={[styles.projectTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
// //           <Text style={[styles.projectSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
// //         </View>
// //         {item.urgent && <View style={styles.urgentBadge} />}
// //         {isActive && <View style={styles.activeBadge} />}
// //       </Animated.View>
// //     );
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle="dark-content" />

// //       {/* TOP SECTION */}
// //       <View style={styles.topSection}>
// //         <View style={styles.headerRow}>
// //           <TouchableOpacity
// //             style={styles.iconButton}
// //             onPress={() => navigation.navigate('Rankings')}
// //           >
// //             <View style={styles.barChart}>
// //               <View style={[styles.bar, { height: 8 }]} />
// //               <View style={[styles.bar, { height: 14 }]} />
// //               <View style={[styles.bar, { height: 10 }]} />
// //             </View>
// //           </TouchableOpacity>

// //           <View style={styles.headerCenter}>
// //             <Text style={styles.dashboardLabel}>DASHBOARD</Text>
// //             <View style={styles.levelRow}>
// //               <Text style={styles.levelText}>LVL 24</Text>
// //               <View style={styles.progressBar}>
// //                 <View style={[styles.progressFill, { width: '65%' }]} />
// //               </View>
// //             </View>
// //           </View>

// //           <TouchableOpacity style={styles.iconButton}>
// //             <Ionicons name="settings-outline" size={20} color="#5A7A99" />
// //           </TouchableOpacity>
// //         </View>

// //         <View style={styles.timeRow}>
// //           <View>
// //             <TouchableOpacity activeOpacity={0.8} onPress={() => setIsBrown(!isBrown)}>
// //               <Text style={[styles.clockText, isBrown && { color: '#4A1E1B' }]}>08:00</Text>
// //             </TouchableOpacity>
// //             <TouchableOpacity
// //               activeOpacity={0.7}
// //               onPress={() => navigation.navigate(isBrown ? 'DutyOff' : 'DutyOn')}
// //             >
// //               <Text style={[styles.dateText, isBrown && { color: '#633A37' }]}>TUE, OCT 24</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.pillsContainer}>
// //             <View style={styles.pill}>
// //               <View style={[styles.pillDot, { backgroundColor: '#4CAF50' }]} />
// //               <Text style={styles.pillText}>10/10</Text>
// //             </View>
// //             <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('Wallet')}>
// //               <View style={[styles.pillDot, { backgroundColor: '#4A90D9' }]} />
// //               <Text style={styles.pillText}>$1,000</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         <View style={styles.goalCard}>
// //           <Text style={styles.goalLabel}>WEEKLY SALES GOAL</Text>
// //           <View style={styles.goalRow}>
// //             <Text style={styles.goalAmount}>$5,000</Text>
// //             <Text style={styles.goalTotal}> / $10,000</Text>
// //             <View style={styles.percentBadge}>
// //               <Text style={styles.percentText}>50%</Text>
// //             </View>
// //           </View>
// //           <View style={styles.goalProgressBar}>
// //             <View style={[styles.goalProgressFill, { width: '50%' }]} />
// //           </View>
// //         </View>
// //       </View>

// //       {/* PROJECTS WHEEL SECTION */}
// //       <View style={styles.projectsSection}>

// //         {/* NEURAL ORB - fixed on left, spins as you scroll */}
// //         <View style={styles.orbContainer}>
// //           <Animated.View style={{ transform: [{ rotate: spin }] }}>
// //             <NeuralOrb width={ORB_SIZE} height={ORB_SIZE} />
// //           </Animated.View>
// //         </View>

// //         {/* CARDS - arc around the orb */}
// //         <View style={styles.listContainer}>
// //           <FlatList
// //             ref={flatListRef}
// //             data={PROJECTS}
// //             renderItem={renderItem}
// //             keyExtractor={(item) => item.id}
// //             showsVerticalScrollIndicator={false}
// //             snapToInterval={ITEM_HEIGHT}
// //             snapToAlignment="center"
// //             decelerationRate="fast"
// //             onScroll={handleScroll}
// //             scrollEventThrottle={16}
// //             contentContainerStyle={styles.listContent}
// //             getItemLayout={(_, index) => ({
// //               length: ITEM_HEIGHT,
// //               offset: ITEM_HEIGHT * index,
// //               index,
// //             })}
// //           />
// //         </View>
// //       </View>

// //       <BottomNavBar navigation={navigation} activeTab="Center" />
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#C4DDEF' },
// //   topSection: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
// //   headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
// //   iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
// //   barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
// //   bar: { width: 4, backgroundColor: '#5A7A99', borderRadius: 1 },
// //   headerCenter: { alignItems: 'center' },
// //   dashboardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5, color: '#5A7A99' },
// //   levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
// //   levelText: { fontSize: 9, fontWeight: '700', color: '#4A90D9' },
// //   progressBar: { width: 54, height: 4, backgroundColor: 'rgba(74,144,217,0.2)', borderRadius: 2 },
// //   progressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2 },
// //   timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
// //   clockText: { fontSize: 56, fontWeight: '200', color: '#142036', letterSpacing: -3 },
// //   dateText: { fontSize: 11, fontWeight: '700', color: '#5A7A99', letterSpacing: 1.8 },
// //   pillsContainer: { flexDirection: 'row', gap: 8 },
// //   pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
// //   pillDot: { width: 7, height: 7, borderRadius: 3.5 },
// //   pillText: { fontSize: 12, fontWeight: '700', color: '#1A4A80' },
// //   goalCard: { backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 18, padding: 16 },
// //   goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.6, color: '#8AACCA', marginBottom: 8 },
// //   goalRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
// //   goalAmount: { fontSize: 24, fontWeight: '700', color: '#142036' },
// //   goalTotal: { fontSize: 13, color: '#8AACCA', fontWeight: '500', flex: 1, marginLeft: 4 },
// //   percentBadge: { backgroundColor: '#4A90D9', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
// //   percentText: { color: '#fff', fontSize: 12, fontWeight: '800' },
// //   goalProgressBar: { height: 5, backgroundColor: 'rgba(74,144,217,0.15)', borderRadius: 2.5 },
// //   goalProgressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2.5 },

// //   // WHEEL SECTION
// //   projectsSection: { 
// //     flex: 1, 
// //     flexDirection: 'row', 
// //     alignItems: 'center',
// //     marginTop: 8,
// //   },
// //   orbContainer: { 
// //     width: ORB_SIZE, 
// //     height: ORB_SIZE, 
// //     position: 'absolute', // sits behind/beside cards
// //     left: -ORB_SIZE * 0.5, // peek out from left edge
// //     alignSelf: 'center',
// //     zIndex: 10,
// //   },
// //   listContainer: { 
// //     flex: 1, 
// //     marginLeft: ORB_SIZE * 0.3, // cards start after orb center
// //   },
// //   listContent: { 
// //     paddingVertical: ITEM_HEIGHT * 1, // allows first and last to center
// //   },

// //   // CARDS
// //   projectCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
// //   projectCardActive: { backgroundColor: '#fff' },
// //   projectDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
// //   projectInfo: { flex: 1 },
// //   projectTitle: { fontSize: 15, fontWeight: '600', color: 'rgba(74,111,165,0.7)' },
// //   projectTitleActive: { color: '#142036', fontWeight: '700' },
// //   projectSubtitle: { fontSize: 10, fontWeight: '700', color: 'rgba(138,172,202,0.7)' },
// //   projectSubtitleActive: { color: '#4A90D9' },
// //   urgentBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
// //   activeBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginLeft: 10 },
// //   addCard: { height: 85, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 18, paddingHorizontal: 16, marginBottom: 6 },
// //   addInner: { flexDirection: 'row', alignItems: 'center' },
// //   addCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
// //   addPlus: { fontSize: 20, color: '#4A90D9' },
// //   addTitle: { fontSize: 15, fontWeight: '600', color: '#5A7A99' },
// //   addSubtitle: { fontSize: 10, fontWeight: '700', color: '#8AACCA' },
// // });


// import React, { useRef, useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
//   Dimensions,
//   StatusBar,
//   FlatList,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import BottomNavBar from '../components/BottomNavbar';
// import NeuralOrb from '../components/NeuralOrb';

// const { width: W, height: H } = Dimensions.get('window');

// const ITEM_HEIGHT = 91;
// const ORB_SIZE = 600;

// const PROJECTS = [
//   { id: '1', title: 'SaaS Migration', subtitle: 'TECHCORP INC.', dot: '#FF5252', urgent: false },
//   { id: '2', title: 'Cloud Infrastructure', subtitle: 'NEBULA SYSTEMS', dot: '#4A90D9', urgent: false },
//   { id: '3', title: 'Q4 Strategy Rollout', subtitle: 'ALPHA FORCE · URGENT', dot: '#FF9800', urgent: true },
//   { id: '4', title: 'Network Security', subtitle: 'CYBERSHIELD CO.', dot: '#4CAF50', urgent: false },
//   { id: '5', title: 'Data Analytics', subtitle: 'GLOBAL TRENDS', dot: '#9E9E9E', urgent: false },
//   { id: 'add', title: 'Add New Project', subtitle: 'SLOT OPENED', dot: '#4A90D9', urgent: false, isAdd: true },
// ];

// export default function Dashboard() {
//   const navigation = useNavigation();
//   const flatListRef = useRef(null);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const orbRotation = useRef(new Animated.Value(0)).current;
//   const orbRotationValue = useRef(0);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isBrown, setIsBrown] = useState(false);
//   const lastScrollY = useRef(0);

//   useEffect(() => {
//     const id = scrollY.addListener(({ value }) => {
//       const delta = value - lastScrollY.current;
//       lastScrollY.current = value;
//       orbRotationValue.current += delta * 0.5;
//       orbRotation.setValue(orbRotationValue.current);
//     });
//     return () => scrollY.removeListener(id);
//   }, []);

//   const spin = orbRotation.interpolate({
//     inputRange: [-9999, 9999],
//     outputRange: ['-9999deg', '9999deg'],
//   });

//   const getCardStyle = (index) => {
//     const offset = index - activeIndex;
//     const angle = offset * 8;
//     const angleRad = (angle * Math.PI) / 180;
//     const radius = ORB_SIZE * 0.5;
//     const translateY = Math.sin(angleRad) * radius;
//     const translateX = (1 - Math.cos(angleRad)) * 30;

//     return {
//       transform: [{ translateY }, { translateX }],
//       opacity: index === activeIndex ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.2),
//     };
//   };

//   const handleScroll = Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     {
//       useNativeDriver: false,
//       listener: (event) => {
//         const offsetY = event.nativeEvent.contentOffset.y;
//         const index = Math.round(offsetY / ITEM_HEIGHT);
//         if (index !== activeIndex && index >= 0 && index < PROJECTS.length) {
//           setActiveIndex(index);
//         }
//       },
//     }
//   );

//   const renderItem = ({ item, index }) => {
//     const isActive = index === activeIndex;
//     const cardStyle = getCardStyle(index);

//     if (item.isAdd) {
//       return (
//         <Animated.View style={[styles.addCard, isActive && styles.projectCardActive, cardStyle]}>
//           <TouchableOpacity style={styles.addInner} activeOpacity={0.8}>
//             <View style={styles.addCircle}>
//               <Text style={styles.addPlus}>+</Text>
//             </View>
//             <View>
//               <Text style={[styles.addTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
//               <Text style={[styles.addSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
//             </View>
//           </TouchableOpacity>
//         </Animated.View>
//       );
//     }

//     return (
//       <Animated.View style={[styles.projectCard, isActive && styles.projectCardActive, cardStyle]}>
//         <View style={[styles.projectDot, { backgroundColor: item.dot }]} />
//         <View style={styles.projectInfo}>
//           <Text style={[styles.projectTitle, isActive && styles.projectTitleActive]}>{item.title}</Text>
//           <Text style={[styles.projectSubtitle, isActive && styles.projectSubtitleActive]}>{item.subtitle}</Text>
//         </View>
//         {item.urgent && <View style={styles.urgentBadge} />}
//         {isActive && <View style={styles.activeBadge} />}
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />

//       {/* TOP SECTION */}
//       <View style={styles.topSection}>
//         <View style={styles.headerRow}>
//           <TouchableOpacity
//             style={styles.iconButton}
//             onPress={() => navigation.navigate('Rankings')}
//           >
//             <View style={styles.barChart}>
//               <View style={[styles.bar, { height: 8 }]} />
//               <View style={[styles.bar, { height: 14 }]} />
//               <View style={[styles.bar, { height: 10 }]} />
//             </View>
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <Text style={styles.dashboardLabel}>DASHBOARD</Text>
//             <View style={styles.levelRow}>
//               <Text style={styles.levelText}>LVL 24</Text>
//               <View style={styles.progressBar}>
//                 <View style={[styles.progressFill, { width: '65%' }]} />
//               </View>
//             </View>
//           </View>

//           <TouchableOpacity style={styles.iconButton}>
//             <Ionicons name="settings-outline" size={20} color="#5A7A99" />
//           </TouchableOpacity>
//         </View>

//         <View style={styles.timeRow}>
//           <View>
//             <TouchableOpacity activeOpacity={0.8} onPress={() => setIsBrown(!isBrown)}>
//               <Text style={[styles.clockText, isBrown && { color: '#4A1E1B' }]}>08:00</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               activeOpacity={0.7}
//               onPress={() => navigation.navigate(isBrown ? 'DutyOff' : 'DutyOn')}
//             >
//               <Text style={[styles.dateText, isBrown && { color: '#633A37' }]}>TUE, OCT 24</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.pillsContainer}>
//             <View style={styles.pill}>
//               <View style={[styles.pillDot, { backgroundColor: '#4CAF50' }]} />
//               <Text style={styles.pillText}>10/10</Text>
//             </View>
//             <TouchableOpacity style={styles.pill} onPress={() => navigation.navigate('Wallet')}>
//               <View style={[styles.pillDot, { backgroundColor: '#4A90D9' }]} />
//               <Text style={styles.pillText}>$1,000</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.goalCard}>
//           <Text style={styles.goalLabel}>WEEKLY SALES GOAL</Text>
//           <View style={styles.goalRow}>
//             <Text style={styles.goalAmount}>$5,000</Text>
//             <Text style={styles.goalTotal}> / $10,000</Text>
//             <View style={styles.percentBadge}>
//               <Text style={styles.percentText}>50%</Text>
//             </View>
//           </View>
//           <View style={styles.goalProgressBar}>
//             <View style={[styles.goalProgressFill, { width: '50%' }]} />
//           </View>
//         </View>
//       </View>

//       {/* PROJECTS SECTION — orb behind, cards on top full width */}
//       <View style={styles.projectsSection}>

//         {/* ORB — absolute, centered vertically, left-anchored, z=0 (behind cards) */}
//         <View style={styles.orbContainer}>
//           <Animated.View style={{ transform: [{ rotate: spin }] }}>
//             <NeuralOrb width={ORB_SIZE} height={ORB_SIZE} />
//           </Animated.View>
//         </View>

//         {/* CARDS — full width, z=1 (on top of orb) */}
//         <FlatList
//           ref={flatListRef}
//           data={PROJECTS}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id}
//           showsVerticalScrollIndicator={false}
//           snapToInterval={ITEM_HEIGHT}
//           snapToAlignment="center"
//           decelerationRate="fast"
//           onScroll={handleScroll}
//           scrollEventThrottle={16}
//           style={styles.list}
//           contentContainerStyle={styles.listContent}
//           getItemLayout={(_, index) => ({
//             length: ITEM_HEIGHT,
//             offset: ITEM_HEIGHT * index,
//             index,
//           })}
//         />
//       </View>

//       <BottomNavBar navigation={navigation} activeTab="Center" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#C4DDEF' },

//   // TOP SECTION
//   topSection: { paddingTop: 60, paddingHorizontal: 20, paddingBottom: 12 },
//   headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
//   iconButton: { width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center' },
//   barChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 3 },
//   bar: { width: 4, backgroundColor: '#5A7A99', borderRadius: 1 },
//   headerCenter: { alignItems: 'center' },
//   dashboardLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 2.5, color: '#5A7A99' },
//   levelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
//   levelText: { fontSize: 9, fontWeight: '700', color: '#4A90D9' },
//   progressBar: { width: 54, height: 4, backgroundColor: 'rgba(74,144,217,0.2)', borderRadius: 2 },
//   progressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2 },
//   timeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 16 },
//   clockText: { fontSize: 56, fontWeight: '200', color: '#142036', letterSpacing: -3 },
//   dateText: { fontSize: 11, fontWeight: '700', color: '#5A7A99', letterSpacing: 1.8 },
//   pillsContainer: { flexDirection: 'row', gap: 8 },
//   pill: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(255,255,255,0.7)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
//   pillDot: { width: 7, height: 7, borderRadius: 3.5 },
//   pillText: { fontSize: 12, fontWeight: '700', color: '#1A4A80' },
//   goalCard: { backgroundColor: 'rgba(255,255,255,0.75)', borderRadius: 18, padding: 16 },
//   goalLabel: { fontSize: 9, fontWeight: '800', letterSpacing: 1.6, color: '#8AACCA', marginBottom: 8 },
//   goalRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
//   goalAmount: { fontSize: 24, fontWeight: '700', color: '#142036' },
//   goalTotal: { fontSize: 13, color: '#8AACCA', fontWeight: '500', flex: 1, marginLeft: 4 },
//   percentBadge: { backgroundColor: '#4A90D9', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
//   percentText: { color: '#fff', fontSize: 12, fontWeight: '800' },
//   goalProgressBar: { height: 5, backgroundColor: 'rgba(74,144,217,0.15)', borderRadius: 2.5 },
//   goalProgressFill: { height: '100%', backgroundColor: '#4A90D9', borderRadius: 2.5 },

//   // PROJECTS SECTION
//   projectsSection: {
//     flex: 1,
//     overflow: 'hidden',
//   },

//   // ORB — sits behind everything, centered, peeking from left
//   orbContainer: {
//     position: 'absolute',
//     // Center the orb vertically in this section
//     top: '50%',
//     marginTop: -(ORB_SIZE / 2),
//     // Peek from left: show roughly the right 40% of the orb on screen
//     left: -(ORB_SIZE * 0.60),
//     width: ORB_SIZE,
//     height: ORB_SIZE,
//     zIndex: 0,
//   },

//   // LIST — full width, sits on top of orb
//   list: {
//     flex: 1,
//     zIndex: 1,
//   },
//   listContent: {
//     paddingHorizontal: 20,
//     paddingVertical: ITEM_HEIGHT,
//   },

//   // CARDS — full width, semi-transparent so orb shows through on left
//   projectCard: {
//     height: 85,
//     flexDirection: 'row',
//     alignItems: 'center',
//     // Glassmorphism: semi-transparent white so orb glows through left side
//     backgroundColor: 'rgba(255,255,255,0.25)',
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     marginBottom: 6,
    
//   },


//   projectCardActive: {
//     backgroundColor: 'rgba(255,255,255,0.92)',
//   },
//   projectDot: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
//   projectInfo: { flex: 1 },
//   projectTitle: { fontSize: 15, fontWeight: '600', color: 'rgba(74,111,165,0.75)' },
//   projectTitleActive: { color: '#142036', fontWeight: '700' },
//   projectSubtitle: { fontSize: 10, fontWeight: '700', color: 'rgba(138,172,202,0.75)' },
//   projectSubtitleActive: { color: '#4A90D9' },
//   urgentBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#FF5252' },
//   activeBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4A90D9', marginLeft: 10 },

//   // ADD CARD
//   addCard: {
//     height: 85,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255,255,255,0.15)',
//     borderRadius: 18,
//     paddingHorizontal: 16,
//     marginBottom: 6,
//   },
//   addInner: { flexDirection: 'row', alignItems: 'center' },
//   addCircle: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#4A90D9', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
//   addPlus: { fontSize: 20, color: '#4A90D9' },
//   addTitle: { fontSize: 15, fontWeight: '600', color: '#5A7A99' },
//   addSubtitle: { fontSize: 10, fontWeight: '700', color: '#8AACCA' },
// });


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
  const lastScrollY = useRef(0);

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