import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Target,
  Clock,
  Trophy,
  CheckCircle,
  XCircle,
  Brain,
  Star,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Lightbulb,
  BookOpen,
  TrendingUp,
  Award,
} from "lucide-react";

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const quizzes = [
    {
      id: 1,
      title: "C++ Temelleri",
      description: "Temel C++ syntax ve kavramlar",
      questions: 10,
      timeLimit: 15,
      difficulty: "Kolay",
      topic: "Basics",
      points: 100,
      attempts: 1247,
      avgScore: 85,
      isCompleted: true,
      lastScore: 90,
    },
    {
      id: 2,
      title: "Nesne Yönelimli Programlama",
      description: "Sınıflar, kalıtım ve polimorfizm",
      questions: 15,
      timeLimit: 25,
      difficulty: "Orta",
      topic: "OOP",
      points: 200,
      attempts: 892,
      avgScore: 72,
      isCompleted: false,
      lastScore: null,
    },
    {
      id: 3,
      title: "Pointers ve Memory Management",
      description: "Pointer kullanımı ve bellek yönetimi",
      questions: 12,
      timeLimit: 20,
      difficulty: "Zor",
      topic: "Memory",
      points: 300,
      attempts: 456,
      avgScore: 58,
      isCompleted: false,
      lastScore: null,
    },
    {
      id: 4,
      title: "STL ve Algorithms",
      description: "Standard Template Library kullanımı",
      questions: 18,
      timeLimit: 30,
      difficulty: "Zor",
      topic: "STL",
      points: 350,
      attempts: 234,
      avgScore: 65,
      isCompleted: false,
      lastScore: null,
    },
  ];

  const sampleQuestions = [
    {
      id: 1,
      question:
        "Aşağıdakilerden hangisi C++ dilinde doğru bir main() fonksiyon tanımıdır?",
      options: [
        "void main()",
        "int main()",
        "main()",
        "public static void main(String[] args)",
      ],
      correctAnswer: 1,
      explanation:
        "C++ dilinde main() fonksiyonu int türü değer döndürmelidir. Bu standart gerekliliktir.",
      aiTip:
        "C++ standartlarına göre main() fonksiyonu program sonlandırma kodunu belirtmek için int döndürür.",
    },
    {
      id: 2,
      question:
        "C++ dilinde hangi operator kullanarak console'a çıktı verebiliriz?",
      options: ["printf", "cout <<", "print", "console.log"],
      correctAnswer: 1,
      explanation:
        "C++ dilinde cout << operatörü console'a çıktı vermek için kullanılır. iostream kütüphanesinde tanımlıdır.",
      aiTip:
        "cout (character output) C++ iostream kütüphanesinin bir parçasıdır ve << operatörü ile kullanılır.",
    },
    {
      id: 3,
      question:
        "Aşağıdaki değişken tanımlamalarından hangisi C++ dilinde geçersizdir?",
      options: [
        "int age = 25;",
        "double price = 19.99;",
        "string name = 'John';",
        "bool isActive = true;",
      ],
      correctAnswer: 2,
      explanation:
        "C++ dilinde string değerler çift tırnak içinde tanımlanır, tek tırnak karakter için kullanılır.",
      aiTip:
        "String literals (metin sabitleri) çift tırnak, character literals (karakter sabitleri) tek tırnak kullanır.",
    },
  ];

  const startQuiz = (quizId: number) => {
    setCurrentQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer("");
    setShowResult(false);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const nextQuestion = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer("");

      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completeQuiz();
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (parseInt(answer) === sampleQuestions[index]?.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case "Kolay":
        return "secondary";
      case "Orta":
        return "default";
      case "Zor":
        return "destructive";
      default:
        return "outline";
    }
  };

  const stats = {
    totalQuizzes: quizzes.length,
    completedQuizzes: quizzes.filter((q) => q.isCompleted).length,
    totalPoints: quizzes
      .filter((q) => q.isCompleted)
      .reduce((sum, q) => sum + q.points, 0),
    averageScore: 85,
  };

  if (currentQuiz !== null && !quizCompleted) {
    const quiz = quizzes.find((q) => q.id === currentQuiz);
    const question = sampleQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{quiz?.title}</h1>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">14:32</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant={getDifficultyBadgeVariant(quiz?.difficulty || "")}>
              {quiz?.difficulty}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Soru {currentQuestion + 1} / {sampleQuestions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {quiz?.points} puan
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{question?.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedAnswer}
              onValueChange={setSelectedAnswer}
            >
              {question?.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Önceki
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowExplanation(true)}>
              <Lightbulb className="w-4 h-4 mr-2" />
              AI İpucu
            </Button>
            <Button onClick={nextQuestion} disabled={!selectedAnswer}>
              {currentQuestion === sampleQuestions.length - 1
                ? "Bitir"
                : "Sonraki"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* AI Tip Dialog */}
        <AlertDialog open={showExplanation} onOpenChange={setShowExplanation}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI İpucu
              </AlertDialogTitle>
              <AlertDialogDescription>{question?.aiTip}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button onClick={() => setShowExplanation(false)}>Anladım</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

  if (quizCompleted) {
    const score = calculateScore();
    const quiz = quizzes.find((q) => q.id === currentQuiz);

    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Quiz Tamamlandı!</CardTitle>
            <CardDescription>{quiz?.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-4xl font-bold text-primary">{score}%</div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">
                  {
                    answers.filter(
                      (answer, index) =>
                        parseInt(answer) ===
                        sampleQuestions[index]?.correctAnswer,
                    ).length
                  }
                </div>
                <div className="text-sm text-muted-foreground">Doğru Cevap</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {answers.length -
                    answers.filter(
                      (answer, index) =>
                        parseInt(answer) ===
                        sampleQuestions[index]?.correctAnswer,
                    ).length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Yanlış Cevap
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {sampleQuestions.map((question, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <span className="text-sm">Soru {index + 1}</span>
                  {parseInt(answers[index]) === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setCurrentQuiz(null);
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setQuizCompleted(false);
                }}
                className="flex-1"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Quizlere Dön
              </Button>
              <Button
                variant="outline"
                onClick={() => startQuiz(currentQuiz!)}
                className="flex-1"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Tekrar Dene
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Quiz</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          C ve C++ bilginizi test edin. AI destekli açıklamalar ile hem test
          olun hem öğrenin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{stats.completedQuizzes}</div>
            <div className="text-sm text-muted-foreground">Tamamlanan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <div className="text-sm text-muted-foreground">Toplam Quiz</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Toplam Puan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <div className="text-sm text-muted-foreground">Ortalama</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="available" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
          <TabsTrigger value="available">Mevcut Quizler</TabsTrigger>
          <TabsTrigger value="completed">Tamamlananlar</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes
              .filter((quiz) => !quiz.isCompleted)
              .map((quiz) => (
                <Card
                  key={quiz.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={getDifficultyBadgeVariant(quiz.difficulty)}
                      >
                        {quiz.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {quiz.points} puan
                      </div>
                    </div>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-medium">{quiz.questions}</div>
                        <div className="text-muted-foreground">Soru</div>
                      </div>
                      <div>
                        <div className="font-medium">{quiz.timeLimit} dk</div>
                        <div className="text-muted-foreground">Süre</div>
                      </div>
                      <div>
                        <div className="font-medium">{quiz.avgScore}%</div>
                        <div className="text-muted-foreground">Ortalama</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {quiz.attempts} kişi denedi
                      </span>
                      <Button onClick={() => startQuiz(quiz.id)}>
                        <Target className="w-4 h-4 mr-2" />
                        Quiz'i Başlat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes
              .filter((quiz) => quiz.isCompleted)
              .map((quiz) => (
                <Card
                  key={quiz.id}
                  className="border-green-200 dark:border-green-800"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <Badge variant="secondary">Tamamlandı</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-4 h-4" />
                        {quiz.points} puan
                      </div>
                    </div>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Son Skorunuz
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">
                          {quiz.lastScore}%
                        </span>
                        <Award className="w-5 h-5 text-yellow-500" />
                      </div>
                    </div>

                    <Separator />

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => startQuiz(quiz.id)}
                        className="flex-1"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Tekrar Dene
                      </Button>
                      <Button variant="ghost" className="flex-1">
                        <Brain className="w-4 h-4 mr-2" />
                        Çözümleri Gör
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {quizzes.filter((quiz) => quiz.isCompleted).length === 0 && (
            <div className="text-center py-12">
              <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Henüz tamamlanmış quiz yok
              </h3>
              <p className="text-muted-foreground">
                İlk quiz'inizi tamamlayın ve burada sonuçları görün.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quiz;
