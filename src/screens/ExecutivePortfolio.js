import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
const COLORS = {
  bg: '#DCEBFA', card: '#FFFFFF', navy: '#0B2545', gray: '#6B7787',
  grayLight: '#8A94A6', border: '#EDF1F7', red: '#C41E3A', chip: '#EEF2F8',
};

const MOCK = {
  tenure: '4 Years, 3 Months',
  income: '$18,500',
  command: [
    { label: 'Workers Under Command', value: 1245 },
    { label: 'Leaders Guided', value: 84 },
    { label: 'Students Taught', value: 312 },
  ],
  education: [
    { degree: 'PhD in Strategic Management', school: 'Harvard University' },
    { degree: 'MBA', school: 'Stanford University' },
  ],
  certs: ['Global Executive Leadership', 'Advanced Data Analytics'],
  experience: [
    { title: 'Supreme Head of Department', org: 'AYASC • 2020 - PRESENT', desc: 'Leading strategic initiatives across multiple divisions, overseeing a workforce of over 1,200 individuals and optimizing departmental efficiency.' },
    { title: 'VP of Strategic Operations', org: 'GLOBAL TECH INDUSTRIES • 2015 - 2020', desc: 'Managed global supply chain operations and implemented lean management practices resulting in a 15% cost reduction annually.' },
    { title: 'Senior Regional Director', org: 'OMNICORP SOLUTIONS • 2010 - 2015', desc: 'Directed regional sales teams across North America, driving revenue growth by 40% over a five-year period.' },
  ],
  cnic: '42101-8823491-2',
};


const getInitials = (n) => n.trim().split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const Card = ({ icon, title, children }) => (
  <View style={styles.card}>
    {title && (
      <View style={styles.cardHeadRow}>
        <Ionicons name={icon} size={16} color={COLORS.navy} />
        <Text style={styles.cardHeadText}>  {title}</Text>
      </View>
    )}
    {children}
  </View>
);

