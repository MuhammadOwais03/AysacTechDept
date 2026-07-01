import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { theme } from '../theme/colors';

const colors = theme.light;

// Status-specific accent colors (not in theme.js, matched from design)
const STATUS = {
  completed: {
    label: 'COMPLETED',
    labelColor: '#2ECC71',
    progressColor: '#2ECC71',
    badgeBg: null,
  },
  pmHandling: {
    label: 'PM HANDLING',
    labelColor: '#E0A458',
    progressColor: '#3498db',
    badgeBg: null,
  },
  uploadedForPm: {
    label: 'UPLOADED FOR PM',
    labelColor: '#9AA5B1',
    progressColor: '#C7CDD4',
    badgeBg: null,
  },
  failed: {
    label: 'FAILED',
    labelColor: '#FFFFFF',
    progressColor: '#E74C3C',
    badgeBg: '#E74C3C',
  },
};

const PROJECTS = [
  {
    id: '1',
    status: 'completed',
    title: 'Cloud Migration',
    company: 'TechCorp',
    commission: '$450',
    note: 'Final build signed and deployed.',
    progress: 1,
    icon: '☁️',
    iconBg: '#0B1220',
  },
  {
    id: '2',
    status: 'pmHandling',
    title: 'Mobile App v2.0',
    company: 'Fintech Labs',
    commission: '$800',
    note: 'Requirements gathering phase with PM team.',
    progress: 0.4,
    icon: '📱',
    iconBg: '#F3DFC1',
  },
  {
    id: '3',
    status: 'uploadedForPm',
    title: 'API Security Audit',
    company: 'SecureBank',
    commission: '$1,200',
    note: 'Initial scan logs uploaded to project portal.',
    progress: 0.15,
    icon: '🔒',
    iconBg: '#0B1220',
  },
  {
    id: '4',
    status: 'failed',
    title: 'Legacy DB Sync',
    company: 'OldWorld Retails',
    commission: '$300',
    note: 'Project terminated due to hardware limitations.',
    progress: 0.15,
    icon: '🗄️',
    iconBg: '#1B1F26',
  },
  {
    id: '5',
    status: 'completed',
    title: 'CRM Integration',
    company: 'Global Sales',
    commission: '$600',
    note: 'Salesforce connectors successfully linked.',
    progress: 1,
    icon: '🔗',
    iconBg: '#F3DFC1',
  },
  {
    id: '6',
    status: 'pmHandling',
    title: 'SaaS Dashboard',
    company: 'StartUp Inc',
    commission: '$550',
    note: 'UI feedback review in progress.',
    progress: 0.6,
    icon: '📊',
    iconBg: '#0B1220',
  },
  {
    id: '7',
    status: 'uploadedForPm',
    title: 'Data Warehouse',
    company: 'BigData Co',
    commission: '$1,500',
    note: 'Architectural diagrams submitted for review.',
    progress: 0.2,
    icon: '🌌',
    iconBg: '#0B1220',
  },
  {
    id: '8',
    status: 'completed',
    title: 'Single Sign-On',
    company: 'EduTech',
    commission: '$350',
    note: 'Okta integration live for all users.',
    progress: 1,
    icon: '🔑',
    iconBg: '#F3DFC1',
  },
  {
    id: '9',
    status: 'pmHandling',
    title: 'Network Refresh',
    company: 'Hotel Chain',
    commission: '$2,100',
    note: 'Site survey completed by field engineers.',
    progress: 0.5,
    icon: '🖥️',
    iconBg: '#0B1220',
  },
];

const TABS = ['All', 'In Progress', 'Completed', 'Pending'];

// Maps each tab to the project statuses it should show.
// Adjust this if "Pending" should mean something other than failed projects.
const TAB_STATUS_MAP = {
  All: null, // null = show everything
  'In Progress': ['pmHandling', 'uploadedForPm'],
  Completed: ['completed'],
  Pending: ['failed'],
};

function ProjectCard({ project }) {
  const cfg = STATUS[project.status];

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View style={styles.cardLeft}>
          {cfg.badgeBg ? (
            <View style={[styles.failedBadge, { backgroundColor: cfg.badgeBg }]}>
              <Text style={styles.failedBadgeText}>{cfg.label}</Text>
            </View>
          ) : (
            <Text style={[styles.statusLabel, { color: cfg.labelColor }]}>
              {cfg.label}
            </Text>
          )}

          <Text style={styles.cardTitle}>{project.title}</Text>
          <Text style={styles.cardSubtitle}>
            {project.company} • Commission: {project.commission}
          </Text>
          <Text style={styles.cardNote}>{project.note}</Text>
        </View>

        <View style={[styles.iconWrap, { backgroundColor: project.iconBg }]}>
          <Text style={styles.iconEmoji}>{project.icon}</Text>
        </View>
      </View>

      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${project.progress * 100}%`,
              backgroundColor: cfg.progressColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

export default function ActiveProjectsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('All');

  const allowedStatuses = TAB_STATUS_MAP[activeTab];
  const visibleProjects = allowedStatuses
    ? PROJECTS.filter((p) => allowedStatuses.includes(p.status))
    : PROJECTS;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation && navigation.goBack()}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Active Projects</Text>
        <View style={styles.backBtn} />
      </View>

      <View style={styles.capacityWrap}>
        <View style={styles.capacityPill}>
          <Text style={styles.capacityText}>CAPACITY: 10/10</Text>
        </View>
      </View>

      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={styles.tabItem}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                {tab}
              </Text>
              {isActive && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {visibleProjects.length === 0 ? (
          <Text style={styles.emptyText}>No projects in this tab.</Text>
        ) : (
          visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: colors.text,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
  },
  capacityWrap: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 12,
  },
  capacityPill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  capacityText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.accent,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  tabItem: {
    marginRight: 24,
    alignItems: 'center',
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 13,
    color: colors.textSub,
    fontWeight: '500',
  },
  tabTextActive: {
    color: colors.accent,
    fontWeight: '700',
  },
  tabUnderline: {
    marginTop: 4,
    height: 2,
    width: '100%',
    backgroundColor: colors.accent,
    borderRadius: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 12,
  },
  statusLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  failedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },
  failedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.textSub,
    marginBottom: 6,
  },
  cardNote: {
    fontSize: 12,
    color: colors.textSub,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 24,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EDF1F7',
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.textSub,
    marginTop: 40,
    fontSize: 13,
  },
});