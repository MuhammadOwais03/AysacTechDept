import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SalesToolsGuide({ navigation }) {
  // Component for the bottom list items (Exporting, Client Portfolio, etc.)
  const ToolListItem = ({ icon, color, title, sub }) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={[styles.iconSquare, { backgroundColor: color + '15' }]}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
      </View>
      <View style={styles.listItemText}>
        <Text style={styles.listItemTitle}>{title}</Text>
        {sub && <Text style={styles.listItemSub}>{sub}</Text>}
      </View>
      <Feather name="chevron-right" size={20} color="#C4D1D9" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/* Exact background gradient from the image */}
      <LinearGradient colors={['#D6EFFF', '#F0F9FF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header - Linked to Settings */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="arrow-back" size={24} color="#5A6B87" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sales Tools Guide</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color="#A3B8C8" />
            <TextInput 
              placeholder="Search sales topics..." 
              placeholderTextColor="#A3B8C8" 
              style={styles.searchInput} 
            />
          </View>

          {/* Performance Tools Card */}
          <View style={styles.introCard}>
            <View style={styles.introHeader}>
              <View style={styles.introIconBox}>
                <MaterialCommunityIcons name="chart-line-variant" size={24} color="#FF9800" />
              </View>
              <View>
                <Text style={styles.introTitle}>Performance Tools</Text>
                <Text style={styles.introSub}>Maximize your sales efficiency</Text>
              </View>
            </View>
            <Text style={styles.introBody}>
              Access advanced reporting, real-time commission tracking, and client management features designed to boost your productivity.
            </Text>
          </View>

          {/* Tracking Commissions (Expanded Accordion Style) */}
          <View style={styles.expandedCard}>
            <View style={styles.expandedHeader}>
              <View style={styles.expandedIconBox}>
                <MaterialCommunityIcons name="cash-multiple" size={22} color="#4CAF50" />
              </View>
              <Text style={styles.expandedTitle}>Tracking Commissions</Text>
              <Feather name="chevron-down" size={20} color="#A3B8C8" />
            </View>
            
            <View style={styles.tutorialContent}>
              <Text style={styles.tutorialIntro}>Follow these steps to view your real-time earnings:</Text>
              <View style={styles.stepContainer}>
                <Text style={styles.stepText}>Navigate to the Dashboard tab.</Text>
                <Text style={styles.stepText}>Tap on the "Earnings" widget.</Text>
                <Text style={styles.stepText}>Select "Current Pay Period" to see pending payouts.</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.tutorialLink}>View full tutorial →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Tool List */}
          <ToolListItem 
            icon="file-document-outline" 
            color="#4A90D9" 
            title="Exporting Sales Reports" 
            sub="Monthly & Quarterly Analysis" 
          />
          <ToolListItem 
            icon="folder-account-outline" 
            color="#9C27B0" 
            title="Client Portfolio" 
            sub="Organize & Tag Client Data" 
          />
          <ToolListItem 
            icon="swap-horizontal" 
            color="#F06292" 
            title="CRM Integration" 
          />

          {/* Help Footer */}
          <View style={styles.helpFooter}>
            <Text style={styles.helpTitle}>Still need help?</Text>
            <Text style={styles.helpSub}>
              Our specialized sales support team is available 24/7 to assist with tool configurations.
            </Text>
            <View style={styles.footerBtns}>
              <TouchableOpacity style={styles.chatBtn}>
                <Feather name="monitor" size={18} color="#FFF" />
                <Text style={styles.chatBtnText}>Live Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.emailBtn}>
                <Feather name="mail" size={18} color="#5A6B87" />
                <Text style={styles.emailBtnText}>Email Us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 20, 
    paddingVertical: 15 
  },
  headerTitle: { fontSize: 19, fontWeight: '700', color: '#334155', letterSpacing: 0.3 },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  searchContainer: { 
    flexDirection: 'row', 
    backgroundColor: 'rgba(255,255,255,0.85)', 
    borderRadius: 18, 
    paddingHorizontal: 15, 
    height: 52, 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E1F0F7'
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#334155' },
  introCard: { 
    backgroundColor: '#E3F6FF', 
    borderRadius: 24, 
    padding: 22, 
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#D0E9F5'
  },
  introHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  introIconBox: { 
    width: 46, height: 46, borderRadius: 23, 
    backgroundColor: '#FFF7ED', justifyContent: 'center', 
    alignItems: 'center', marginRight: 15 
  },
  introTitle: { fontSize: 18, fontWeight: '700', color: '#1E293B' },
  introSub: { fontSize: 13, color: '#64748B', marginTop: 2 },
  introBody: { fontSize: 14, color: '#64748B', lineHeight: 21 },
  expandedCard: { 
    backgroundColor: '#FFF', borderRadius: 24, 
    padding: 22, marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  expandedHeader: { flexDirection: 'row', alignItems: 'center' },
  expandedIconBox: { 
    width: 40, height: 40, borderRadius: 10, 
    backgroundColor: '#F0FDF4', justifyContent: 'center', 
    alignItems: 'center', marginRight: 15 
  },
  expandedTitle: { flex: 1, fontSize: 16, fontWeight: '700', color: '#1E293B' },
  tutorialContent: { marginTop: 20, paddingLeft: 5 },
  tutorialIntro: { fontSize: 14, color: '#475569', marginBottom: 15 },
  stepContainer: { marginBottom: 15, paddingLeft: 10 },
  stepText: { fontSize: 14, color: '#64748B', lineHeight: 28 },
  tutorialLink: { color: '#0EA5E9', fontWeight: '700', fontSize: 14 },
  listItem: { 
    flexDirection: 'row', alignItems: 'center', 
    backgroundColor: '#FFF', padding: 18, 
    borderRadius: 22, marginBottom: 12,
    shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 5, elevation: 1
  },
  iconSquare: { 
    width: 42, height: 42, borderRadius: 12, 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  listItemText: { flex: 1 },
  listItemTitle: { fontSize: 15, fontWeight: '700', color: '#1E293B' },
  listItemSub: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  helpFooter: { 
    marginTop: 10, backgroundColor: '#EBF7FF', 
    borderRadius: 28, padding: 25,
    borderWidth: 1, borderColor: '#D9EEFA'
  },
  helpTitle: { fontSize: 19, fontWeight: '800', color: '#1E293B' },
  helpSub: { fontSize: 14, color: '#64748B', marginTop: 8, lineHeight: 20 },
  footerBtns: { flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' },
  chatBtn: { 
    flex: 0.48, backgroundColor: '#0EA5E9', height: 50, 
    borderRadius: 14, flexDirection: 'row', 
    justifyContent: 'center', alignItems: 'center' 
  },
  chatBtnText: { color: '#FFF', fontWeight: '700', marginLeft: 8 },
  emailBtn: { 
    flex: 0.48, backgroundColor: '#FFF', height: 50, borderRadius: 14, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2
  },
  emailBtnText: { color: '#1E293B', fontWeight: '700', marginLeft: 8 },
});