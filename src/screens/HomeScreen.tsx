import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Card, Button, Avatar, Chip } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import LanguageSwitch from "../components/common/LanguageSwitch";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { colors } = useTheme();

  // Animation values
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(100));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const [floatAnim] = useState(new Animated.Value(0));
  const [heroScale] = useState(new Animated.Value(0.9));

  useEffect(() => {
    // Hero entrance animation - simplified for web compatibility
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(heroScale, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous animations - simplified
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      }),
    );

    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    );

    const floatAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]),
    );

    rotateAnimation.start();
    pulseAnimation.start();
    floatAnimation.start();

    return () => {
      rotateAnimation.stop();
      pulseAnimation.stop();
      floatAnimation.stop();
    };
  }, []);

  const features = [
    {
      icon: "bulb-outline",
      title: t("home.features.aiLearning.title"),
      description: t("home.features.aiLearning.description"),
      color: "#3b82f6",
      gradient: ["#3b82f6", "#1d4ed8"],
    },
    {
      icon: "code-slash-outline",
      title: t("home.features.interactiveEditor.title"),
      description: t("home.features.interactiveEditor.description"),
      color: "#8b5cf6",
      gradient: ["#8b5cf6", "#7c3aed"],
    },
    {
      icon: "people-outline",
      title: t("home.features.activeCommunity.title"),
      description: t("home.features.activeCommunity.description"),
      color: "#10b981",
      gradient: ["#10b981", "#059669"],
    },
    {
      icon: "trophy-outline",
      title: t("home.features.gamification.title"),
      description: t("home.features.gamification.description"),
      color: "#f59e0b",
      gradient: ["#f59e0b", "#d97706"],
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
      gradient: ["#10b981", "#059669"],
      progress: 0,
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
      gradient: ["#3b82f6", "#1d4ed8"],
      progress: 65,
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
      gradient: ["#ef4444", "#dc2626"],
      progress: 0,
    },
  ];

  const stats = [
    {
      label: t("home.stats.users"),
      value: "12,847",
      icon: "people",
      color: "#3b82f6",
    },
    {
      label: t("home.stats.courses"),
      value: "25+",
      icon: "book",
      color: "#8b5cf6",
    },
    {
      label: t("home.stats.exercises"),
      value: "500+",
      icon: "code-slash",
      color: "#10b981",
    },
    {
      label: t("home.stats.successRate"),
      value: "%95",
      icon: "trophy",
      color: "#f59e0b",
    },
  ];

  const AnimatedFeatureCard = ({ feature, index }) => {
    const [cardScale] = useState(new Animated.Value(1));
    const [cardRotate] = useState(new Animated.Value(0));
    const [glowOpacity] = useState(new Animated.Value(0));

    const handlePressIn = () => {
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(cardRotate, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const handlePressOut = () => {
      Animated.parallel([
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(cardRotate, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(glowOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const rotateInterpolate = cardRotate.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "3deg"],
    });

    return (
      <Animated.View
        style={[
          {
            transform: [{ scale: cardScale }, { rotate: rotateInterpolate }],
          },
        ]}
      >
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={[styles.featureCard, { backgroundColor: colors.card }]}
        >
          {/* Glow effect */}
          <Animated.View
            style={[
              styles.glowEffect,
              {
                opacity: glowOpacity,
                shadowColor: feature.color,
              },
            ]}
          />

          <LinearGradient
            colors={[`${feature.color}15`, `${feature.color}05`]}
            style={styles.featureGradient}
          >
            <View style={styles.featureContent}>
              <Animated.View
                style={[
                  styles.featureIconContainer,
                  {
                    backgroundColor: feature.color,
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <Ionicons name={feature.icon as any} size={32} color="white" />
              </Animated.View>
              <Text style={[styles.featureTitle, { color: colors.text }]}>
                {feature.title}
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {feature.description}
              </Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const AnimatedCourseCard = ({ course, index }) => {
    const [cardScale] = useState(new Animated.Value(1));

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(cardScale, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      navigation.navigate("CourseDetail", { courseId: course.id });
    };

    return (
      <Animated.View
        style={[
          {
            transform: [{ scale: cardScale }],
          },
        ]}
      >
        <TouchableOpacity onPress={handlePress}>
          <Card style={[styles.courseCard, { backgroundColor: colors.card }]}>
            <LinearGradient
              colors={course.gradient}
              style={styles.courseCardGradient}
            >
              <Animated.View
                style={[
                  {
                    transform: [{ scale: pulseAnim }],
                  },
                ]}
              >
                <Ionicons name="code-slash" size={40} color="white" />
              </Animated.View>
            </LinearGradient>

            <View style={styles.courseContent}>
              <Chip
                mode="outlined"
                textStyle={[styles.chipText, { color: course.color }]}
                style={[styles.levelChip, { borderColor: course.color }]}
              >
                {course.level}
              </Chip>

              <Text style={[styles.courseTitle, { color: colors.text }]}>
                {course.title}
              </Text>
              <Text
                style={[
                  styles.courseDescription,
                  { color: colors.textSecondary },
                ]}
              >
                {course.description}
              </Text>

              <View style={styles.courseStats}>
                <View style={styles.courseStat}>
                  <Ionicons
                    name="people"
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.courseStatText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {course.students}
                  </Text>
                </View>
                <View style={styles.courseStat}>
                  <Ionicons name="star" size={16} color="#fbbf24" />
                  <Text
                    style={[
                      styles.courseStatText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {course.rating}
                  </Text>
                </View>
                <View style={styles.courseStat}>
                  <Ionicons
                    name="time"
                    size={16}
                    color={colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.courseStatText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {course.duration}
                  </Text>
                </View>
              </View>

              {course.progress > 0 && (
                <View style={styles.progressContainer}>
                  <Text
                    style={[
                      styles.progressLabel,
                      { color: colors.textSecondary },
                    ]}
                  >
                    İlerleme: %{course.progress}
                  </Text>
                  <View
                    style={[
                      styles.progressBar,
                      { backgroundColor: colors.border },
                    ]}
                  >
                    <Animated.View
                      style={[
                        styles.progressFill,
                        {
                          backgroundColor: course.color,
                          width: `${course.progress}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              )}
            </View>
          </Card>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Animated Background Shapes */}
      <Animated.View
        style={[
          styles.backgroundContainer,
          {
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0deg", "360deg"],
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={[
            styles.backgroundShape1,
            { backgroundColor: `${colors.primary}08` },
          ]}
        />
        <View
          style={[
            styles.backgroundShape2,
            { backgroundColor: `${colors.secondary}06` },
          ]}
        />
        <View
          style={[
            styles.backgroundShape3,
            { backgroundColor: `${colors.success}04` },
          ]}
        />
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: heroScale }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary, `${colors.primary}90`]}
            style={styles.headerGradient}
          >
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Animated.View
                  style={[
                    styles.logoGradient,
                    {
                      transform: [{ scale: pulseAnim }],
                    },
                  ]}
                >
                  <LinearGradient
                    colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.1)"]}
                    style={styles.logoGradient}
                  >
                    <Ionicons name="code-slash" size={32} color="white" />
                  </LinearGradient>
                </Animated.View>
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

            <View style={styles.heroSection}>
              <Animated.View
                style={[
                  {
                    transform: [
                      {
                        translateY: floatAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, -10],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.heroTitle}>{t("home.subtitle")}</Text>
              </Animated.View>

              <Text style={styles.heroDescription}>
                {t("home.description")}
              </Text>

              <Animated.View
                style={[
                  styles.heroButtons,
                  {
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={() => navigation.navigate(t("navigation.courses"))}
                >
                  <LinearGradient
                    colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0.8)"]}
                    style={styles.buttonGradient}
                  >
                    <Ionicons name="play" size={20} color={colors.primary} />
                    <Text
                      style={[
                        styles.primaryButtonText,
                        { color: colors.primary },
                      ]}
                    >
                      {t("home.getStarted")}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => navigation.navigate(t("navigation.aiChat"))}
                >
                  <Ionicons name="chatbubble-outline" size={20} color="white" />
                  <Text style={styles.secondaryButtonText}>
                    {t("home.watchDemo")}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <Animated.View
          style={[
            styles.statsContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Animated.View
                key={index}
                style={[
                  {
                    opacity: fadeAnim,
                    transform: [
                      { translateY: slideAnim },
                      { scale: scaleAnim },
                    ],
                  },
                ]}
              >
                <Card
                  style={[styles.statCard, { backgroundColor: colors.card }]}
                >
                  <LinearGradient
                    colors={[`${stat.color}15`, `${stat.color}05`]}
                    style={styles.statGradient}
                  >
                    <View style={styles.statContent}>
                      <Animated.View
                        style={[
                          styles.statIconContainer,
                          {
                            backgroundColor: stat.color,
                            transform: [{ scale: pulseAnim }],
                          },
                        ]}
                      >
                        <Ionicons
                          name={stat.icon as any}
                          size={24}
                          color="white"
                        />
                      </Animated.View>
                      <Text style={[styles.statValue, { color: stat.color }]}>
                        {stat.value}
                      </Text>
                      <Text
                        style={[
                          styles.statLabel,
                          { color: colors.textSecondary },
                        ]}
                      >
                        {stat.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </Card>
              </Animated.View>
            ))}
          </View>
        </Animated.View>

        {/* Features Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("home.features.title", "Neden CodeMentor AI?")} ✨
          </Text>
          <Text
            style={[styles.sectionDescription, { color: colors.textSecondary }]}
          >
            {t(
              "home.features.description",
              "Modern teknoloji ile geleneksel öğrenme yöntemlerini birleştirerek size en iyi deneyimi sunuyoruz",
            )}
          </Text>

          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <AnimatedFeatureCard
                key={index}
                feature={feature}
                index={index}
              />
            ))}
          </View>
        </Animated.View>

        {/* Popular Courses Section */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {t("home.popularCourses.title")} 🎓
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(t("navigation.courses"))}
            >
              <Text style={[styles.seeAllText, { color: colors.primary }]}>
                {t("common.all", "Tümünü Gör")}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.coursesScrollView}
            contentContainerStyle={styles.coursesContent}
          >
            {popularCourses.map((course, index) => (
              <AnimatedCourseCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </ScrollView>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            style={styles.ctaSection}
          >
            <Animated.View
              style={[
                {
                  transform: [
                    {
                      translateY: floatAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -5],
                      }),
                    },
                  ],
                },
              ]}
            >
              <Text style={styles.ctaTitle}>
                {t("home.joinCommunity.title")}
              </Text>
              <Text style={styles.ctaDescription}>
                {t("home.joinCommunity.description")}
              </Text>

              <TouchableOpacity style={styles.ctaButton}>
                <View style={styles.ctaButtonContent}>
                  <Ionicons name="flash" size={20} color={colors.primary} />
                  <Text
                    style={[styles.ctaButtonText, { color: colors.primary }]}
                  >
                    {t("home.joinCommunity.join")}
                  </Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  backgroundShape1: {
    position: "absolute",
    width: 400,
    height: 400,
    borderRadius: 200,
    top: -150,
    right: -150,
  },
  backgroundShape2: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    bottom: 200,
    left: -100,
  },
  backgroundShape3: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    top: height * 0.5,
    right: -50,
  },
  scrollView: {
    flex: 1,
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 40,
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
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f9fafb",
    marginLeft: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  notificationButton: {
    padding: 8,
  },
  heroSection: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 42,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  heroDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  heroButtons: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  primaryButton: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 16,
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    gap: 8,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: -25,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 72) / 2,
    borderRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },
  statGradient: {
    padding: 20,
  },
  statContent: {
    alignItems: "center",
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "600",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  featureCard: {
    width: (width - 56) / 2,
    borderRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },
  glowEffect: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  featureGradient: {
    padding: 24,
  },
  featureContent: {
    alignItems: "center",
  },
  featureIconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  coursesScrollView: {
    paddingLeft: 0,
  },
  coursesContent: {
    paddingRight: 20,
  },
  courseCard: {
    width: 300,
    marginRight: 20,
    borderRadius: 20,
    elevation: 6,
    overflow: "hidden",
  },
  courseCardGradient: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  courseContent: {
    padding: 20,
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
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 24,
  },
  courseDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  courseStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  courseStatText: {
    fontSize: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  ctaSection: {
    margin: 20,
    borderRadius: 25,
    padding: 40,
    alignItems: "center",
    elevation: 8,
  },
  ctaTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  ctaDescription: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  ctaButton: {
    backgroundColor: "white",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 6,
  },
  ctaButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 16,
    gap: 8,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});

export default HomeScreen;
