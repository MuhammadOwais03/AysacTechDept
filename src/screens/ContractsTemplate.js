import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Platform
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// --- Pure Vector SVG/UI Components matching reference UI 1:1 ---

const BackArrowSvg = () => (
  <View style={{ width: 20, height: 16, justifyContent: 'center' }}>
    <View style={{ width: 16, height: 2, backgroundColor: '#076B7A', position: 'absolute', left: 0 }} />
    <View style={{ width: 8, height: 2, backgroundColor: '#076B7A', transform: [{ rotate: '-45deg' }], position: 'absolute', left: 0, top: 4 }} />
    <View style={{ width: 8, height: 2, backgroundColor: '#076B7A', transform: [{ rotate: '45deg' }], position: 'absolute', left: 0, bottom: 4 }} />
  </View>
);

const DropdownArrowSvg = () => (
  <View style={{ width: 10, height: 6, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 6, height: 6, borderColor: '#657D8A', borderRightWidth: 2, borderBottomWidth: 2, transform: [{ rotate: '45deg' }], marginTop: -4 }} />
  </View>
);
const SparklesSvg = ({ size = 16, color = '#076B7A' }) => {
  // Mini independent sparkle renderer
  const SingleSparkle = ({ scale = 1 }) => (
    <View style={{ width: size * scale, height: size * scale, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ position: 'absolute', width: (size * scale) * 0.18, height: (size * scale) * 0.8, backgroundColor: color, borderRadius: 99 }} />
      <View style={{ position: 'absolute', width: (size * scale) * 0.8, height: (size * scale) * 0.18, backgroundColor: color, borderRadius: 99 }} />
      <View style={{ position: 'absolute', width: (size * scale) * 0.16, height: (size * scale) * 0.72, backgroundColor: color, borderRadius: 99, transform: [{ rotate: '45deg' }] }} />
      <View style={{ position: 'absolute', width: (size * scale) * 0.16, height: (size * scale) * 0.72, backgroundColor: color, borderRadius: 99, transform: [{ rotate: '-45deg' }] }} />
    </View>
  );

  return (
    <View style={{ width: size * 1.4, height: size * 1.4, position: 'relative' }}>
      {/* Main Large Center Sparkle */}
      <View style={{ position: 'absolute', top: size * 0.2, left: size * 0.2 }}>
        <SingleSparkle scale={1.0} />
      </View>
      {/* Top Right Smaller Sparkle */}
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
        <SingleSparkle scale={0.5} />
      </View>
      {/* Bottom Left Smallest Sparkle */}
      <View style={{ position: 'absolute', bottom: size * 0.1, left: 0 }}>
        <SingleSparkle scale={0.4} />
      </View>
    </View>
  );
};

