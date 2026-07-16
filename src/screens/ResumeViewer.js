import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';

const COLORS = { bg: '#DCEBFA', navy: '#0B2545', border: '#EDF1F7', gray: '#6B7787' };

export default function ResumeViewer() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { url, name = 'Resume' } = params || {};
  const [loading, setLoading] = useState(true);

  // Google Docs viewer renders PDFs reliably inside a WebView on both iOS and Android.
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{name}'s Resume</Text>
        <View style={{ width: 22 }} />
      </View>

      <View style={{ flex: 1 }}>
        {loading && (
          <View style={styles.loaderOverlay}>
            <ActivityIndicator size="large" color={COLORS.navy} />
            <Text style={styles.loaderText}>Loading resume...</Text>
          </View>
        )}
        <WebView
          source={{ uri: viewerUrl }}
          style={{ flex: 1, backgroundColor: COLORS.bg }}
          onLoadEnd={() => setLoading(false)}
          startInLoadingState={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14,
    borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1F29', flex: 1, textAlign: 'center' },
  loaderOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.bg, zIndex: 1,
  },
  loaderText: { marginTop: 10, color: COLORS.gray, fontSize: 13, fontWeight: '600' },
});