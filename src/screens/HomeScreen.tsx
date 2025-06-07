import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
} from "react-native-reanimated";

import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCard from "../components/AnimatedCard";
import FloatingActionButton from "../components/FloatingActionButton";
import AnimatedProgress from "../components/AnimatedProgress";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-50);
  const statsScale = useSharedValue(0.8);

  useEffect(() => {
    // Entrance animations
    headerOpacity.value = withTiming(1, { duration: 800 });
    headerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });

    statsScale.value = withDelay(
      300,
      withSpring(1, {
        damping: 12,
        stiffness: 120,
      }),
    );
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const statsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: statsScale.value }],
  }));

  const features = [
    {
      icon: "brain-outline",
      title: "AI Destekli Öğrenme",
      description: "Yapay zeka ile kişiselleştirilmiş öğrenme deneyimi",
      color: "#3b82f6",
      gradient: ["#3b82f6", "#1d4ed8"],
    },
    {
      icon: "code-slash-outline",
      title: "İnteraktif Kod Editörü",
      description: "Gerçek zamanlı compiler ile kodlarınızı test edin",
      color: "#8b5cf6",
      gradient: ["#8b5cf6", "#7c3aed"],
    },
    {
      icon: "people-outline",
      title: "Aktif Topluluk",
      description: "Binlerce öğrenci ile birlikte öğrenin",
      color: "#06b6d4",
      gradient: ["#06b6d4", "#0891b2"],
    },
    {
      icon: "trophy-outline",
      title: "Gamifikasyon",
      description: "Rozetler kazanın, seviye atlayın",
      color: "#10b981",
      gradient: ["#10b981", "#059669"],
    },
  ];

  const popularCourses = [
    {
      id: 1,
      title: "C Programlama Temelleri",
      description: "Sıfırdan başlayarak C programlama dilini öğrenin",
      students: 1247,
      rating: 4.8,
      progress: 65,
      level: "Başlangıç",
      duration: "8 hafta",
      gradient: ["#3b82f6", "#1d4ed8"],
    },
    {
      id: 2,
      title: "C++ Nesne Yönelimli Programlama",
      description: "Modern C++ ile ileri seviye programlama teknikleri",
      students: 892,
      rating: 4.9,
      progress: 45,
      level: "Orta",
      duration: "12 hafta",
      gradient: ["#8b5cf6", "#7c3aed"],
    },
    {
      id: 3,
      title: "Veri Yapıları ve Algoritmalar",
      description: "Temel veri yapıları ve algoritma analizi",
      students: 634,
      rating: 4.7,
      progress: 30,
      level: "İleri",
      duration: "10 hafta",
      gradient: ["#06b6d4", "#0891b2"],
    },
  ];

  const stats = [
    {
      label: "Aktif Öğrenci",
      value: "12,847",
      icon: "people",
      color: "#3b82f6",
    },
    { label: "Kurs Sayısı", value: "25+", icon: "book", color: "#8b5cf6" },
    { label: "Alıştırma", value: "500+", icon: "code-slash", color: "#06b6d4" },
    { label: "Başarı Oranı", value: "%95", icon: "trophy", color: "#10b981" },
  ];

  const renderStatCard = (stat, index) => (
    <AnimatedCard
      key={stat.label}
      delay={index * 100}
      gradientColors={[`${stat.color}20`, `${stat.color}10`]}
      shadowColor={stat.color}
      style={styles.statCard}
    >
      <View style={styles.statContent}>
        <LinearGradient
          colors={[stat.color, `${stat.color}80`]}
          style={styles.statIconContainer}
        >
          <Ionicons name={stat.icon} size={24} color="white" />
        </LinearGradient>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    </AnimatedCard>
  );

  const renderFeatureCard = (feature, index) => (
    <AnimatedCard
      key={feature.title}
      delay={index * 150}
      gradientColors={[`${feature.color}20`, `${feature.color}10`]}
      shadowColor={feature.color}
      style={styles.featureCard}
    >
      <View style={styles.featureContent}>
        <LinearGradient colors={feature.gradient} style={styles.featureIcon}>
          <Ionicons name={feature.icon} size={32} color="white" />
        </LinearGradient>
        <Text style={styles.featureTitle}>{feature.title}</Text>
        <Text style={styles.featureDescription}>{feature.description}</Text>
      </View>
    </AnimatedCard>
  );

  const renderCourseCard = (course, index) => (
    <AnimatedCard
      key={course.id}
      delay={index * 200}
      gradientColors={[`${course.gradient[0]}20`, `${course.gradient[1]}10`]}
      shadowColor={course.gradient[0]}
      style={styles.courseCard}
      onPress={() => navigation.navigate("CourseDetail", { course })}
    >
      <LinearGradient colors={course.gradient} style={styles.courseHeader}>
        <View style={styles.courseLevel}>
          <Text style={styles.courseLevelText}>{course.level}</Text>
        </View>
        <Text style={styles.courseRating}>
          <Ionicons name="star" size={16} color="#fbbf24" /> {course.rating}
        </Text>
      </LinearGradient>

      <View style={styles.courseContent}>
        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseDescription}>{course.description}</Text>

        <View style={styles.courseInfo}>
          <View style={styles.courseDetail}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.courseDetailText}>{course.duration}</Text>
          </View>
          <View style={styles.courseDetail}>
            <Ionicons name="people-outline" size={16} color="#9ca3af" />
            <Text style={styles.courseDetailText}>{course.students}</Text>
          </View>
        </View>

        <AnimatedProgress
          progress={course.progress}
          label="İlerleme"
          height={6}
          colors={course.gradient}
        />
      </View>
    </AnimatedCard>
  );

  return (
    <View style={styles.container}>
      <AnimatedBackground variant="home" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <Animated.View style={[styles.heroSection, headerAnimatedStyle]}>
          <LinearGradient
            colors={["rgba(59, 130, 246, 0.1)", "transparent"]}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                CodeMentor AI ile{"\n"}
                <Text style={styles.heroTitleHighlight}>
                  Programlamayı Öğren
                </Text>
              </Text>
              <Text style={styles.heroSubtitle}>
                Yapay zeka destekli öğrenme platformu ile C/C++ programlama
                dillerinde uzmanlaş
              </Text>

              <TouchableOpacity
                style={styles.heroButton}
                onPress={() => navigation.navigate("Courses")}
              >
                <LinearGradient
                  colors={["#3b82f6", "#1d4ed8"]}
                  style={styles.heroButtonGradient}
                >
                  <Text style={styles.heroButtonText}>Öğrenmeye Başla</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View style={[styles.statsSection, statsAnimatedStyle]}>
          <Text style={styles.sectionTitle}>Platform İstatistikleri</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => renderStatCard(stat, index))}
          </View>
        </Animated.View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Özellikler</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) =>
              renderFeatureCard(feature, index),
            )}
          </View>
        </View>

        {/* Popular Courses Section */}
        <View style={styles.coursesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Kurslar</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Courses")}>
              <Text style={styles.viewAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesScrollContent}
          >
            {popularCourses.map((course, index) =>
              renderCourseCard(course, index),
            )}
          </ScrollView>
        </View>

        {/* CTA Section */}
        <AnimatedCard
          delay={800}
          gradientColors={["rgba(59, 130, 246, 0.2)", "rgba(29, 78, 216, 0.1)"]}
          shadowColor="#3b82f6"
          style={styles.ctaSection}
        >
          <LinearGradient
            colors={["#3b82f6", "#1d4ed8"]}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaTitle}>AI Mentor ile Öğren</Text>
            <Text style={styles.ctaSubtitle}>
              Kişisel AI asistanın ile 7/24 soru sor, kod yaz ve öğren
            </Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => navigation.navigate("AI Chat")}
            >
              <Text style={styles.ctaButtonText}>AI Chat'i Dene</Text>
              <Ionicons name="chatbubble-ellipses" size={20} color="#3b82f6" />
            </TouchableOpacity>
          </LinearGradient>
        </AnimatedCard>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="add"
        onPress={() => navigation.navigate("Exercises")}
        colors={["#10b981", "#059669"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  heroSection: {
    height: height * 0.45,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroGradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  heroContent: {
    alignItems: "center",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  heroTitleHighlight: {
    color: "#3b82f6",
  },
  heroSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  heroButton: {
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  heroButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    padding: 20,
  },
  statContent: {
    alignItems: "center",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
  featuresSection: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  featureCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    padding: 20,
  },
  featureContent: {
    alignItems: "center",
  },
  featureIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 18,
  },
  coursesSection: {
    marginTop: 40,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  viewAllText: {
    fontSize: 14,
    color: "#3b82f6",
    fontWeight: "600",
  },
  coursesScrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  courseCard: {
    width: width * 0.8,
    overflow: "hidden",
  },
  courseHeader: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseLevel: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseLevelText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  courseRating: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  courseContent: {
    padding: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 16,
    lineHeight: 20,
  },
  courseInfo: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  courseDetail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseDetailText: {
    fontSize: 12,
    color: "#9ca3af",
  },
  ctaSection: {
    marginHorizontal: 20,
    marginTop: 40,
    overflow: "hidden",
  },
  ctaGradient: {
    padding: 32,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3b82f6",
  },
});

export default HomeScreen;
