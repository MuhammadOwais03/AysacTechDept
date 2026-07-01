import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Sample Reply Data based on your image
const REPLIES_DATA = [
  { id: '1', user: 'CloudStream Inc', initials: 'CS', color: '#E84393', time: '10:35 AM', text: 'We just completed a migration for a fintech client in Zurich. Happy to share some insights...' },
  { id: '2', user: 'TechNova Solutions', initials: 'TS', color: '#4A90E2', time: '10:42 AM', text: 'Would love to hear about the latency metrics. Specifically between Zurich and Frankfurt regions.' },
  { id: '3', user: 'Vertex Flow', initials: 'VF', color: '#1DD1A1', time: '10:45 AM', text: 'Are you using dedicated connect or public internet for the replication?' },
];

const MessageBubble = ({ user, initials, color, text, time, hasReplies, hasFile, onOpenReplies }) => (
  <View style={styles.messageWrapper}>
    <View style={[styles.userCircle, { backgroundColor: color }]}>
      <Text style={styles.initialsText}>{initials}</Text>
    </View>
    <View style={styles.bubbleContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.userName}>{user} <Ionicons name="checkmark-circle" size={12} color="#1DD1A1" /></Text>
        <Text style={styles.messageTime}>{time}</Text>
      </View>
      <View style={styles.bubble}>
        <Text style={styles.messageText}>{text}</Text>
        {hasFile && (
          <View style={styles.filePlaceholder}>
            <Ionicons name="calendar-outline" size={30} color="#ccc" />
            <View style={styles.fileBadge}><Text style={styles.fileText}>Dev Summit '24</Text></View>
          </View>
        )}
      </View>
      <View style={styles.bubbleFooter}>
        <TouchableOpacity style={styles.footerAction}>
            <Ionicons name="arrow-undo-outline" size={14} color="#8E8E8E" />
            <Text style={styles.footerText}>Reply</Text>
        </TouchableOpacity>
        {hasReplies && (
          <TouchableOpacity onPress={onOpenReplies}>
            <Text style={styles.replyCount}>3 replies</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);

const HeadOffice = () => {
  const navigation = useNavigation();
  const [repliesVisible, setRepliesVisible] = useState(false);

  return (
  <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1C1F26" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.headerTitleContainer} 
          onPress={() => navigation.navigate('CommunityInfo')}
        >
          <Text style={styles.headerTitle}>AYASC Head Office</Text>
          <Text style={styles.memberCount}>12.4k Members</Text>
        </TouchableOpacity>
        
        <Ionicons name="ellipsis-vertical" size={20} color="#1C1F26" />
      </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View style={styles.dateBadge}><Text style={styles.dateText}>Today</Text></View>

        <MessageBubble 
          user="TechNova Solutions" initials="TS" color="#4A90E2" 
          text="Looking for partners in cloud infrastructure optimization. Has anyone worked with the new AWS regions in Europe?" 
          time="10:23 AM" 
        />
        
        <MessageBubble 
          user="CloudStream Inc" initials="CS" color="#E84393" 
          text="We just completed a migration for a fintech client in Zurich. Happy to share some insights on latency performance if you're interested! 🚀" 
          time="10:35 AM" 
          hasReplies={true}
          onOpenReplies={() => setRepliesVisible(true)}
        />

        <MessageBubble 
          user="DataLogix" initials="DL" color="#FF7675" 
          text="GDPR compliance is tricky there. We used a hybrid approach. Also, is anyone attending the Global Dev Summit next month?" 
          time="10:42 AM" 
          hasFile={true}
        />
      </ScrollView>

      {/* Reply Modal (Bottom Sheet) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={repliesVisible}
        onRequestClose={() => setRepliesVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setRepliesVisible(false)}>
          <Pressable style={styles.modalContent}>
            {/* Handle Bar */}
            <View style={styles.modalHandle} />
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Replies</Text>
              <TouchableOpacity onPress={() => setRepliesVisible(false)}>
                <Ionicons name="close" size={24} color="#8E8E8E" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {REPLIES_DATA.map((reply) => (
                <View key={reply.id} style={styles.replyItem}>
                  <View style={[styles.replyAvatar, { backgroundColor: reply.color }]}>
                    <Text style={styles.replyAvatarText}>{reply.initials}</Text>
                  </View>
                  <View style={styles.replyBody}>
                    <View style={styles.replyHeaderRow}>
                      <Text style={styles.replyUserName}>{reply.user}</Text>
                      <Text style={styles.replyTime}>{reply.time}</Text>
                    </View>
                    <Text style={styles.replyText}>{reply.text}</Text>
                  </View>
                  <TouchableOpacity>
                    <Ionicons name="heart-outline" size={18} color="#8E8E8E" style={styles.heartIcon} />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            {/* Modal Input Area */}
            <View style={styles.modalInputWrapper}>
               <View style={styles.miniAvatar}><Text style={styles.miniAvatarText}>ME</Text></View>
               <TextInput 
                  placeholder="Write a reply..." 
                  style={styles.modalInput}
                  placeholderTextColor="#AAA"
               />
               <TouchableOpacity>
                 <Text style={styles.postBtnText}>Post</Text>
               </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.plusIcon}>
          <Ionicons name="add-circle-outline" size={24} color="#8E8E8E" />
        </TouchableOpacity>
        <TextInput style={styles.input} placeholder="hello, how are you?" placeholderTextColor="#aaa" />
        <TouchableOpacity style={styles.sendBtn}>
          <Ionicons name="arrow-up" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F8FF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, backgroundColor: '#F0F8FF' },
  headerTitleContainer: { flex: 1, marginLeft: 15 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1F26' },
  memberCount: { fontSize: 12, color: '#8E8E8E' },
  dateBadge: { alignSelf: 'center', backgroundColor: '#fff', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, marginBottom: 20 },
  dateText: { fontSize: 10, color: '#ccc', fontWeight: 'bold' },
  messageWrapper: { flexDirection: 'row', marginBottom: 25 },
  userCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  initialsText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  bubbleContent: { flex: 1, marginLeft: 12 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  userName: { fontWeight: 'bold', fontSize: 14, color: '#2C3E50' },
  messageTime: { fontSize: 10, color: '#ccc' },
  bubble: { backgroundColor: '#fff', padding: 15, borderRadius: 20, borderTopLeftRadius: 0, elevation: 1 },
  messageText: { fontSize: 14, color: '#555', lineHeight: 20 },
  bubbleFooter: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
  footerAction: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 12, color: '#8E8E8E', marginLeft: 5 },
  replyCount: { fontSize: 12, color: '#00D2FF', marginLeft: 15, fontWeight: 'bold' },
  filePlaceholder: { backgroundColor: '#F8F9FA', height: 120, borderRadius: 15, marginTop: 10, justifyContent: 'center', alignItems: 'center' },
  fileBadge: { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', padding: 5, borderRadius: 5 },
  fileText: { color: '#fff', fontSize: 10 },
  inputContainer: { flexDirection: 'row', padding: 15, alignItems: 'center', backgroundColor: '#fff', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  input: { flex: 1, height: 45, backgroundColor: '#F8F9FA', borderRadius: 25, paddingHorizontal: 15, marginHorizontal: 10 },
  sendBtn: { backgroundColor: '#00D2FF', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  
  // Modal Styles
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, paddingHorizontal: 20, paddingBottom: 40, height: '70%' },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E0E0E0', borderRadius: 2, alignSelf: 'center', marginTop: 12 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: '#1A2533' },
  replyItem: { flexDirection: 'row', marginBottom: 25, alignItems: 'flex-start' },
  replyAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  replyAvatarText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  replyBody: { flex: 1, marginLeft: 12 },
  replyHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  replyUserName: { fontSize: 13, fontWeight: '700', color: '#1A2533' },
  replyTime: { fontSize: 10, color: '#AAA', marginLeft: 8 },
  replyText: { fontSize: 14, color: '#5A7A99', lineHeight: 20 },
  heartIcon: { marginLeft: 10, marginTop: 10 },
  modalInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F8FF', borderRadius: 25, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10 },
  miniAvatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#00D2FF', justifyContent: 'center', alignItems: 'center' },
  miniAvatarText: { color: '#fff', fontSize: 8, fontWeight: 'bold' },
  modalInput: { flex: 1, marginHorizontal: 10, fontSize: 14, height: 40 },
  postBtnText: { color: '#00D2FF', fontWeight: 'bold', fontSize: 14, paddingRight: 5 }
});

export default HeadOffice;