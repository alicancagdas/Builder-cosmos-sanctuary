import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
<<<<<<< HEAD
=======
  Dimensions,
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4
  KeyboardAvoidingView,
  Platform,
} from "react-native";
<<<<<<< HEAD
import { TextInput, Button, Card, Chip } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../components/common/LanguageSwitch";
=======
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  withSequence,
  interpolate,
} from "react-native-reanimated";
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4

import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCard from "../components/AnimatedCard";
import FloatingActionButton from "../components/FloatingActionButton";

const { width, height } = Dimensions.get("window");

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: "text" | "code" | "suggestion";
  codeLanguage?: string;
}

const AIChatScreen = () => {
<<<<<<< HEAD
  const { t } = useTranslation();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: t(
        "aiChat.welcome",
        "Merhaba! Ben CodeMentor AI. C ve C++ hakkında her türlü sorunuzu cevaplayabilirim. Size nasıl yardımcı olabilirim?",
      ),
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
=======
  const navigation = useNavigation();
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

<<<<<<< HEAD
  const suggestedQuestions = [
    t("aiChat.examples.pointers"),
    t("aiChat.examples.classes"),
    t("aiChat.examples.memory"),
    t("aiChat.examples.debugging"),
    t("aiChat.examples.virtual", "Virtual function ne işe yarar?"),
    t("aiChat.examples.stl", "STL vector nasıl kullanılır?"),
  ];

  const quickActions = [
    {
      icon: "code-slash",
      label: t("aiChat.quickActions.explainCode", "Kod Açıkla"),
      description: t("aiChat.examples.debugging"),
    },
    {
      icon: "help-circle",
      label: t("aiChat.quickActions.askQuestion", "Soru Sor"),
      description: t("aiChat.examples.pointers"),
    },
    {
      icon: "book",
      label: t("aiChat.quickActions.concept", "Kavram Öğren"),
      description: t("aiChat.examples.classes"),
    },
    {
      icon: "bug",
      label: t("aiChat.quickActions.debug", "Hata Bul"),
      description: t("aiChat.examples.memory"),
    },
  ];
=======
  // Animation values
  const headerOpacity = useSharedValue(0);
  const inputScale = useSharedValue(0.9);
  const typingOpacity = useSharedValue(0);
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4

  useEffect(() => {
    // Initial animations
    headerOpacity.value = withTiming(1, { duration: 600 });
    inputScale.value = withDelay(
      200,
      withSpring(1, {
        damping: 15,
        stiffness: 120,
      }),
    );

    // Welcome message
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Merhaba! Ben CodeMentor AI asistanınızım. C ve C++ programlama konularında size yardımcı olmaya hazırım. Soru sormak için aşağıya yazabilirsiniz.",
      isUser: false,
      timestamp: new Date(),
      type: "text",
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    if (isTyping) {
      typingOpacity.value = withTiming(1, { duration: 300 });
    } else {
      typingOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isTyping]);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
  }));

  const inputAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: inputScale.value }],
  }));

  const typingAnimatedStyle = useAnimatedStyle(() => ({
    opacity: typingOpacity.value,
  }));

  const quickSuggestions = [
    "C'de pointer nasıl kullanılır?",
    "C++ sınıf örneği yaz",
    "Array ve linked list farkı",
    "Recursion nasıl çalışır?",
    "Bubble sort algoritması",
    "Memory leak nedir?",
  ];

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

