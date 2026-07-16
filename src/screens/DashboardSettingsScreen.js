import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Image,
  Alert,
  Linking,
} from 'react-native';
import {
  ChevronLeft,
  Bell,
  Mail,
  Sparkles,
  MessageSquare,
  RefreshCw,
  CalendarClock,
  Paintbrush,
  Contrast,
  HelpCircle,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
  ExternalLink,
} from 'lucide-react-native';
import { theme } from '../theme/colors';

const colors = theme.light;

const PROFILE = {
  name: 'Alex Rivera',
  role: 'Senior Sales Engineer • Level 42',
  avatarUri: 'https://i.pravatar.cc/200?img=12',
};

export default function DashboardSettingsScreen({ navigation }) {
  const [toggles, setToggles] = useState({
    notificationPreferences: true,
    clientMessageRingtone: true,
    newEmailNotifications: true,
    autoSendWelcomeEmails: true,
    dailyGoalReminders: false,
    animations: true,
    highContrastMode: false,
  });

  const toggle = (key) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleNav = (label) => {
    // Replace with real navigation.navigate(...) calls as those screens exist
    Alert.alert(label, `Navigate to ${label} here.`);
  };

  const handleResign = () => {
    Alert.alert(
      'Resign from Department',
      'Are you sure you want to resign from this department? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Resign',
          style: 'destructive',
          onPress: () => {
            // Hook up your real resign/leave-department API call here
            Alert.alert('Resigned', 'You have left the department.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.eyebrow}>Body</Text>

      <View style={styles.sheet}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => navigation && navigation.goBack()}
          >
            <ChevronLeft size={22} color={colors.text} strokeWidth={2.25} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dashboard Settings</Text>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => handleNav('Notifications')}
          >
            <Bell size={19} color={colors.text} strokeWidth={2.1} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.profileBlock}>
            <Image source={{ uri: PROFILE.avatarUri }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <View style={styles.verifiedDot} />
            </View>
            <Text style={styles.profileName}>{PROFILE.name}</Text>
            <Text style={styles.profileRole}>{PROFILE.role}</Text>
          </View>

          <Section title="PROFESSIONAL">
            <ToggleRow
              Icon={Mail}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Notification Preferences"
              subtitle="Email, Push & Desktop"
              value={toggles.notificationPreferences}
              onValueChange={() => toggle('notificationPreferences')}
            />
            <NavRow
              Icon={Sparkles}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Lead & Client Alerts"
              subtitle="Instant alerts for new deals"
              onPress={() => handleNav('Lead & Client Alerts')}
            />
          </Section>

          <Section title="DASHBOARD ALERTS">
            <ToggleRow
              Icon={MessageSquare}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Client Message Ringtone"
              subtitle="Play sound on new messages"
              value={toggles.clientMessageRingtone}
              onValueChange={() => toggle('clientMessageRingtone')}
            />
            <ToggleRow
              Icon={Mail}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="New Email Notifications"
              subtitle="Desktop alerts for new mail"
              value={toggles.newEmailNotifications}
              onValueChange={() => toggle('newEmailNotifications')}
            />
          </Section>

          <Section title="AUTOMATION">
            <ToggleRow
              Icon={RefreshCw}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Auto-Send Welcome Emails"
              subtitle="Send to new leads instantly"
              value={toggles.autoSendWelcomeEmails}
              onValueChange={() => toggle('autoSendWelcomeEmails')}
            />
            <ToggleRow
              Icon={CalendarClock}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Daily Goal Reminders"
              subtitle="Morning activity summary"
              value={toggles.dailyGoalReminders}
              onValueChange={() => toggle('dailyGoalReminders')}
            />
          </Section>

          <Section title="DISPLAY PREFERENCES">
            <ToggleRow
              Icon={Paintbrush}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="Animations"
              subtitle="Enable UI transition effects"
              value={toggles.animations}
              onValueChange={() => toggle('animations')}
            />
            <ToggleRow
              Icon={Contrast}
              iconBg="#E4EEFC"
              iconColor="#3B82F6"
              title="High Contrast Mode"
              subtitle="Increase text visibility"
              value={toggles.highContrastMode}
              onValueChange={() => toggle('highContrastMode')}
            />
          </Section>

          <Section title="SYSTEM">
            <NavRow
              Icon={HelpCircle}
              iconBg="#F1F3F6"
              iconColor={colors.textSub}
              title="Help Center"
              trailing={<ExternalLink size={16} color={colors.textSub} strokeWidth={2} />}
              onPress={() => Linking.openURL('https://example.com/help')}
            />
            <NavRow
              Icon={FileText}
              iconBg="#F1F3F6"
              iconColor={colors.textSub}
              title="Terms of Service"
              onPress={() => handleNav('Terms of Service')}
            />
            <NavRow
              Icon={ShieldCheck}
              iconBg="#F1F3F6"
              iconColor={colors.textSub}
              title="Privacy Policy"
              onPress={() => handleNav('Privacy Policy')}
            />
          </Section>

          <TouchableOpacity style={styles.resignBtn} onPress={handleResign}>
            <LogOut size={16} color="#E74C3C" strokeWidth={2.25} />
            <Text style={styles.resignBtnText}>Resign from Department</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

function RowShell({ Icon, iconBg, iconColor, title, subtitle, trailing }) {
  return (
    <View style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Icon size={17} color={iconColor} strokeWidth={2.1} />
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={styles.rowTitle}>{title}</Text>
        {subtitle ? <Text style={styles.rowSubtitle}>{subtitle}</Text> : null}
      </View>
      {trailing}
    </View>
  );
}

function ToggleRow({ Icon, iconBg, iconColor, title, subtitle, value, onValueChange }) {
  return (
    <RowShell
      Icon={Icon}
      iconBg={iconBg}
      iconColor={iconColor}
      title={title}
      subtitle={subtitle}
      trailing={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#DCE1E8', true: colors.accent }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#DCE1E8"
        />
      }
    />
  );
}

function NavRow({ Icon, iconBg, iconColor, title, subtitle, trailing, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      <RowShell
        Icon={Icon}
        iconBg={iconBg}
        iconColor={iconColor}
        title={title}
        subtitle={subtitle}
        trailing={
          trailing ?? <ChevronRight size={16} color={colors.textSub} strokeWidth={2} />
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  eyebrow: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 14,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  profileBlock: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#E4EEFC',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 62,
    left: '50%',
    marginLeft: 20,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.card,
  },
  verifiedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  profileName: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
    marginTop: 12,
  },
  profileRole: {
    fontSize: 12,
    color: colors.textSub,
    marginTop: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: colors.accent,
    marginBottom: 10,
  },
  sectionCard: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.cardBorder,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text,
  },
  rowSubtitle: {
    fontSize: 11,
    color: colors.textSub,
    marginTop: 2,
  },
  resignBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDEDEC',
    borderRadius: 26,
    paddingVertical: 15,
    marginTop: 4,
    gap: 8,
  },
  resignBtnText: {
    color: '#E74C3C',
    fontSize: 14,
    fontWeight: '700',
  },
});