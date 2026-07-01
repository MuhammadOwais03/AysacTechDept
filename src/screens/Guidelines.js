import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommunityGuidelines({ navigation }) {
  // Helper for Content Standard rows (Checkmarks/Red X)
  const StandardRow = ({ icon, color, text, isLast }) => (
    <View style={[styles.standardRow, isLast && { borderBottomWidth: 0 }]}>
      <Ionicons name={icon} size={18} color={color} />
      <Text style={styles.standardText}>{text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient colors={['#D6EFFF', '#F0F9FF']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header - Back to Settings */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="arrow-back" size={24} color="#5A6B87" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Community Guidelines</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Top Shield Icon & Intro */}
          <View style={styles.topSection}>
            <View style={styles.shieldCircle}>
              <MaterialCommunityIcons name="shield-check" size={40} color="#0EA5E9" />
            </View>
            <Text style={styles.introText}>
              Our community is built on trust and professionalism. Please review our guidelines to ensure a safe environment for everyone.
            </Text>
          </View>

          {/* Professional Conduct Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#F5F3FF' }]}>
                <FontAwesome5 name="gem" size={18} color="#8B5CF6" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Professional Conduct</Text>
                <Text style={styles.cardSub}>Networking Etiquette</Text>
              </View>
            </View>
            <View style={styles.bulletSection}>
              <Text style={styles.bulletItem}>• Be respectful and inclusive in all communications with other members.</Text>
              <Text style={styles.bulletItem}>• Keep discussions focused on business growth and professional development.</Text>
              <Text style={styles.bulletItem}>• Harassment or discriminatory language will not be tolerated.</Text>
            </View>
          </View>

          {/* Content Standards Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
             {/* Updated Icon Box for Content Standards */}
<View style={[styles.iconBox, { backgroundColor: '#FFFBEB' }]}>
  <MaterialCommunityIcons name="format-list-bulleted-square" size={20} color="#F59E0B" />
</View>
              <View>
                <Text style={styles.cardTitle}>Content Standards</Text>
                <Text style={styles.cardSub}>Posting Rules</Text>
              </View>
            </View>
            <View style={styles.standardsList}>
              <StandardRow icon="checkmark-circle" color="#10B981" text="Industry News & Trends" />
              <StandardRow icon="checkmark-circle" color="#10B981" text="Business Achievements" />
              <StandardRow icon="close-circle" color="#EF4444" text="Spam or Irrelevant Promo" isLast />
            </View>
          </View>

          {/* Reporting & Moderation Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: '#FEF2F2' }]}>
                <MaterialCommunityIcons name="flag" size={20} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.cardTitle}>Reporting & Moderation</Text>
                <Text style={styles.cardSub}>Flagging Behavior</Text>
              </View>
            </View>
            <Text style={styles.cardBody}>
              If you encounter content or behavior that violates these guidelines, please use the "Report" feature on the post or contact support immediately.
            </Text>
            <TouchableOpacity style={styles.reportBtn}>
               <MaterialCommunityIcons name="flag-outline" size={18} color="#5A6B87" />
               <Text style={styles.reportBtnText}>Report an Issue</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Contact */}
          <View style={styles.footer}>
             <Text style={styles.footerText}>Have specific questions about the rules?</Text>
             <TouchableOpacity>
               <Text style={styles.contactLink}>Contact Support Team</Text>
             </TouchableOpacity>
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
  headerTitle: { fontSize: 19, fontWeight: '700', color: '#1E293B' },
  scrollContainer: { paddingHorizontal: 20, paddingBottom: 40 },
  topSection: { alignItems: 'center', marginVertical: 20 },
  shieldCircle: { 
    width: 80, height: 80, borderRadius: 40, 
    backgroundColor: 'rgba(14, 165, 233, 0.1)', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 20 
  },
  introText: { 
    textAlign: 'center', fontSize: 14, 
    color: '#64748B', lineHeight: 22, paddingHorizontal: 10 
  },
  card: { 
    backgroundColor: '#FFF', borderRadius: 24, 
    padding: 20, marginBottom: 15,
    shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10, elevation: 2
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  iconBox: { 
    width: 42, height: 42, borderRadius: 12, 
    justifyContent: 'center', alignItems: 'center', marginRight: 15 
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#1E293B' },
  cardSub: { fontSize: 12, color: '#94A3B8', marginTop: 1 },
  bulletSection: { paddingLeft: 5 },
  bulletItem: { fontSize: 13, color: '#64748B', lineHeight: 22, marginBottom: 8 },
  standardsList: { marginTop: 5 },
  standardRow: { 
    flexDirection: 'row', alignItems: 'center', 
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' 
  },
  standardText: { fontSize: 14, color: '#475569', marginLeft: 12, fontWeight: '500' },
  cardBody: { fontSize: 14, color: '#64748B', lineHeight: 22, marginBottom: 20 },
  reportBtn: { 
    backgroundColor: '#F1F5F9', height: 48, borderRadius: 24, 
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center' 
  },
  reportBtnText: { color: '#475569', fontWeight: '700', marginLeft: 8 },
  footer: { marginTop: 20, alignItems: 'center' },
  footerText: { fontSize: 13, color: '#94A3B8' },
  contactLink: { fontSize: 14, color: '#0EA5E9', fontWeight: '700', marginTop: 5 },
});