<<<<<<< HEAD
    try {
      // Generate AI response using Ollama
      const aiResponse = await generateAIResponse(currentInput);
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: t(
          "aiChat.error",
          "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin.",
        ),
        sender: "ai",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.sender === "user";
    return (
      <View
        key={message.id}
        style={[
          styles.messageContainer,
          isUser ? styles.userMessageContainer : styles.aiMessageContainer,
        ]}
      >
        {!isUser && (
          <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} />
        )}

        <View
          style={[
            styles.messageBubble,
            isUser ? styles.userMessageBubble : styles.aiMessageBubble,
          ]}
        >
          {message.type === "code" ? (
            <View>
              <Text
                style={[styles.messageText, !isUser && styles.aiMessageText]}
              >
                {message.content.split("\n\n")[0]}
              </Text>
              {message.content.includes("int x = 10;") && (
                <View style={styles.codeBlock}>
                  <Text style={styles.codeText}>
                    {message.content.split("\n\n")[1]}
                  </Text>
                </View>
              )}
              <Text
                style={[styles.messageText, !isUser && styles.aiMessageText]}
              >
                {message.content.split("\n\n").slice(2).join("\n\n")}
              </Text>
            </View>
          ) : (
            <Text style={[styles.messageText, !isUser && styles.aiMessageText]}>
              {message.content}
            </Text>
          )}

          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>

        {isUser && (
          <Avatar.Icon size={32} icon="account" style={styles.userAvatar} />
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#3b82f6", "#8b5cf6"]}
          style={styles.headerGradient}
        >
          <View style={styles.headerContent}>
            <Avatar.Icon size={48} icon="robot" style={styles.headerAvatar} />
            <View style={styles.headerInfo}>
              <Text style={styles.headerTitle}>CodeMentor AI</Text>
              <View style={styles.statusContainer}>
                <View style={styles.onlineIndicator} />
                <Text style={styles.statusText}>
                  {t("aiChat.online", "Çevrimiçi")}
                </Text>
              </View>
=======
    // Simulate AI response
    setTimeout(
      () => {
        const aiResponse = generateAIResponse(inputText.trim());
        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000,
    );
  };

  const generateAIResponse = (userInput: string): Message => {
    const lowerInput = userInput.toLowerCase();

    if (lowerInput.includes("pointer") || lowerInput.includes("işaretçi")) {
      return {
        id: Date.now().toString(),
        text: "Pointer'lar C dilinin en güçlü özelliklerinden biridir. İşte basit bir örnek:",
        isUser: false,
        timestamp: new Date(),
        type: "code",
        codeLanguage: "c",
      };
    }

    if (lowerInput.includes("class") || lowerInput.includes("sınıf")) {
      return {
        id: Date.now().toString(),
        text: 'C++ sınıf örneği:\n\n```cpp\nclass Student {\nprivate:\n    string name;\n    int age;\npublic:\n    Student(string n, int a) : name(n), age(a) {}\n    void display() {\n        cout << "Name: " << name << ", Age: " << age << endl;\n    }\n};\n```',
        isUser: false,
        timestamp: new Date(),
        type: "code",
        codeLanguage: "cpp",
      };
    }

    if (lowerInput.includes("array") || lowerInput.includes("linked list")) {
      return {
        id: Date.now().toString(),
        text: "Array ve Linked List arasındaki temel farklar:\n\n• **Array**: Bellek adresleri ardışık, hızlı erişim (O(1)), sabit boyut\n• **Linked List**: Bellek dağınık, sıralı erişim (O(n)), dinamik boyut\n\nArray RAM'de daha verimli yer kaplar, Linked List ise ekleme/silme operasyonlarında daha esnektir.",
        isUser: false,
        timestamp: new Date(),
        type: "text",
      };
    }

    // Default responses
    const responses = [
      "Bu konuda size yardımcı olmaya çalışayım. Daha spesifik bir soru sorabilir misiniz?",
      "Güzel bir soru! Bu konuyu açıklayayım...",
      "Bu programlama konusunda elimden geldiğince yardımcı olmaya çalışacağım.",
      "İlginç bir yaklaşım. Şu şekilde ele alabiliriz...",
    ];

    return {
      id: Date.now().toString(),
      text: responses[Math.floor(Math.random() * responses.length)],
      isUser: false,
      timestamp: new Date(),
      type: "text",
    };
  };

  const renderMessage = (message: Message, index: number) => {
    const isUser = message.isUser;

    return (
      <AnimatedCard
        key={message.id}
        delay={index * 100}
        gradientColors={
          isUser
            ? ["rgba(59, 130, 246, 0.2)", "rgba(29, 78, 216, 0.1)"]
            : ["rgba(16, 185, 129, 0.2)", "rgba(5, 150, 105, 0.1)"]
        }
        shadowColor={isUser ? "#3b82f6" : "#10b981"}
        style={[
          styles.messageCard,
          isUser ? styles.userMessage : styles.aiMessage,
        ]}
      >
        <View style={styles.messageContent}>
          {!isUser && (
            <View style={styles.aiAvatar}>
              <LinearGradient
                colors={["#10b981", "#059669"]}
                style={styles.avatarGradient}
              >
                <Ionicons name="brain" size={16} color="white" />
              </LinearGradient>
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4
            </View>
          )}

          <View style={[styles.messageBody, isUser && styles.userMessageBody]}>
            {message.type === "code" ? (
              <View style={styles.codeContainer}>
                <View style={styles.codeHeader}>
                  <Ionicons name="code-slash" size={16} color="#3b82f6" />
                  <Text style={styles.codeLanguage}>
                    {message.codeLanguage?.toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.codeText}>{message.text}</Text>
              </View>
            ) : (
              <Text
                style={[styles.messageText, isUser && styles.userMessageText]}
              >
                {message.text}
              </Text>
            )}

            <Text style={styles.messageTime}>
              {message.timestamp.toLocaleTimeString("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </AnimatedCard>
    );
  };

  const renderTypingIndicator = () => (
    <Animated.View style={[styles.typingContainer, typingAnimatedStyle]}>
      <View style={styles.typingBubble}>
        <LinearGradient
          colors={["rgba(16, 185, 129, 0.2)", "rgba(5, 150, 105, 0.1)"]}
          style={styles.typingGradient}
        >
          <View style={styles.aiAvatar}>
            <LinearGradient
              colors={["#10b981", "#059669"]}
              style={styles.avatarGradient}
            >
              <Ionicons name="brain" size={16} color="white" />
            </LinearGradient>
          </View>

          <View style={styles.typingDots}>
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
            <View style={styles.typingDot} />
          </View>
        </LinearGradient>
      </View>
    </Animated.View>
  );

<<<<<<< HEAD
      {/* Quick Actions */}
      {messages.length === 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.quickActionsScrollView}
        >
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionCard}
              onPress={() => setInputMessage(action.description)}
            >
              <Ionicons name={action.icon as any} size={24} color="#3b82f6" />
              <Text style={styles.quickActionLabel}>{action.label}</Text>
              <Text style={styles.quickActionDescription}>
                {action.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <View style={styles.suggestedSection}>
          <Text style={styles.suggestedTitle}>
            {t("aiChat.examples.title")}
          </Text>
          <View style={styles.suggestedContainer}>
            {suggestedQuestions.slice(0, 3).map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestedChip}
                onPress={() => handleQuestionClick(question)}
              >
                <Text style={styles.suggestedText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}

        {isTyping && (
          <View style={styles.typingContainer}>
            <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} />
            <View style={styles.typingBubble}>
              <Text style={styles.typingText}>{t("aiChat.typing")}</Text>
              <View style={styles.typingIndicator}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder={t("aiChat.placeholder")}
          placeholderTextColor="#64748b"
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            inputMessage.trim() ? styles.sendButtonActive : null,
          ]}
          onPress={handleSendMessage}
          disabled={!inputMessage.trim() || isTyping}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputMessage.trim() ? "#ffffff" : "#64748b"}
          />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
=======
  const renderQuickSuggestion = (suggestion: string, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.suggestionChip}
      onPress={() => setInputText(suggestion)}
    >
      <LinearGradient
        colors={["rgba(59, 130, 246, 0.1)", "rgba(29, 78, 216, 0.05)"]}
        style={styles.suggestionGradient}
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4
      >
        <Text style={styles.suggestionText}>{suggestion}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AnimatedBackground variant="chat" />

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <LinearGradient
            colors={["rgba(16, 185, 129, 0.2)", "transparent"]}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.aiAvatarLarge}>
                <LinearGradient
                  colors={["#10b981", "#059669"]}
                  style={styles.avatarGradientLarge}
                >
                  <Ionicons name="brain" size={24} color="white" />
                </LinearGradient>
              </View>

              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>CodeMentor AI</Text>
                <Text style={styles.headerSubtitle}>
                  C/C++ Programlama Asistanı
                </Text>
              </View>

              <TouchableOpacity style={styles.infoButton}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#9ca3af"
                />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message, index) => renderMessage(message, index))}
          {isTyping && renderTypingIndicator()}

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Hızlı Sorular</Text>
              <View style={styles.suggestionsGrid}>
                {quickSuggestions.map((suggestion, index) =>
                  renderQuickSuggestion(suggestion, index),
                )}
              </View>
            </View>
          )}
        </ScrollView>

