import React from 'react';
import { View, Text, Switch } from 'react-native';
import { styles } from '../styles';

export function ToggleRow({ iconEmoji, iconBg, label, value, onValueChange }) {
  return (
    <View style={styles.settingRow}>
      <View style={[styles.settingIconBox, { backgroundColor: iconBg }]}>
        <Text style={{ fontSize: 17 }}>{iconEmoji}</Text>
      </View>
      <Text style={styles.settingLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#c8d8e8', true: '#3b9ddd' }}
        thumbColor={'#ffffff'}
      />
    </View>
  );
}
