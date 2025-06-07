import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ArrowLeft,
  Play,
  Clock,
  Users,
  Star,
  BookOpen,
  CheckCircle,
  Lock,
  ChevronDown,
  ChevronRight,
  Code2,
  Brain,
  MessageSquare,
  Download,
  Trophy,
  Target,
} from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [expandedModules, setExpandedModules] = useState<number[]>([0]);
  const [isEnrolled, setIsEnrolled] = useState(false);

  // Mock course data - in real app this would come from API
  const course = {
    id: parseInt(id || "1"),
    title: "C++ ile Nesne Yönelimli Programlama",
    description:
      "OOP kavramlarını C++ ile pratiğe dökün. Sınıflar, kalıtım, polimorfizm ve encapsulation konularını detaylı olarak öğrenin.",
    instructor: {
      name: "Prof. Elif Kara",
      title: "Bilgisayar Mühendisliği Profesörü",
      avatar: "/instructor-avatar.jpg",
      rating: 4.9,
      students: 15420,
      courses: 12,
    },
    duration: "8 hafta",
    level: "Orta",
    language: "C++",
    students: 892,
    rating: 4.9,
    reviews: 267,
    price: "₺299",
    originalPrice: "₺499",
    progress: 35,
    totalHours: 24,
    totalLessons: 62,
    downloadableResources: 15,
    certificate: true,
    lastUpdated: "2024-01-15",
    tags: ["OOP", "Classes", "Inheritance", "Polymorphism"],
    requirements: [
      "Temel C programlama bilgisi",
      "Değişkenler ve fonksiyonlar konusunda deneyim",
      "C dilinde döngüler ve koşullu ifadeler bilgisi",
    ],
    whatYouWillLearn: [
      "Nesne yönelimli programlamanın temel prensipleri",
      "C++ dilinde sınıf (class) ve nesne (object) kavramları",
      "Kalıtım (inheritance) ve polimorfizm kullanımı",
      "Encapsulation ve data hiding teknikleri",
      "Constructor ve destructor fonksiyonları",
      "Virtual fonksiyonlar ve abstract sınıflar",
      "Operator overloading",
      "STL (Standard Template Library) temelleri",
    ],
  };

  const modules = [
    {
      id: 1,
      title: "Nesne Yönelimli Programlamaya Giriş",
      duration: "2 saat",
      lessons: [
        {
          id: 1,
          title: "OOP Nedir?",
          duration: "15 dk",
          type: "video",
          isCompleted: true,
          isFree: true,
        },
        {
          id: 2,
          title: "C++ ile OOP Avantajları",
          duration: "20 dk",
          type: "video",
          isCompleted: true,
          isFree: false,
        },
        {
          id: 3,
          title: "İlk Sınıfınızı Yazın",
          duration: "25 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 4,
          title: "Quiz: OOP Temelleri",
          duration: "10 dk",
          type: "quiz",
          isCompleted: false,
          isFree: false,
        },
      ],
    },
    {
      id: 2,
      title: "Sınıflar ve Nesneler",
      duration: "3 saat",
      lessons: [
        {
          id: 5,
          title: "Sınıf Tanımlama",
          duration: "30 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 6,
          title: "Nesne Oluşturma",
          duration: "25 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 7,
          title: "Member Functions",
          duration: "35 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 8,
          title: "Access Specifiers",
          duration: "20 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 9,
          title: "Pratik: Öğrenci Sınıfı",
          duration: "30 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
      ],
    },
    {
      id: 3,
      title: "Constructor ve Destructor",
      duration: "2.5 saat",
      lessons: [
        {
          id: 10,
          title: "Constructor Kavramı",
          duration: "25 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 11,
          title: "Default Constructor",
          duration: "20 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 12,
          title: "Parametreli Constructor",
          duration: "30 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 13,
          title: "Copy Constructor",
          duration: "35 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 14,
          title: "Destructor",
          duration: "20 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
      ],
    },
    {
      id: 4,
      title: "Kalıtım (Inheritance)",
      duration: "3.5 saat",
      lessons: [
        {
          id: 15,
          title: "Kalıtım Temelleri",
          duration: "30 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 16,
          title: "Public, Private, Protected",
          duration: "25 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 17,
          title: "Single Inheritance",
          duration: "40 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 18,
          title: "Multiple Inheritance",
          duration: "35 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 19,
          title: "Virtual Inheritance",
          duration: "30 dk",
          type: "video",
          isCompleted: false,
          isFree: false,
        },
        {
          id: 20,
          title: "Pratik: Şekil Hiyerarşisi",
          duration: "45 dk",
          type: "practice",
          isCompleted: false,
          isFree: false,
        },
      ],
    },
  ];

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId],
    );
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return Play;
      case "practice":
        return Code2;
      case "quiz":
        return Target;
      default:
        return BookOpen;
    }
  };

  const completedLessons = modules.reduce(
    (acc, module) =>
      acc + module.lessons.filter((lesson) => lesson.isCompleted).length,
    0,
  );
  const totalLessons = modules.reduce(
    (acc, module) => acc + module.lessons.length,
    0,
  );
  const progressPercentage = (completedLessons / totalLessons) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/courses">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kurslara Dön
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">{course.level}</Badge>
                <Badge variant="outline">{course.language}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span className="text-muted-foreground">
                    ({course.reviews} değerlendirme)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-lg text-muted-foreground">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.totalHours} saat
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {course.totalLessons} ders
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students} öğrenci
                </div>
                <div className="flex items-center gap-1">
                  <Download className="w-4 h-4" />
                  {course.downloadableResources} kaynak
                </div>
              </div>
            </div>

            {/* Progress for enrolled students */}
            {isEnrolled && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">İlerlemeniz</h3>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons}/{totalLessons} ders tamamlandı
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <p className="text-sm text-muted-foreground mt-2">
                    %{Math.round(progressPercentage)} tamamlandı
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Course Content Tabs */}
          <Tabs defaultValue="curriculum" className="space-y-6">
            <TabsList>
              <TabsTrigger value="curriculum">Müfredat</TabsTrigger>
              <TabsTrigger value="instructor">Eğitmen</TabsTrigger>
              <TabsTrigger value="reviews">Değerlendirmeler</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-4">
              <div className="space-y-4">
                {modules.map((module) => (
                  <Card key={module.id}>
                    <Collapsible
                      open={expandedModules.includes(module.id)}
                      onOpenChange={() => toggleModule(module.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {expandedModules.includes(module.id) ? (
                                <ChevronDown className="w-5 h-5" />
                              ) : (
                                <ChevronRight className="w-5 h-5" />
                              )}
                              <div>
                                <CardTitle className="text-left text-lg">
                                  Modül {module.id}: {module.title}
                                </CardTitle>
                                <CardDescription>
                                  {module.lessons.length} ders •{" "}
                                  {module.duration}
                                </CardDescription>
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {
                                module.lessons.filter((l) => l.isCompleted)
                                  .length
                              }
                              /{module.lessons.length}
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="space-y-2">
                            {module.lessons.map((lesson) => {
                              const Icon = getLessonIcon(lesson.type);
                              return (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium">
                                        {lesson.title}
                                      </h4>
                                      <p className="text-sm text-muted-foreground">
                                        {lesson.duration} • {lesson.type}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {lesson.isFree && (
                                      <Badge variant="secondary">
                                        Ücretsiz
                                      </Badge>
                                    )}
                                    {lesson.isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : !lesson.isFree && !isEnrolled ? (
                                      <Lock className="w-5 h-5 text-muted-foreground" />
                                    ) : (
                                      <Button size="sm" variant="ghost">
                                        <Play className="w-4 h-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="instructor" className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={course.instructor.avatar} />
                      <AvatarFallback>
                        {course.instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {course.instructor.name}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {course.instructor.title}
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-lg">
                            {course.instructor.rating}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Eğitmen Puanı
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">
                            {course.instructor.students.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Öğrenci
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">
                            {course.instructor.courses}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Kurs
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-lg">15+</div>
                          <div className="text-sm text-muted-foreground">
                            Yıl Deneyim
                          </div>
                        </div>
                      </div>

                      <p className="text-muted-foreground">
                        Prof. Elif Kara, Bilgisayar Mühendisliği alanında 15+
                        yıllık deneyime sahip bir akademisyendir. C++ ve nesne
                        yönelimli programlama konularında uzman olan Prof. Kara,
                        birçok uluslararası konferansta konuşmacı olarak yer
                        almış ve bu alanda çok sayıda makale yayınlamıştır.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Öğrenci Değerlendirmeleri</CardTitle>
                  <CardDescription>
                    Bu kursu alan öğrencilerin deneyimleri
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold">{course.rating}</div>
                      <div className="flex items-center gap-1 justify-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {course.reviews} değerlendirme
                      </div>
                    </div>
                    <Separator orientation="vertical" className="h-16" />
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm w-8">{stars} ⭐</span>
                          <Progress
                            value={stars === 5 ? 80 : stars === 4 ? 15 : 5}
                            className="h-2"
                          />
                          <span className="text-sm text-muted-foreground w-8">
                            {stars === 5 ? "80%" : stars === 4 ? "15%" : "5%"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    {[
                      {
                        name: "Ahmet Yılmaz",
                        rating: 5,
                        date: "2 hafta önce",
                        comment:
                          "Harika bir kurs! OOP kavramlarını çok net bir şekilde açıklıyor. Örnekler gerçekten anlaşılır ve pratik.",
                      },
                      {
                        name: "Zeynep Demir",
                        rating: 5,
                        date: "1 ay önce",
                        comment:
                          "Prof. Elif Kara'nın anlatımı mükemmel. C++ OOP konusunda artık kendime çok daha güveniyorum.",
                      },
                      {
                        name: "Can Özkan",
                        rating: 4,
                        date: "1 ay önce",
                        comment:
                          "İyi bir kurs ama bazı konular biraz hızlı geçiliyor. Yine de öğretici ve faydalı.",
                      },
                    ].map((review, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {review.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map(
                                  (_, i) => (
                                    <Star
                                      key={i}
                                      className="w-3 h-3 fill-yellow-400 text-yellow-400"
                                    />
                                  ),
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Purchase Card */}
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">{course.price}</div>
                {course.originalPrice && (
                  <div className="text-muted-foreground line-through">
                    {course.originalPrice}
                  </div>
                )}
              </div>

              {isEnrolled ? (
                <div className="space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link to="/editor">
                      <Play className="w-4 h-4 mr-2" />
                      Kursa Devam Et
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/ai-chat">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      AI ile Sohbet Et
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setIsEnrolled(true)}
                  >
                    Kursa Kayıt Ol
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Brain className="w-4 h-4 mr-2" />
                    Ücretsiz Önizleme
                  </Button>
                </div>
              )}

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Son güncelleme:</span>
                  <span>
                    {new Date(course.lastUpdated).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                {course.certificate && (
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Tamamlama sertifikası</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Yaşam boyu erişim</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Topluluk desteği</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Learn */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Bu Kursta Öğrenecekleriniz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Gereksinimler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {course.requirements.map((requirement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full flex-shrink-0 mt-2" />
                  <span className="text-sm text-muted-foreground">
                    {requirement}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Konular</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
