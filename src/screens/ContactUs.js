import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ContactUs({ navigation }) {
  // Helper to render individual contact rows
  const ContactRow = ({ icon, iconColor, bgColor, label, value }) => (
    <TouchableOpacity style={styles.contactRow}>
      <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
        <Feather name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.contactLabel}>{label}</Text>
        <Text style={styles.contactValue}>{value}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#8AACCA" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#E3F2FD', '#F8FBFF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header Linked to Settings */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="arrow-back" size={24} color="#142036" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Contact Us</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Brand Header */}
          <View style={styles.brandSection}>
            <Text style={styles.brandName}>AYASC</Text>
            <Text style={styles.brandSub}>Professional Networking Support</Text>
          </View>

          {/* Technical Support Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TECHNICAL SUPPORT</Text>
          </View>
          <View style={styles.supportCard}>
            <ContactRow 
              icon="phone" 
              iconColor="#3A7BD5" 
              bgColor="#E3F2FD" 
              label="Call Us" 
              value="+1 (800) 123-4567" 
            />
            <View style={styles.separator} />
            <ContactRow 
              icon="mail" 
              iconColor="#3A7BD5" 
              bgColor="#E3F2FD" 
              label="Email Support" 
              value="tech@ayasc.com" 
            />
          </View>

          {/* Sales Team Support Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>SALES TEAM SUPPORT</Text>
          </View>
          <View style={styles.supportCard}>
            <ContactRow 
              icon="headphones" 
              iconColor="#9C27B0" 
              bgColor="#F3E5F5" 
              label="Agent Hotline" 
              value="+1 (888) 987-6543" 
            />
            <View style={styles.separator} />
            <ContactRow 
              icon="message-square" 
              iconColor="#9C27B0" 
              bgColor="#F3E5F5" 
              label="Sales Inquiries" 
              value="sales@ayasc.com" 
            />
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
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 10 
  },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#142036' },
  backButton: { width: 40, height: 40, justifyContent: 'center' },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  brandSection: { alignItems: 'center', marginVertical: 30 },
  brandName: { fontSize: 28, fontWeight: '900', color: '#142036', letterSpacing: 1 },
  brandSub: { fontSize: 14, color: '#5A7A99', marginTop: 5 },
  sectionHeader: { marginBottom: 15, paddingLeft: 5 },
  sectionTitle: { fontSize: 12, fontWeight: '800', color: '#8AACCA', letterSpacing: 0.5 },
  supportCard: { 
    backgroundColor: '#FFF', 
    borderRadius: 24, 
    padding: 15, 
    marginBottom: 25,
    elevation: 2, 
    shadowColor: '#134275', 
    shadowOpacity: 0.05, 
    shadowRadius: 15 
  },
  contactRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10 
  },
  iconBox: { 
    width: 44, 
    height: 44, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  textContainer: { flex: 1 },
  contactLabel: { fontSize: 12, color: '#8AACCA', marginBottom: 2 },
  contactValue: { fontSize: 15, fontWeight: '700', color: '#142036' },
  separator: { 
    height: 1, 
    backgroundColor: '#F0F5FA', 
    marginVertical: 5, 
    marginLeft: 60 
  },
});