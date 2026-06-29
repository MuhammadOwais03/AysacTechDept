import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import {
  ArrowLeft,
  MoreVertical,
  Plus,
  Smile,
  Send,
  Check,
  CheckCheck,
  X,
  UserPlus,
  BellOff,
  AlertTriangle,
  Ban,
  FileText,
  Camera,
  ImageIcon,
  FileSpreadsheet,
  LucideGavel,
  FileUp,
} from "lucide-react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const ParticularChat = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const scrollViewRef = useRef();

  const { user } = route.params || {
    user: {
      name: "Sarah Jenkins",
      image: "https://i.pravatar.cc/150?u=1",
      online: true,
    },
  };

  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [attachSheetVisible, setAttachSheetVisible] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      text: "Hi there! I really enjoyed our discussion about the upcoming mentorship program. I think your background in fintech would be a perfect match for our new cohort.",
      time: "10:42 AM",
      sender: "them",
    },
    {
      id: 2,
      text: "Do you have some time later this week to go over the details? I can send over the preliminary schedule.",
      time: "10:43 AM",
      sender: "them",
    },
    {
      id: 3,
      text: "Thanks Sarah! I'm definitely interested. The fintech angle sounds exciting.",
      time: "10:45 AM",
      sender: "me",
      status: "read",
    },
    {
      id: 4,
      text: "I'm free Thursday afternoon after 2 PM. Let me know if that works for you!",
      time: "10:46 AM",
      sender: "me",
      status: "read",
    },
  ]);

  const quickEmojis = ["😊", "👍", "🔥", "🙌", "✨", "😂", "💯"];

  const handleSend = () => {
    if (message.trim().length === 0 && !selectedImage) return;
    const newStatus = user.online ? "delivered" : "sent";
    const newMessage = {
      id: Date.now(),
      text: message,
      image: selectedImage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
      status: newStatus,
    };
    setChatMessages([...chatMessages, newMessage]);
    setMessage("");
    setSelectedImage(null);
    setShowEmojis(false);
    setTimeout(
      () => scrollViewRef.current?.scrollToEnd({ animated: true }),
      100,
    );
  };

  const openGallery = async () => {
    setAttachSheetVisible(false);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Denied", "Permission needed to access gallery.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) setSelectedImage(result.assets[0].uri);
  };

  const handleMenuAction = (action) => {
    setMenuVisible(false);
    if (action === "block") {
      Alert.alert("Block User", `Are you sure you want to block ${user.name}?`);
    }
  };

  const closeEmojiTray = () => {
    if (showEmojis) setShowEmojis(false);
  };

  return (
    <View style={styles.mainContainer}>
      <LinearGradient
        colors={["#E0F7FA", "#FFFFFF"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.blurSphere, styles.blurTop]} />
      <View style={[styles.blurSphere, styles.blurBottom]} />

      {/* Backdrop for Popup */}
      {menuVisible && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setMenuVisible(false)}
        />
      )}

      {/* Full Screen Image Modal */}
      <Modal visible={!!fullScreenImage} transparent animationType="fade">
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.closeModalBtn}
            onPress={() => setFullScreenImage(null)}
          >
            <X size={30} color="#FFF" />
          </TouchableOpacity>
          <Image
            source={typeof fullScreenImage === 'number' ? fullScreenImage : { uri: fullScreenImage }}
            style={styles.fullScreenImage}
            resizeMode="contain"
          />
        </View>
      </Modal>

      {/* Attach File Modal */}
      <Modal visible={attachSheetVisible} transparent animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setAttachSheetVisible(false)}
        >
          <View style={styles.attachSheet}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Attach file</Text>

            <View style={styles.templateRow}>
              <TouchableOpacity
                style={styles.templateCard}
                onPress={() => {
                  setAttachSheetVisible(false);
                  navigation.navigate("ContractsTemplate");
                }}
              >
                <View style={[styles.templateIconBox, { backgroundColor: "#E0F2F1" }]}>
                  <FileText size={24} color="#0D9488" />
                </View>
                <Text style={styles.templateText}>
                  {"Contracts \nTemplate"}
                </Text>
              </TouchableOpacity>
