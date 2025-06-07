import React from "react";
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
import { Card, Button, Avatar, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../components/common/LanguageSwitch";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const features = [
    {
      icon: "brain-outline",
      title: t("home.features.aiLearning.title"),
      description: t("home.features.aiLearning.description"),
    },
    {
      icon: "code-slash-outline",
      title: t("home.features.interactiveEditor.title"),
      description: t("home.features.interactiveEditor.description"),
    },
    {
      icon: "people-outline",
      title: t("home.features.activeCommunity.title"),
      description: t("home.features.activeCommunity.description"),
    },
    {
      icon: "trophy-outline",
      title: t("home.features.gamification.title"),
      description: t("home.features.gamification.description"),
    },
  ];

  const popularCourses = [
    {
      id: 1,
      title: t("home.popularCourses.cFoundations.title"),
      description: t("home.popularCourses.cFoundations.description"),
      students: 1247,
      rating: 4.8,
      duration: "6 hafta",
      level: t("userLevels.beginner"),
      color: "#10b981",
    },
    {
      id: 2,
      title: t("home.popularCourses.cppOop.title"),
      description: t("home.popularCourses.cppOop.description"),
      students: 892,
      rating: 4.9,
      duration: "8 hafta",
      level: t("userLevels.intermediate"),
      color: "#3b82f6",
    },
    {
      id: 3,
      title: t("home.popularCourses.dataStructures.title"),
      description: t("home.popularCourses.dataStructures.description"),
      students: 634,
      rating: 4.7,
      duration: "10 hafta",
      level: t("userLevels.advanced"),
      color: "#ef4444",
    },
  ];

  const stats = [
    { label: t("home.stats.users"), value: "12,847", icon: "people" },
    { label: t("home.stats.courses"), value: "25+", icon: "book" },
    { label: t("home.stats.exercises"), value: "500+", icon: "code-slash" },
    { label: t("home.stats.successRate"), value: "%95", icon: "trophy" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={["#030712", "#0f172a", "#1e293b"]}
        style={styles.headerGradient}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#3b82f6", "#8b5cf6"]}
              style={styles.logoGradient}
            >
              <Ionicons name="code-slash" size={32} color="white" />
            </LinearGradient>
            <Text style={styles.logoText}>{t("home.title")}</Text>
          </View>
          <View style={styles.headerActions}>
            <LanguageSwitch style={styles.languageSwitch} variant="icon" />
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#f9fafb"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{t("home.subtitle")}</Text>
          <Text style={styles.heroDescription}>{t("home.description")}</Text>

          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate(t("navigation.courses"))}
            >
              <LinearGradient
                colors={["#3b82f6", "#8b5cf6"]}
                style={styles.buttonGradient}
              >
                <Ionicons name="play" size={20} color="white" />
                <Text style={styles.primaryButtonText}>
                  {t("home.getStarted")}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.navigate(t("navigation.aiChat"))}
            >
              <Ionicons name="chatbubble-outline" size={20} color="#3b82f6" />
              <Text style={styles.secondaryButtonText}>
                {t("home.watchDemo")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Ionicons name={stat.icon as any} size={24} color="#3b82f6" />
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {t("home.features.title", "Neden CodeMentor AI?")}
        </Text>
        <Text style={styles.sectionDescription}>
          {t(
            "home.features.description",
            "Modern teknoloji ile geleneksel öğrenme yöntemlerini birleştirerek size en iyi deneyimi sunuyoruz",
          )}
        </Text>

        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <Card key={index} style={styles.featureCard}>
              <Card.Content style={styles.featureContent}>
                <View style={styles.featureIconContainer}>
                  <Ionicons
                    name={feature.icon as any}
                    size={32}
                    color="#3b82f6"
                  />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>
      </View>

      {/* Popular Courses Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t("home.popularCourses.title")}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(t("navigation.courses"))}
          >
            <Text style={styles.seeAllText}>
              {t("common.all", "Tümünü Gör")}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.coursesScrollView}
        >
          {popularCourses.map((course) => (
            <TouchableOpacity
              key={course.id}
              onPress={() =>
                navigation.navigate("CourseDetail", { courseId: course.id })
              }
            >
              <Card style={styles.courseCard}>
                <LinearGradient
                  colors={[course.color, `${course.color}80`]}
                  style={styles.courseCardGradient}
                >
                  <Ionicons name="code-slash" size={40} color="white" />
                </LinearGradient>

                <Card.Content style={styles.courseContent}>
                  <Chip
                    mode="outlined"
                    textStyle={styles.chipText}
                    style={[styles.levelChip, { borderColor: course.color }]}
                  >
                    {course.level}
                  </Chip>

                  <Text style={styles.courseTitle}>{course.title}</Text>
                  <Text style={styles.courseDescription}>
                    {course.description}
                  </Text>

                  <View style={styles.courseStats}>
                    <View style={styles.courseStat}>
                      <Ionicons name="people" size={16} color="#64748b" />
                      <Text style={styles.courseStatText}>
                        {course.students}
                      </Text>
                    </View>
                    <View style={styles.courseStat}>
                      <Ionicons name="star" size={16} color="#fbbf24" />
                      <Text style={styles.courseStatText}>{course.rating}</Text>
                    </View>
                    <View style={styles.courseStat}>
                      <Ionicons name="time" size={16} color="#64748b" />
                      <Text style={styles.courseStatText}>
                        {course.duration}
                      </Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* CTA Section */}
      <LinearGradient colors={["#3b82f6", "#8b5cf6"]} style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>{t("home.joinCommunity.title")}</Text>
        <Text style={styles.ctaDescription}>
          {t("home.joinCommunity.description")}
        </Text>

        <TouchableOpacity style={styles.ctaButton}>
          <View style={styles.ctaButtonContent}>
            <Ionicons name="flash" size={20} color="#3b82f6" />
            <Text style={styles.ctaButtonText}>
              {t("home.joinCommunity.join")}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  languageSwitch: {
    marginRight: 8,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoGradient: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f9fafb",
    marginLeft: 12,
  },
  notificationButton: {
    padding: 8,
  },
  heroSection: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  heroDescription: {
    fontSize: 16,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3b82f6",
    gap: 8,
  },
  secondaryButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: "#94a3b8",
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 16,
    color: "#3b82f6",
    fontWeight: "600",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#1e293b",
  },
  featureContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    lineHeight: 20,
  },
  coursesScrollView: {
    paddingLeft: 20,
  },
  courseCard: {
    width: 280,
    backgroundColor: "#0f172a",
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    overflow: "hidden",
  },
  courseCardGradient: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  courseContent: {
    padding: 16,
  },
  levelChip: {
    alignSelf: "flex-start",
    marginBottom: 12,
    backgroundColor: "transparent",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "600",
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: "#94a3b8",
    lineHeight: 20,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  courseStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseStatText: {
    fontSize: 12,
    color: "#64748b",
  },
  ctaSection: {
    margin: 20,
    borderRadius: 20,
    padding: 32,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  ctaDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
  },
  ctaButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  ctaButtonText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;
