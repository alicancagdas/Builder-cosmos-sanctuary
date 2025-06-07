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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Code2,
  Brain,
  Users,
  Trophy,
  PlayCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  MessageSquare,
  BookOpen,
  Zap,
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Destekli Öğrenme",
      description:
        "Yapay zeka ile kişiselleştirilmiş öğrenme deneyimi yaşayın. AI mentor'unuz her adımda yanınızda.",
    },
    {
      icon: Code2,
      title: "İnteraktif Kod Editörü",
      description:
        "Gerçek zamanlı compiler ile kodlarınızı anında test edin. Hataları AI ile analiz edin.",
    },
    {
      icon: Users,
      title: "Aktif Topluluk",
      description:
        "Binlerce öğrenci ile birlikte öğrenin. Sorularınızı paylaşın, deneyim kazanın.",
    },
    {
      icon: Trophy,
      title: "Gamifikasyon",
      description:
        "Rozetler kazanın, seviye atlayın. Öğrenmeyi oyun gibi eğlenceli hale getirin.",
    },
    {
      icon: PlayCircle,
      title: "Pratik Alıştırmalar",
      description:
        "Yüzlerce alıştırma ile teorik bilgiyi pratiğe dökün. Zorluk seviyenize uygun egzersizler.",
    },
    {
      icon: MessageSquare,
      title: "7/24 AI Destek",
      description:
        "Takıldığınız her noktada AI asistanınız size yardım etmeye hazır. Anında cevaplar alın.",
    },
  ];

  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Bilgisayar Mühendisi",
      content:
        "CodeMentor AI sayesinde C++ öğrenmek hiç bu kadar kolay olmamıştı. AI mentor özelliği harika!",
      avatar: "/placeholder-avatar-1.jpg",
      rating: 5,
    },
    {
      name: "Elif Kara",
      role: "Yazılım Geliştirici",
      content:
        "İnteraktif editör ve anında feedback sistemi sayesinde hızla gelişim gösterdim.",
      avatar: "/placeholder-avatar-2.jpg",
      rating: 5,
    },
    {
      name: "Mehmet Demir",
      role: "Öğrenci",
      content:
        "Gamifikasyon sistemi motivasyonumu sürekli yüksek tutuyor. Öğrenmek çok eğlenceli!",
      avatar: "/placeholder-avatar-3.jpg",
      rating: 5,
    },
  ];

  const popularCourses = [
    {
      title: "C Programlama Temelleri",
      description: "Sıfırdan başlayarak C programlama dilini öğrenin",
      students: 1247,
      rating: 4.8,
      duration: "6 hafta",
      level: "Başlangıç",
    },
    {
      title: "C++ ile Nesne Yönelimli Programlama",
      description: "OOP kavramlarını C++ ile pratiğe dökün",
      students: 892,
      rating: 4.9,
      duration: "8 hafta",
      level: "Orta",
    },
    {
      title: "Veri Yapıları ve Algoritmalar",
      description: "C++ ile veri yapıları ve algoritma analizi",
      students: 634,
      rating: 4.7,
      duration: "10 hafta",
      level: "İleri",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Destekli Öğrenme Platformu
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              C ve C++ Öğrenmenin
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                En Akıllı Yolu
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Yapay zeka destekli kişisel mentor'unuz ile C ve C++ programlama
              dillerini öğrenin. İnteraktif editör, anında feedback ve
              gamifikasyon ile öğrenme deneyiminizi bir üst seviyeye taşıyın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/courses">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Öğrenmeye Başla
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="text-lg px-8"
              >
                <Link to="/ai-chat">
                  <Brain className="w-5 h-5 mr-2" />
                  AI ile Tanış
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Neden CodeMentor AI?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Modern teknoloji ile geleneksel öğrenme yöntemlerini birleştirerek
              size en iyi deneyimi sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border-border/50 hover:border-border transition-colors"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popüler Kurslar</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              En çok tercih edilen kurslarımızla öğrenme yolculuğunuza başlayın.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant={
                        course.level === "Başlangıç"
                          ? "secondary"
                          : course.level === "Orta"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{course.students} öğrenci</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button className="w-full" asChild>
                    <Link to="/courses">
                      Kursa Başla
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/courses">
                Tüm Kursları Görüntüle
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Öğrencilerimiz Ne Diyor?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Binlerce başarı hikayesinden sadece birkaçı.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen Başlayın, Geleceğinizi Şekillendirin
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Ücretsiz hesap oluşturun ve AI destekli öğrenme deneyimini keşfedin.
            İlk kursu tamamladığınızda özel rozetinizi kazanın!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8"
            >
              <Link to="/login">
                <Zap className="w-5 h-5 mr-2" />
                Ücretsiz Başla
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link to="/courses">
                <BookOpen className="w-5 h-5 mr-2" />
                Kursları İncele
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
