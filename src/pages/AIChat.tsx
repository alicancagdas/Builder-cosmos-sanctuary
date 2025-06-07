import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Send,
  Code2,
  Lightbulb,
  BookOpen,
  HelpCircle,
  Zap,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  MessageSquare,
  User,
  Clock,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  type?: "text" | "code" | "suggestion";
  helpful?: boolean | null;
}

const AIChat = () => {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      icon: Code2,
      label: "Kod İncele",
      description: "Kod parçanızı analiz ettirin",
    },
    {
      icon: Lightbulb,
      label: "Problem Çöz",
      description: "Algoritma probleminde yardım alın",
    },
    {
      icon: BookOpen,
      label: "Konu Açıkla",
      description: "Bir konuyu detaylı öğrenin",
    },
    {
      icon: HelpCircle,
      label: "Hata Bul",
      description: "Kodunuzdaki hatayı tespit edin",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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
    let type: "text" | "code" | "suggestion" = "text";

    if (input.includes("pointer") || input.includes("işaretçi")) {
      response = `C++ dilinde pointer, bir değişkenin bellek adresini saklayan özel bir değişken türüdür.

Temel pointer kullanımı:
\`\`\`cpp
int x = 10;
int* ptr = &x;  // ptr, x'in adresini saklar

cout << *ptr;   // 10 - ptr'nin işaret ettiği değer
cout << ptr;    // Bellek adresi
\`\`\`

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

\`\`\`cpp
class MyClass {
    int x;  // private
public:
    void setX(int val) { x = val; }
};

struct MyStruct {
    int x;  // public
    void setX(int val) { x = val; }
};
\`\`\``;
      type = "code";
    } else if (
      input.includes("memory leak") ||
      input.includes("bellek sızıntısı")
    ) {
      response = `Memory leak, dinamik olarak tahsis edilen belleğin serbest bırakılmaması durumudur.

**Önleme yolları:**

1. **Her new için delete kullanın:**
\`\`\`cpp
int* ptr = new int(5);
delete ptr;
ptr = nullptr;
\`\`\`

2. **Smart pointer'ları tercih edin:**
\`\`\`cpp
std::unique_ptr<int> ptr = std::make_unique<int>(5);
// Otomatik olarak temizlenir
\`\`\`

3. **RAII prensibini uygulayın:**
\`\`\`cpp
class SafeClass {
private:
    int* data;
public:
    SafeClass() : data(new int(0)) {}
    ~SafeClass() { delete data; }
};
\`\`\``;
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

  const handleRating = (messageId: string, isHelpful: boolean) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, helpful: isHelpful } : msg,
      ),
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatMessage = (content: string) => {
    // Simple code block formatting
    const parts = content.split("```");
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const lines = part.split("\n");
        const language = lines[0];
        const code = lines.slice(1).join("\n");

        return (
          <div key={index} className="my-4">
            <div className="bg-muted rounded-lg p-4 font-mono text-sm relative">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{language}</Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(code)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <pre className="whitespace-pre-wrap">{code}</pre>
            </div>
          </div>
        );
      } else {
        // Regular text
        return (
          <div key={index} className="whitespace-pre-wrap">
            {part}
          </div>
        );
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold mb-2">AI Sohbet</h1>
        <p className="text-muted-foreground">
          C ve C++ konularında uzman AI asistanınızla sohbet edin
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hızlı Aksiyonlar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => setInputMessage(action.description)}
                >
                  <action.icon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Örnek Sorular</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start h-auto p-3"
                  onClick={() => handleQuestionClick(question)}
                >
                  <MessageSquare className="w-3 h-3 mr-2 flex-shrink-0" />
                  <span className="text-xs">{question}</span>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[700px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/ai-avatar.jpg" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">CodeMentor AI</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Çevrimiçi
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <Separator />

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {message.sender === "ai" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src="/ai-avatar.jpg" />
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="space-y-2">
                        {message.sender === "ai" && message.type === "code" ? (
                          formatMessage(message.content)
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {message.content}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-xs opacity-70">
                          <Clock className="w-3 h-3" />
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>

                      {message.sender === "ai" && (
                        <div className="flex items-center gap-2 mt-3 pt-2 border-t border-border/20">
                          <span className="text-xs opacity-70">
                            Yararlı mıydı?
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-6 w-6 p-0 ${
                              message.helpful === true ? "text-green-500" : ""
                            }`}
                            onClick={() => handleRating(message.id, true)}
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-6 w-6 p-0 ${
                              message.helpful === false ? "text-red-500" : ""
                            }`}
                            onClick={() => handleRating(message.id, false)}
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src="/ai-avatar.jpg" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-4">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <Separator />

            {/* Input */}
            <div className="p-4 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="C ve C++ hakkında bir şey sorun..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                AI yanıtları bilgilendirme amaçlıdır. Kritik projeler için
                doğrulama yapın.
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
