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
import { uploadedFiles } from '../data/uploadedFiles';

function FileCard({ item }) {
  return (
    <View style={styles.fileCard}>
      <View style={[styles.fileIconBox, { backgroundColor: item.iconBg }]}>
        {item.iconText ? (
          <Text style={{ color: C.green, fontSize: 13, fontWeight: '800' }}>{item.icon}</Text>
        ) : (
          <Text style={{ fontSize: 20 }}>{item.icon}</Text>
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 13 }}>
        <Text style={styles.fileName}>{item.name}</Text>
        <Text style={styles.fileMeta}>
          {item.date} • {item.type}
        </Text>
        <View style={styles.fileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>👤</Text>
            <Text style={[styles.statText, item.highlight && { color: C.purple }]}>
              {item.identities} identities
            </Text>
          </View>
          <View style={[styles.statItem, { marginLeft: 16 }]}>
            <Text style={styles.statIcon}>✉</Text>
            <Text style={[styles.statText, item.highlight && { color: C.purple }]}>
              {item.emails} emails
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.moreBtn}>
        <Text style={{ color: C.textLight, fontSize: 20, lineHeight: 22 }}>⋮</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Screen6_AddNewData({ onBack }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add New Data</Text>
        </View>

        {/* Upload Box */}
        <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
          <View style={styles.uploadIconWrap}>
            <Text style={{ fontSize: 36 }}>☁️</Text>
            <View style={styles.uploadArrow}>
              <Text style={{ color: C.white, fontSize: 11, fontWeight: '800' }}>↑</Text>
            </View>
          </View>
          <Text style={styles.uploadTitle}>Upload File</Text>
          <Text style={styles.uploadSub}>Upload your email collection{'\n'}file (CSV/JSON)</Text>
        </TouchableOpacity>

        {/* Previously Uploaded */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>PREVIOUSLY UPLOADED</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>

        {uploadedFiles.map(item => (
          <FileCard key={item.id} item={item} />
        ))}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