<View style={styles.templateCard}>
                <TouchableOpacity
                  style={[styles.templateIconBox, { backgroundColor: "#E0F2F1" }]}
                  onPress={() => {
                    setAttachSheetVisible(false);
                    navigation.navigate("InvoiceIcon");
                  }}
                >
                  <FileSpreadsheet size={24} color="#0D9488" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setAttachSheetVisible(false);
                    navigation.navigate("InvoicingScreen");
                  }}
                >
                  <Text style={styles.templateText}>Invoices Template</Text>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={styles.preloadedDoc}
              onPress={() => {
                setAttachSheetVisible(false);
                navigation.navigate("RulesRegulation");
              }}
            >
              <View style={styles.preloadedIcon}>
                <LucideGavel size={20} color="#0D9488" />
              </View>
              <View>
                <Text style={styles.preloadedTitle}>
                  Company Rules & Regulations
                </Text>
                <Text style={styles.preloadedSubtitle}>Preloaded Document</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.attachActions}>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionCircle}>
                  <FileUp size={24} color="#6B7280" />
                </View>
                <Text style={styles.actionText}>Document</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem}>
                <View style={styles.actionCircle}>
                  <Camera size={24} color="#6B7280" />
                </View>
                <Text style={styles.actionText}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionItem} onPress={openGallery}>
                <View style={styles.actionCircle}>
                  <ImageIcon size={24} color="#6B7280" />
                </View>
                <Text style={styles.actionText}>Gallery</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* FIXED CONTAINER SYSTEM */}
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat")}
              style={styles.backBtn}
            >
              <ArrowLeft size={24} color="#1F2937" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.profileTouch}
              onPress={() => navigation.navigate("VisitProfile", { user })}
            >
              <View style={styles.avatarContainer}>
                <Image
                  source={typeof user.image === 'number' ? user.image : { uri: user.image }}
                  style={styles.headerAvatar}
                />
                <View
                  style={[
                    styles.onlineBadge,
                    { backgroundColor: user.online ? "#22C55E" : "#9CA3AF" },
                  ]}
                />
              </View>
              <View style={styles.headerTextInfo}>
                <Text style={styles.headerName}>{user.name}</Text>
                <Text style={styles.onlineStatus}>
                  {user.online ? "Online" : "Offline"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRightAnchor}>
            <TouchableOpacity
              style={styles.moreBtn}
              onPress={() => setMenuVisible(!menuVisible)}
            >
              <MoreVertical size={20} color="#1F2937" />
            </TouchableOpacity>

            {menuVisible && (
              <View style={styles.popupMenu}>
                <BlurView intensity={90} tint="light" style={styles.popupBlur}>
                  <TouchableOpacity
                    style={styles.popupItem}
                    onPress={() => handleMenuAction("escalate")}
                  >
                    <UserPlus size={18} color="#4B5563" />
                    <Text style={styles.popupText}>Escalate to Manager</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.popupItem}
                    onPress={() => handleMenuAction("mute")}
                  >
                    <BellOff size={18} color="#4B5563" />
                    <Text style={styles.popupText}>Mute</Text>
                  </TouchableOpacity>
                  <View style={styles.popupDivider} />
                  <TouchableOpacity
                    style={styles.popupItem}
                    onPress={() => handleMenuAction("report")}
                  >
                    <AlertTriangle size={18} color="#EF4444" />
                    <Text style={[styles.popupText, { color: "#EF4444" }]}>
                      Report
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.popupItem}
                    onPress={() => handleMenuAction("block")}
                  >
                    <Ban size={18} color="#EF4444" />
                    <Text style={[styles.popupText, { color: "#EF4444" }]}>
                      Block
                    </Text>
                  </TouchableOpacity>
                </BlurView>
              </View>
            )}
          </View>
        </View>

        {/* CHAT SCROLL AREA */}
        <TouchableWithoutFeedback
          onPress={() => {
            closeEmojiTray();
            setMenuVisible(false);
          }}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              ref={scrollViewRef}
              contentContainerStyle={styles.chatScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.dateSeparator}>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>Today, 10:42 AM</Text>
                </View>
              </View>
              {chatMessages.map((item) => (
                <View
                  key={item.id}
                  style={
                    item.sender === "me"
                      ? styles.outgoingWrapper
                      : styles.incomingWrapper
                  }
                >
                  {item.sender === "them" && (
                    <Image
                      source={typeof user.image === 'number' ? user.image : { uri: user.image }}
                      style={styles.messageAvatar}
                    />
                  )}
                  <View
                    style={
                      item.sender === "me"
                        ? styles.outgoingContent
                        : styles.incomingContent
                    }
                  >
                    <View
                      style={[
                        item.sender === "me"
                          ? styles.outgoingBubble
                          : styles.incomingBubble,
                      ]}
                    >
                      {item.image && (
                        <TouchableOpacity
                          onPress={() => setFullScreenImage(item.image)}
                        >
                          <Image
                            source={typeof item.image === 'number' ? item.image : { uri: item.image }}
                            style={styles.chatBubbleImage}
                          />
                        </TouchableOpacity>
                      )}
                      <Text
                        style={[
                          styles.messageText,
                          item.sender === "me" && { color: "#111827" },
                        ]}
                      >
                        {item.text}
                      </Text>
                    </View>
                    <View style={styles.statusRow}>
                      <Text style={styles.timeStamp}>{item.time}</Text>
                      {item.sender === "me" && (
                        <View style={{ marginLeft: 6 }}>
                          {item.status === "read" && (
                            <CheckCheck
                              size={16}
                              color="#00C2FF"
                              strokeWidth={3}
                            />
                          )}
                          {item.status === "sent" && (
                            <Check size={16} color="#9CA3AF" strokeWidth={3} />
                          )}
                          {item.status === "delivered" && (
                            <CheckCheck
                              size={16}
                              color="#9CA3AF"
                              strokeWidth={3}
                            />
                          )}
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>

        {/* INPUT KEYBOARD SYSTEM */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
          {selectedImage && (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.imagePreview}
              />
              <TouchableOpacity
                style={styles.removeImageBtn}
                onPress={() => setSelectedImage(null)}
              >
                <X size={14} color="#FFF" />
              </TouchableOpacity>
            </View>
          )}
          {showEmojis && (
            <View style={styles.emojiTray}>
              {quickEmojis.map((e) => (
                <TouchableOpacity
                  key={e}
                  onPress={() => setMessage((prev) => prev + e)}
                >
                  <Text style={{ fontSize: 24 }}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={styles.inputAreaContainer}>
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={() => setAttachSheetVisible(true)}
            >
              <Plus size={24} color="#6B7280" />
            </TouchableOpacity>
            <View style={styles.inputWrapper}>
              <TextInput
                placeholder={
                  selectedImage ? "Add a caption..." : "Type a message..."
                }
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                onFocus={closeEmojiTray}
                multiline
              />
              <TouchableOpacity onPress={() => setShowEmojis(!showEmojis)}>
                <Smile size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
              <Send size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  safeAreaContainer: { flex: 1 },
  blurSphere: { position: "absolute", borderRadius: 9999, opacity: 0.6 },
  blurTop: {
    width: 500,
    height: 500,
    left: -39,
    top: -93.89,
    backgroundColor: "rgba(191, 219, 254, 0.3)",
  },
  blurBottom: {
    width: 400,
    height: 400,
    right: -39,
    bottom: 187.8,
    backgroundColor: "rgba(233, 213, 255, 0.3)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 64,
    backgroundColor: "transparent",
    zIndex: 20,
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  profileTouch: { flexDirection: "row", alignItems: "center" },
  headerRightAnchor: { position: "relative", zIndex: 30 },
  backBtn: { marginRight: 22 },
  avatarContainer: { position: "relative" },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  onlineBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  headerTextInfo: { marginLeft: 12, justifyContent: "center" },
  headerName: { fontWeight: "700", fontSize: 18, color: "#1F2937" },
  onlineStatus: { fontSize: 12, color: "#16A34A", fontWeight: "500" },
  moreBtn: { padding: 5 },

  popupMenu: {
    position: "absolute",
    top: 35,
    right: 0,
    width: 220,
    zIndex: 100,
  },
  popupBlur: {
    borderRadius: 16,
    overflow: "hidden",
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.98)",
    borderWidth: 1,
    borderColor: "#EEE",
  },
  popupItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  popupText: { fontSize: 14, fontWeight: "500", color: "#374151" },
  popupDivider: { height: 1, backgroundColor: "#F3F4F6", marginHorizontal: 10 },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  attachSheet: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: 40,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 20,
  },
  templateRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  templateCard: {
    flex: 1,
    backgroundColor: "#F0F9FF",
    borderRadius: 20,
    padding: 16,
    alignItems: "center",
  },
  templateIconBox: { padding: 10, borderRadius: 12, marginBottom: 8 },
  templateText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    textAlign: "left",
  },
  preloadedDoc: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDFA",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  preloadedIcon: { backgroundColor: "#FFF", padding: 8, borderRadius: 10 },
  preloadedTitle: { fontSize: 14, fontWeight: "600", color: "#1F2937" },
  preloadedSubtitle: { fontSize: 12, color: "#0D9488" },
  attachActions: { flexDirection: "row", justifyContent: "space-around" },
  actionCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  actionText: { fontSize: 12, color: "#6B7280", textAlign: "center" },

  chatScroll: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 40 },
  dateSeparator: { alignItems: "center", marginBottom: 24 },
  dateBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  dateText: { fontSize: 12, color: "#9CA3AF" },
  incomingWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 24,
    gap: 12,
  },
  messageAvatar: { width: 32, height: 32, borderRadius: 9999 },
  incomingContent: { maxWidth: 268.5, gap: 4 },
  incomingBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },
  outgoingWrapper: { alignItems: "flex-end", marginBottom: 24 },
  outgoingContent: { maxWidth: 268.5, alignItems: "flex-end", gap: 4 },
  outgoingBubble: {
    backgroundColor: "rgba(0, 194, 255, 0.15)",
    padding: 16,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(0, 194, 255, 0.2)",
  },
  chatBubbleImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  messageText: { fontSize: 14, lineHeight: 23, color: "#1F2937" },
  statusRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  timeStamp: { fontSize: 10, color: "#9CA3AF" },
  imagePreviewContainer: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  imagePreview: { width: 60, height: 60, borderRadius: 8 },
  removeImageBtn: {
    position: "absolute",
    top: 5,
    left: 60,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 10,
    padding: 2,
  },
  emojiTray: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#EEE",
  },
  inputAreaContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    height: 94,
  },
  plusBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(243, 244, 246, 0.5)",
    borderRadius: 9999,
    marginHorizontal: 12,
    paddingHorizontal: 20,
    height: 45,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  textInput: { flex: 1, fontSize: 14, color: "#1F2937" },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#00C2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullScreenImage: { width: width, height: height },
  closeModalBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
});

export default ParticularChat;