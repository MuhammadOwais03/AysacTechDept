import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function EngineerOfMonth({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Light blue background gradient */}
      <LinearGradient
        colors={['#E3F2FD', '#FFFFFF']}
        style={StyleSheet.absoluteFill}
      />

      <SafeAreaView style={{ flex: 1 }}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.navigate('Notification')}
          >
            <Ionicons name="arrow-back" size={24} color="#5A7A99" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Trophy Illustration Area */}
          <View style={styles.trophyContainer}>
            <LinearGradient
              colors={[ 'rgba(245,180,66,0.25)', 'rgba(245,180,66,0.08)', 'transparent' ]}
              style={styles.trophyGlow}
            />
            <View style={styles.starAccent1} />
            <View style={styles.starAccent2} />
            <View style={[styles.sparkle, styles.sparkleSmall]} />
            <View style={styles.trophyWrapper}>
              <View style={styles.trophyInner}>
                <FontAwesome5 name="trophy" size={96} color="#F5B042" />
              </View>
              <View style={styles.starBadge}>
                <Ionicons name="star" size={18} color="#FFF" />
              </View>
            </View>
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mainTitle}>Sales Engineer</Text>
            <Text style={styles.mainTitle}>of the Month</Text>
            
            <Text style={styles.congratsText}>
              Congratulations, <Text style={styles.boldText}>Sarah</Text>! You have been awarded the top performer badge for Q3 with an outstanding <Text style={styles.percentText}>100%</Text> project completion rate.
            </Text>
          </View>

          {/* Achievement Cards */}
          <View style={styles.cardsContainer}>
            {/* Performance Card */}
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                <MaterialCommunityIcons name="clipboard-check-outline" size={24} color="#4A90D9" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>PERFORMANCE</Text>
                <Text style={styles.cardValue}>12 Projects Completed</Text>
              </View>
            </View>

            {/* Feedback Card */}
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#FCE4EC' }]}>
                <Ionicons name="heart-outline" size={24} color="#F06292" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>FEEDBACK</Text>
                <Text style={styles.cardValue}>15 Client Compliments</Text>
              </View>
            </View>

            {/* Reward Card */}
            <View style={styles.infoCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
                <MaterialCommunityIcons name="cash-multiple" size={24} color="#4CAF50" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>REWARD</Text>
                <Text style={styles.cardValueGreen}>+$500 Performance Bonus</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <TouchableOpacity style={styles.shareBtnContainer} activeOpacity={0.8}>
            <LinearGradient
              colors={['#4A90D9', '#00BCD4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shareBtn}
            >
              <Ionicons name="share-social-outline" size={22} color="#FFF" />
              <Text style={styles.shareBtnText}>Share Achievement</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.claimBtn} activeOpacity={0.8}>
            <Ionicons name="gift-outline" size={20} color="#F5B042" />
            <Text style={styles.claimBtnText}>Claim Rewards</Text>
          </TouchableOpacity>
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E9F3FF' },
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(90,122,153,0.12)',
    shadowColor: '#0F2040',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 6,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: 8,
  },
  trophyContainer: {
    alignItems: 'center',
    marginVertical: 28,
  },
  trophyGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    top: 0,
    backgroundColor: 'transparent',
  },
  sparkle: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    top: 40,
    right: 56,
    shadowColor: '#F5B042',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  sparkleSmall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    top: 80,
    right: 22,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
  },
  starAccent1: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFF',
    top: 28,
    left: 26,
    opacity: 0.9,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 6,
    elevation: 2,
  },
  starAccent2: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    top: 96,
    right: 48,
    opacity: 0.85,
    shadowColor: '#FFFFFF',
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 2,
  },
  trophyWrapper: {
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyInner: {
    width: 140,
    height: 140,
    borderRadius: 90,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F5B042',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 26,
    elevation: 14,
  },
  starBadge: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF5252',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
    shadowColor: '#FF5252',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 8,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#F5B042',
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 36,
    textShadowColor: 'rgba(245,176,66,0.18)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  congratsText: {
    fontSize: 15,
    color: '#5A7A99',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  boldText: { fontWeight: '700', color: '#142036' },
  percentText: { fontWeight: '800', color: '#00BCD4' },
  cardsContainer: {
    gap: 12,
    marginBottom: 30,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
    shadowColor: '#134275',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 4,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8AACCA',
    letterSpacing: 1,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#142036',
  },
  cardValueGreen: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4CAF50',
  },
  shareBtnContainer: {
    marginBottom: 12,
    borderRadius: 15,
    overflow: 'hidden',
  },
  shareBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  shareBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    gap: 10,
  },
  claimBtnText: {
    color: '#142036',
    fontSize: 16,
    fontWeight: '700',
  },
});