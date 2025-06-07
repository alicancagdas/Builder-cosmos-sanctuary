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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  Play,
  Code2,
  Brain,
  Trophy,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");

  const courses = [
    {
      id: 1,
      title: "C Programlama Temelleri",
      description:
        "Sıfırdan başlayarak C programlama dilini öğrenin. Değişkenler, fonksiyonlar, döngüler ve daha fazlası.",
      instructor: "Dr. Ahmet Yılmaz",
      duration: "6 hafta",
      level: "Başlangıç",
      language: "C",
      students: 1247,
      rating: 4.8,
      reviews: 324,
      price: "Ücretsiz",
      thumbnail: "/course-c-basics.jpg",
      progress: 0,
      isEnrolled: false,
      chapters: 12,
      totalLessons: 48,
      tags: ["Basics", "Variables", "Functions"],
    },
    {
      id: 2,
      title: "C++ ile Nesne Yönelimli Programlama",
      description:
        "OOP kavramlarını C++ ile pratiğe dökün. Sınıflar, kalıtım, polimorfizm ve encapsulation.",
      instructor: "Prof. Elif Kara",
      duration: "8 hafta",
      level: "Orta",
      language: "C++",
      students: 892,
      rating: 4.9,
      reviews: 267,
      price: "₺299",
      thumbnail: "/course-cpp-oop.jpg",
      progress: 35,
      isEnrolled: true,
      chapters: 15,
      totalLessons: 62,
      tags: ["OOP", "Classes", "Inheritance"],
    },
    {
      id: 3,
      title: "Veri Yapıları ve Algoritmalar",
      description:
        "C++ ile veri yapıları ve algoritma analizi. Linked List, Stack, Queue, Trees ve Graph algoritmaları.",
      instructor: "Dr. Mehmet Demir",
      duration: "10 hafta",
      level: "İleri",
      language: "C++",
      students: 634,
      rating: 4.7,
      reviews: 189,
      price: "₺499",
      thumbnail: "/course-algorithms.jpg",
      progress: 0,
      isEnrolled: false,
      chapters: 20,
      totalLessons: 85,
      tags: ["Data Structures", "Algorithms", "Trees"],
    },
    {
      id: 4,
      title: "C++ STL ve Modern C++",
      description:
        "Standard Template Library kullanımı ve C++11/14/17/20 modern özellikler.",
      instructor: "Mühendis Ayşe Çelik",
      duration: "6 hafta",
      level: "İleri",
      language: "C++",
      students: 456,
      rating: 4.6,
      reviews: 123,
      price: "₺399",
      thumbnail: "/course-modern-cpp.jpg",
      progress: 80,
      isEnrolled: true,
      chapters: 12,
      totalLessons: 45,
      tags: ["STL", "Modern C++", "Templates"],
    },
    {
      id: 5,
      title: "C ile Sistem Programlama",
      description:
        "Düşük seviye programlama, sistem çağrıları ve performans optimizasyonu.",
      instructor: "Dr. Hasan Özkan",
      duration: "8 hafta",
      level: "İleri",
      language: "C",
      students: 278,
      rating: 4.5,
      reviews: 67,
      price: "₺449",
      thumbnail: "/course-system-programming.jpg",
      progress: 0,
      isEnrolled: false,
      chapters: 14,
      totalLessons: 56,
      tags: ["System Programming", "Performance", "OS"],
    },
    {
      id: 6,
      title: "Oyun Geliştirme ile C++",
      description:
        "C++ kullanarak basit oyunlar geliştirin. OpenGL ve game loop kavramları.",
      instructor: "Game Dev Studio",
      duration: "12 hafta",
      level: "Orta",
      language: "C++",
      students: 789,
      rating: 4.8,
      reviews: 234,
      price: "₺599",
      thumbnail: "/course-game-dev.jpg",
      progress: 15,
      isEnrolled: true,
      chapters: 18,
      totalLessons: 72,
      tags: ["Game Development", "OpenGL", "Graphics"],
    },
  ];

  const learningPaths = [
    {
      id: 1,
      title: "Tam Başlangıç Yolu",
      description: "Hiç programlama bilginiz yoksa buradan başlayın",
      courses: [1, 2, 3],
      duration: "24 hafta",
      difficulty: "Başlangıç → İleri",
    },
    {
      id: 2,
      title: "C++ Uzmanı",
      description: "C++ dilinde uzmanlaşmak isteyenler için",
      courses: [2, 3, 4, 6],
      duration: "34 hafta",
      difficulty: "Orta → İleri",
    },
    {
      id: 3,
      title: "Sistem Programcısı",
      description: "Düşük seviye programlama odaklı yol",
      courses: [1, 5, 3],
      duration: "24 hafta",
      difficulty: "Başlangıç → İleri",
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesLanguage =
      selectedLanguage === "all" || course.language === selectedLanguage;

    return matchesSearch && matchesLevel && matchesLanguage;
  });

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Başlangıç":
        return "secondary";
      case "Orta":
        return "default";
      case "İleri":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Kurslar</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          C ve C++ programlama dillerini AI destekli kurslarla öğrenin. Kendi
          hızınızda ilerleyin ve uzman eğitmenlerden öğrenin.
        </p>
      </div>

      <Tabs defaultValue="courses" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mx-auto">
          <TabsTrigger value="courses">Tüm Kurslar</TabsTrigger>
          <TabsTrigger value="paths">Öğrenme Yolları</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-8">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Kurs ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Seviye seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Seviyeler</SelectItem>
                    <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                    <SelectItem value="Orta">Orta</SelectItem>
                    <SelectItem value="İleri">İleri</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger className="w-full lg:w-[180px]">
                    <SelectValue placeholder="Dil seçin" />
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

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Code2 className="w-12 h-12 text-white" />
                  </div>
                  {course.isEnrolled && (
                    <Badge className="absolute top-4 right-4 bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Kayıtlı
                    </Badge>
                  )}
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant={getLevelBadgeVariant(course.level)}>
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({course.reviews})
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.students}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {course.totalLessons} ders
                    </div>
                  </div>

                  {course.isEnrolled && course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">İlerleme</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="font-bold text-lg">{course.price}</div>
                    <Button asChild size="sm">
                      <Link to={`/course/${course.id}`}>
                        {course.isEnrolled ? (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Devam Et
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-4 h-4 mr-2" />
                            İncele
                          </>
                        )}
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Kurs bulunamadı</h3>
              <p className="text-muted-foreground">
                Arama kriterlerinizi değiştirerek tekrar deneyin.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="paths" className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Öğrenme Yolları</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hedefinize göre tasarlanmış kurs serileri ile yapılandırılmış bir
              öğrenme deneyimi yaşayın.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {learningPaths.map((path) => (
              <Card key={path.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {path.duration}
                    </div>
                    <Badge variant="outline">{path.difficulty}</Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">İçerdiği Kurslar:</h4>
                    <div className="space-y-1">
                      {path.courses.map((courseId, index) => {
                        const course = courses.find((c) => c.id === courseId);
                        return (
                          <div
                            key={courseId}
                            className="flex items-center gap-2 text-sm"
                          >
                            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                              {index + 1}
                            </div>
                            <span className="text-muted-foreground">
                              {course?.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <Button className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Yola Başla
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Courses;