<<<<<<< HEAD
      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder={t("aiChat.placeholder")}
            placeholderTextColor="#64748b"
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputMessage.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Ionicons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.disclaimer}>
          {t(
            "aiChat.disclaimer",
            "AI yanıtları bilgilendirme amaçlıdır. Kritik projeler için doğrulama yapın.",
          )}
        </Text>
      </View>
    </KeyboardAvoidingView>
=======
        {/* Input */}
        <Animated.View style={[styles.inputContainer, inputAnimatedStyle]}>
          <View style={styles.inputRow}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Soru sormak için yazın..."
                placeholderTextColor="#9ca3af"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={1000}
              />

              <TouchableOpacity style={styles.attachButton}>
                <Ionicons name="attach" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim() && styles.sendButtonActive,
              ]}
              onPress={sendMessage}
              disabled={!inputText.trim()}
            >
              <LinearGradient
                colors={
                  inputText.trim()
                    ? ["#10b981", "#059669"]
                    : ["#4b5563", "#374151"]
                }
                style={styles.sendButtonGradient}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={inputText.trim() ? "white" : "#9ca3af"}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="refresh"
        onPress={() => {
          setMessages([]);
          setInputText("");
        }}
        colors={["#10b981", "#059669"]}
        position="top-right"
      />
    </View>
