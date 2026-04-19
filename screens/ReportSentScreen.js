import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { styles } from '../styles';
import { C } from '../constants';

export function Screen4_ReportSent({ onBack }) {
  const [visible, setVisible] = useState(true);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingHorizontal: 20 }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report an Issue</Text>
        </View>

        {/* Background form (dimmed) */}
        <View style={styles.reportFormWrap}>
          <Text style={styles.reportLabel}>CATEGORY</Text>
          <View style={styles.reportSelect}>
            <Text style={styles.reportSelectText}>Select Issue Category</Text>
            <Text style={{ color: C.textLight }}>▾</Text>
          </View>
          <Text style={[styles.reportLabel, { marginTop: 18 }]}>DESCRIPTION</Text>
          <View style={styles.reportTextarea}>
            <Text style={{ color: C.textLight }}>Please describe the issue in detail...</Text>
          </View>
          <TouchableOpacity style={styles.reportSubmitBtn}>
            <Text style={styles.reportSubmitText}>Submit Report</Text>
          </TouchableOpacity>
        </View>

        {/* Modal */}
        <Modal visible={visible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              {/* Check icon */}
              <View style={styles.modalCheckWrap}>
                <View style={styles.modalCheckRing}>
                  <View style={styles.modalCheckCircle}>
                    <Text style={{ color: C.white, fontSize: 28, fontWeight: 'bold' }}>✓</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.modalTitle}>Report Sent!</Text>
              <Text style={styles.modalBody}>
                Thank you for your feedback. Our support team will review it and get back to you shortly.
              </Text>
              <TouchableOpacity style={styles.modalDoneBtn} onPress={() => setVisible(false)}>
                <Text style={styles.modalDoneText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
