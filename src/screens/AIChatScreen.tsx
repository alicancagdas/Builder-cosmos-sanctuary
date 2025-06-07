import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, Avatar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get("window");

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "code";
}

const AIChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Merhaba! Ben CodeMentor AI. C ve C++ hakkında her türlü sorunuzu cevaplayabilirim. Size nasıl yardımcı olabilirim?",
      sender: "ai",
      timestamp: new Date(),
      type: "text",
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const suggestedQuestions = [
    "C++ ile pointer nasıl kullanılır?",
    "Class ve struct arasındaki fark nedir?",
    "Memory leak nasıl önlenir?",
    "Virtual function ne işe yarar?",
    "STL vector nasıl kullanılır?",
    "Constructor ve destructor nedir?",
  ];

  const quickActions = [
    {
      icon: "code-slash",
      label: "Kod İncele",
      description: "Kod parçanızı analiz ettirin",
    },
    {
      icon: "bulb",
      label: "Problem Çöz",
      description: "Algoritma probleminde yardım alın",
    },
    {
      icon: "book",
      label: "Konu Açıkla",
      description: "Bir konuyu detaylı öğrenin",
    },
    {
      icon: "bug",
      label: "Hata Bul",
      description: "Kodunuzdaki hatayı tespit edin",
    },
  ];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();

    let response = "";
    let type: "text" | "code" = "text";

    if (input.includes("pointer") || input.includes("işaretçi")) {
      response = `C++ dilinde pointer, bir değişkenin bellek adresini saklayan özel bir değişken türüdür.

Temel pointer kullanımı:

int x = 10;
int* ptr = &x;  // ptr, x'in adresini saklar

cout << *ptr;   // 10 - ptr'nin işaret ettiği değer
cout << ptr;    // Bellek adresi

Pointer kullanırken dikkat edilmesi gerekenler:
• Pointer'ı kullanmadan önce geçerli bir adresle initialize edin
• Null pointer'ları kontrol edin
• Delete edilen pointer'ları nullptr yapın`;
      type = "code";
    } else if (input.includes("class") || input.includes("struct")) {
      response = `C++ dilinde class ve struct arasındaki temel farklar:

**Class:**
- Üyeleri varsayılan olarak private'dır
- Genellikle karmaşık objeler için kullanılır
- Encapsulation için idealdir

**Struct:**
- Üyeleri varsayılan olarak public'dir
- Genellikle basit veri grupları için kullanılır
- C ile uyumluluk sağlar

class MyClass {
    int x;  // private
public:
    void setX(int val) { x = val; }
};

struct MyStruct {
    int x;  // public
    void setX(int val) { x = val; }
};`;
      type = "code";
    } else {
      response = `Bu konuda size yardımcı olmaya çalışayım. Sorunuzla ilgili daha spesifik bilgi verebilir misiniz? 

Örneğin:
• Hangi kod parçasında sorun yaşıyorsunuz?
• Hangi kavram hakkında daha fazla bilgi istiyorsunuz?
• Alınan hata mesajı nedir?

Bu şekilde size daha detaylı ve hedefe yönelik yardım edebilirim.`;
    }

    return {
      id: Date.now().toString(),
      content: response,
      sender: "ai",
      timestamp: new Date(),
      type,
    };
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
                <Text style={styles.statusText}>Çevrimiçi</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

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
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Örnek Sorular</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsScrollView}
          >
            {suggestedQuestions.map((question, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionChip}
                onPress={() => handleQuestionClick(question)}
              >
                <Text style={styles.suggestionText}>{question}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map(renderMessage)}

        {isTyping && (
          <View style={styles.typingContainer}>
            <Avatar.Icon size={32} icon="robot" style={styles.aiAvatar} />
            <View style={styles.typingBubble}>
              <View style={styles.typingDots}>
                <View style={[styles.typingDot, styles.typingDot1]} />
                <View style={[styles.typingDot, styles.typingDot2]} />
                <View style={[styles.typingDot, styles.typingDot3]} />
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="C ve C++ hakkında bir şey sorun..."
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
          AI yanıtları bilgilendirme amaçlıdır. Kritik projeler için doğrulama
          yapın.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  header: {
    overflow: "hidden",
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  quickActionsScrollView: {
    paddingLeft: 20,
    paddingVertical: 20,
  },
  quickActionCard: {
    width: 120,
    padding: 16,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
    marginRight: 12,
    alignItems: "center",
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },
  quickActionDescription: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
  suggestionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 12,
  },
  suggestionsScrollView: {
    flexDirection: "row",
  },
  suggestionChip: {
    backgroundColor: "#1e293b",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#334155",
  },
  suggestionText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-end",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },
  aiAvatar: {
    backgroundColor: "#1e293b",
    marginRight: 8,
  },
  userAvatar: {
    backgroundColor: "#3b82f6",
    marginLeft: 8,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 16,
    borderRadius: 16,
  },
  userMessageBubble: {
    backgroundColor: "#3b82f6",
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: "white",
    lineHeight: 22,
  },
  aiMessageText: {
    color: "#f9fafb",
  },
  codeBlock: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  codeText: {
    fontSize: 14,
    color: "#10b981",
    fontFamily: "monospace",
  },
  timestamp: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.6)",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 16,
  },
  typingBubble: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    padding: 16,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    marginLeft: 8,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#64748b",
    marginRight: 4,
  },
  typingDot1: {
    opacity: 0.4,
  },
  typingDot2: {
    opacity: 0.7,
  },
  typingDot3: {
    opacity: 1,
    marginRight: 0,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#0f172a",
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#f9fafb",
    maxHeight: 100,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#3b82f6",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#64748b",
  },
  disclaimer: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
});

export default AIChatScreen;