>>>>>>> c5963db972168cdc1574b84ea652377b7ba4d4b4
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerGradient: {
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aiAvatarLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
  },
  avatarGradientLarge: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
  },
  infoButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageCard: {
    maxWidth: "85%",
  },
  userMessage: {
    alignSelf: "flex-end",
  },
  aiMessage: {
    alignSelf: "flex-start",
  },
  messageContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 4,
  },
  avatarGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageBody: {
    flex: 1,
    padding: 12,
  },
  userMessageBody: {
    alignItems: "flex-end",
  },
  messageText: {
    fontSize: 16,
    color: "#e5e7eb",
    lineHeight: 22,
    marginBottom: 4,
  },
  userMessageText: {
    color: "#ffffff",
    textAlign: "right",
  },
  messageTime: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 4,
  },
  codeContainer: {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  codeHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(59, 130, 246, 0.2)",
  },
  codeLanguage: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3b82f6",
  },
  codeText: {
    fontSize: 14,
    color: "#e5e7eb",
    fontFamily: "monospace",
    padding: 12,
    lineHeight: 20,
  },
  typingContainer: {
    alignSelf: "flex-start",
    maxWidth: "70%",
  },
  typingBubble: {
    borderRadius: 16,
    overflow: "hidden",
  },
  typingGradient: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
  },
  typingDots: {
    flexDirection: "row",
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10b981",
    opacity: 0.7,
  },
  suggestionsContainer: {
    marginTop: 20,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 12,
  },
  suggestionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionChip: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  suggestionGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  suggestionText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "500",
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "rgba(17, 24, 39, 0.95)",
    borderTopWidth: 1,
    borderTopColor: "rgba(59, 130, 246, 0.1)",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "rgba(31, 41, 55, 0.8)",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    gap: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
    maxHeight: 100,
    paddingVertical: 8,
  },
  attachButton: {
    padding: 8,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
  },
  sendButtonActive: {
    shadowColor: "#10b981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AIChatScreen;
