import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

const emojiMap = {
  trophy: '🏆',
  rank: '↑',
  heart: '❤️',
  star_outline: '☆',
  check_circle: '✔',
  dollar: '$'
};

export function NotificationItem({ item }) {
  return (
    <View style={styles.notifCard}>
      <View style={[styles.notifIconWrap, { backgroundColor: item.iconBg }]}>
        <Text style={{ fontSize: 18 }}>{emojiMap[item.icon]}</Text>
      </View>
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.notifRow}>
          <Text style={styles.notifTitle}>{item.title}</Text>
          <Text style={styles.notifTime}>{item.time}</Text>
          {item.unread && <View style={styles.notifDot} />}
        </View>
        <Text style={styles.notifBody}>
          {item.highlight
            ? item.body.split(item.highlight).map((part, i, arr) =>
                i < arr.length - 1 ? (
                  <Text key={i}>
                    {part}
                    <Text style={styles.notifHighlight}>{item.highlight}</Text>
                  </Text>
                ) : (
                  <Text key={i}>{part}</Text>
                )
              )
            : item.body}
        </Text>
      </View>
    </View>
  );
}
