import { Link } from "react-router-dom";
import { Code2, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                CodeMentor AI
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              AI destekli C ve C++ öğrenme platformu. Kod yazmayı daha kolay ve
              eğlenceli hale getiriyoruz.
            </p>
          </div>

          {/* Learning */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Öğren</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/courses"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  C Kursu
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  C++ Kursu
                </Link>
              </li>
              <li>
                <Link
                  to="/exercises"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Alıştırmalar
                </Link>
              </li>
              <li>
                <Link
                  to="/quiz"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Araçlar</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/editor"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kod Editörü
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-mentor"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Mentor
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-chat"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  AI Sohbet
                </Link>
              </li>
              <li>
                <Link
                  to="/forum"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Topluluk
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Şirket</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Hakkımızda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  İletişim
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gizlilik
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Kullanım Şartları
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 CodeMentor AI. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
