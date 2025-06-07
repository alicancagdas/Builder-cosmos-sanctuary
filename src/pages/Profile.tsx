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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Trophy,
  Code2,
  Users,
  BookOpen,
  Calendar,
  Star,
  Award,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  Brain,
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const achievements = [
    {
      id: 1,
      title: "C++ Master",
      description: "Completed all C++ courses",
      icon: Code2,
      color: "from-blue-500 to-blue-600",
      earned: true,
      date: "2024",
    },
    {
      id: 2,
      title: "Algorithm Expert",
      description: "Solved 100+ algorithm challenges",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      earned: true,
      date: "2024",
    },
    {
      id: 3,
      title: "Code Reviewer",
      description: "Reviewed 50+ code submissions",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
      earned: true,
      date: "2024",
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Helped 25+ community members",
      icon: Users,
      color: "from-orange-500 to-orange-600",
      earned: false,
      progress: 18,
    },
    {
      id: 5,
      title: "Speed Coder",
      description: "Complete 10 challenges in under 30 minutes",
      icon: Clock,
      color: "from-red-500 to-red-600",
      earned: false,
      progress: 7,
    },
    {
      id: 6,
      title: "Perfect Score",
      description: "Get 100% on 5 consecutive quizzes",
      icon: Target,
      color: "from-yellow-500 to-yellow-600",
      earned: false,
      progress: 3,
    },
  ];

  const completedCourses = [
    {
      title: "C Programming Fundamentals",
      completedAt: "2023-12-15",
      score: 95,
      duration: "6 weeks",
    },
    {
      title: "C++ Object-Oriented Programming",
      completedAt: "2024-01-20",
      score: 92,
      duration: "8 weeks",
    },
    {
      title: "Data Structures in C++",
      completedAt: "2024-02-28",
      score: 98,
      duration: "10 weeks",
    },
  ];

  const stats = [
    { label: "Completed Courses", value: "12", icon: BookOpen },
    { label: "Problems Solved", value: "247", icon: Code2 },
    { label: "Study Streak", value: "15 days", icon: Calendar },
    { label: "Community Rank", value: "#342", icon: Trophy },
  ];

  const currentGoals = [
    {
      title: "Complete Advanced C++ Course",
      progress: 65,
      target: "End of month",
    },
    {
      title: "Solve 50 Algorithm Problems",
      progress: 32,
      target: "This week",
    },
    {
      title: "Help 10 Community Members",
      progress: 80,
      target: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">User Profile</h1>
        </div>

        {/* Profile Header */}
        <Card className="mb-8 overflow-hidden bg-gradient-to-br from-background to-muted/20">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Ethan Carter" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  EC
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">Ethan Carter</h2>
                <p className="text-muted-foreground mb-4">Software Engineer</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-4">
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <Trophy className="w-3 h-3" />
                    Intermediate Level
                  </Badge>
                  <Badge variant="outline">C++ Expert</Badge>
                  <Badge variant="outline">Problem Solver</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 max-w-md">
                  Joined 2021 • Passionate about algorithms and system
                  programming • Love helping others learn to code
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => setIsFollowing(!isFollowing)}
                  variant={isFollowing ? "secondary" : "default"}
                  className="min-w-[120px]"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/ai-chat">Message</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-4 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Unlock badges and track your progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`relative overflow-hidden transition-all hover:shadow-md ${
                        achievement.earned
                          ? "border-green-200 dark:border-green-800"
                          : "border-border opacity-75"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${achievement.color} ${
                              achievement.earned ? "" : "grayscale"
                            }`}
                          >
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-sm mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-2">
                              {achievement.description}
                            </p>
                            {achievement.earned ? (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {achievement.date}
                              </Badge>
                            ) : (
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span className="text-muted-foreground">
                                    Progress
                                  </span>
                                  <span className="font-medium">
                                    {achievement.progress}/
                                    {achievement.title.includes("Community")
                                      ? "25"
                                      : achievement.title.includes("Speed")
                                        ? "10"
                                        : "5"}
                                  </span>
                                </div>
                                <Progress
                                  value={
                                    (achievement.progress! /
                                      (achievement.title.includes("Community")
                                        ? 25
                                        : achievement.title.includes("Speed")
                                          ? 10
                                          : 5)) *
                                    100
                                  }
                                  className="h-1"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        {achievement.earned && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Current Goals
                </CardTitle>
                <CardDescription>
                  Track your learning objectives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{goal.title}</h4>
                      <span className="text-sm text-muted-foreground">
                        {goal.target}
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="text-sm text-muted-foreground">
                      {goal.progress}% complete
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Completed projects and contributions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {completedCourses.map((course, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Completed{" "}
                        {new Date(course.completedAt).toLocaleDateString()} •{" "}
                        {course.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{course.score}%</div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">Excellent</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="posts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <CardDescription>
                  Community contributions and discussions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No posts yet. Start sharing your coding journey!</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/forum">Visit Forum</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
                <CardDescription>
                  Personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Bio</h4>
                  <p className="text-muted-foreground">
                    Software engineer with 3+ years of experience in C++
                    development. Passionate about system programming,
                    algorithms, and helping others learn to code. Currently
                    focusing on advanced C++ features and contributing to open
                    source projects.
                  </p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Learning Preferences</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Visual Learner</Badge>
                    <Badge variant="outline">Hands-on Practice</Badge>
                    <Badge variant="outline">Community Interaction</Badge>
                    <Badge variant="outline">Project-based Learning</Badge>
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">System Programming</Badge>
                    <Badge variant="secondary">Game Development</Badge>
                    <Badge variant="secondary">Algorithms</Badge>
                    <Badge variant="secondary">Open Source</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