export default function ExecutivePortfolio() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { name = 'Unknown', role = '', isSHOD = false, onRemove } = params || {};
  const badgeText = isSHOD ? 'SUPREME HEAD OF DEPARTMENT' : role.toUpperCase();
  const generateResumePDF = async () => {

  const html = `
  <html>
  <head>

  <style>

  body {
    font-family: Arial;
    padding: 35px;
    color: #333;
  }

  h1 {
    color: #0B2545;
    margin-bottom: 5px;
  }

  h2 {
    color: #0B2545;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    margin-top: 25px;
  }

  .role {
    color:#666;
    font-size:16px;
  }

  .section {
    margin-top:20px;
  }

  li {
    margin-bottom:8px;
  }

  </style>

  </head>


  <body>

  <h1>${name}</h1>

  <div class="role">
  ${role}
  </div>


  <h2>Professional Summary</h2>

  <p>
  Executive professional with ${MOCK.tenure}
  of leadership experience managing teams,
  strategic initiatives and organizational growth.
  </p>


  <h2>Tenure & Income</h2>

  <p>
  Length of Service: ${MOCK.tenure}
  </p>

  <p>
  Monthly Income: ${MOCK.income}
  </p>


  <h2>Leadership Overview</h2>

  <ul>

  ${MOCK.command.map(item => `
    <li>
    ${item.label}: ${item.value}
    </li>
  `).join("")}

  </ul>



  <h2>Professional Experience</h2>


  ${MOCK.experience.map(exp => `

    <h3>${exp.title}</h3>

    <b>${exp.org}</b>

    <p>
    ${exp.desc}
    </p>

  `).join("")}




  <h2>Education</h2>

  <ul>

  ${MOCK.education.map(edu => `

    <li>
    <b>${edu.degree}</b>
    <br/>
    ${edu.school}
    </li>

  `).join("")}

  </ul>



  <h2>Certifications</h2>

  <ul>

  ${MOCK.certs.map(cert => `

    <li>
    ${cert}
    </li>

  `).join("")}

  </ul>



  <h2>Professional Records</h2>

  <p>
  CNIC: ${MOCK.cnic}
  </p>


  </body>

  </html>
  `;


  try {

    const { uri } = await Print.printToFileAsync({
      html
    });


    await Sharing.shareAsync(uri);


  } catch(error) {

    Alert.alert(
      "PDF Error",
      "Unable to create resume PDF"
    );

    console.log(error);

  }

};



  const handleRemove = () => {
    Alert.alert('Remove Manager', `Remove ${name} from this role?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          onRemove && onRemove();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Ionicons name="chevron-back" size={22} color={COLORS.navy} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Executive Portfolio</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { alignItems: 'center', paddingVertical: 24 }]}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarInitials}>{getInitials(name)}</Text>
          </View>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        </View>

        <Card icon="briefcase" title="Tenure & Income">
          <Text style={styles.label}>LENGTH OF SERVICE</Text>
          <Text style={styles.valueLg}>{MOCK.tenure}</Text>
          <View style={styles.divider} />
          <Text style={styles.label}>CURRENT MONTHLY INCOME</Text>
          <Text style={styles.valueLg}>{MOCK.income}</Text>
        </Card>

        <Card icon="people" title="Command Overview">
          {MOCK.command.map((c, i) => (
            <View key={c.label}>
              <View style={styles.rowBetween}>
                <Text style={styles.rowLabel}>{c.label}</Text>
                <View style={styles.pill}><Text style={styles.pillText}>{c.value}</Text></View>
              </View>
              {i < MOCK.command.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </Card>

        <Card icon="school" title="Education">
          {MOCK.education.map((e) => (
            <View key={e.degree} style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <View>
                <Text style={styles.bulletTitle}>{e.degree}</Text>
                <Text style={styles.bulletSub}>{e.school}</Text>
              </View>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.cardHeadRow}>
            <Ionicons name="checkmark-circle" size={16} color={COLORS.navy} />
            <Text style={styles.cardHeadText}>  Certifications</Text>
          </View>
          {MOCK.certs.map((c) => (
            <View key={c} style={styles.checkRow}>
              <Ionicons name="checkmark-circle-outline" size={15} color={COLORS.navy} />
              <Text style={styles.checkText}>  {c}</Text>
            </View>
          ))}
        </Card>

        <Card icon="trending-up" title="Professional Experience">
          {MOCK.experience.map((e, i) => (
            <View key={e.title} style={styles.expRow}>
              <View style={styles.expDot} />
              <View style={{ flex: 1 }}>
                <Text style={styles.expTitle}>{e.title}</Text>
                <Text style={styles.expOrg}>{e.org}</Text>
                <Text style={styles.expDesc}>{e.desc}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.recordsTitle}>Professional Records</Text>
          <Text style={styles.cnicLabel}>CNIC:  <Text style={{ fontWeight: '700', color: COLORS.navy }}>{MOCK.cnic}</Text></Text>
 <TouchableOpacity
  style={styles.resumeBtn}
  onPress={generateResumePDF}
>
  <Ionicons name="document-text-outline" size={16} color="#fff" />
  <Text style={styles.resumeBtnText}>  View Full Resume (PDF)</Text>
</TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.removeBtn} onPress={handleRemove} activeOpacity={0.85}>
          <Ionicons name="person-remove-outline" size={16} color="#fff" />
          <Text style={styles.removeBtnText}>  REMOVE MANAGER</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.bg },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 50, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1F29' },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },

  card: { backgroundColor: COLORS.card, borderRadius: 16, padding: 18, marginBottom: 18 },
  cardHeadRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardHeadText: { fontSize: 15, fontWeight: '700', color: '#1A1F29' },

  avatarCircle: { width: 84, height: 84, borderRadius: 42, backgroundColor: COLORS.navy, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  avatarInitials: { color: '#fff', fontWeight: '700', fontSize: 24 },
  name: { fontSize: 18, fontWeight: '800', color: '#1A1F29', marginBottom: 8 },
  badge: { backgroundColor: COLORS.navy, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 },
  badgeText: { color: '#fff', fontSize: 11, fontWeight: '800', letterSpacing: 0.4 },

  label: { fontSize: 11, fontWeight: '700', color: COLORS.grayLight, letterSpacing: 0.4, marginBottom: 4 },
  valueLg: { fontSize: 17, fontWeight: '800', color: COLORS.navy },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 12 },

  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowLabel: { fontSize: 13.5, color: '#1A1F29' },
  pill: { backgroundColor: COLORS.chip, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 5 },
  pillText: { fontWeight: '800', color: COLORS.navy, fontSize: 13 },

  bulletRow: { flexDirection: 'row', marginBottom: 10 },
  bullet: { color: COLORS.navy, fontSize: 16, marginRight: 8, lineHeight: 18 },
  bulletTitle: { fontSize: 13.5, fontWeight: '700', color: '#1A1F29' },
  bulletSub: { fontSize: 12, color: COLORS.gray, marginTop: 1 },

  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkText: { fontSize: 13, color: '#1A1F29' },

  expRow: { flexDirection: 'row', marginBottom: 16 },
  expDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.navy, marginRight: 12, marginTop: 6 },
  expTitle: { fontSize: 14, fontWeight: '700', color: COLORS.navy },
  expOrg: { fontSize: 11, fontWeight: '700', color: COLORS.grayLight, marginTop: 2, letterSpacing: 0.3 },
  expDesc: { fontSize: 12.5, color: COLORS.gray, marginTop: 4, lineHeight: 18 },

  recordsTitle: { fontSize: 15, fontWeight: '700', color: '#1A1F29', textAlign: 'center', marginBottom: 8 },
  cnicLabel: { fontSize: 12.5, color: COLORS.gray, textAlign: 'center', marginBottom: 14 },
  resumeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.navy, borderRadius: 12, paddingVertical: 13 },
  resumeBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  removeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.red, borderRadius: 30, paddingVertical: 16, marginTop: 4 },
  removeBtnText: { color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 0.4 },
});