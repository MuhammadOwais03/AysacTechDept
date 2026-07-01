import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, StatusBar } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ChatSettings() {
  const navigation = useNavigation();
  const [isEmailStopped, setIsEmailStopped] = useState(false);

  const SettingOption = ({ icon, title, subtitle, onPress, showArrow = true }) => (
    <TouchableOpacity style={styles.optionCard} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.optionTextContainer}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>
      {showArrow && <Feather name="chevron-right" size={20} color="#8E8E93" />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Settings</Text>
      </View>

      {/* PREFERENCES */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>PREFERENCES</Text>
        <View style={styles.dashedBox}>
          <SettingOption 
            icon={<Ionicons name="notifications-outline" size={22} color="#00B2FF" />}
            title="Notification Settings"
            subtitle="Manage push and email alerts"
          />
        </View>
      </View>

      {/* CHAT MANAGEMENT */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>CHAT MANAGEMENT</Text>
        <View style={styles.dashedBox}>
          <SettingOption 
            icon={<MaterialCommunityIcons name="archive-outline" size={22} color="#A855F7" />}
            title="Archived Chats"
            subtitle="View hidden conversations"
            onPress={() => navigation.navigate('ArchieveChat')}
          />
        </View>
      </View>

      {/* AUTOMATION */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>AUTOMATION</Text>
        <View style={styles.dashedBox}>
          <View style={styles.optionCard}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFEBEB' }]}>
              <MaterialCommunityIcons name="email-remove-outline" size={22} color="#FF5252" />
            </View>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Stop Automated Emails</Text>
              <Text style={styles.optionSubtitle}>
                Prevent the system from sending automated follow-ups and engagement emails on your behalf.
              </Text>
            </View>
            <Switch
              value={isEmailStopped}
              onValueChange={setIsEmailStopped}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E1F5FE', paddingHorizontal: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingTop: 50, marginBottom: 30 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#1A2533', marginLeft: 20 },
  section: { marginBottom: 25 },
  sectionLabel: { fontSize: 11, fontWeight: '800', color: '#5A7A99', marginBottom: 10, letterSpacing: 1 },
  dashedBox: { 
    borderWidth: 2, 
    borderColor: '#00B2FF', 
    borderStyle: 'dashed', 
    borderRadius: 20, 
    padding: 2 
  },
  optionCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    borderRadius: 18, 
    padding: 15 
  },
  iconContainer: { 
    width: 45, 
    height: 45, 
    borderRadius: 12, 
    backgroundColor: '#E1F5FE', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  optionTextContainer: { flex: 1, marginLeft: 15, marginRight: 10 },
  optionTitle: { fontSize: 16, fontWeight: '700', color: '#1A2533' },
  optionSubtitle: { fontSize: 12, color: '#8E8E93', marginTop: 2, lineHeight: 16 },
});