import { useState } from "react";
import { Link } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Code2,
  Trophy,
  Clock,
  Target,
  Search,
  CheckCircle,
  Star,
  Zap,
  Brain,
  Filter,
  Play,
  Lock,
  TrendingUp,
  Award,
  Flame,
} from "lucide-react";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const exercises = [
    {
      id: 1,
      title: "Hello World",
      description:
        "İlk C++ programınızı yazın. Ekrana 'Hello, World!' yazdıran bir program oluşturun.",
      difficulty: "Kolay",
      topic: "Basics",
      language: "C++",
      points: 10,
      timeLimit: "5 dk",
      submissions: 1247,
      successRate: 95,
      isCompleted: true,
      isPremium: false,
      tags: ["basics", "iostream", "cout"],
    },
    {
      id: 2,
      title: "Sayı Toplama",
      description: "Kullanıcıdan iki sayı alın ve toplamını ekrana yazdırın.",
      difficulty: "Kolay",
      topic: "I/O Operations",
      language: "C++",
      points: 15,
      timeLimit: "10 dk",
      submissions: 892,
      successRate: 87,
      isCompleted: true,
      isPremium: false,
      tags: ["input", "output", "variables"],
    },
    {
      id: 3,
      title: "Çift Sayı Kontrolü",
      description:
        "Verilen bir sayının çift mi tek mi olduğunu belirleyen program yazın.",
      difficulty: "Kolay",
      topic: "Conditionals",
      language: "C++",
      points: 20,
      timeLimit: "15 dk",
      submissions: 634,
      successRate: 82,
      isCompleted: false,
      isPremium: false,
      tags: ["if-else", "modulo", "conditionals"],
    },
    {
      id: 4,
      title: "Faktöriyel Hesaplama",
      description:
        "Recursive veya iterative yöntemle faktöriyel hesaplayan fonksiyon yazın.",
      difficulty: "Orta",
      topic: "Functions",
      language: "C++",
      points: 35,
      timeLimit: "25 dk",
      submissions: 456,
      successRate: 65,
      isCompleted: false,
      isPremium: false,
      tags: ["recursion", "loops", "functions"],
    },
    {
      id: 5,
      title: "Dizi Sıralama",
      description:
        "Bubble sort algoritmasını kullanarak bir diziyi küçükten büyüğe sıralayın.",
      difficulty: "Orta",
      topic: "Arrays",
      language: "C++",
      points: 40,
      timeLimit: "30 dk",
      submissions: 278,
      successRate: 58,
      isCompleted: false,
      isPremium: false,
      tags: ["arrays", "sorting", "algorithms"],
    },
    {
      id: 6,
      title: "Binary Search",
      description:
        "Sıralı bir dizide binary search algoritmasını implement edin.",
      difficulty: "Zor",
      topic: "Algorithms",
      language: "C++",
      points: 60,
      timeLimit: "45 dk",
      submissions: 189,
      successRate: 42,
      isCompleted: false,
      isPremium: true,
      tags: ["binary-search", "algorithms", "arrays"],
    },
    {
      id: 7,
      title: "Linked List Implementation",
      description:
        "Basit bir linked list veri yapısı oluşturun ve temel operasyonları implement edin.",
      difficulty: "Zor",
      topic: "Data Structures",
      language: "C++",
      points: 80,
      timeLimit: "60 dk",
      submissions: 123,
      successRate: 35,
      isCompleted: false,
      isPremium: true,
      tags: ["linked-list", "pointers", "data-structures"],
    },
    {
      id: 8,
      title: "Pointer Arithmetic",
      description:
        "C dilinde pointer arithmetic kullanarak array elemanlarını manipüle edin.",
      difficulty: "Orta",
      topic: "Pointers",
      language: "C",
      points: 45,
      timeLimit: "35 dk",
      submissions: 234,
      successRate: 48,
      isCompleted: false,
      isPremium: false,
      tags: ["pointers", "arrays", "memory"],
    },
  ];

  const challenges = [
    {
      id: 1,
      title: "7 Günlük C++ Challenge",
      description: "Her gün bir C++ konusu öğrenin ve pratik yapın",
      duration: "7 gün",
      participants: 892,
      reward: "C++ Explorer Badge",
      progress: 3,
      total: 7,
      isActive: true,
    },
    {
      id: 2,
      title: "Algorithm Master",
      description: "20 farklı algoritma problemini çözün",
      duration: "30 gün",
      participants: 456,
      reward: "Algorithm Expert Badge",
      progress: 12,
      total: 20,
      isActive: true,
    },
    {
      id: 3,
      title: "Data Structure Wizard",
      description: "Tüm temel veri yapılarını implement edin",
      duration: "21 gün",
      participants: 234,
      reward: "Data Structure Master Badge",
      progress: 0,
      total: 10,
      isActive: false,
    },
  ];

  const dailyChallenge = {
    id: 99,
    title: "Günün Problemi: Fibonacci Serisi",
    description:
      "N. Fibonacci sayısını hesaplayan efficient bir algoritma yazın.",
    difficulty: "Orta",
    points: 50,
    timeLeft: "18:42:15",
    participants: 342,
  };

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      selectedDifficulty === "all" ||
      exercise.difficulty === selectedDifficulty;
    const matchesTopic =
      selectedTopic === "all" || exercise.topic === selectedTopic;
    const matchesLanguage =
      selectedLanguage === "all" || exercise.language === selectedLanguage;

    return (
      matchesSearch && matchesDifficulty && matchesTopic && matchesLanguage
    );
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Kolay":
        return "bg-green-500";
      case "Orta":
        return "bg-yellow-500";
      case "Zor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
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

  const completedExercises = exercises.filter((ex) => ex.isCompleted).length;
  const totalPoints = exercises
    .filter((ex) => ex.isCompleted)
    .reduce((sum, ex) => sum + ex.points, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Alıştırmalar</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pratik yaparak C ve C++ programlama becerilerinizi geliştirin. Zorluğa
          göre düzenlenmiş problemlerle adım adım ilerleyin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">{completedExercises}</div>
            <div className="text-sm text-muted-foreground">Tamamlanan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Toplam Puan</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">7</div>
            <div className="text-sm text-muted-foreground">Günlük Seri</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">89%</div>
            <div className="text-sm text-muted-foreground">Başarı Oranı</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exercises" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
          <TabsTrigger value="exercises">Alıştırmalar</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="daily">Günlük</TabsTrigger>
        </TabsList>

        <TabsContent value="exercises" className="space-y-8">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Alıştırma ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={selectedDifficulty}
                  onValueChange={setSelectedDifficulty}
                >
                  <SelectTrigger className="w-full lg:w-[140px]">
                    <SelectValue placeholder="Zorluk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Seviyeler</SelectItem>
                    <SelectItem value="Kolay">Kolay</SelectItem>
                    <SelectItem value="Orta">Orta</SelectItem>
                    <SelectItem value="Zor">Zor</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="w-full lg:w-[160px]">
                    <SelectValue placeholder="Konu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Konular</SelectItem>
                    <SelectItem value="Basics">Basics</SelectItem>
                    <SelectItem value="I/O Operations">
                      I/O Operations
                    </SelectItem>
                    <SelectItem value="Conditionals">Conditionals</SelectItem>
                    <SelectItem value="Functions">Functions</SelectItem>
                    <SelectItem value="Arrays">Arrays</SelectItem>
                    <SelectItem value="Algorithms">Algorithms</SelectItem>
                    <SelectItem value="Data Structures">
                      Data Structures
                    </SelectItem>
                    <SelectItem value="Pointers">Pointers</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full lg:w-[120px]">
                    <SelectValue placeholder="Dil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Diller</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExercises.map((exercise) => (
              <Card
                key={exercise.id}
                className="group hover:shadow-lg transition-all duration-200"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full ${getDifficultyColor(exercise.difficulty)}`}
                      />
                      <Badge
                        variant={getDifficultyBadgeVariant(exercise.difficulty)}
                      >
                        {exercise.difficulty}
                      </Badge>
                      {exercise.isPremium && (
                        <Badge
                          variant="outline"
                          className="text-yellow-600 border-yellow-600"
                        >
                          Premium
                        </Badge>
                      )}
                    </div>
                    {exercise.isCompleted && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {exercise.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {exercise.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {exercise.points} puan
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {exercise.timeLimit}
                    </div>
                    <div className="text-green-600">
                      %{exercise.successRate}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {exercise.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {exercise.submissions} çözüm
                    </span>
                    <div className="flex gap-2">
                      {exercise.isPremium && !exercise.isCompleted ? (
                        <Button size="sm" variant="outline" disabled>
                          <Lock className="w-4 h-4 mr-2" />
                          Premium
                        </Button>
                      ) : (
                        <Button size="sm" asChild>
                          <Link to="/editor">
                            {exercise.isCompleted ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Çözüldü
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Çöz
                              </>
                            )}
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <Code2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Alıştırma bulunamadı
              </h3>
              <p className="text-muted-foreground">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="challenges" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Challenges</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Belirli sürelerde tamamlamanız gereken challenge'lara katılın ve
              özel rozetler kazanın.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card
                key={challenge.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={challenge.isActive ? "default" : "secondary"}
                    >
                      {challenge.isActive ? "Aktif" : "Yakında"}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Trophy className="w-4 h-4" />
                      {challenge.participants} katılımcı
                    </div>
                  </div>
                  <CardTitle>{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {challenge.duration}
                    </div>
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Award className="w-4 h-4" />
                      {challenge.reward}
                    </div>
                  </div>

                  {challenge.isActive && challenge.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">İlerleme</span>
                        <span className="font-medium">
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <Progress
                        value={(challenge.progress / challenge.total) * 100}
                        className="h-2"
                      />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    variant={challenge.isActive ? "default" : "outline"}
                    disabled={!challenge.isActive}
                  >
                    {challenge.isActive ? (
                      challenge.progress > 0 ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Devam Et
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Katıl
                        </>
                      )
                    ) : (
                      "Yakında"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="daily" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Günlük Challenge</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Her gün yeni bir problem çözün ve günlük serinizi sürdürün.
            </p>
          </div>

          {/* Daily Challenge Card */}
          <Card className="max-w-2xl mx-auto border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">{dailyChallenge.title}</CardTitle>
              <CardDescription className="text-lg">
                {dailyChallenge.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {dailyChallenge.points}
                  </div>
                  <div className="text-sm text-muted-foreground">Puan</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {dailyChallenge.participants}
                  </div>
                  <div className="text-sm text-muted-foreground">Katılımcı</div>
                </div>
                <div>
                  <Badge
                    variant={getDifficultyBadgeVariant(
                      dailyChallenge.difficulty,
                    )}
                    className="text-lg px-3 py-1"
                  >
                    {dailyChallenge.difficulty}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-1">
                    Zorluk
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">
                    {dailyChallenge.timeLeft}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Kalan Süre
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link to="/editor">
                    <Play className="w-5 h-5 mr-2" />
                    Challenge'ı Başlat
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/ai-chat">
                    <Brain className="w-5 h-5 mr-2" />
                    AI İpucu Al
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Streak Information */}
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-orange-500" />
                Günlük Seri
              </CardTitle>
              <CardDescription>
                Seri sürdürmek için her gün en az bir problem çözün
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="text-4xl font-bold text-orange-500">7 Gün</div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      i < 7
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Mükemmel! 7 günlük serinizi sürdürüyorsunuz. Devam ederseniz
                özel rozet kazanacaksınız.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Exercises;
