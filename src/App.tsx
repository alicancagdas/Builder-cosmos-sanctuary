import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CodeEditor from "./pages/CodeEditor";
import Exercises from "./pages/Exercises";
import Quiz from "./pages/Quiz";
import Forum from "./pages/Forum";
import Progress from "./pages/Progress";
import AIMentor from "./pages/AIMentor";
import AIChat from "./pages/AIChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route path="/editor" element={<CodeEditor />} />
                <Route path="/exercises" element={<Exercises />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/ai-mentor" element={<AIMentor />} />
                <Route path="/ai-chat" element={<AIChat />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
