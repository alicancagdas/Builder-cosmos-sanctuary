import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Play,
  Save,
  Download,
  Upload,
  Settings,
  Lightbulb,
  Bug,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Brain,
  Code2,
  FileText,
  Terminal,
} from "lucide-react";

const CodeEditor = () => {
  const [code, setCode] = useState(`#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::cout << "CodeMentor AI - C++ Playground!" << std::endl;
    
    // Bir vektör oluşturalım
    std::vector<int> numbers = {5, 2, 8, 1, 9, 3};
    
    // Vektörü sıralayalım
    std::sort(numbers.begin(), numbers.end());
    
    // Sonuçları yazdıralım
    std::cout << "Sıralanmış sayılar: ";
    for (int num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`);

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errors, setErrors] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [language, setLanguage] = useState("cpp");
  const [theme, setTheme] = useState("dark");

  const [executionHistory, setExecutionHistory] = useState([
    {
      id: 1,
      timestamp: "14:32:15",
      status: "success",
      executionTime: "0.12s",
      output:
        "CodeMentor AI - C++ Playground!\nSıralanmış sayılar: 1 2 3 5 8 9",
    },
    {
      id: 2,
      timestamp: "14:28:43",
      status: "error",
      executionTime: "0.05s",
      error: "error: 'cout' was not declared in this scope",
    },
  ]);

  const codeTemplates = [
    {
      name: "Hello World (C)",
      language: "c",
      code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    },
    {
      name: "Hello World (C++)",
      language: "cpp",
      code: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
    },
    {
      name: "Array Operations",
      language: "cpp",
      code: `#include <iostream>
#include <vector>

int main() {
    std::vector<int> arr = {1, 2, 3, 4, 5};
    
    for (int i = 0; i < arr.size(); i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;
    
    return 0;
}`,
    },
    {
      name: "Class Example",
      language: "cpp",
      code: `#include <iostream>
#include <string>

class Person {
private:
    std::string name;
    int age;

public:
    Person(std::string n, int a) : name(n), age(a) {}
    
    void introduce() {
        std::cout << "Hi, I'm " << name << " and I'm " << age << " years old." << std::endl;
    }
};

int main() {
    Person person("Alice", 25);
    person.introduce();
    
    return 0;
}`,
    },
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    setErrors("");

    // Simulate compilation and execution
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock compilation result
    if (code.includes("cout") && !code.includes("#include <iostream>")) {
      setErrors(
        "compilation error: 'cout' was not declared in this scope\nDid you forget to include <iostream>?",
      );
      setExecutionHistory((prev) => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          status: "error",
          executionTime: "0.08s",
          error: "'cout' was not declared in this scope",
        },
        ...prev.slice(0, 9),
      ]);
    } else {
      setOutput(
        "CodeMentor AI - C++ Playground!\nSıralanmış sayılar: 1 2 3 5 8 9\n\nProgram finished with exit code 0",
      );
      setExecutionHistory((prev) => [
        {
          id: Date.now(),
          timestamp: new Date().toLocaleTimeString(),
          status: "success",
          executionTime: "0.15s",
          output: "Program executed successfully",
        },
        ...prev.slice(0, 9),
      ]);
    }

    setIsRunning(false);
  };

  const loadTemplate = (template: (typeof codeTemplates)[0]) => {
    setCode(template.code);
    setLanguage(template.language);
    setOutput("");
    setErrors("");
  };

  const getAIHelp = () => {
    // Mock AI help
    const suggestions = [
      "Bu kodda #include <iostream> eksik görünüyor.",
      "std::cout kullanmak için iostream header'ını eklemeyi unutmayın.",
      "Vector kullanımı doğru, ancak range-based for loop daha modern olurdu.",
      "main() fonksiyonu return 0 ile bitmelidir.",
    ];

    const randomSuggestion =
      suggestions[Math.floor(Math.random() * suggestions.length)];
    setOutput((prev) => prev + "\n\n🤖 AI Önerisi: " + randomSuggestion);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Code2 className="w-8 h-8" />
            Kod Editörü
          </h1>
          <p className="text-muted-foreground">
            C ve C++ kodlarınızı yazın, derleyin ve test edin
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="c">C</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Ayarlar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Code Templates Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Şablonlar</CardTitle>
            <CardDescription>Hızlı başlangıç için hazır kodlar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {codeTemplates.map((template, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3"
                onClick={() => loadTemplate(template)}
              >
                <div className="text-left">
                  <div className="font-medium text-sm">{template.name}</div>
                  <Badge variant="outline" className="text-xs mt-1">
                    {template.language.toUpperCase()}
                  </Badge>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Main Editor Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Toolbar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button onClick={runCode} disabled={isRunning}>
                    {isRunning ? (
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Play className="w-4 h-4 mr-2" />
                    )}
                    {isRunning ? "Çalıştırılıyor..." : "Çalıştır"}
                  </Button>
                  <Button variant="outline" onClick={getAIHelp}>
                    <Brain className="w-4 h-4 mr-2" />
                    AI Yardım
                  </Button>
                  <Separator orientation="vertical" className="h-6" />
                  <Button variant="ghost" size="sm">
                    <Save className="w-4 h-4 mr-2" />
                    Kaydet
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Yükle
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Zap className="w-4 h-4" />
                  <span>Compiler: GCC 11.2</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor and Output */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Editor */}
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  main.{language}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Kodunuzu buraya yazın..."
                  className="min-h-[500px] font-mono text-sm border-0 resize-none"
                  style={{
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                  }}
                />
              </CardContent>
            </Card>

            {/* Output Panel */}
            <Card className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Terminal className="w-5 h-5" />
                    Çıktı
                  </CardTitle>
                  {executionHistory.length > 0 && (
                    <Badge
                      variant={
                        executionHistory[0].status === "success"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {executionHistory[0].status === "success" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {executionHistory[0].status === "success"
                        ? "Başarılı"
                        : "Hata"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Tabs defaultValue="output" className="h-full">
                  <TabsList className="w-full justify-start">
                    <TabsTrigger value="output">Çıktı</TabsTrigger>
                    <TabsTrigger value="input">Girdi</TabsTrigger>
                    <TabsTrigger value="errors">Hatalar</TabsTrigger>
                  </TabsList>

                  <TabsContent value="output" className="mt-0 h-[450px]">
                    <ScrollArea className="h-full p-4 font-mono text-sm bg-muted/20">
                      {output ? (
                        <pre className="whitespace-pre-wrap">{output}</pre>
                      ) : (
                        <div className="text-muted-foreground">
                          Program çıktısı burada görünecek...
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="input" className="mt-0 h-[450px]">
                    <div className="p-4 h-full">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Program girdi verilerinizi buraya yazın..."
                        className="h-[400px] font-mono text-sm resize-none"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="errors" className="mt-0 h-[450px]">
                    <ScrollArea className="h-full p-4 font-mono text-sm bg-red-50 dark:bg-red-950/20">
                      {errors ? (
                        <pre className="whitespace-pre-wrap text-red-600 dark:text-red-400">
                          {errors}
                        </pre>
                      ) : (
                        <div className="text-muted-foreground">
                          Derleme hatası burada görünecek...
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Execution History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Çalıştırma Geçmişi</CardTitle>
              <CardDescription>Son kod çalıştırma sonuçları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {executionHistory.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {entry.status === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">
                          {entry.status === "success"
                            ? "Başarılı"
                            : "Derleme Hatası"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {entry.timestamp} • {entry.executionTime}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground max-w-xs truncate">
                      {entry.status === "success" ? entry.output : entry.error}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                AI Önerileri
              </CardTitle>
              <CardDescription>
                Kodunuzu geliştirmek için yapay zeka önerileri
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <Brain className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900 dark:text-blue-100">
                    Kod Optimizasyonu
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    Range-based for loop kullanarak kodunuzu daha modern hale
                    getirebilirsiniz.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-green-900 dark:text-green-100">
                    Güvenlik
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    Vector kullanımınız güvenli ve modern C++ standartlarına
                    uygun.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <Bug className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-yellow-900 dark:text-yellow-100">
                    Potansiyel İyileştirme
                  </div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">
                    const auto& kullanarak range-based for loop'u daha verimli
                    hale getirebilirsiniz.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
