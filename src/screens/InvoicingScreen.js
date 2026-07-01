import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, Plus, X, FileText } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const InvoicingScreen = () => {
  const navigation = useNavigation();

  // Client Details States
  const [corpName, setCorpName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  // Project Parameter States
  const [projectValue, setProjectValue] = useState("45000");
  const [duration, setDuration] = useState("6 Months");

  // Milestone Distribution States
  const [milestones, setMilestones] = useState([
    { id: "1", label: "Initial Deposit", percentage: "10" },
    { id: "2", label: "Design Sign-off", percentage: "30" },
    { id: "3", label: "Frontend Delivery", percentage: "30" },
    { id: "4", label: "Backend Integration", percentage: "10" },
    { id: "5", label: "Final Deployment", percentage: "10" },
    { id: "6", label: "2-Month Security Retainer", percentage: "10" },
  ]);

  // Handle dynamic additions
  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { id: Date.now().toString(), label: "New Phase Description", percentage: "0" },
    ]);
  };

  const removeMilestone = (id) => {
    if (milestones.length > 1) {
      setMilestones(milestones.filter((m) => m.id !== id));
    }
  };

  const updateMilestone = (id, field, value) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // Calculations for Allocations
  const totalProjectNum = parseFloat(projectValue) || 0;
  const totalAllocatedPercentage = milestones.reduce(
    (sum, m) => sum + (parseFloat(m.percentage) || 0),
    0
  );

  return (
    <View style={styles.container}>
      {/* Background soft teal/blue gradient matching design */}
      <LinearGradient colors={["#D0EFFF", "#EBF7FF", "#FFFFFF"]} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={{ flex: 1 }}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#005F6A" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Invoice</Text>
            <Text style={styles.headerTitle}>Setup</Text>
          </View>
          <View style={styles.projectIdBadge}>
            <Text style={styles.projectIdLabel}>Project ID:</Text>
            <Text style={styles.projectIdValue}>X-92A</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          
          {/* 1. CLIENT DETAILS CARD */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Client Details</Text>
            
            <Text style={styles.inputLabel}>Corporation Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter corporation name"
              placeholderTextColor="#A0AEC0"
              value={corpName}
              onChangeText={setCorpName}
            />

            <Text style={styles.inputLabel}>Contact Person Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter contact name"
              placeholderTextColor="#A0AEC0"
              value={contactName}
              onChangeText={setContactName}
            />

            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email address"
              placeholderTextColor="#A0AEC0"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.inputLabel}>Billing Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter billing address"
              placeholderTextColor="#A0AEC0"
              multiline
              value={billingAddress}
              onChangeText={setBillingAddress}
            />
          </View>

          {/* 2. PROJECT PARAMETERS CARD */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionHeading}>Project Parameters</Text>

            <Text style={styles.inputLabel}>Total Project Value</Text>
            <View style={styles.pillInputContainer}>
              <Text style={styles.pillInputCurrency}>$</Text>
              <TextInput
                style={styles.pillTextInput}
                keyboardType="numeric"
                value={projectValue}
                onChangeText={setProjectValue}
              />
            </View>

            <Text style={styles.inputLabel}>Estimated Duration</Text>
            <View style={styles.pillInputContainer}>
              <View style={styles.durationIconStub} />
              <TextInput
                style={styles.pillTextInput}
                value={duration}
                onChangeText={setDuration}
              />
            </View>

            {/* Allocation Row & Custom Tracking Bar */}
            <View style={styles.allocationRow}>
              <Text style={styles.allocatedLabel}>Allocated</Text>
              <Text style={styles.allocatedValue}>{totalAllocatedPercentage}%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${Math.min(totalAllocatedPercentage, 100)}%` }
                ]} 
              />
            </View>
          </View>

          {/* 3. MILESTONE DISTRIBUTION HEADER */}
          <View style={styles.milestoneHeaderRow}>
            <View>
              <Text style={styles.milestoneMainTitle}>Milestone Distribution</Text>
              <Text style={styles.milestoneSubTitle}>Configure structural payment gateways</Text>
            </View>
            <TouchableOpacity style={styles.circularAddBtn} onPress={addMilestone}>
              <Plus size={20} color="#005F6A" />
            </TouchableOpacity>
          </View>

          {/* MILESTONE CARDS LIST */}
          {milestones.map((item, index) => {
            const milestoneAmount = ((parseFloat(item.percentage) || 0) / 100) * totalProjectNum;
            
            return (
              <View key={item.id} style={styles.milestoneCard}>
                {/* Visual Left Border Bar Accent */}
                <View style={styles.cardLeftAccentBar} />

                <View style={styles.milestoneCardHeader}>
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberBadgeText}>{index + 1}</Text>
                  </View>
                  <TouchableOpacity onPress={() => removeMilestone(item.id)}>
                    <X size={18} color="#A0AEC0" />
                  </TouchableOpacity>
                </View>

                <TextInput
                  style={styles.milestoneNameInput}
                  value={item.label}
                  onChangeText={(val) => updateMilestone(item.id, "label", val)}
                />

                <View style={styles.milestoneValuesRow}>
                  <View style={styles.percentageInputContainer}>
                    <TextInput
                      style={styles.percentageTextInput}
                      keyboardType="numeric"
                      value={item.percentage}
                      onChangeText={(val) => updateMilestone(item.id, "percentage", val)}
                    />
                    <Text style={styles.percentageSymbol}>%</Text>
                  </View>

                  <Text style={styles.calculatedMilestoneAmount}>
                    ${milestoneAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* GENERATE SUBMIT BUTTON */}
          <TouchableOpacity 
            style={styles.generateButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.generateButtonText}>Generate Milestone Invoices</Text>
            <FileText size={20} color="#FFFFFF" />
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 16,
  },
  backBtn: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 12,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#005F6A",
    lineHeight: 28,
  },
  projectIdBadge: {
    marginLeft: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    alignItems: "flex-start",
  },
  projectIdLabel: { fontSize: 12, color: "#718096", fontWeight: "500" },
  projectIdValue: { fontSize: 14, color: "#1A202C", fontWeight: "700" },
  content: { paddingHorizontal: 20, paddingBottom: 60 },
  
  // Outer Premium Cards Base Layout
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    padding: 24,
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#005F6A",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#718096",
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    fontSize: 14,
    color: "#2D3748",
  },
  
  // Custom Parameters Inner grey capsule styling
  pillInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9E4EC",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 4,
  },
  pillInputCurrency: {
    fontSize: 15,
    fontWeight: "600",
    color: "#718096",
    marginRight: 12,
  },
  durationIconStub: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "#718096",
    marginRight: 12,
  },
  pillTextInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
  },
  allocationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 8,
  },
  allocatedLabel: { fontSize: 13, color: "#718096", fontWeight: "500" },
  allocatedValue: { fontSize: 14, color: "#005F6A", fontWeight: "700" },
  progressBarBg: {
    height: 6,
    backgroundColor: "#E2E8F0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#005F6A",
    borderRadius: 3,
  },

  // Milestone Segment Elements
  milestoneHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  milestoneMainTitle: { fontSize: 22, fontWeight: "700", color: "#005F6A" },
  milestoneSubTitle: { fontSize: 13, color: "#718096", marginTop: 2 },
  circularAddBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  milestoneCard: {
    backgroundColor: "#EDF4F8",
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    position: "relative",
    overflow: "hidden",
  },
  cardLeftAccentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
    backgroundColor: "#005F6A",
  },
  milestoneCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numberBadge: {
    backgroundColor: "#FFFFFF",
    width: 28,
    height: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberBadgeText: { fontSize: 12, fontWeight: "700", color: "#005F6A" },
  milestoneNameInput: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2D3748",
    marginTop: 12,
    padding: 0,
  },
  milestoneValuesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },
  percentageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    width: 80,
    height: 38,
  },
  percentageTextInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: "#005F6A",
    textAlign: "center",
  },
  percentageSymbol: { fontSize: 13, color: "#718096", marginLeft: 4 },
  calculatedMilestoneAmount: { fontSize: 15, fontWeight: "600", color: "#A0AEC0" },

  // Bottom action triggers
  generateButton: {
    backgroundColor: "#005F6A",
    borderRadius: 30,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 24,
    shadowColor: "#005F6A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  generateButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});

export default InvoicingScreen;