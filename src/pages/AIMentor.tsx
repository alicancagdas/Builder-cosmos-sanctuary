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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Brain,
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Code2,
  Trophy,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  AlertTriangle,
  Info,
  Zap,
  Sparkles,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const AIMentor = () => {
  const [selectedPersona, setSelectedPersona] = useState("mentor");

  const aiPersonas = [
    {
      id: "mentor",
      name: "Prof. AI Mentor",
      role: "Kişisel Eğitmen",
      avatar: "/ai-mentor.jpg",
      description:
        "Size özel öğrenme yol haritası oluşturur ve ilerlemenizi takip eder.",
      specialty: "Kişiselleştirilmiş eğitim",
    },
    {
      id: "coach",
      name: "CodeCoach AI",
      role: "Programlama Antrenörü",
      avatar: "/ai-coach.jpg",
      description:
        "Kod yazım becerilerinizi geliştirmek için pratik egzersizler sunar.",
      specialty: "Kod geliştirme",
    },
    {
      id: "analyst",
      name: "DataWise AI",
      role: "Performans Analisti",
      avatar: "/ai-analyst.jpg",
      description:
        "Öğrenme verilerinizi analiz ederek güçlü ve zayıf yönlerinizi belirler.",
      specialty: "Performans analizi",
    },
  ];

  const recommendations = [
    {
      id: 1,
      type: "course",
      priority: "high",
      title: "Memory Management Kursunu Başlayın",
      description:
        "C++ pointer kullanımında zorlandığınızı gözlemledim. Bu kurs size büyük fayda sağlayacak.",
      estimatedTime: "3 hafta",
      difficulty: "Orta",
      reasons: [
        "Quiz sonuçlarınızda pointer sorularında düşük puan",
        "Code review'larda memory leak'ler tespit edildi",
        "Bu konuda güçlenmek career hedeflerinize uygun",
      ],
      action: {
        text: "Kursa Başla",
        link: "/courses",
      },
    },
    {
      id: 2,
      type: "practice",
      priority: "medium",
      title: "Algorithm Practice Sessions",
      description:
        "Günlük 30 dakika algoritma pratiği yaparak problem çözme becerinizi geliştirin.",
      estimatedTime: "Her gün 30 dk",
      difficulty: "Seçilebilir",
      reasons: [
        "Coding interview'lara hazırlık",
        "Logic building becerilerini güçlendirmek",
        "Pattern recognition geliştirmek",
      ],
      action: {
        text: "Alıştırmalara Git",
        link: "/exercises",
      },
    },
    {
      id: 3,
      type: "project",
      priority: "low",
      title: "Mini Proje: Calculator App",
      description:
        "OOP kavramlarını pekiştirmek için basit bir hesap makinesi uygulaması geliştirin.",
      estimatedTime: "1 hafta",
      difficulty: "Kolay",
      reasons: [
        "Class design practice",
        "User input handling",
        "Error handling öğrenme",
      ],
      action: {
        text: "Proje Detayları",
        link: "/ai-chat",
      },
    },
  ];

  const learningPath = [
    {
      id: 1,
      title: "C++ Temelleri",
      status: "completed",
      progress: 100,
      estimatedWeeks: 4,
      completedWeeks: 4,
    },
    {
      id: 2,
      title: "OOP Concepts",
      status: "in-progress",
      progress: 75,
      estimatedWeeks: 6,
      completedWeeks: 4.5,
    },
    {
      id: 3,
      title: "Memory Management",
      status: "recommended",
      progress: 0,
      estimatedWeeks: 3,
      completedWeeks: 0,
    },
    {
      id: 4,
      title: "STL & Algorithms",
      status: "locked",
      progress: 0,
      estimatedWeeks: 5,
      completedWeeks: 0,
    },
    {
      id: 5,
      title: "Advanced C++",
      status: "locked",
      progress: 0,
      estimatedWeeks: 4,
      completedWeeks: 0,
    },
  ];

  const weeklyInsights = [
    {
      metric: "Çalışma Saati",
      value: "18.5 saat",
      change: "+15%",
      trend: "up",
      insight: "Geçen haftaya göre daha aktifsiniz! Bu momentum'u koruyun.",
    },
    {
      metric: "Problem Çözme",
      value: "23 alıştırma",
      change: "+8%",
      trend: "up",
      insight:
        "Algoritma becerileriniz gelişiyor. Daha karmaşık problemleri deneyebilirsiniz.",
    },
    {
      metric: "Quiz Performansı",
      value: "87%",
      change: "-5%",
      trend: "down",
      insight: "OOP konularında biraz daha pratik yapmanızı öneririm.",
    },
    {
      metric: "Kod Kalitesi",
      value: "92%",
      change: "+12%",
      trend: "up",
      insight: "Code review'larınızda büyük ilerleme var. Tebrikler!",
    },
  ];

  const studyPlan = {
    today: [
      {
        time: "09:00 - 10:00",
        task: "C++ Constructors konusu tekrarı",
        type: "review",
        completed: true,
      },
      {
        time: "14:00 - 15:30",
        task: "Pointer alıştırmaları (5 problem)",
        type: "practice",
        completed: false,
      },
      {
        time: "20:00 - 20:30",
        task: "Memory Management quiz",
        type: "assessment",
        completed: false,
      },
    ],
    thisWeek: [
      {
        day: "Pazartesi",
        focus: "Pointer Basics",
        duration: "2 saat",
        completed: true,
      },
      {
        day: "Salı",
        focus: "Dynamic Memory",
        duration: "2.5 saat",
        completed: true,
      },
      {
        day: "Çarşamba",
        focus: "Smart Pointers",
        duration: "2 saat",
        completed: false,
      },
      {
        day: "Perşembe",
        focus: "Memory Leaks",
        duration: "1.5 saat",
        completed: false,
      },
      {
        day: "Cuma",
        focus: "Practice & Review",
        duration: "3 saat",
        completed: false,
      },
    ],
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-950/20";
      case "medium":
        return "text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20";
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-950/20";
      default:
        return "text-gray-500 bg-gray-50 dark:bg-gray-950/20";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in-progress":
        return <Play className="w-5 h-5 text-blue-500" />;
      case "recommended":
        return <Star className="w-5 h-5 text-yellow-500" />;
      case "locked":
        return <Target className="w-5 h-5 text-gray-400" />;
      default:
        return <Target className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Mentor</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Yapay zeka destekli kişisel eğitmeniniz. Size özel öğrenme yol
          haritası ve öneriler.
        </p>
      </div>

      {/* AI Persona Selection */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            AI Kişiliği Seçin
          </CardTitle>
          <CardDescription>
            Öğrenme stilinize uygun AI mentor'unuzu seçin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiPersonas.map((persona) => (
              <Card
                key={persona.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPersona === persona.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setSelectedPersona(persona.id)}
              >
                <CardContent className="p-4 text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-4">
                    <AvatarImage src={persona.avatar} />
                    <AvatarFallback>{persona.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mb-1">{persona.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {persona.role}
                  </p>
                  <Badge variant="outline" className="mb-3">
                    {persona.specialty}
                  </Badge>
                  <p className="text-xs text-muted-foreground">
                    {persona.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recommendations" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="recommendations">Öneriler</TabsTrigger>
          <TabsTrigger value="roadmap">Yol Haritası</TabsTrigger>
          <TabsTrigger value="insights">Analiz</TabsTrigger>
          <TabsTrigger value="planning">Planlama</TabsTrigger>
        </TabsList>

        <TabsContent value="recommendations" className="space-y-8">
          {/* AI Recommendations */}
          <div className="space-y-6">
            {recommendations.map((rec) => {
              const priorityStyle = getPriorityColor(rec.priority);
              return (
                <Card key={rec.id} className="relative overflow-hidden">
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      rec.priority === "high"
                        ? "bg-red-500"
                        : rec.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />

                  <CardHeader className="pl-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${priorityStyle}`}
                        >
                          {rec.type === "course" && (
                            <BookOpen className="w-5 h-5" />
                          )}
                          {rec.type === "practice" && (
                            <Code2 className="w-5 h-5" />
                          )}
                          {rec.type === "project" && (
                            <Trophy className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{rec.difficulty}</Badge>
                            <Badge variant="secondary">
                              {rec.estimatedTime}
                            </Badge>
                            <Badge
                              variant={
                                rec.priority === "high"
                                  ? "destructive"
                                  : rec.priority === "medium"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {rec.priority === "high"
                                ? "Yüksek"
                                : rec.priority === "medium"
                                  ? "Orta"
                                  : "Düşük"}{" "}
                              Öncelik
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link to={rec.action.link}>
                          {rec.action.text}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pl-6">
                    <p className="text-muted-foreground mb-4">
                      {rec.description}
                    </p>
                    <div>
                      <h4 className="font-medium mb-2">Neden bu öneri?</h4>
                      <ul className="space-y-1">
                        {rec.reasons.map((reason, index) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Hızlı Aksiyonlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center"
                  asChild
                >
                  <Link to="/ai-chat">
                    <MessageSquare className="w-6 h-6 mb-2" />
                    <span>AI ile Sohbet</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center"
                  asChild
                >
                  <Link to="/exercises">
                    <Code2 className="w-6 h-6 mb-2" />
                    <span>Pratik Yap</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center"
                  asChild
                >
                  <Link to="/quiz">
                    <Target className="w-6 h-6 mb-2" />
                    <span>Quiz Çöz</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-center"
                  asChild
                >
                  <Link to="/progress">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span>İlerleme Gör</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Kişisel Öğrenme Yol Haritası
              </CardTitle>
              <CardDescription>
                Hedefinize ulaşmak için önerilen adım adım plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningPath.map((step, index) => (
                  <div key={step.id} className="relative">
                    {index < learningPath.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-border" />
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-background border-2 border-border flex items-center justify-center flex-shrink-0">
                        {getStatusIcon(step.status)}
                      </div>

                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">
                            {step.title}
                          </h3>
                          <Badge
                            variant={
                              step.status === "completed"
                                ? "secondary"
                                : step.status === "in-progress"
                                  ? "default"
                                  : step.status === "recommended"
                                    ? "outline"
                                    : "secondary"
                            }
                          >
                            {step.status === "completed"
                              ? "Tamamlandı"
                              : step.status === "in-progress"
                                ? "Devam Ediyor"
                                : step.status === "recommended"
                                  ? "Önerilen"
                                  : "Kilitli"}
                          </Badge>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-muted-foreground mb-1">
                            <span>
                              {step.completedWeeks}/{step.estimatedWeeks} hafta
                            </span>
                            <span>{step.progress}%</span>
                          </div>
                          <Progress value={step.progress} className="h-2" />
                        </div>

                        {step.status === "in-progress" && (
                          <Button size="sm" asChild>
                            <Link to="/courses">
                              Devam Et
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        )}

                        {step.status === "recommended" && (
                          <Button size="sm" variant="outline" asChild>
                            <Link to="/courses">
                              Başla
                              <Play className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-8">
          {/* Weekly Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Haftalık Analiz
              </CardTitle>
              <CardDescription>
                Bu haftaki performansınız ve AI önerileri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {weeklyInsights.map((insight, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{insight.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          {insight.value}
                        </span>
                        <Badge
                          variant={
                            insight.trend === "up" ? "secondary" : "destructive"
                          }
                        >
                          {insight.change}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {insight.insight}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Detaylı Analiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Güçlü Yönleriniz
                  </span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• C++ syntax konusunda çok iyi seviyedesiniz</li>
                  <li>
                    • Loop ve conditional statements kullanımında usta
                    seviyesiniz
                  </li>
                  <li>
                    • Code organization ve clean code prensiplerini iyi
                    uyguluyorsunuz
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <span className="font-medium text-yellow-900 dark:text-yellow-100">
                    Gelişim Alanları
                  </span>
                </div>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Memory management konusunda pratik gerekiyor</li>
                  <li>
                    • Complex data structures kullanımında gelişim fırsatı var
                  </li>
                  <li>• Algorithm optimization teknikleri öğrenilebilir</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-900 dark:text-green-100">
                    Bir Sonraki Adımlar
                  </span>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Smart pointers konusunu öğrenmeye odaklanın</li>
                  <li>• Binary trees ve graph algoritmaları pratiği yapın</li>
                  <li>• Real-world project geliştirerek deneyim kazanın</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planning" className="space-y-8">
          {/* Today's Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Bugünkü Çalışma Planı
              </CardTitle>
              <CardDescription>
                AI tarafından size özel oluşturulan günlük plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyPlan.today.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          task.completed
                            ? "bg-green-500 border-green-500"
                            : "border-gray-300"
                        }`}
                      >
                        {task.completed && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{task.task}</div>
                        <div className="text-sm text-muted-foreground">
                          {task.time}
                        </div>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">
                        {task.type === "review"
                          ? "Tekrar"
                          : task.type === "practice"
                            ? "Pratik"
                            : "Değerlendirme"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Bu Haftaki Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {studyPlan.thisWeek.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          day.completed ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          {" "}
                          - {day.focus}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {day.duration}
                      </span>
                      {day.completed && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Önerilen Hedefler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="font-semibold">Bu Hafta</div>
                  <div className="text-sm text-muted-foreground">
                    Memory Management modülünü tamamla
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Star className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="font-semibold">Bu Ay</div>
                  <div className="text-sm text-muted-foreground">
                    C++ Advanced kursunu başlat
                  </div>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <Code2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="font-semibold">3 Ay</div>
                  <div className="text-sm text-muted-foreground">
                    Kişisel C++ projesini tamamla
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIMentor;
