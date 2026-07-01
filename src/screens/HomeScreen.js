import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../components/BottomNavbar';

const HomeScreen = () => {
  const navigation = useNavigation();
  const stories = [
    { id: 1, name: 'Asim', label: 'As', color: '#00D2FF' },
    { id: 2, name: 'Sahil K.', img: require('../../assets/Avatar-2.jpg') },
    { id: 3, name: 'Aniya', label: 'HR', color: '#FF9F43' },
    { id: 4, name: 'Laiba', label: 'IT', color: '#1DD1A1' },
    { id: 5, name: 'Zaid', label: 'ZD', color: '#A29BFE' },
    { id: 6, name: 'Hina', img: require('../../assets/Avatar-1.jpg') },
  ];

  const PostCard = ({ user, role, title, tag, image, metric, price }) => (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <Image source={require('../../assets/Avatar-1.jpg')} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user}</Text>
          <Text style={styles.userRole}>{role} • 2h ago</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={20} color="#ccc" />
      </View>

      {/* Title & Tag */}
      <View style={styles.titleRow}>
        <Text style={styles.postTitle}>{title}</Text>
        <View style={styles.tagBadge}><Text style={styles.tagText}>{tag}</Text></View>
      </View>

      {/* Main Image */}
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.postImg} />
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>Live Demo Available</Text>
        </View>
      </View>

      {/* Metric Box */}
      <View style={styles.metricContainer}>
        <Ionicons name="trending-up" size={16} color="#1DD1A1" />
        <Text style={styles.metricText}>{metric}</Text>
      </View>

      {/* Pricing Model Section - NEW */}
      <View style={styles.pricingRow}>
        <View>
          <Text style={styles.pricingLabel}>PRICING MODEL</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceValue}>{price}</Text>
            <Text style={styles.priceUnit}> / license</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
       {/* Change this block in your HomeScreen */}
<View style={styles.header}>
  <Text style={styles.logoText}>AYASC</Text>
  <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
    <Ionicons name="notifications-outline" size={24} color="#555" />
    {/* Optional: Added a notification badge to match the dashboard style */}
    <View style={{
      position: 'absolute',
      top: -2,
      right: -2,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FF5252',
      borderWidth: 1,
      borderColor: '#E3F2FD'
    }} />
  </TouchableOpacity>
</View>

        <Text style={styles.sectionTitle}>Internal Updates</Text>

        {/* Stories Scroll */}
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesScroll}>
            {stories.map(s => (
              <View key={s.id} style={styles.storyItem}>
                {s.img ? (
                  <Image source={s.img} style={styles.storyCircle} />
                ) : (
                  <View style={[styles.storyCircle, { backgroundColor: s.color + '20' }]}>
                    <Text style={{ color: s.color, fontWeight: 'bold' }}>{s.label}</Text>
                  </View>
                )}
                <Text style={styles.storyName}>{s.name}</Text>
              </View>
            ))}
            
            {/* Arrow Button at the end of stories */}
            <TouchableOpacity style={styles.storyItem}>
              <View style={[styles.storyCircle, { borderColor: '#ccc', borderWidth: 1 }]}>
                <Ionicons name="arrow-forward" size={24} color="#888" />
              </View>
              <Text style={styles.storyName}>More</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Posts */}
        <PostCard 
          user="Alex Morgan" role="Lead Developer" title="Automated Logistics Suite" 
          tag="ALS-9201" image={require('../../assets/Post1.jpg')} 
          metric="Reduced client shipping delays by 35% within the first quarter."
          price="$12,500"
        />
        <PostCard 
          user="Sarah Chen" role="Product Manager" title="Retail Analytics Dashboard" 
          tag="RAD-4412" image={require('../../assets/Post2.jpg')} 
          metric="Identified untapped customer segments, resulting in $200k boost."
          price="$8,900"
        />


        {/* Timeline Button */}
<TouchableOpacity
  style={styles.timelineBtn}
  onPress={() => navigation.navigate('ProjectTimeline')}
  activeOpacity={0.85}
>
  <Ionicons name="calendar-outline" size={18} color="#fff" />
  <Text style={styles.timelineBtnText}>Set Project Timeline</Text>
</TouchableOpacity>

        {/* Technical Task Button */}
<TouchableOpacity
  style={styles.timelineBtn}
  onPress={() => navigation.navigate('TechnicalTask')}
  activeOpacity={0.85}
>
  <Ionicons name="calendar-outline" size={18} color="#fff" />
  <Text style={styles.timelineBtnText}>Create Technical Task</Text>
</TouchableOpacity>

        {/* Hospital Website Button */}
<TouchableOpacity
  style={styles.timelineBtn}
  onPress={() => navigation.navigate('HospitalWebsite')}
  activeOpacity={0.85}
>
  <Ionicons name="globe" size={18} color="#fff" />
  <Text style={styles.timelineBtnText}>Visit Hospital Website</Text>
</TouchableOpacity>

      </ScrollView>
      <BottomNavBar navigation={navigation} activeTab="Home" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 15, alignItems: 'center' },
  logoText: { fontSize: 22, fontWeight: 'bold', color: '#00D2FF', letterSpacing: 1 },
  sectionTitle: { fontSize: 14, color: '#888', paddingHorizontal: 20, marginBottom: 15 },
  storiesContainer: { position: 'relative' },
  storiesScroll: { paddingLeft: 20, marginBottom: 20 },
  storyItem: { alignItems: 'center', marginRight: 20 },
  storyCircle: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#00D2FF' },
  storyName: { fontSize: 12, marginTop: 5, color: '#555' },
  card: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 20, borderRadius: 25, padding: 18, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, elevation: 3 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontWeight: 'bold', color: '#333' },
  userRole: { fontSize: 12, color: '#aaa' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  postTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  tagBadge: { backgroundColor: '#E0EEFF', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  tagText: { fontSize: 10, color: '#4A90E2', fontWeight: 'bold' },
  imageContainer: { position: 'relative', marginBottom: 15 },
  postImg: { width: '100%', height: 200, borderRadius: 20 },
  liveBadge: { position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15 },
  liveText: { color: '#fff', fontSize: 11, fontWeight: '500' },
  metricContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F9FA', padding: 12, borderRadius: 15, marginBottom: 15 },
  metricText: { fontSize: 13, color: '#555', marginLeft: 10, flex: 1, lineHeight: 18 },
  pricingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 15 },
  pricingLabel: { fontSize: 10, color: '#aaa', fontWeight: 'bold', letterSpacing: 0.5 },
  priceContainer: { flexDirection: 'row', alignItems: 'baseline' },
  priceValue: { fontSize: 20, fontWeight: 'bold', color: '#00D2FF' },
  priceUnit: { fontSize: 12, color: '#ccc' },
  detailsBtn: { backgroundColor: '#1C1F26', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12 },
  detailsBtnText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },


// Buttons for Timeline, Technical Task, and Hospital Website

  timelineBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  backgroundColor: '#00D2FF',
  marginHorizontal: 20,
  marginBottom: 12,
  paddingVertical: 14,
  borderRadius: 16,
  shadowColor: '#00D2FF',
  shadowOpacity: 0.3,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
},
timelineBtnText: {
  color: '#fff',
  fontSize: 15,
  fontWeight: '700',
  letterSpacing: 0.3,
},


});

export default HomeScreen;