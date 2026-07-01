import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import glowIcon from '../../assets/glow.png';

const BottomNavBar = ({ navigation, activeTab }) => {
  return (
    <View style={styles.navContainer}>
      <View style={styles.navBar}>
        
        {/* Home Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <View style={activeTab === 'Home' ? styles.activeIconWrap : null}>
            <Ionicons name="home" size={24} color={activeTab === 'Home' ? '#00D2FF' : '#8E8E8E'} />
          </View>
        </TouchableOpacity>

        {/* People Button */}
        <TouchableOpacity onPress={() => navigation.navigate('People')}>
          <View style={activeTab === 'People' ? styles.activeIconWrap : null}>
            <Ionicons name="people-outline" size={24} color={activeTab === 'People' ? '#00D2FF' : '#8E8E8E'} />
          </View>
        </TouchableOpacity>

          {/* Center Glow Button */}
        <View style={styles.centerButtonContainer}>
          <LinearGradient 
            colors={["rgba(0, 210, 255, 0.5)", "rgba(58, 123, 213, 0.2)"]} 
            style={styles.glow} 
          />
          <TouchableOpacity 
            style={styles.centerButton} 
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Image source={glowIcon} style={styles.glowIcon} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        {/* Chat Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <View style={activeTab === 'Chat' ? styles.activeIconWrap : null}>
            <Ionicons 
              name={activeTab === 'Chat' ? "chatbox" : "chatbox-outline"} 
              size={24} 
              color={activeTab === 'Chat' ? '#00D2FF' : '#8E8E8E'} 
            />
          </View>
        </TouchableOpacity>

        {/* Profile Button - UPDATED */}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View style={activeTab === 'Profile' ? styles.activeIconWrap : null}>
            <Ionicons 
              name={activeTab === 'Profile' ? "person" : "person-outline"} 
              size={24} 
              color={activeTab === 'Profile' ? '#00D2FF' : '#8E8E8E'} 
            />
          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: { position: 'absolute', bottom: 30, left: 20, right: 20 },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',
    height: 65,
    borderRadius: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
  },
  centerButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 5,
    width: 70,
    height: 70,
    zIndex: 2,
  },
  glow: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    opacity: 0.8,
  },
  centerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#34495E',
    borderWidth: 1,
    // borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#00D2FF',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  glowIcon: {
  width: '100%',
  height: '100%',
},
  activeIconWrap: {
    backgroundColor: 'rgba(0,210,255,0.12)',
    borderRadius: 18,
    padding: 8,
    shadowColor: '#00D2FF',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default BottomNavBar;