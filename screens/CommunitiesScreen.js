import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { C } from '../constants';
import { communities } from '../data/communities';

function CommunityCard({ item }) {
  return (
    <TouchableOpacity style={styles.communityCard} activeOpacity={0.82}>
      <View style={[styles.communityCardIcon, { backgroundColor: item.iconBg }]}>
        {item.iconEmoji ? (
          <Text style={{ fontSize: 20 }}>{item.iconEmoji}</Text>
        ) : (
          <Text style={{ fontSize: 18, color: item.iconTextColor }}>{item.iconText}</Text>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={styles.communityCardName}>{item.name}</Text>
        <Text style={styles.communityCardRole}>{item.role}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function Screen7_Communities({ onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Communities</Text>
        </View>

        {communities.map((section, idx) => (
          <View key={idx} style={styles.communitySection}>
            {/* Section label with dot */}
            <View style={styles.communitySectionLabelRow}>
              <View style={[styles.communityDot, { backgroundColor: section.dotColor }]} />
              <Text style={styles.communitySectionLabel}>{section.group}</Text>
            </View>

            {/* Cards */}
            {section.items.map(item => (
              <CommunityCard key={item.id} item={item} />
            ))}
          </View>
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