const RobotIcon = ({ size = 16, color = '#076B7A' }) => (
  <View style={{ width: size, height: size + 2, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
    {/* Antenna Pin & Ball */}
    <View style={{ width: 2, height: 4, backgroundColor: color, position: 'absolute', top: 0 }} />
    <View style={{ width: size * 0.2, height: size * 0.2, borderRadius: 99, backgroundColor: color, position: 'absolute', top: -2 }} />
    
    {/* Main Head Base */}
    <View style={{ 
      width: size, 
      height: size * 0.75, 
      borderRadius: size * 0.18, 
      borderWidth: 1.8, 
      borderColor: color, 
      backgroundColor: '#E6F4FA',
      position: 'absolute',
      bottom: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: size * 0.15
    }}>
      {/* Digital Eye Slots */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 1 }}>
        <View style={{ width: size * 0.18, height: size * 0.18, borderRadius: 99, backgroundColor: color }} />
        <View style={{ width: size * 0.18, height: size * 0.18, borderRadius: 99, backgroundColor: color }} />
      </View>
      
      {/* Linear Mouth Grid */}
      <View style={{ width: '60%', height: 1.5, backgroundColor: color, marginTop: 1, borderRadius: 1 }} />
    </View>

    {/* Side Ears / Knobs */}
    <View style={{ width: 1.5, height: size * 0.3, backgroundColor: color, position: 'absolute', left: -1, bottom: size * 0.25, borderRadius: 1 }} />
    <View style={{ width: 1.5, height: size * 0.3, backgroundColor: color, position: 'absolute', right: -1, bottom: size * 0.25, borderRadius: 1 }} />
  </View>
);
const CustomWarningIcon = () => (
  <View style={{ width: 16, height: 14, justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
    <View style={{ width: 0, height: 0, borderLeftWidth: 8, borderRightWidth: 8, borderBottomWidth: 14, borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#FF6B6B', position: 'absolute' }} />
    <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '900', marginTop: 2 }}>!</Text>
  </View>
);

const CustomBanIcon = () => (
  <View style={{ width: 16, height: 16, borderRadius: 8, borderWidth: 2, borderColor: '#FF6B6B', justifyContent: 'center', alignItems: 'center', marginRight: 8 }}>
    <View style={{ width: 10, height: 2, backgroundColor: '#FF6B6B', transform: [{ rotate: '-45deg' }] }} />
  </View>
);

const CustomCheckIcon = ({ color = '#085D6A' }) => (
  <View style={{ width: 14, height: 10, justifyContent: 'center', alignItems: 'center', marginRight: 6 }}>
    <View style={{ width: 6, height: 2, backgroundColor: color, transform: [{ rotate: '45deg' }], position: 'absolute', left: 2, bottom: 3 }} />
    <View style={{ width: 10, height: 2, backgroundColor: color, transform: [{ rotate: '-45deg' }], position: 'absolute', left: 5, bottom: 5 }} />
  </View>
);

const CustomShieldIcon = ({ color = '#076B7A' }) => (
  <View style={{ width: 16, height: 18, marginRight: 10, marginTop: 2, alignItems: 'center' }}>
    {/* Clean geometric shield frame matching image_c2269a.png */}
    <View style={{
      width: 14,
      height: 13,
      borderWidth: 2,
      borderColor: color,
      borderTopLeftRadius: 1,
      borderTopRightRadius: 1,
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      overflow: 'hidden',
    }}>
      {/* Right side inner shading */}
      <View style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 5, backgroundColor: color, opacity: 0.2 }} />
    </View>
    {/* Central shield column line */}
    <View style={{ position: 'absolute', top: 0, bottom: 5, width: 2, backgroundColor: color }} />
  </View>
);

const CustomCalendarIcon = () => (
  <View style={{ width: 18, height: 18, borderWidth: 2, borderColor: '#076B7A', borderRadius: 4, padding: 2, marginRight: 10, justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: -4 }}>
      <View style={{ width: 2, height: 4, backgroundColor: '#076B7A' }} />
      <View style={{ width: 2, height: 4, backgroundColor: '#076B7A' }} />
    </View>
    <View style={{ height: 2, backgroundColor: '#076B7A', width: '100%', marginBottom: 2 }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, paddingHorizontal: 1 }}>
      <View style={{ width: 2, height: 2, backgroundColor: '#076B7A', borderRadius: 0.5 }} />
      <View style={{ width: 2, height: 2, backgroundColor: '#076B7A', borderRadius: 0.5 }} />
      <View style={{ width: 2, height: 2, backgroundColor: '#076B7A', borderRadius: 0.5 }} />
    </View>
  </View>
);

const CustomGavelIcon = () => (
  <View style={{ width: 14, height: 14, marginRight: 6, transform: [{ rotate: '-45deg' }] }}>
    <View style={{ width: 10, height: 6, backgroundColor: '#076B7A', borderRadius: 1 }} />
    <View style={{ width: 2, height: 12, backgroundColor: '#076B7A', alignSelf: 'center', marginTop: -2 }} />
  </View>
);

const CustomDocIcon = () => (
  <View style={{ width: 14, height: 18, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 2, padding: 2, marginRight: 8, position: 'relative' }}>
    <View style={{ width: 4, height: 4, backgroundColor: '#E6F4FA', position: 'absolute', top: -2, right: -2, transform: [{ rotate: '45deg' }] }} />
    <View style={{ width: '80%', height: 1.5, backgroundColor: '#FFFFFF', marginBottom: 2 }} />
    <View style={{ width: '60%', height: 1.5, backgroundColor: '#FFFFFF' }} />
  </View>
);

