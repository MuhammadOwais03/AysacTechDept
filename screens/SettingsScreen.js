import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { ToggleRow } from '../components/ToggleRow';

export function Screen5_Settings({ onBack }) {
  const [allow, setAllow] = useState(true);
  const [newClient, setNewClient] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [milestones, setMilestones] = useState(false);
  const [community, setCommunity] = useState(true);
  const [directMsg, setDirectMsg] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
        </View>

        <Text style={styles.sectionLabel}>GLOBAL SETTINGS</Text>
        <View style={styles.settingCard}>
          <ToggleRow iconEmoji="🔔" iconBg="#e8f5fd" label="Allow Notifications" value={allow} onValueChange={setAllow} />
          <Text style={styles.settingHint}>Receive push notifications</Text>
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 22 }]}>SALES & ACTIVITY</Text>
        <View style={styles.settingCard}>
          <ToggleRow iconEmoji="👤" iconBg="#e8f5e9" label="New Client Assigned" value={newClient} onValueChange={setNewClient} />
          <View style={styles.settingDivider} />
          <ToggleRow iconEmoji="⏱" iconBg="#fff8e1" label="Project Updates" value={projectUpdates} onValueChange={setProjectUpdates} />
          <View style={styles.settingDivider} />
          <ToggleRow iconEmoji="⚑" iconBg="#fce4ec" label="Performance Milestones" value={milestones} onValueChange={setMilestones} />
        </View>

        <Text style={[styles.sectionLabel, { marginTop: 22 }]}>COMMUNITY & SOCIAL</Text>
        <View style={styles.settingCard}>
          <ToggleRow iconEmoji="📣" iconBg="#fce4ec" label="Community Announcements" value={community} onValueChange={setCommunity} />
          <View style={styles.settingDivider} />
          <ToggleRow iconEmoji="✉" iconBg="#e8f5fd" label="Direct Messages" value={directMsg} onValueChange={setDirectMsg} />
        </View>

        <Text style={styles.settingsFooter}>
          You can configure how you receive notifications in the{' '}
          <Text style={{ color: '#3b9ddd' }}>System Settings</Text> of your device.
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
