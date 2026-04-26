import React from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler'; // Import these

const ARCHIVED_DATA = [
  { id: '1', name: 'Sarah Jensen', date: 'Oct 24', msg: 'Thanks for the mentorship session...' },
  { id: '2', name: 'Michael Chen', date: 'Sep 12', msg: 'Looking forward to connecting next...', avatar: 'https://i.pravatar.cc/150?u=m' },
  { id: '3', name: 'Design Team Alpha', date: 'Aug 30', msg: 'You: The project files are uploaded...', avatar: 'https://i.pravatar.cc/150?u=d' },
  { id: '4', name: 'Elena Rodriguez', date: 'Aug 15', msg: 'Payment confirmed for the consult...', avatar: 'https://i.pravatar.cc/150?u=e' },
  { id: '5', name: 'Mark Benson', date: 'Jul 22', msg: 'Could we reschedule our call to ne...', avatar: 'https://i.pravatar.cc/150?u=mb' },
  { id: '6', name: 'James Wright', date: 'Jun 05', msg: 'Excellent insights, thank you!', initials: 'JW' },
];

export default function ArchieveChat() {
  const navigation = useNavigation();

  // This function renders the blue button revealed on swipe
  const renderRightActions = () => (
    <TouchableOpacity style={styles.unarchiveAction} activeOpacity={0.8}>
      <MaterialCommunityIcons name="archive-arrow-up" size={24} color="#fff" />
      <Text style={styles.unarchiveActionText}>UNARCHIVE</Text>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={renderRightActions} friction={2} rightThreshold={40}>
      <View style={styles.archiveItem}>
        <View style={styles.avatarWrapper}>
          {item.initials ? (
            <View style={styles.initialsAvatar}><Text style={styles.initialsText}>{item.initials}</Text></View>
          ) : (
            <Image source={{ uri: item.avatar || 'https://i.pravatar.cc/150?u=default' }} style={styles.avatar} />
          )}
        </View>
        <View style={styles.content}>
          <View style={styles.itemHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Text style={styles.msg} numberOfLines={1}>{item.msg}</Text>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Archived Chats</Text>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#8E8E93" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search archived chats..." 
            style={styles.searchInput}
            placeholderTextColor="#8E8E93" 
          />
        </View>

        <FlatList
          data={ARCHIVED_DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E1F5FE' },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, paddingHorizontal: 20, marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A2533', marginLeft: 20 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 12, paddingHorizontal: 12, height: 45, marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A2533' },
  searchIcon: { marginRight: 8 },
  list: { paddingHorizontal: 20, paddingBottom: 20 },
  archiveItem: { 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 15, 
    marginBottom: 10, 
    alignItems: 'center' 
  },
  avatarWrapper: { width: 50, height: 50, borderRadius: 25, overflow: 'hidden' },
  avatar: { width: '100%', height: '100%' },
  initialsAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#D1C4E9', justifyContent: 'center', alignItems: 'center' },
  initialsText: { color: '#673AB7', fontWeight: '700' },
  content: { flex: 1, marginLeft: 15 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  name: { fontSize: 16, fontWeight: '700', color: '#1A2533' },
  date: { fontSize: 11, color: '#8E8E93' },
  msg: { fontSize: 13, color: '#5A7A99', marginTop: 4 },
  unarchiveAction: { 
    backgroundColor: '#00B2FF', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: 90, 
    height: 80, // Matches item height roughly
    borderRadius: 15,
    marginBottom: 10, // Must match margin of archiveItem
    marginLeft: 10
  },
  unarchiveActionText: { color: '#fff', fontSize: 10, fontWeight: '900', marginTop: 4 }
});