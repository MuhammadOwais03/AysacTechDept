import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from '../components/BottomNavbar';

const Profile = ({ navigation }) => {
  // Mock data for the post grid
  const posts = [
    { id: '1', image: require('../../assets/Post1.jpg') },
    { id: '2', image: require('../../assets/Post2.jpg') },
    { id: '3', image: require('../../assets/Post1.jpg') },
    { id: '4', image: require('../../assets/Post2.jpg') },
    { id: '5', image: require('../../assets/Post1.jpg') },
    { id: '6', image: require('../../assets/Post2.jpg') },
  ];

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postContainer}>
      <Image source={item.image} style={styles.postImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#E3F2FD', '#FFFFFF']} style={StyleSheet.absoluteFill} />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Icons - Updated for Positioning */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconWrapper}>
            <MaterialCommunityIcons name="history" size={26} color="#5A7A99" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.settingsButton} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings-outline" size={24} color="#5A7A99" />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <LinearGradient colors={['#00D2FF', '#3A7BD5']} style={styles.avatarGlow} />
            <Image source={require('../../assets/Avatar-2.jpg')} style={styles.profilePic} />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={18} color="#4A90D9" />
            </View>
          </View>
          
          <Text style={styles.userName}>Sahil Kumar</Text>
          <Text style={styles.userHandle}>@sahil_xoxo</Text>

          {/* XP Bar */}
          <View style={styles.xpContainer}>
            <View style={styles.xpTextRow}>
              <Text style={styles.xpLabel}>Level 24 Gold</Text>
              <Text style={styles.xpValue}>1,240 / 1,600 XP</Text>
            </View>
            <View style={styles.xpBarBackground}>
              <View style={[styles.xpBarFill, { width: '75%' }]} />
            </View>
          </View>
        </View>

        {/* Business Portfolio Card */}
        <View style={styles.statsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Business Portfolio</Text>
            <View style={styles.cardIconBox}><Feather name="briefcase" size={18} color="#4A90D9" /></View>
          </View>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>ACTIVE CLIENTS</Text>
              <Text style={styles.statsValue}>48</Text>
            </View>
            <View>
              <Text style={styles.statsLabel}>CITY MANAGED</Text>
              <Text style={styles.statsValue}>NYC</Text>
            </View>
          </View>
        </View>

        {/* Performance Card */}
        <View style={styles.statsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Performance</Text>
            <View style={[styles.cardIconBox, { backgroundColor: '#E8F5E9' }]}><Feather name="trending-up" size={18} color="#4CAF50" /></View>
          </View>
          <View style={styles.statsRow}>
            <View>
              <Text style={styles.statsLabel}>PROJECTS HANDLED</Text>
              <Text style={styles.statsValue}>156</Text>
            </View>
            <View style={styles.rankBadge}>
              <Text style={styles.rankNumber}>#3</Text>
              <Text style={styles.rankLabel}>Dept. Rank</Text>
            </View>
          </View>
        </View>

        {/* Team Details */}
        <View style={styles.detailsList}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Sub-department</Text>
            <Text style={styles.detailValue}>Sales Engineering</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Team Name</Text>
            <Text style={[styles.detailValue, { color: '#00BCD4' }]}>Alpha Force</Text>
          </View>
        </View>

        {/* Post Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.activeTab}><MaterialCommunityIcons name="grid" size={24} color="#142036" /></TouchableOpacity>
          <TouchableOpacity style={styles.inactiveTab}><MaterialCommunityIcons name="account-box-outline" size={24} color="#8AACCA" /></TouchableOpacity>
        </View>

        {/* Post Grid */}
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          numColumns={3}
          scrollEnabled={false}
          contentContainerStyle={styles.gridContainer}
        />
      </ScrollView>

      <BottomNavBar navigation={navigation} activeTab="Profile" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    // This pushes icons down. Adjust 45 if you need more/less space.
    paddingTop: Platform.OS === 'ios' ? 45 : (StatusBar.currentHeight || 0) + 15,
    alignItems: 'center', 
  },
  headerIconWrapper: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  profileSection: { alignItems: 'center', marginTop: 10 },
  avatarWrapper: { width: 110, height: 110, justifyContent: 'center', alignItems: 'center' },
  avatarGlow: { position: 'absolute', width: 120, height: 120, borderRadius: 60, opacity: 0.3 },
  profilePic: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#FFF' },
  verifiedBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: '#FFF', borderRadius: 10 },
  userName: { fontSize: 24, fontWeight: '800', color: '#142036', marginTop: 15 },
  userHandle: { fontSize: 14, color: '#8AACCA', marginBottom: 20 },
  xpContainer: { width: '85%', marginBottom: 25 },
  xpTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  xpLabel: { fontSize: 12, fontWeight: '600', color: '#5A7A99' },
  xpValue: { fontSize: 12, fontWeight: '600', color: '#8AACCA' },
  xpBarBackground: { height: 6, backgroundColor: '#E3F2FD', borderRadius: 3 },
  xpBarFill: { height: 6, backgroundColor: '#4A90D9', borderRadius: 3 },
  statsCard: { backgroundColor: '#FFF', marginHorizontal: 20, borderRadius: 24, padding: 20, marginBottom: 15, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#142036' },
  cardIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statsLabel: { fontSize: 10, fontWeight: '700', color: '#8AACCA', letterSpacing: 0.5, marginBottom: 4 },
  statsValue: { fontSize: 20, fontWeight: '800', color: '#142036' },
  rankBadge: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#00D2FF', justifyContent: 'center', alignItems: 'center' },
  rankNumber: { fontSize: 18, fontWeight: '800', color: '#00D2FF' },
  rankLabel: { fontSize: 8, color: '#8AACCA' },
  detailsList: { paddingHorizontal: 25, marginVertical: 10 },
  detailItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { color: '#8AACCA', fontSize: 14 },
  detailValue: { fontWeight: '700', color: '#142036', fontSize: 14 },
  tabContainer: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F0', marginTop: 20 },
  activeTab: { flex: 1, alignItems: 'center', paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: '#142036' },
  inactiveTab: { flex: 1, alignItems: 'center', paddingVertical: 15 },
  gridContainer: { padding: 2 },
  postContainer: { flex: 1/3, aspectRatio: 1, padding: 2 },
  postImage: { width: '100%', height: '100%', borderRadius: 4 },
});

export default Profile;