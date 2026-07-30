import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ACTION_ITEMS = [
  {
    id: 'delete',
    icon: 'trash',
    iconColor: '#D32F2F',
    iconBgColor: '#FFEBEE',
    title: 'Delete Account',
    badgeText: 'IRREVERSIBLE',
    badgeColor: '#D32F2F',
    badgeBgColor: '#FFEBEE',
    subtitle: 'Permanently remove a worker and purge associated operation logs.',
    authRequirement: 'AUTH REQUIRED: PRESIDENT - CEO - MD',
  },
  {
    id: 'freeze',
    icon: 'snowflake',
    iconColor: '#1976D2',
    iconBgColor: '#E3F2FD',
    title: 'Freeze Account',
    subtitle: 'Suspend all platform access immediately.',
    authRequirement: 'AUTH REQUIRED: TIER 1 EXEC - HR LEAD',
  },
  {
    id: 'rank_change',
    icon: 'medal',
    iconColor: '#00796B',
    iconBgColor: '#E0F2F1',
    title: 'Rank Change',
    subtitle: 'Adjust hierarchical standing.',
    authRequirement: 'AUTH REQUIRED: DIRECT SUPERVISOR +',
    rankButtons: true,
  },
  {
    id: 'balance_correction',
    icon: 'wallet',
    iconColor: '#388E3C',
    iconBgColor: '#E8F5E9',
    title: 'Balance Correction',
    subtitle: 'Apply manual ledger adjustments.',
    authRequirement: 'AUTH REQUIRED: FINANCE DIRECTOR',
    chevron: true,
  },
];

export default function ProfileAccount() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* === CORRECTED HEADER SECTION === */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color="#1A1A1A" />
          </TouchableOpacity>
          
          {/* Gavel / Legal / Auth Icon on the top right */}
          <TouchableOpacity style={styles.rightHeaderIcon}>
            <MaterialCommunityIcons name="gavel" size={28} color="#114C5A" />
          </TouchableOpacity>
        </View>

        {/* === CORRECTED PROFILE SECTION === */}
        <View style={styles.profileSection}>
          <Image 
            source={require('../../assets/Avatar-2.jpg')} 
            style={styles.avatar} 
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>M Talha Nawaz</Text>
            
            {/* Styled precisely as shown in the screenshot */}
            <View style={styles.presidentBadge}>
              <View style={styles.dot} />
              <Text style={styles.presidentBadgeText}>President</Text>
            </View>
            
            <View style={styles.tierBadge}>
              <Text style={styles.tierText}>TIER 1 EXECUTIVE OPERATIONS</Text>
            </View>
          </View>
        </View>

        {/* === CORRECTED SEARCH SECTION === */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6C7A89" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search worker by name, ID or rank..."
            placeholderTextColor="#8C9A9E"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#333" />
          </TouchableOpacity>
        </View>

        {/* === SECTION HEADER === */}
        <Text style={styles.sectionHeader}>WORKER ACTIONS</Text>

        {/* === ACTION CARDS === */}
        <View style={styles.actionsContainer}>
          {ACTION_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.actionCard}
              activeOpacity={0.85}
              onPress={() => item.id === 'delete' && navigation.navigate('Restricted')}
            >
              <View style={styles.cardTop}>
                <View style={[styles.iconWrapper, { backgroundColor: item.iconBgColor }]}>
                  <FontAwesome5 name={item.icon} size={20} color={item.iconColor} />
                </View>
                <View style={styles.cardTextWrapper}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    {item.badgeText && (
                      <View style={[styles.titleBadge, { backgroundColor: item.badgeBgColor }]}>
                        <Text style={[styles.titleBadgeText, { color: item.badgeColor }]}>{item.badgeText}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
              </View>

              {item.rankButtons && (
                <View style={styles.rankButtonRow}>
                  <TouchableOpacity style={styles.rankUpBtn}>
                    <Ionicons name="arrow-up" size={12} color="#FFF" />
                    <Text style={styles.rankUpText}>Up</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.rankDownBtn}>
                    <Ionicons name="arrow-down" size={12} color="#4A5568" />
                    <Text style={styles.rankDownText}>Down</Text>
                  </TouchableOpacity>
                </View>
              )}

              {item.chevron && (
                <TouchableOpacity style={styles.cardChevron}>
                  <Ionicons name="chevron-forward" size={14} color="#555" />
                </TouchableOpacity>
              )}

              <Text style={styles.authRequirementText}>{item.authRequirement}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* === WARNING NOTICE === */}
        <View style={styles.importantNotice}>
          <Ionicons name="warning" size={20} color="#C05621" />
          <Text style={styles.noticeText}>
            Important: Balance increases are not corrected in-system directly. You must file a Level 2 authorization request through the central ledger before proceeding.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F6', 
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rightHeaderIcon: {
    padding: 6,
  },
  profileSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  profileDetails: {
    flex: 1,
    marginLeft: 18,
  },
  profileName: {
    fontSize: 19,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 4,
  },
  presidentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E0',
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#114C5A', 
    marginRight: 6,
  },
  presidentBadgeText: {
    fontSize: 11,
    color: '#114C5A',
    fontWeight: '700',
  },
  tierBadge: {
    backgroundColor: '#DBE3EC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 9,
    color: '#4A5568',
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6F9',
    marginHorizontal: 18,
    borderRadius: 9999,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#2D3748',
    fontSize: 14,
    fontWeight: '500',
  },
  filterButton: {
    padding: 4,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4A5568',
    letterSpacing: 0.8,
    marginHorizontal: 22,
    marginBottom: 12,
  },
  actionsContainer: {
    paddingHorizontal: 18,
    gap: 14,
    marginBottom: 18,
  },
  actionCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 18,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  cardTop: {
    flexDirection: 'row',
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTextWrapper: {
    flex: 1,
    paddingRight: 60, // Space so text doesn't clash with buttons
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2D3748',
  },
  titleBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  titleBadgeText: {
    fontSize: 8,
    fontWeight: '900',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#718096',
    lineHeight: 16,
  },
  authRequirementText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#A0AEC0',
    marginTop: 14,
    letterSpacing: 0.5,
  },
  rankButtonRow: {
    flexDirection: 'row',
    position: 'absolute',
    top: 18,
    right: 18,
    gap: 4,
  },
  rankUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F697C',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 3,
  },
  rankUpText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: '700',
  },
  rankDownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    gap: 3,
  },
  rankDownText: {
    fontSize: 10,
    color: '#4A5568',
    fontWeight: '700',
  },
  cardChevron: {
    position: 'absolute',
    top: 24,
    right: 18,
    backgroundColor: '#EDF2F7',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  importantNotice: {
    backgroundColor: '#FFFAF0',
    borderWidth: 1.5,
    borderColor: '#FEEBC8',
    borderRadius: 18,
    marginHorizontal: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  noticeText: {
    flex: 1,
    color: '#DD6B20',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
});