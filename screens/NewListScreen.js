import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { C } from '../constants';
import { contacts } from '../data/contacts';

export function Screen3_NewList({ onBack }) {
  const [selected, setSelected] = useState({ '1': true, '2': true });
  const [search, setSearch] = useState('');

  const toggle = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));
  const selectedList = contacts.filter(c => selected[c.id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { justifyContent: 'space-between' }]}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={styles.headerTitle}>New List </Text>
            <Text style={{ fontSize: 16 }}>✏️</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.createBtn}>Create</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Text style={{ fontSize: 16, color: C.textLight, marginRight: 8 }}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search Contacts..."
            placeholderTextColor={C.textLight}
            style={styles.searchInput}
          />
        </View>

        <Text style={styles.sectionLabel}>SELECT CONTACTS</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {contacts.map(c => (
            <TouchableOpacity key={c.id} style={styles.contactRow} onPress={() => toggle(c.id)} activeOpacity={0.8}>
              {/* Avatar */}
              <View style={[styles.contactAvatar, { backgroundColor: c.bgColor }]}>
                {c.avatarEmoji
                  ? <Text style={{ fontSize: 22 }}>{c.avatarEmoji}</Text>
                  : <Text style={styles.contactInitials}>{c.initials}</Text>}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.contactName}>{c.name}</Text>
                <Text style={styles.contactSub}>{c.sub}</Text>
              </View>
              {/* Checkbox */}
              <View style={[styles.checkbox, selected[c.id] && styles.checkboxSelected]}>
                {selected[c.id] && <Text style={{ color: C.white, fontSize: 14, fontWeight: 'bold' }}>✓</Text>}
              </View>
            </TouchableOpacity>
          ))}
          <View style={{ height: 120 }} />
        </ScrollView>

        {/* Bottom selected row */}
        <View style={styles.selectedBar}>
          {selectedList.map(c => (
            <View key={c.id} style={styles.selectedChip}>
              <View style={[styles.selectedChipAvatar, { backgroundColor: c.bgColor }]}>
                {c.avatarEmoji
                  ? <Text style={{ fontSize: 14 }}>{c.avatarEmoji}</Text>
                  : <Text style={{ color: C.white, fontSize: 12, fontWeight: 'bold' }}>{c.initials}</Text>}
              </View>
              <TouchableOpacity style={styles.chipClose} onPress={() => toggle(c.id)}>
                <Text style={{ color: C.white, fontSize: 10, fontWeight: 'bold' }}>×</Text>
              </TouchableOpacity>
              <Text style={styles.chipName}>{c.name.split(' ')[0]}</Text>
            </View>
          ))}
          {selectedList.length > 0 && (
            <View style={styles.selectedCount}>
              <Text style={styles.selectedCountText}>{selectedList.length}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
