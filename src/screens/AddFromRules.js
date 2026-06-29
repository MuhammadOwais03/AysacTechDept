import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';
import { ArrowLeft, Search, Scale, ShieldAlert, ShieldCheck, DollarSign } from 'lucide-react-native';

export default function AddFromRules({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', 'IP Protection', 'Liability', 'Compliance', 'Data Privacy'];

  // Mock data representing the clauses
  const rulesData = [
    {
      id: '1',
      category: 'IP Protection',
      title: 'Article 107 (a)',
      subtitle: 'Standard Rev. 2.4',
      desc: 'Standard clauses defining the ownership and protection of intellectual property created during the term of the agreement,...',
      actionText: '+ Add to Contract',
      icon: Scale,
      iconBg: '#E0F2F1',
      iconColor: '#0D9488'
    },
    {
      id: '2',
      category: 'Data Privacy',
      title: 'Data Privacy Protocol v3',
      subtitle: 'Compliance Approved',
      desc: 'Comprehensive GDPR and CCPA compliant clauses detailing data processing, storage requirements, and breach notification...',
      actionText: '+ Add to Contract',
      icon: ShieldCheck,
      iconBg: '#E1F5FE',
      iconColor: '#0288D1'
    },
    {
      id: '3',
      category: 'Liability',
      title: 'Force Majeure Standards',
      subtitle: 'Risk Level: Moderate',
      desc: 'Defines unforeseen circumstances that prevent someone from fulfilling a contract. Updated to include contemporary considerations for global supply chain disruptions and health crises.',
      actionText: '+ Select',
      icon: ShieldAlert,
      iconBg: '#FFEBEE',
      iconColor: '#EF4444'
    },
    {
      id: '4',
      category: 'Financial',
      title: 'Payment Terms (Net 30)',
      subtitle: 'Most Used',
      desc: 'Standard payment schedule outlining invoicing procedures, late fee penalties (1.5% monthly), and acceptable payment...',
      actionText: '+ Add',
      icon: DollarSign,
      iconBg: '#E8F5E9',
      iconColor: '#4CAF50'
    },
    {
      id: '5',
      category: 'General',
      title: 'Termination for Convenience',
      subtitle: 'Standard Clause',
      desc: 'Allows either party to terminate the agreement without cause given a specified notice period (typically 60 days).',
      actionText: '+ Add',
      icon: 'KEEP_DIAMOND_ONLY', // Keeps the custom geometric shape layout, just hides the HelpCircle icon symbol
      iconBg: '#DCE6EC',
      iconColor: '#374151'
    }
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color="#005F73" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Contract Editor</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* CENTERED HEADING */}
      <View style={styles.pageHeaderRow}>
        <Text style={styles.pageHeader}>Legal Library</Text>
      </View>

      {/* SEARCH BAR CONTAINER */}
      <View style={styles.searchSection}>
        <View style={styles.searchWrapper}>
          <Search size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rules, articles, and protocols..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* FILTER PILLS CHIPS */}
      <View style={styles.pillContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillScroll}>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, activeTab === cat && styles.activePill]}
              onPress={() => setActiveTab(cat)}
            >
              <Text style={[styles.pillText, activeTab === cat && styles.activePillText]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CLAUSES CARDS LIST */}
      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        {rulesData
          .filter(item => activeTab === 'All' || item.category === activeTab)
          .map((rule) => {
            const isTerminationCard = rule.title === 'Termination for Convenience';

            return (
              <View key={rule.id} style={styles.ruleCard}>
                
                {/* CARD TOP ROW */}
                <View style={styles.cardTopRow}>
                  {rule.icon === 'KEEP_DIAMOND_ONLY' ? (
                    /* Custom geometric diamond framework perfectly preserved, HelpCircle icon deleted */
                    <View style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: rule.iconBg,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <View style={{ width: 14, height: 12, position: 'relative', alignItems: 'center' }}>
                        <View style={{
                          width: 0,
                          height: 0,
                          borderLeftWidth: 7,
                          borderRightWidth: 7,
                          borderBottomWidth: 4,
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderBottomColor: rule.iconColor,
                          position: 'absolute',
                          top: 0
                        }} />
                        <View style={{
                          width: 0,
                          height: 0,
                          borderLeftWidth: 7,
                          borderRightWidth: 7,
                          borderTopWidth: 7,
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderTopColor: rule.iconColor,
                          position: 'absolute',
                          top: 4
                        }} />
                      </View>
                    </View>
                  ) : (
                    <View style={[styles.iconFrame, { backgroundColor: rule.iconBg }]}>
                      {rule.icon && React.createElement(rule.icon, { size: 18, color: rule.iconColor })}
                    </View>
                  )}

                  <View style={styles.tagBadge}>
                    <Text style={styles.tagBadgeText}>{rule.category.toUpperCase()}</Text>
                  </View>
                </View>

                <Text style={styles.ruleTitle}>{rule.title}</Text>
                <Text style={styles.ruleDesc}>{rule.desc}</Text>

                {/* CARD BOTTOM ROW */}
                <View style={styles.cardBottomRow}>
                  <Text style={styles.ruleSubtitle}>
                    {rule.title === 'Force Majeure Standards' ? (
                      <>Risk Level <Text style={{ color: '#0288D1', fontWeight: '700' }}>• Moderate</Text></>
                    ) : rule.subtitle}
                  </Text>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>{rule.actionText}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#EBF5F7' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 35 : 16,
    paddingBottom: 12,
    backgroundColor: '#EBF5F7'
  },
  backButton: { padding: 4 },
  topBarTitle: { fontSize: 18, fontWeight: '700', color: '#111827', flex: 1, textAlign: 'center' },
  saveText: { fontSize: 16, fontWeight: '600', color: '#0D9488', paddingRight: 4 },
  pageHeaderRow: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#EBF5F7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageHeader: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center'
  },
  
  searchSection: { paddingHorizontal: 20, marginBottom: 16 },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 6,
    height: 54,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1F2937' },
  searchButton: {
    backgroundColor: '#005F73',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
  },
  searchButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },

  pillContainer: { marginBottom: 10 },
  pillScroll: { paddingHorizontal: 20, gap: 8, paddingVertical: 6 },
  pill: { backgroundColor: '#CFD8DC', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 100 },
  activePill: { backgroundColor: '#46D4F3' },
  pillText: { fontSize: 14, color: '#546E7A', fontWeight: '600' },
  activePillText: { color: '#005F73' },

  scrollList: { padding: 20, paddingBottom: 40 },
  ruleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 3
  },
  cardTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  iconFrame: { padding: 10, borderRadius: 100 },
  tagBadge: { backgroundColor: '#ECEFF1', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  tagBadgeText: { fontSize: 10, fontWeight: '700', color: '#78909C' },
  ruleTitle: { fontSize: 18, fontWeight: '700', color: '#1F2937', marginBottom: 8 },
  ruleDesc: { fontSize: 13, color: '#6B7280', lineHeight: 18, marginBottom: 16 },
  cardBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F3F4F6', paddingTop: 14 },
  ruleSubtitle: { fontSize: 12, color: '#9CA3AF', fontWeight: '500' },
  actionButton: { backgroundColor: '#005F73', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 100 },
  actionButtonText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' }
});