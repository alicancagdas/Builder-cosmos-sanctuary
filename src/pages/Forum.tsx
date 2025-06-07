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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  MessageSquare,
  Plus,
  Search,
  TrendingUp,
  Clock,
  ThumbsUp,
  MessageCircle,
  Pin,
  Award,
  Brain,
  Code2,
  HelpCircle,
  Lightbulb,
  Star,
  Eye,
} from "lucide-react";

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("");

  const categories = [
    {
      id: "general",
      name: "Genel",
      icon: MessageSquare,
      color: "bg-blue-500",
      posts: 234,
    },
    {
      id: "help",
      name: "Yardım",
      icon: HelpCircle,
      color: "bg-green-500",
      posts: 456,
    },
    {
      id: "projects",
      name: "Projeler",
      icon: Code2,
      color: "bg-purple-500",
      posts: 123,
    },
    {
      id: "career",
      name: "Kariyer",
      icon: TrendingUp,
      color: "bg-orange-500",
      posts: 89,
    },
    {
      id: "showcase",
      name: "Vitrin",
      icon: Star,
      color: "bg-yellow-500",
      posts: 167,
    },
    {
      id: "algorithms",
      name: "Algoritmalar",
      icon: Brain,
      color: "bg-red-500",
      posts: 201,
    },
  ];

  const posts = [
    {
      id: 1,
      title: "C++ pointer kullanımında sorun yaşıyorum",
      content:
        "Merhaba arkadaşlar, pointer konusunda takıldığım bir yer var. Void pointer nasıl kullanılıyor?",
      author: {
        name: "Ahmet Yılmaz",
        avatar: "/user1.jpg",
        level: "Beginner",
        reputation: 145,
      },
      category: "help",
      tags: ["C++", "Pointers", "Memory"],
      replies: 12,
      views: 234,
      likes: 8,
      isPinned: false,
      isAnswered: true,
      createdAt: "2 saat önce",
      lastActivity: "30 dk önce",
    },
    {
      id: 2,
      title: "Mini Oyun Projesi - Snake Game C++ ile",
      content:
        "C++ ile geliştirdiğim snake game projesini paylaşmak istedim. Console tabanlı basit ama eğlenceli.",
      author: {
        name: "Elif Kara",
        avatar: "/user2.jpg",
        level: "Advanced",
        reputation: 892,
      },
      category: "projects",
      tags: ["C++", "Game Development", "Console"],
      replies: 25,
      views: 567,
      likes: 34,
      isPinned: true,
      isAnswered: false,
      createdAt: "1 gün önce",
      lastActivity: "2 saat önce",
    },
    {
      id: 3,
      title: "Yazılım mühendisliği öğrencisiyim, hangi alana yönelmeli?",
      content:
        "3. sınıf öğrencisiyim, C++ öğrenmeyi seviyorum. Backend, game dev, sistem programlama... Hangisi?",
      author: {
        name: "Mehmet Demir",
        avatar: "/user3.jpg",
        level: "Intermediate",
        reputation: 234,
      },
      category: "career",
      tags: ["Career", "Advice", "Student"],
      replies: 18,
      views: 423,
      likes: 15,
      isPinned: false,
      isAnswered: true,
      createdAt: "3 gün önce",
      lastActivity: "1 gün önce",
    },
    {
      id: 4,
      title: "Bubble Sort vs Quick Sort performans karşılaştırması",
      content:
        "İki algoritmanın time complexity'si teorik olarak biliniyor ama pratik test sonuçları nasıl?",
      author: {
        name: "Ayşe Çelik",
        avatar: "/user4.jpg",
        level: "Expert",
        reputation: 1456,
      },
      category: "algorithms",
      tags: ["Sorting", "Algorithms", "Performance"],
      replies: 31,
      views: 789,
      likes: 42,
      isPinned: false,
      isAnswered: true,
      createdAt: "5 gün önce",
      lastActivity: "3 saat önce",
    },
    {
      id: 5,
      title: "C dilinde string manipülasyonu için önerileriniz?",
      content:
        "C dilinde string işlemleri yapıyorum ama sürekli segmentation fault alıyorum. Güvenli yöntemler?",
      author: {
        name: "Can Özkan",
        avatar: "/user5.jpg",
        level: "Beginner",
        reputation: 67,
      },
      category: "help",
      tags: ["C", "Strings", "Memory Safety"],
      replies: 9,
      views: 156,
      likes: 5,
      isPinned: false,
      isAnswered: false,
      createdAt: "1 hafta önce",
      lastActivity: "2 gün önce",
    },
  ];

  const topContributors = [
    {
      name: "Prof. Elif Kara",
      reputation: 2456,
      posts: 89,
      avatar: "/prof1.jpg",
    },
    {
      name: "Dr. Ahmet Yılmaz",
      reputation: 1923,
      posts: 67,
      avatar: "/prof2.jpg",
    },
    {
      name: "Mühendis Zeynep",
      reputation: 1567,
      posts: 54,
      avatar: "/eng1.jpg",
    },
    {
      name: "Öğrenci Mehmet",
      reputation: 1234,
      posts: 123,
      avatar: "/student1.jpg",
    },
  ];

  const stats = {
    totalPosts: posts.length,
    totalMembers: 1247,
    activeToday: 89,
    totalReplies: posts.reduce((sum, post) => sum + post.replies, 0),
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryInfo = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0];
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level) {
      case "Beginner":
        return "secondary";
      case "Intermediate":
        return "default";
      case "Advanced":
        return "destructive";
      case "Expert":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Topluluk Forum</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          C ve C++ öğrenen geliştiricilerle bağlantı kurun. Sorularınızı sorun,
          projelerinizi paylaşın ve birlikte öğrenin.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <div className="text-sm text-muted-foreground">Toplam Post</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold">{stats.totalMembers}</div>
            <div className="text-sm text-muted-foreground">Üye</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold">{stats.activeToday}</div>
            <div className="text-sm text-muted-foreground">Bugün Aktif</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-orange-500" />
            <div className="text-2xl font-bold">{stats.totalReplies}</div>
            <div className="text-sm text-muted-foreground">Toplam Cevap</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Kategoriler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant={selectedCategory === "all" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("all")}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Tümü
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <category.icon className="w-4 h-4 mr-2" />
                  {category.name}
                  <Badge variant="outline" className="ml-auto">
                    {category.posts}
                  </Badge>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="w-5 h-5" />
                En Aktif Üyeler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-sm font-medium text-muted-foreground w-4">
                    #{index + 1}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={contributor.avatar} />
                    <AvatarFallback>
                      {contributor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {contributor.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {contributor.reputation} rep • {contributor.posts} post
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and New Post */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Forum'da ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Yeni Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Yeni Post Oluştur</DialogTitle>
                      <DialogDescription>
                        Sorunuzu sorun, projenizi paylaşın veya tartışma
                        başlatın.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Başlık</label>
                        <Input
                          value={newPostTitle}
                          onChange={(e) => setNewPostTitle(e.target.value)}
                          placeholder="Post başlığınızı yazın..."
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Kategori</label>
                        <Select
                          value={newPostCategory}
                          onValueChange={setNewPostCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">İçerik</label>
                        <Textarea
                          value={newPostContent}
                          onChange={(e) => setNewPostContent(e.target.value)}
                          placeholder="Post içeriğinizi yazın..."
                          className="min-h-[120px]"
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          <Plus className="w-4 h-4 mr-2" />
                          Post Oluştur
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Brain className="w-4 h-4 mr-2" />
                          AI Önizleme
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const categoryInfo = getCategoryInfo(post.category);
              return (
                <Card
                  key={post.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {post.isPinned && (
                            <Pin className="w-4 h-4 text-blue-500" />
                          )}
                          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                            {post.title}
                          </h3>
                          {post.isAnswered && (
                            <Badge
                              variant="secondary"
                              className="text-green-600"
                            >
                              Çözüldü
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                          {post.content}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            variant="outline"
                            className={`${categoryInfo.color} text-white border-transparent`}
                          >
                            <categoryInfo.icon className="w-3 h-3 mr-1" />
                            {categoryInfo.name}
                          </Badge>
                          {post.tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {post.replies}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {post.likes}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm">
                            <div className="text-muted-foreground">
                              {post.author.name}
                            </div>
                            <Badge
                              variant={getLevelBadgeVariant(post.author.level)}
                              className="text-xs"
                            >
                              {post.author.level}
                            </Badge>
                            <div className="text-muted-foreground">
                              • {post.createdAt}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Post bulunamadı</h3>
              <p className="text-muted-foreground">
                Arama kriterlerinizi değiştirerek tekrar deneyin veya yeni bir
                post oluşturun.
              </p>
            </div>
          )}

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="text-center">
              <Button variant="outline">Daha Fazla Yükle</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forum;
