import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { C } from '../constants';
import { starredMessages } from '../data/messages';

export function Screen2_Profile({ onBack }) {
  const [activeTab, setActiveTab] = useState('starred');
  const [notifOn, setNotifOn] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Top bar */}
        <View style={[styles.header, { justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 22, color: C.textSub }}>⋮</Text>
          </TouchableOpacity>
        </View>

        {/* Avatar */}
        <View style={styles.profileAvatarWrap}>
          <View style={styles.profileAvatar}>
            <Text style={{ fontSize: 48 }}>👩</Text>
          </View>
          <View style={styles.profileOnlineDot} />
        </View>
        <Text style={styles.profileName}>Sarah Jenkins</Text>
        <Text style={styles.profileHandle}>@sjenkins</Text>

        {/* Options */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={[styles.profileIconBox, { backgroundColor: '#e8f5fd' }]}>
              <Text style={{ fontSize: 16 }}>🔔</Text>
            </View>
            <Text style={styles.profileRowLabel}>Notifications</Text>
            <Switch
              value={notifOn}
              onValueChange={setNotifOn}
              trackColor={{ false: C.toggleOff, true: C.toggleOn }}
              thumbColor={C.white}
            />
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={[styles.profileIconBox, { backgroundColor: '#fff3e0' }]}>
              <Text style={{ fontSize: 16 }}>🏷</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileRowLabel}>Give Title</Text>
              <Text style={styles.profileRowSub}>Mentor</Text>
            </View>
            <TouchableOpacity>
              <Text style={[styles.profileRowAction, { color: C.blue }]}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={[styles.profileIconBox, { backgroundColor: '#fce4ec' }]}>
              <Text style={{ fontSize: 16 }}>😄</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.profileRowLabel}>Give Nickname</Text>
              <Text style={styles.profileRowSub}>None set</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.profileRowAction}>Set</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          <TouchableOpacity onPress={() => setActiveTab('media')} style={[styles.tab, activeTab === 'media' && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === 'media' && styles.tabTextActive]}>Media</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('starred')} style={[styles.tab, activeTab === 'starred' && styles.tabActive]}>
            <Text style={[styles.tabText, activeTab === 'starred' && styles.tabTextActive]}>Starred</Text>
          </TouchableOpacity>
        </View>

        {/* Starred messages */}
        {activeTab === 'starred' && starredMessages.map(msg => (
          <View key={msg.id} style={[styles.msgCard, msg.isMe && styles.msgCardMe]}>
            <View style={styles.msgHeader}>
              <Text style={[styles.msgSender, msg.isMe && { color: C.textSub }]}>{msg.sender}</Text>
              <Text style={styles.msgTime}>{msg.time}</Text>
              <Text style={{ color: C.starYellow, fontSize: 16, marginLeft: 6 }}>★</Text>
            </View>
            <Text style={styles.msgText}>{msg.text}</Text>
            {msg.showUnstar && (
              <TouchableOpacity style={styles.unstarBtn}>
                <Text style={styles.unstarText}>⊖ Unstar</Text>
                <Text style={{ color: C.textLight, marginLeft: 8, fontSize: 13 }}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