const ContractBodyIcon = () => (
  <View style={{ width: 16, height: 18, borderWidth: 2, borderColor: '#076B7A', borderRadius: 2, padding: 2, justifyContent: 'center' }}>
    <View style={{ height: 2, backgroundColor: '#076B7A', width: '80%', marginBottom: 2, alignSelf: 'flex-start' }} />
    <View style={{ height: 2, backgroundColor: '#076B7A', width: '60%', marginBottom: 2, alignSelf: 'flex-start' }} />
    <View style={{ height: 2, backgroundColor: '#076B7A', width: '40%', alignSelf: 'flex-start' }} />
  </View>
);

const SopIcon = () => (
  <View style={{ width: 18, height: 18, borderWidth: 2, borderColor: '#076B7A', borderRadius: 4, padding: 2, justifyContent: 'space-between' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#076B7A', marginRight: 3 }} />
      <View style={{ width: 7, height: 1.5, backgroundColor: '#076B7A' }} />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#076B7A', marginRight: 3 }} />
      <View style={{ width: 7, height: 1.5, backgroundColor: '#076B7A' }} />
    </View>
  </View>
);

const TimelineIcon = () => (
  <View style={{ width: 18, height: 18, borderWidth: 2, borderColor: '#076B7A', borderRadius: 3, position: 'relative', padding: 2 }}>
    <View style={{ height: 2, backgroundColor: '#076B7A', width: '100%', position: 'absolute', top: 2, left: 0, right: 0 }} />
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 4, flex: 1 }}>
      <View style={{ width: 2, backgroundColor: '#076B7A', height: '100%' }} />
      <View style={{ width: 2, backgroundColor: '#076B7A', height: '100%' }} />
    </View>
  </View>
);

const PaymentIcon = () => (
  <View style={{ borderWidth: 2, borderColor: '#076B7A', borderRadius: 3, width: 18, height: 14, position: 'relative' }}>
    <View style={{ height: 3, backgroundColor: '#076B7A', width: '100%', position: 'absolute', top: 2 }} />
    <View style={{ width: 3, height: 2, backgroundColor: '#076B7A', position: 'absolute', bottom: 2, left: 2 }} />
  </View>
);

const LegalTermsIcon = () => (
  <View style={{ width: 18, height: 16, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: 16, height: 2, backgroundColor: '#076B7A', position: 'relative' }} />
    <View style={{ width: 2, height: 10, backgroundColor: '#076B7A', position: 'absolute', bottom: 0 }} />
    <View style={{ width: 8, height: 2, backgroundColor: '#076B7A', position: 'absolute', bottom: 0 }} />
    <View style={{ width: 4, height: 1, backgroundColor: '#076B7A', position: 'absolute', left: 0, bottom: 4 }} />
    <View style={{ width: 4, height: 1, backgroundColor: '#076B7A', position: 'absolute', right: 0, bottom: 4 }} />
  </View>
);

