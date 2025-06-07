import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withDelay,
  interpolate,
} from "react-native-reanimated";

import AnimatedBackground from "../components/AnimatedBackground";
import AnimatedCard from "../components/AnimatedCard";
import AnimatedProgress from "../components/AnimatedProgress";
import FloatingActionButton from "../components/FloatingActionButton";

const { width } = Dimensions.get("window");

const CoursesScreen = () => {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Animation values
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(-30);
  const filterScale = useSharedValue(0.9);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    headerTranslateY.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });

    filterScale.value = withDelay(
      200,
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

  const filterAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: filterScale.value }],
  }));

  const courses = [
    {
      id: 1,
      title: "C Programlama Temelleri",
      description:
        "Sıfırdan başlayarak C programlama dilini öğrenin. Değişkenler, fonksiyonlar, döngüler ve temel veri yapıları.",
      level: "Başlangıç",
      language: "C",
      duration: "8 hafta",
      students: 1247,
      rating: 4.8,
      progress: 65,
      price: "Ücretsiz",
      instructor: "Dr. Ahmet Yılmaz",
      lessons: 24,
      gradient: ["#3b82f6", "#1d4ed8"],
      tags: ["Temel", "Syntax", "Algoritma"],
    },
    {
      id: 2,
      title: "C++ Nesne Yönelimli Programlama",
      description:
        "Modern C++ ile ileri seviye programlama teknikleri. Sınıflar, kalıtım, polimorfizm ve STL kullanımı.",
      level: "Orta",
      language: "C++",
      duration: "12 hafta",
      students: 892,
      rating: 4.9,
      progress: 45,
      price: "₺149",
      instructor: "Prof. Elif Kaya",
      lessons: 36,
      gradient: ["#8b5cf6", "#7c3aed"],
      tags: ["OOP", "STL", "Modern C++"],
    },
    {
      id: 3,
      title: "Veri Yapıları ve Algoritmalar",
      description:
        "Temel veri yapıları ve algoritma analizi. Karmaşıklık hesapları, sıralama ve arama algoritmaları.",
      level: "İleri",
      language: "C++",
      duration: "10 hafta",
      students: 634,
      rating: 4.7,
      progress: 30,
      price: "₺199",
      instructor: "Dr. Mehmet Öz",
      lessons: 42,
      gradient: ["#06b6d4", "#0891b2"],
      tags: ["Algoritma", "Big-O", "Optimizasyon"],
    },
    {
      id: 4,
      title: "C ile Sistem Programlama",
      description:
        "Düşük seviye programlama ve sistem çağrıları. Bellek yönetimi, dosya işlemleri ve işletim sistemi arayüzü.",
      level: "İleri",
      language: "C",
      duration: "14 hafta",
      students: 456,
      rating: 4.6,
      progress: 0,
      price: "₺249",
      instructor: "Dr. Zeynep Demir",
      lessons: 48,
      gradient: ["#10b981", "#059669"],
      tags: ["Sistem", "Bellek", "POSIX"],
    },
    {
      id: 5,
      title: "C++ Game Development",
      description:
        "C++ ile oyun geliştirme temelleri. SDL2, OpenGL ve oyun motoru mimarisi konularını öğrenin.",
      level: "Orta",
      language: "C++",
      duration: "16 hafta",
      students: 723,
      rating: 4.8,
      progress: 0,
      price: "₺299",
      instructor: "Görkem Arslan",
      lessons: 52,
      gradient: ["#f59e0b", "#d97706"],
      tags: ["Oyun", "SDL2", "OpenGL"],
    },
    {
      id: 6,
      title: "Mikrodenetleyici Programlama",
      description:
        "Arduino ve STM32 ile gömülü sistem programlama. Sensörler, motorlar ve IoT uygulamaları.",
      level: "Orta",
      language: "C",
      duration: "6 hafta",
      students: 389,
      rating: 4.5,
      progress: 0,
      price: "₺179",
      instructor: "Mühendis Ali Veli",
      lessons: 28,
      gradient: ["#ef4444", "#dc2626"],
      tags: ["Arduino", "IoT", "Embedded"],
    },
  ];

  const levels = [
    { key: "all", label: "Tümü", color: "#6b7280" },
    { key: "Başlangıç", label: "Başlangıç", color: "#10b981" },
    { key: "Orta", label: "Orta", color: "#f59e0b" },
    { key: "İleri", label: "İleri", color: "#ef4444" },
  ];

  const languages = [
    { key: "all", label: "Tümü", color: "#6b7280" },
    { key: "C", label: "C", color: "#3b82f6" },
    { key: "C++", label: "C++", color: "#8b5cf6" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;
    const matchesLanguage =
      selectedLanguage === "all" || course.language === selectedLanguage;
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesLevel && matchesLanguage && matchesSearch;
  });

  const renderFilterChip = (items, selectedItem, onSelect) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filterScrollContent}
    >
      {items.map((item, index) => (
        <TouchableOpacity
          key={item.key}
          onPress={() => onSelect(item.key)}
          style={[
            styles.filterChip,
            selectedItem === item.key && styles.selectedFilterChip,
          ]}
        >
          {selectedItem === item.key && (
            <LinearGradient
              colors={[item.color, `${item.color}80`]}
              style={styles.filterChipGradient}
            />
          )}
          <Text
            style={[
              styles.filterChipText,
              selectedItem === item.key && styles.selectedFilterChipText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderCourse = (course, index) => (
    <AnimatedCard
      key={course.id}
      delay={index * 100}
      gradientColors={[`${course.gradient[0]}15`, `${course.gradient[1]}08`]}
      shadowColor={course.gradient[0]}
      style={styles.courseCard}
      onPress={() => navigation.navigate("CourseDetail", { course })}
    >
      {/* Course Header */}
      <LinearGradient colors={course.gradient} style={styles.courseHeader}>
        <View style={styles.courseHeaderTop}>
          <View style={styles.courseBadges}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelBadgeText}>{course.level}</Text>
            </View>
            <View style={styles.languageBadge}>
              <Text style={styles.languageBadgeText}>{course.language}</Text>
            </View>
          </View>

          <View style={styles.courseRating}>
            <Ionicons name="star" size={14} color="#fbbf24" />
            <Text style={styles.ratingText}>{course.rating}</Text>
          </View>
        </View>

        <Text style={styles.courseTitle}>{course.title}</Text>
        <Text style={styles.courseInstructor}>👨‍💻 {course.instructor}</Text>
      </LinearGradient>

      {/* Course Content */}
      <View style={styles.courseContent}>
        <Text style={styles.courseDescription}>{course.description}</Text>

        {/* Tags */}
        <View style={styles.tagsContainer}>
          {course.tags.map((tag, tagIndex) => (
            <View
              key={tagIndex}
              style={[styles.tag, { borderColor: course.gradient[0] }]}
            >
              <Text style={[styles.tagText, { color: course.gradient[0] }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>

        {/* Course Info */}
        <View style={styles.courseInfoGrid}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={16} color="#9ca3af" />
            <Text style={styles.infoText}>{course.duration}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="book-outline" size={16} color="#9ca3af" />
            <Text style={styles.infoText}>{course.lessons} ders</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="people-outline" size={16} color="#9ca3af" />
            <Text style={styles.infoText}>{course.students}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="card-outline" size={16} color="#9ca3af" />
            <Text
              style={[
                styles.infoText,
                course.price === "Ücretsiz" && styles.freePrice,
              ]}
            >
              {course.price}
            </Text>
          </View>
        </View>

        {/* Progress */}
        {course.progress > 0 && (
          <View style={styles.progressContainer}>
            <AnimatedProgress
              progress={course.progress}
              label="İlerleme Durumu"
              height={6}
              colors={course.gradient}
            />
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={styles.courseButton}
          onPress={() => navigation.navigate("CourseDetail", { course })}
        >
          <LinearGradient
            colors={course.gradient}
            style={styles.courseButtonGradient}
          >
            <Text style={styles.courseButtonText}>
              {course.progress > 0 ? "Devam Et" : "Kursa Başla"}
            </Text>
            <Ionicons
              name={course.progress > 0 ? "play" : "arrow-forward"}
              size={16}
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </AnimatedCard>
  );

  return (
    <View style={styles.container}>
      <AnimatedBackground variant="courses" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <Animated.View style={[styles.header, headerAnimatedStyle]}>
          <Text style={styles.headerTitle}>Kurslar</Text>
          <Text style={styles.headerSubtitle}>
            C ve C++ programlama dillerinde uzmanlaş
          </Text>
        </Animated.View>

        {/* Search */}
        <Animated.View style={[styles.searchContainer, filterAnimatedStyle]}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Kurs ara..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>

        {/* Filters */}
        <Animated.View style={[styles.filtersContainer, filterAnimatedStyle]}>
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Seviye</Text>
            {renderFilterChip(levels, selectedLevel, setSelectedLevel)}
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Dil</Text>
            {renderFilterChip(languages, selectedLanguage, setSelectedLanguage)}
          </View>
        </Animated.View>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredCourses.length} kurs bulundu
          </Text>
        </View>

        {/* Courses Grid */}
        <View style={styles.coursesContainer}>
          {filteredCourses.map((course, index) => renderCourse(course, index))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="filter"
        onPress={() => {
          setSelectedLevel("all");
          setSelectedLanguage("all");
          setSearchQuery("");
        }}
        colors={["#8b5cf6", "#7c3aed"]}
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
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#9ca3af",
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  filtersContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 20,
  },
  filterSection: {
    gap: 8,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e5e7eb",
    marginLeft: 4,
  },
  filterScrollContent: {
    paddingRight: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(75, 85, 99, 0.3)",
    position: "relative",
    overflow: "hidden",
  },
  selectedFilterChip: {
    borderColor: "transparent",
  },
  filterChipGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
    position: "relative",
    zIndex: 1,
  },
  selectedFilterChipText: {
    color: "white",
  },
  resultsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "500",
  },
  coursesContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  courseCard: {
    overflow: "hidden",
  },
  courseHeader: {
    padding: 20,
  },
  courseHeaderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  courseBadges: {
    flexDirection: "row",
    gap: 8,
  },
  levelBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  languageBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  languageBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  courseRating: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    lineHeight: 28,
  },
  courseInstructor: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
  },
  courseContent: {
    padding: 20,
  },
  courseDescription: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 22,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "500",
  },
  courseInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
    minWidth: "45%",
  },
  infoText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  freePrice: {
    color: "#10b981",
    fontWeight: "600",
  },
  progressContainer: {
    marginBottom: 20,
  },
  courseButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  courseButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  courseButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
});

export default CoursesScreen;
