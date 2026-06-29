import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavBar from '../components/BottomNavbar';

const MESSAGES = [
  { id: '1', name: 'Sarah Jenkins', time: '10:42 AM', msg: 'Thanks for the mentorship sessi...', unread: 2, avatar: require('../../assets/Avatar-1.jpg') },
  { id: '2', name: 'Michael Chen', time: 'Yesterday', msg: "Let's schedule a call for next ...", isNew: true, avatar: require('../../assets/Avatar-2.jpg') },
  { id: '3', name: 'David Ross', time: 'Tue', msg: 'Did you see the attachment?', status: 'delivered', avatar: require('../../assets/Avatar-2.jpg') },
  { id: '4', name: 'Sarah Jenkins', time: 'Last week', msg: "I'd love to connect on Li...", isEmail: true },
  { id: '5', name: 'Elena Rodriguez', time: 'Mon', msg: "I'll send over the contract details s...", online: true, avatar: require('../../assets/Avatar-1.jpg') },
  { id: '6', name: 'James Wright', time: 'Jun 05', msg: 'Excellent insights, thank you!', avatar: require('../../assets/Avatar-2.jpg') },
];

export default function Chat() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('ParticularChat', {
          user: {
            name: item.name,
            image: item.avatar || `https://i.pravatar.cc/150?u=${item.id}`,
            online: item.online || false,
          },
        })
      }
    >
      {item.isEmail ? (
        <View style={[styles.avatar, styles.emailAvatar]}>
          <Ionicons name="mail-outline" size={24} color="#00B2FF" />
        </View>
      ) : (
        <View>
          <Image source={item.avatar} style={styles.avatar} />
          {item.online && <View style={styles.onlineDot} />}
          {item.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.msgRow}>
          {item.status === 'delivered' && <Ionicons name="checkmark" size={16} color="#00B2FF" style={{marginRight: 4}} />}
          {item.isNew && <View style={styles.newTag}><Text style={styles.newTagText}>NEW</Text></View>}
          <Text style={styles.messageText} numberOfLines={1}>{item.msg}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="add" size={30} color="#00B2FF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={{marginLeft: 15}} 
            onPress={() => navigation.navigate('ChatSettings')}
          >
            <Ionicons name="settings-outline" size={26} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search conversations..." 
          style={styles.searchInput}
          placeholderTextColor="#8E8E93"
        />
      </View>

      {/* Filter Chips with Horizontal Scrolling */}
      <View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.filterContainer}
        >
          <TouchableOpacity style={[styles.filterPill, styles.activeFilter]}><Text style={styles.activeFilterText}>All</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>Unread</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>Email</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>App</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterPill}><Text style={styles.filterText}>Archived</Text></TouchableOpacity>
          <TouchableOpacity style={styles.addFilterBtn}><Ionicons name="add" size={20} color="#00B2FF" /></TouchableOpacity>
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>RECENT MESSAGES</Text>

      {/* Main Messages List */}
      <FlatList
        data={MESSAGES}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <BottomNavBar navigation={navigation} activeTab="Chat" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E1F5FE' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, marginBottom: 20 },
  headerTitle: { fontSize: 32, fontWeight: '800', color: '#1A2533' },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 15, paddingHorizontal: 15, height: 50, marginBottom: 20 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: '#000' },
  filterContainer: { paddingHorizontal: 20, marginBottom: 25, gap: 10, paddingRight: 40 },
  filterPill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: '#fff', height: 40, justifyContent: 'center' },
  activeFilter: { backgroundColor: '#00B2FF' },
  activeFilterText: { color: '#fff', fontWeight: '600' },
  filterText: { color: '#5A7A99', fontWeight: '600' },
  addFilterBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#B3E5FC', justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#8AACCA', marginHorizontal: 20, marginBottom: 15, letterSpacing: 1 },
  listContent: { paddingBottom: 120 },
  chatItem: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 10, padding: 15, borderRadius: 25, alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  emailAvatar: { backgroundColor: '#E1F5FE', justifyContent: 'center', alignItems: 'center' },
  onlineDot: { position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#4CAF50', borderWidth: 2, borderColor: '#fff' },
  badge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#00B2FF', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  chatInfo: { flex: 1, marginLeft: 15 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  userName: { fontSize: 17, fontWeight: '700', color: '#1A2533' },
  chatTime: { fontSize: 12, color: '#8E8E93' },
  msgRow: { flexDirection: 'row', alignItems: 'center' },
  messageText: { fontSize: 14, color: '#5A7A99', flex: 1 },
  newTag: { backgroundColor: '#FFEBEB', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginRight: 6 },
  newTagText: { color: '#FF5252', fontSize: 10, fontWeight: '800' },
});