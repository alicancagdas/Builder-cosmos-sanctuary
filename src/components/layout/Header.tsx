import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import {
  Code2,
  BookOpen,
  Users,
  Trophy,
  Brain,
  Menu,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  MessageSquare,
  PlayCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Ana Sayfa", href: "/", icon: BookOpen },
    { name: "Kurslar", href: "/courses", icon: Code2 },
    { name: "Alıştırmalar", href: "/exercises", icon: PlayCircle },
    { name: "Kod Editörü", href: "/editor", icon: Code2 },
    { name: "Quiz", href: "/quiz", icon: Trophy },
    { name: "Forum", href: "/forum", icon: Users },
    { name: "AI Mentor", href: "/ai-mentor", icon: Brain },
    { name: "AI Sohbet", href: "/ai-chat", icon: MessageSquare },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 mr-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            CodeMentor AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Öğren</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        to="/courses"
                      >
                        <Code2 className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          C/C++ Kursları
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Temel seviyeden ileri seviyeye kadar kapsamlı C ve C++
                          eğitimleri.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <Link
                    to="/exercises"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Alıştırmalar
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Pratik yaparak öğrenin
                    </p>
                  </Link>
                  <Link
                    to="/quiz"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Quiz</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Bilginizi test edin
                    </p>
                  </Link>
                  <Link
                    to="/editor"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Kod Editörü
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Online kod yazın ve test edin
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>AI Destek</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-4 md:w-[400px]">
                  <Link
                    to="/ai-mentor"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      AI Mentor
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Kişisel öğrenme yol haritanız
                    </p>
                  </Link>
                  <Link
                    to="/ai-chat"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      AI Sohbet
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      C/C++ hakkında soru sorun
                    </p>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                to="/forum"
                className={cn(
                  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                  isActive("/forum") && "bg-accent/50",
                )}
              >
                Topluluk
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt="Profil" />
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Ethan Carter</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    Software Engineer
                  </p>
                  <Badge variant="secondary" className="w-fit text-xs">
                    Intermediate
                  </Badge>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/progress" className="flex items-center">
                  <Trophy className="mr-2 h-4 w-4" />
                  <span>İlerleme</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link
                to="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">CodeMentor AI</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                <div className="flex flex-col space-y-3">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                        isActive(item.href)
                          ? "text-foreground"
                          : "text-foreground/60",
                      )}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
