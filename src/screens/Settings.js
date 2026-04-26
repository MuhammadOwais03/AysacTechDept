import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SETTINGS_ITEMS = [
  { id: 'account', title: 'Profile and Account', subtitle: 'Edit profile details, security, and preferences', route: 'Account', order: '1' },
  { id: 'getting-started', title: 'Getting Started', subtitle: 'Quick setup guide and onboarding tips', route: 'GettingStarted', order: '2' },
  { id: 'community-guidelines', title: 'Community Guidelines', subtitle: 'Review the rules and community expectations', route: 'Guidelines', order: '3' },
  { id: 'sales-tool', title: 'SalesTool Guidelines', subtitle: 'Learn the best way to use sales tools', route: 'SalesTool', order: '4' },
  { id: 'gen-ai', title: 'Gen AI', subtitle: 'Explore the AI features that help you work smarter', route: 'GenAI', order: '5' },
  { id: 'contact-us', title: 'Contact Us', subtitle: 'Reach support or submit feedback easily', route: 'ContactUs', order: '6' },
];

export default function Settings() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="arrow-back" size={22} color="#1E2D4B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 34 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>Choose a section to manage your account, learn more, or contact support.</Text>

        {SETTINGS_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate(item.route)}
            activeOpacity={0.8}
          >
            <View style={styles.cardIndexWrapper}>
              <Text style={styles.cardIndex}>{item.order}</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#8AACCA" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F9FF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  backButton: { width: 40, height: 40, borderRadius: 14, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', shadowColor: '#0A203E', shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 20, fontWeight: '800', color: '#1E2D4B' },
  content: { paddingHorizontal: 20, paddingBottom: 40 },
  description: { color: '#5A7A99', fontSize: 14, lineHeight: 20, marginBottom: 18 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(154,170,202,0.18)' },
  cardIndexWrapper: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8F3FF', justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  cardIndex: { fontSize: 14, fontWeight: '800', color: '#4A90D9' },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#142036', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#8AACCA', lineHeight: 18 },
});
