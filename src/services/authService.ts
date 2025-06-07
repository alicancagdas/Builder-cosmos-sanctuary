export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar?: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  joinDate: string;
  stats: {
    completedCourses: number;
    solvedExercises: number;
    totalPoints: number;
    currentStreak: number;
    averageScore: number;
  };
}

// Mock users for development/demo
const MOCK_USERS: User[] = [
  {
    id: "1",
    email: "ethan.carter@example.com",
    firstName: "Ethan",
    lastName: "Carter",
    displayName: "Ethan Carter",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    level: "Intermediate",
    joinDate: "2021-03-15",
    stats: {
      completedCourses: 12,
      solvedExercises: 247,
      totalPoints: 2456,
      currentStreak: 15,
      averageScore: 87,
    },
  },
  {
    id: "2",
    email: "demo@codementor.ai",
    firstName: "Demo",
    lastName: "User",
    displayName: "Demo User",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b784?w=200&h=200&fit=crop&crop=face",
    level: "Beginner",
    joinDate: "2024-01-01",
    stats: {
      completedCourses: 3,
      solvedExercises: 45,
      totalPoints: 680,
      currentStreak: 7,
      averageScore: 78,
    },
  },
  {
    id: "3",
    email: "admin@codementor.ai",
    firstName: "Admin",
    lastName: "User",
    displayName: "Admin User",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    level: "Expert",
    joinDate: "2020-01-01",
    stats: {
      completedCourses: 25,
      solvedExercises: 500,
      totalPoints: 5420,
      currentStreak: 45,
      averageScore: 95,
    },
  },
];

class AuthService {
  private currentUser: User | null = null;
  private isAuthenticated: boolean = false;

  // Simulate login with mock data
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      return { success: false, error: "Kullanıcı bulunamadı" };
    }

    // For demo purposes, any password works
    if (password.length < 3) {
      return { success: false, error: "Şifre en az 3 karakter olmalıdır" };
    }

    this.currentUser = user;
    this.isAuthenticated = true;

    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      localStorage.setItem("codementor_user", JSON.stringify(user));
      localStorage.setItem("codementor_auth", "true");
    }

    return { success: true, user };
  }

  // Register new user (mock implementation)
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUser = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase(),
    );
    if (existingUser) {
      return { success: false, error: "Bu e-posta adresi zaten kullanımda" };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      displayName: `${userData.firstName} ${userData.lastName}`,
      level: "Beginner",
      joinDate: new Date().toISOString().split("T")[0],
      stats: {
        completedCourses: 0,
        solvedExercises: 0,
        totalPoints: 0,
        currentStreak: 0,
        averageScore: 0,
      },
    };

    // Add to mock users (in real app, this would be API call)
    MOCK_USERS.push(newUser);

    this.currentUser = newUser;
    this.isAuthenticated = true;

    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("codementor_user", JSON.stringify(newUser));
      localStorage.setItem("codementor_auth", "true");
    }

    return { success: true, user: newUser };
  }

  // Check if user is authenticated
  checkAuth(): boolean {
    if (this.isAuthenticated && this.currentUser) {
      return true;
    }

    // Check localStorage
    if (typeof window !== "undefined") {
      const authStatus = localStorage.getItem("codementor_auth");
      const userData = localStorage.getItem("codementor_user");

      if (authStatus === "true" && userData) {
        try {
          this.currentUser = JSON.parse(userData);
          this.isAuthenticated = true;
          return true;
        } catch (error) {
          console.error("Failed to parse user data:", error);
          this.logout();
        }
      }
    }

    return false;
  }

  // Get current user
  getCurrentUser(): User | null {
    if (!this.isAuthenticated) {
      this.checkAuth();
    }
    return this.currentUser;
  }

  // Logout
  logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;

    if (typeof window !== "undefined") {
      localStorage.removeItem("codementor_user");
      localStorage.removeItem("codementor_auth");
    }
  }

  // Update user stats (mock implementation)
  async updateUserStats(stats: Partial<User["stats"]>): Promise<void> {
    if (this.currentUser) {
      this.currentUser.stats = { ...this.currentUser.stats, ...stats };

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "codementor_user",
          JSON.stringify(this.currentUser),
        );
      }
    }
  }

  // Get all mock users (for demo purposes)
  getMockUsers(): User[] {
    return [...MOCK_USERS];
  }

  // Quick login for demo (bypasses password)
  async quickLogin(userId: string): Promise<{ success: boolean; user?: User }> {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;

      if (typeof window !== "undefined") {
        localStorage.setItem("codementor_user", JSON.stringify(user));
        localStorage.setItem("codementor_auth", "true");
      }

      return { success: true, user };
    }
    return { success: false };
  }
}

export const authService = new AuthService();
export default authService;
