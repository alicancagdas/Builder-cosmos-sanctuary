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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Code2,
  BookOpen,
  Star,
  Award,
  Flame,
  Brain,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Progress = () => {
  const overallStats = {
    totalHoursStudied: 127,
    coursesCompleted: 5,
    exercisesSolved: 89,
    currentStreak: 15,
    totalPoints: 2456,
    averageScore: 87,
    rank: 342,
    totalUsers: 12847,
  };

  const weeklyActivity = [
    { day: "Pzt", hours: 2.5, exercises: 3 },
    { day: "Sal", hours: 1.8, exercises: 2 },
    { day: "Çar", hours: 3.2, exercises: 5 },
    { day: "Per", hours: 2.1, exercises: 3 },
    { day: "Cum", hours: 4.0, exercises: 7 },
    { day: "Cmt", hours: 1.5, exercises: 2 },
    { day: "Paz", hours: 2.3, exercises: 4 },
  ];

  const courseProgress = [
    {
      id: 1,
      title: "C++ Nesne Yönelimli Programlama",
      progress: 85,
      totalLessons: 62,
      completedLessons: 53,
      totalTime: "24 saat",
      estimatedCompletion: "3 gün",
      lastActivity: "2 saat önce",
    },
    {
      id: 2,
      title: "Veri Yapıları ve Algoritmalar",
      progress: 45,
      totalLessons: 85,
      completedLessons: 38,
      totalTime: "32 saat",
      estimatedCompletion: "2 hafta",
      lastActivity: "1 gün önce",
    },
    {
      id: 3,
      title: "C++ STL ve Modern C++",
      progress: 12,
      totalLessons: 45,
      completedLessons: 5,
      totalTime: "18 saat",
      estimatedCompletion: "1 ay",
      lastActivity: "3 gün önce",
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "İlk Adım",
      description: "İlk dersinizi tamamladınız",
      icon: Trophy,
      color: "text-yellow-500",
      earnedAt: "2024-01-15",
      category: "Milestone",
    },
    {
      id: 2,
      title: "Kod Makinesi",
      description: "50 alıştırma tamamladınız",
      icon: Code2,
      color: "text-blue-500",
      earnedAt: "2024-02-10",
      category: "Practice",
    },
    {
      id: 3,
      title: "Seri Yapan",
      description: "7 gün üst üste çalıştınız",
      icon: Flame,
      color: "text-orange-500",
      earnedAt: "2024-02-20",
      category: "Consistency",
    },
    {
      id: 4,
      title: "C++ Uzmanı",
      description: "C++ kurunu tamamladınız",
      icon: Award,
      color: "text-purple-500",
      earnedAt: "2024-03-01",
      category: "Course",
    },
  ];

  const skillProgress = [
    { skill: "C++ Syntax", level: 85, maxLevel: 100 },
    { skill: "OOP Concepts", level: 78, maxLevel: 100 },
    { skill: "Data Structures", level: 45, maxLevel: 100 },
    { skill: "Algorithms", level: 52, maxLevel: 100 },
    { skill: "Memory Management", level: 38, maxLevel: 100 },
    { skill: "STL Usage", level: 25, maxLevel: 100 },
  ];

  const monthlyGoals = [
    {
      id: 1,
      title: "3 Kurs Tamamla",
      progress: 66,
      current: 2,
      target: 3,
      deadline: "Bu ay sonu",
      type: "course",
    },
    {
      id: 2,
      title: "100 Alıştırma Çöz",
      progress: 89,
      current: 89,
      target: 100,
      deadline: "Bu ay sonu",
      type: "exercise",
    },
    {
      id: 3,
      title: "20 Saat Çalış",
      progress: 75,
      current: 15,
      target: 20,
      deadline: "Bu ay sonu",
      type: "time",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "C++ Constructors dersini tamamladı",
      time: "2 saat önce",
      points: 25,
    },
    {
      id: 2,
      type: "exercise",
      title: "Binary Search alıştırmasını çözdü",
      time: "5 saat önce",
      points: 40,
    },
    {
      id: 3,
      type: "quiz",
      title: "OOP Quiz'ini %90 ile geçti",
      time: "1 gün önce",
      points: 50,
    },
    {
      id: 4,
      type: "achievement",
      title: "C++ Uzmanı rozetini kazandı",
      time: "2 gün önce",
      points: 100,
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return BookOpen;
      case "exercise":
        return Code2;
      case "quiz":
        return Target;
      case "achievement":
        return Trophy;
      default:
        return Activity;
    }
  };

  const maxWeeklyHours = Math.max(...weeklyActivity.map((day) => day.hours));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">İlerleme ve İstatistikler</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Öğrenme yolculuğunuzu takip edin ve hedeflerinize ulaştığınızı görün.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">
              {overallStats.totalHoursStudied}
            </div>
            <div className="text-sm text-muted-foreground">Saat Çalışma</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <div className="text-2xl font-bold">
              {overallStats.coursesCompleted}
            </div>
            <div className="text-sm text-muted-foreground">Tamamlanan Kurs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Code2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">
              {overallStats.exercisesSolved}
            </div>
            <div className="text-sm text-muted-foreground">
              Çözülen Alıştırma
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">
              {overallStats.currentStreak}
            </div>
            <div className="text-sm text-muted-foreground">Günlük Seri</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="courses">Kurslar</TabsTrigger>
          <TabsTrigger value="skills">Beceriler</TabsTrigger>
          <TabsTrigger value="achievements">Başarılar</TabsTrigger>
          <TabsTrigger value="goals">Hedefler</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weekly Activity Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Haftalık Aktivite
                </CardTitle>
                <CardDescription>
                  Bu haftaki çalışma saatleriniz ve tamamlanan alıştırmalar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyActivity.map((day, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 text-sm font-medium">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>{day.hours} saat</span>
                          <span>{day.exercises} alıştırma</span>
                        </div>
                        <Progress
                          value={(day.hours / maxWeeklyHours) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Performans Özeti
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">
                    {overallStats.averageScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Ortalama Puan
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Toplam Puan</span>
                    <span className="font-semibold">
                      {overallStats.totalPoints}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Sıralama</span>
                    <span className="font-semibold">#{overallStats.rank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Toplam Üye</span>
                    <span className="font-semibold">
                      {overallStats.totalUsers.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    Top %
                    {Math.round(
                      (overallStats.rank / overallStats.totalUsers) * 100,
                    )}{" "}
                    içindesiniz!
                  </div>
                  <Progress
                    value={
                      100 - (overallStats.rank / overallStats.totalUsers) * 100
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Son Aktiviteler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.time}
                        </div>
                      </div>
                      <Badge variant="secondary">+{activity.points} puan</Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-8">
          <div className="space-y-6">
            {courseProgress.map((course) => (
              <Card key={course.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <Badge variant="outline">
                      {course.progress}% tamamlandı
                    </Badge>
                  </div>
                  <CardDescription>
                    {course.completedLessons}/{course.totalLessons} ders •{" "}
                    {course.totalTime} • Son aktivite: {course.lastActivity}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Progress value={course.progress} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Tahmini tamamlanma: {course.estimatedCompletion}
                    </span>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.id}`}>Devam Et</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Beceri Seviyeleri
              </CardTitle>
              <CardDescription>
                Farklı konulardaki yetkinlik seviyeniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.skill}</span>
                    <span className="text-sm text-muted-foreground">
                      {skill.level}/{skill.maxLevel}
                    </span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI Önerileri
              </CardTitle>
              <CardDescription>Gelişiminize özel öneriler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">
                    Memory Management'e odaklanın
                  </span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  C++ Memory Management konusunda düşük seviyedesiniz. Pointers
                  ve Dynamic Memory kurlarını tamamlayarak bu alanı
                  güçlendirebilirsiniz.
                </p>
              </div>

              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-900 dark:text-green-100">
                    Algorithm practice önerisi
                  </span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Sorting algoritmaları konusunda iyi ilerleme gösteriyorsunuz.
                  Graph algorithms'a geçmeyi öneriyoruz.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="border-green-200 dark:border-green-800"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {achievement.description}
                  </p>
                  <Badge variant="secondary">{achievement.category}</Badge>
                  <div className="text-xs text-muted-foreground mt-2">
                    Kazanıldı:{" "}
                    {new Date(achievement.earnedAt).toLocaleDateString("tr-TR")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievement Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Gelecek Başarılar</CardTitle>
              <CardDescription>
                Kazanmaya yakın olduğunuz rozetler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">Quiz Master</div>
                    <div className="text-sm text-muted-foreground">
                      10 quiz'i %90+ ile geç
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">7/10</div>
                  <Progress value={70} className="w-20 h-1 mt-1" />
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg opacity-75">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">Code Warrior</div>
                    <div className="text-sm text-muted-foreground">
                      100 alıştırma tamamla
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">89/100</div>
                  <Progress value={89} className="w-20 h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Aylık Hedefler
              </CardTitle>
              <CardDescription>
                Bu ay için belirlediğiniz hedefler ve ilerlemeniz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {monthlyGoals.map((goal) => (
                <div key={goal.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{goal.title}</h4>
                    <Badge variant="outline">{goal.deadline}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {goal.current}/{goal.target}
                    </span>
                    <span>{goal.progress}%</span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Goal Setting */}
          <Card>
            <CardHeader>
              <CardTitle>Yeni Hedef Belirle</CardTitle>
              <CardDescription>
                Motivasyonunuzu artırmak için yeni hedefler belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <BookOpen className="w-6 h-6 mb-2" />
                  <span className="font-medium">Kurs Hedefi</span>
                  <span className="text-sm text-muted-foreground">
                    Belirli sürede kurs tamamlama
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <Code2 className="w-6 h-6 mb-2" />
                  <span className="font-medium">Alıştırma Hedefi</span>
                  <span className="text-sm text-muted-foreground">
                    Günlük/haftalık alıştırma sayısı
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <Clock className="w-6 h-6 mb-2" />
                  <span className="font-medium">Çalışma Saati</span>
                  <span className="text-sm text-muted-foreground">
                    Haftalık çalışma süresi hedefi
                  </span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                >
                  <Flame className="w-6 h-6 mb-2" />
                  <span className="font-medium">Seri Hedefi</span>
                  <span className="text-sm text-muted-foreground">
                    Günlük çalışma serisi
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Progress;