export default function ContractsTemplate({ navigation }) {
  const handleBack = () => {
    navigation.goBack();
  };

  const [category, setCategory] = useState('AI & Data');
  const [showDropdown, setShowDropdown] = useState(false);
  const [subService, setSubService] = useState('Machine Learning Model Training');
  const [contractBody, setContractBody] = useState('This Agreement is entered into on this day...');
  const [sopWorks, setSopWorks] = useState('');
  const [sopEnds, setSopEnds] = useState('');
  
  const [projectGracePeriod, setProjectGracePeriod] = useState('3');
  const [projectPenaltyFee, setProjectPenaltyFee] = useState('20');
  const [monthlyGracePeriod, setMonthlyGracePeriod] = useState('5');
  const [monthlyPenaltyFee, setMonthlyPenaltyFee] = useState('10');
  const [stopWorkActive, setStopWorkActive] = useState(true);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [paymentType, setPaymentType] = useState('Monthly');
  const [totalAmount, setTotalAmount] = useState('15000');
  const [milestones, setMilestones] = useState([
    { id: 1, title: 'Initial' },
    { id: 2, title: 'Design' },
    { id: 3, title: 'Backend' },
  ]);

  const [customClauseText, setCustomClauseText] = useState('');
  const [tags, setTags] = useState(['Confidentiality', 'IP Ownership']);

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), title: '' }]);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleGenerateContract = () => {
    navigation.goBack();
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate.toLocaleDateString('en-US'));
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate.toLocaleDateString('en-US'));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <BackArrowSvg />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contract Editor</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Card 1: Template Setup */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Template Setup</Text>
          
          <Text style={styles.inputLabel}>Category</Text>
          <TouchableOpacity 
            style={styles.dropdownSelector} 
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Text style={styles.dropdownValue}>{category}</Text>
            <DropdownArrowSvg />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {['AI & Data', 'Software Development', 'Design & Creative', 'Marketing'].map((item) => (
                <TouchableOpacity 
                  key={item} 
                  style={styles.dropdownItem} 
                  onPress={() => { setCategory(item); setShowDropdown(false); }}
                >
                  <Text style={styles.dropdownItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <Text style={styles.inputLabel}>Sub-Service Name</Text>
          <TextInput
            style={styles.textInput}
            value={subService}
            onChangeText={setSubService}
          />

          <View style={styles.aiBadgeRow}>
            <View style={styles.aiBadge}>
              <RobotIcon size={14} color="#076B7A" />
              <Text style={styles.aiBadgeText}>AI Context Active</Text>
            </View>
          </View>
        </View>

        {/* Card 2: Contract Body */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EBF9FC' }]}>
              <ContractBodyIcon />
            </View>
            <Text style={styles.sectionHeading}>Contract Body</Text>
          </View>

          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              multiline
              value={contractBody}
              onChangeText={setContractBody}
            />
            <TouchableOpacity style={styles.sparkleIcon}>
              <SparklesSvg size={14} color="#076B7A" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Card 3: Standard Operating Procedures */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EBF9FC' }]}>
              <SopIcon />
            </View>
            <Text style={styles.sectionHeading}>Standard Operating Procedures</Text>
          </View>

          <View style={styles.sopSection}>
            <View style={styles.subLabelRow}>
              <View style={styles.playIconContainer}>
                <View style={{ width: 0, height: 0, borderLeftWidth: 6, borderBottomWidth: 4, borderTopWidth: 4, borderLeftColor: '#00A3C4', borderBottomColor: 'transparent', borderTopColor: 'transparent' }} />
              </View>
              <Text style={styles.sopSubLabel}>How it works</Text>
            </View>
            <TextInput
              style={styles.sopTextArea}
              multiline
              placeholder="Describe the working process..."
              placeholderTextColor="#9AAFC4"
              value={sopWorks}
              onChangeText={setSopWorks}
            />
          </View>

          <View style={styles.sopSection}>
            <View style={styles.subLabelRow}>
              <View style={styles.stopIconContainer}>
                <View style={{ width: 6, height: 6, backgroundColor: '#00A3C4', borderRadius: 1 }} />
              </View>
              <Text style={styles.sopSubLabel}>How it ends</Text>
            </View>
            <TextInput
              style={styles.sopTextArea}
              multiline
              placeholder="Describe termination conditions..."
              placeholderTextColor="#9AAFC4"
              value={sopEnds}
              onChangeText={setSopEnds}
            />
          </View>
        </View>

        {/* Card 4: Penalty & Stop-Work Terms */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Penalty & Stop-Work Terms</Text>

          {/* Late Payment Penalty Project */}
          <View style={styles.innerBoxGrey}>
            <View style={styles.innerBoxHeader}>
              <CustomWarningIcon />
              <Text style={styles.innerBoxTitle}>Late Payment Penalty Project</Text>
            </View>
            
            <View style={styles.penaltyInputsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.penaltyMiniLabel}>Grace Period (Days)</Text>
                <TextInput
                  style={styles.penaltyInputBox}
                  keyboardType="numeric"
                  value={projectGracePeriod}
                  onChangeText={setProjectGracePeriod}
                />
              </View>
              <Text style={styles.equationSign}>=</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.penaltyMiniLabel}>Penalty Fee</Text>
                <View style={styles.percentageInputWrapper}>
                  <TextInput
                    style={[styles.penaltyInputBox, { paddingRight: 24 }]}
                    keyboardType="numeric"
                    value={projectPenaltyFee}
                    onChangeText={setProjectPenaltyFee}
                  />
                  <Text style={styles.percentageSign}>%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Late Payment Penalty Monthly */}
          <View style={styles.innerBoxGrey}>
            <View style={styles.innerBoxHeader}>
              <CustomWarningIcon />
              <Text style={styles.innerBoxTitle}>Late Payment Penalty Monthly</Text>
            </View>
            
            <View style={styles.penaltyInputsRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.penaltyMiniLabel}>Grace Period (Days)</Text>
                <TextInput
                  style={styles.penaltyInputBox}
                  keyboardType="numeric"
                  value={monthlyGracePeriod}
                  onChangeText={setMonthlyGracePeriod}
                />
              </View>
              <Text style={styles.equationSign}>=</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.penaltyMiniLabel}>Penalty Fee</Text>
                <View style={styles.percentageInputWrapper}>
                  <TextInput
                    style={[styles.penaltyInputBox, { paddingRight: 24 }]}
                    keyboardType="numeric"
                    value={monthlyPenaltyFee}
                    onChangeText={setMonthlyPenaltyFee}
                  />
                  <Text style={styles.percentageSign}>%</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Stop Work Clause */}
          <View style={styles.innerBoxGrey}>
            <View style={[styles.innerBoxHeader, { justifyContent: 'space-between' }]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomBanIcon />
                <Text style={styles.innerBoxTitle}>Stop Work Clause</Text>
              </View>
              <Switch
                trackColor={{ false: '#D1D5DB', true: '#076B7A' }}
                thumbColor={'#FFFFFF'}
                value={stopWorkActive}
                onValueChange={setStopWorkActive}
              />
            </View>
            <Text style={styles.stopWorkText}>
              If milestones are not met or payment is delayed beyond the grace period, all project work will be suspended immediately.
            </Text>
            <View style={styles.notifyBadge}>
              <CustomCheckIcon color="#076B7A" />
              <Text style={styles.notifyText}>Notify client automatically</Text>
            </View>
          </View>
        </View>

        {/* Card 5: Timeline */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EBF9FC' }]}>
              <TimelineIcon />
            </View>
            <Text style={styles.sectionHeading}>Timeline</Text>
          </View>

          <Text style={styles.dateFieldLabel}>START DATE</Text>
          <View style={styles.dateInputWrapper}>
            <TouchableOpacity onPress={() => setShowStartPicker(true)} activeOpacity={0.7}>
              <CustomCalendarIcon />
            </TouchableOpacity>
            <TextInput
              style={styles.dateInput}
              placeholder="mm/dd/yyyy"
              placeholderTextColor="#9AAFC4"
              value={startDate}
              onChangeText={setStartDate}
            />
          </View>
          {showStartPicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}

          <Text style={styles.dateFieldLabel}>END DATE</Text>
          <View style={styles.dateInputWrapper}>
            <TouchableOpacity onPress={() => setShowEndPicker(true)} activeOpacity={0.7}>
              <CustomCalendarIcon />
            </TouchableOpacity>
            <TextInput
              style={styles.dateInput}
              placeholder="mm/dd/yyyy"
              placeholderTextColor="#9AAFC4"
              value={endDate}
              onChangeText={setEndDate}
            />
          </View>
          {showEndPicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>

        {/* Card 6: Payment Structure */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EBF9FC' }]}>
              <PaymentIcon />
            </View>
            <Text style={styles.sectionHeading}>Payment Structure</Text>
          </View>

          {/* Segmented Control */}
          <View style={styles.segmentedControlBg}>
            <TouchableOpacity 
              style={[styles.segmentBtn, paymentType === 'One-time' && styles.segmentBtnActive]}
              onPress={() => setPaymentType('One-time')}
            >
              <Text style={[styles.segmentText, paymentType === 'One-time' && styles.segmentTextActive]}>One-time</Text>
            </TouchableOpacity>
            <View style={styles.segmentDivider} />
            <TouchableOpacity 
              style={[styles.segmentBtn, paymentType === 'Monthly' && styles.segmentBtnActive]}
              onPress={() => setPaymentType('Monthly')}
            >
              <Text style={[styles.segmentText, paymentType === 'Monthly' && styles.segmentTextActive]}>Monthly</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.paymentSecurityBox}>
            <View style={{ marginTop: 2, marginRight: 8 }}>
              <CustomShieldIcon color="#076B7A" />
            </View>
            <Text style={styles.paymentSecurityText}>
              For maximum security, the first year of this monthly agreement is treated as a <Text style={{ fontWeight: '700', color: '#1A3B47' }}>one-time milestone structure</Text>. This ensures initial deliverables are legally bound before transitioning to standard recurring terms.
            </Text>
          </View>

          <Text style={styles.dateFieldLabel}>TOTAL AMOUNT</Text>
          <View style={styles.totalAmountWrapper}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.totalAmountInput}
              keyboardType="numeric"
              value={totalAmount}
              onChangeText={setTotalAmount}
            />
          </View>

          {/* Milestones Header */}
          <View style={styles.milestonesHeaderRow}>
            <Text style={styles.milestoneHeadingTitle}>Milestones</Text>
            <View style={styles.totalPercentageBadge}>
              <CustomCheckIcon color="#10B981" />
              <Text style={styles.totalPercentageText}>100% Total</Text>
            </View>
          </View>

          {/* Milestones List */}
          {milestones.map((milestone, idx) => (
            <View key={milestone.id} style={styles.milestoneItemRow}>
              <View style={styles.reorderHandle}>
                <View style={{ width: 10, height: 1.5, backgroundColor: '#9AAFC4', marginVertical: 1.5 }} />
                <View style={{ width: 10, height: 1.5, backgroundColor: '#9AAFC4', marginVertical: 1.5 }} />
              </View>
              <View style={styles.percentSymbolBox}>
                <Text style={styles.percentSymbolText}>%</Text>
              </View>
              <TextInput
                style={styles.milestoneInput}
                placeholder={milestone.title ? "" : "Milestone title"}
                placeholderTextColor="#9AAFC4"
                value={milestone.title}
                onChangeText={(text) => {
                  const updated = [...milestones];
                  updated[idx].title = text;
                  setMilestones(updated);
                }}
              />
            </View>
          ))}

          {/* Add Milestone Button */}
          <TouchableOpacity style={styles.addMilestoneBtn} onPress={addMilestone}>
            <Text style={styles.addMilestoneText}>+ Add Milestone</Text>
          </TouchableOpacity>
        </View>

        {/* Card 7: Legal Terms */}
        <View style={styles.card}>
          <View style={styles.sectionHeaderRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#EBF9FC' }]}>
              <LegalTermsIcon />
            </View>
            <Text style={styles.sectionHeading}>Legal Terms</Text>
          </View>

          <View style={styles.ipProtectionBox}>
            <Text style={styles.ipBoxLabel}>IP PROTECTION CLAUSE</Text>
            <Text style={styles.ipBoxContent}>
              Subject to AYASC Rules Art 107 (a) (b). All intellectual property developed remains the property of the client upon final payment. Contractor retains rights to pre-existing open-source
            </Text>
          </View>
        </View>

        {/* Card 7.5: Master Services Agreement */}
        <View style={styles.card}>
          <View style={styles.ipMsHeaderRow}>
            <Text style={styles.msaTitle}>Master Services Agreement</Text>
          </View>
          <Text style={styles.msaSubtitle}>Template Version 2.4 • Standard AI Implementation</Text>
          
          {/* Enhanced Separator Layout */}
          <View style={styles.ipMsSeparator} />

          {/* Clause 1 */}
          <Text style={styles.clauseHeader}>1. Introduction</Text>
          <View style={styles.clauseContentBoxGrey}>
            <Text style={styles.clauseContentText}>
              This Master Services Agreement ("Agreement") is entered into as of the Effective Date by and between the Service Provider and the Client. This Agreement governs the provision of services as detailed in the attached Statements of Work (SOW).
            </Text>
          </View>

          {/* Clause 2 */}
          <View style={styles.clauseContentBoxBlue}>
            <Text style={styles.clauseHeaderBlue}>2. AI Output Ownership & Accuracy Disclaimer</Text>
            <Text style={styles.clauseSubText}><Text style={{ fontWeight: '700' }}>2.1 Output Ownership:</Text> Client shall own all rights, title, and interest in and to the specific outputs generated by the custom AI models trained specifically for the Client under this Agreement.</Text>
            <Text style={styles.clausenSubText}><Text style={{ fontWeight: '700' }}>2.2 Model Rights:</Text> Service Provider retains all rights to the underlying algorithms, foundational models, and general methodologies used to generate the outputs. </Text>
            <Text style={styles.clauseSubText}><Text style={{ fontWeight: '700' }}>2.3 Accuracy Disclaimer:</Text> Due to the probabilistic nature of Machine Learning, Provider does not guarantee 100% accuracy of generated outputs. Client is responsible for human-in-the-loop verification of critical decisions based on model inferences.</Text>
            <View style={styles.aiTypeBadge}>
              <SparklesSvg size={14} color="#076B7A" />
            </View>
          </View>

          {/* Clause 3 */}
          <Text style={styles.clauseHeader}>3. Scope of Services</Text>
          <View style={styles.clauseContentBoxGrey}>
            <Text style={styles.dynamicVariableHint}>// Click to insert dynamic variables</Text>
            <Text style={styles.clauseContentText}>
              Provider shall deliver the services defined in the "Sub-Service Name" section above, adhering to the milestones established in the Payment Structure.
            </Text>
          </View>
        </View>

        {/* Card 8: Accordions & Custom Clauses */}
        <View style={styles.card}>
          {['4. Access Rights', '5. Responsibilities', '6. Confidentiality', '7. Liability & SLA'].map((item) => (
            <TouchableOpacity key={item} style={styles.accordionHeader} activeOpacity={0.7}>
              <Text style={styles.accordionTitle}>{item}</Text>
              <View style={styles.accordionPlusContainer}>
                <View style={{ width: 10, height: 2, backgroundColor: '#657D8A' }} />
                <View style={{ width: 2, height: 10, backgroundColor: '#657D8A', position: 'absolute' }} />
              </View>
            </TouchableOpacity>
          ))}

          <View style={{ marginTop: 24 }}>
            <View style={[styles.sectionHeaderRow, { justifyContent: 'space-between', alignItems: 'center' }]}>
              <Text style={styles.cardTitleInline}>Legal Clauses</Text>
              <TouchableOpacity style={styles.addFromRulesBtn} onPress={() => navigation.navigate('AddFromRules')}>
                <CustomGavelIcon />
                <Text style={styles.addFromRulesText}>Add from Rules</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.customClauseInput}
              multiline
              placeholder="Type custom legal clauses here..."
              placeholderTextColor="#9AAFC4"
              value={customClauseText}
              onChangeText={setCustomClauseText}
            />

            {/* Tags block */}
            <View style={styles.tagsContainer}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tagBadge}>
                  <Text style={styles.tagText}>{tag}</Text>
                  <TouchableOpacity onPress={() => removeTag(tag)} style={{ marginLeft: 6 }}>
                    <Text style={styles.tagCloseIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Footer Fixed Action Button */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateContract} activeOpacity={0.8}>
          <CustomDocIcon />
          <Text style={styles.generateButtonText}>Generate Contract</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F4FA', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#E6F4FA',
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A3B47',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 110, 
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1A3B47',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3B47',
    marginBottom: 16,
  },
  cardTitleInline: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A3B47',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#657D8A',
    marginBottom: 8,
    marginTop: 12,
  },
  dropdownSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FAFCFD',
  },
  dropdownValue: {
    fontSize: 15,
    color: '#1A3B47',
    fontWeight: '500',
  },
  dropdownMenu: {
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1A3B47',
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#1A3B47',
    backgroundColor: '#FAFCFD',
  },
  aiBadgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF9FC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  aiBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#076B7A',
    marginLeft: 6,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3B47',
  },
  textAreaContainer: {
    position: 'relative',
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
    color: '#1A3B47',
    backgroundColor: '#FAFCFD',
    height: 120,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  sparkleIcon: {
    position: 'absolute',
    right: 14,
    bottom: 14,
    backgroundColor: '#EBF9FC',
    padding: 8,
    borderRadius: 10,
  },
  sopSection: {
    marginBottom: 16,
  },
  subLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  playIconContainer: {
    width: 16,
    height: 16,
    borderRadius: 5,
    backgroundColor: '#E6F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  stopIconContainer: {
    width: 16,
    height: 16,
    borderRadius: 5,
    backgroundColor: '#E6F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  sopSubLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#526A7A',
  },
  sopTextArea: {
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A3B47',
    backgroundColor: '#FAFCFD',
    height: 70,
    textAlignVertical: 'top',
  },
  innerBoxGrey: {
    backgroundColor: '#F5F8FA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  innerBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  innerBoxTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3A5261',
  },
  penaltyInputsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  penaltyMiniLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#839cb0',
    marginBottom: 6,
  },
  penaltyInputBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE4EC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3B47',
    textAlign: 'center',
  },
  equationSign: {
    fontSize: 18,
    fontWeight: '600',
    color: '#9AAFC4',
    marginHorizontal: 14,
    marginTop: 18,
  },
  percentageInputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  percentageSign: {
    position: 'absolute',
    right: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#657D8A',
  },
  stopWorkText: {
    fontSize: 13,
    color: '#657D8A',
    lineHeight: 18,
    marginBottom: 14,
  },
  notifyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notifyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#076B7A',
  },
  dateFieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#829AB1',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 12,
  },
  dateInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: '#FAFCFD',
    marginBottom: 6,
  },
  dateInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A3B47',
    fontWeight: '500',
    padding: 0,
  },
  segmentedControlBg: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 9,
  },
  segmentBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#1A3B47',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#657D8A',
  },
  segmentTextActive: {
    color: '#076B7A',
  },
  segmentDivider: {
    width: 1,
    backgroundColor: '#DCE4EC',
    marginVertical: 6,
  },
  paymentSecurityBox: {
    flexDirection: 'row',
    backgroundColor: '#F4FAFC',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E1F0F5',
  },
  paymentSecurityText: {
    flex: 1,
    fontSize: 12.5,
    color: '#4A606A',
    lineHeight: 18,
  },
  totalAmountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFCFD',
    marginBottom: 20,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3B47',
    marginRight: 6,
  },
  totalAmountInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A3B47',
    padding: 0,
  },
  milestonesHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneHeadingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4A606A',
  },
  totalPercentageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  totalPercentageText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  milestoneItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reorderHandle: {
    paddingHorizontal: 6,
    paddingVertical: 10,
    marginRight: 4,
  },
  percentSymbolBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  percentSymbolText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#657D8A',
  },
  milestoneInput: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    color: '#1A3B47',
    backgroundColor: '#FAFCFD',
  },
  addMilestoneBtn: {
    borderWidth: 1.5,
    borderColor: '#076B7A',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addMilestoneText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#076B7A',
  },
  ipProtectionBox: {
    backgroundColor: '#FAFCFD',
    borderLeftWidth: 3,
    borderLeftColor: '#076B7A',
    padding: 12,
    marginBottom: 16,
  },
  ipBoxLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#076B7A',
    marginBottom: 4,
  },
  ipBoxContent: {
    fontSize: 12,
    color: '#657D8A',
    lineHeight: 16,
  },
  ipMsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  msaTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A3B47',
  },
  msaSubtitle: {
    fontSize: 12,
    color: '#829AB1',
    marginTop: 2,
  },
  ipMsSeparator: {
    height: 1,
    backgroundColor: '#E2E9F0',
    marginVertical: 14,
  },
  clauseHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#3A5261',
    marginBottom: 8,
  },
  clauseContentBoxGrey: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E9F0',
  },
  clauseContentText: {
    fontSize: 13,
    color: '#4A606A',
    lineHeight: 18,
  },
  clauseContentBoxBlue: {
    backgroundColor: '#F4FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#076B7A',
    position: 'relative',
  },
  clauseHeaderBlue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#076B7A',
    marginBottom: 10,
    paddingRight: 30,
  },
  clauseSubText: {
    fontSize: 13,
    color: '#1A3B47',
    lineHeight: 18,
    marginBottom: 8,
  },
  aiTypeBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D7F2FA',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#A7E0F0',
  },
  aiTypeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#076B7A',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  dynamicVariableHint: {
    fontSize: 11,
    fontWeight: '600',
    color: '#00A3C4',
    marginBottom: 6,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4F8',
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A606A',
  },
  accordionPlusContainer: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addFromRulesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF9FC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addFromRulesText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#076B7A',
  },
  customClauseInput: {
    borderWidth: 1.5,
    borderColor: '#E2E9F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A3B47',
    backgroundColor: '#FAFCFD',
    height: 90,
    textAlignVertical: 'top',
    marginTop: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#4A606A',
  },
  tagCloseIcon: {
    fontSize: 14,
    color: '#9AAFC4',
    fontWeight: '600',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#E6F4FA',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  generateButton: {
    flexDirection: 'row',
    backgroundColor: '#076B7A',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#076B7A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});