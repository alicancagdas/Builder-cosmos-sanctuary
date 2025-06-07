import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
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
import AnimatedProgress, {
  CircularProgress,
} from "../components/AnimatedProgress";
import FloatingActionButton from "../components/FloatingActionButton";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("achievements");

  // Animation values
  const profileScale = useSharedValue(0.8);
  const profileOpacity = useSharedValue(0);
  const tabsTranslateY = useSharedValue(50);

  useEffect(() => {
    // Profile entrance animation
    profileOpacity.value = withTiming(1, { duration: 600 });
    profileScale.value = withSpring(1, {
      damping: 15,
      stiffness: 120,
    });

    tabsTranslateY.value = withDelay(
      300,
      withSpring(0, {
        damping: 15,
        stiffness: 100,
      }),
    );
  }, []);

  const profileAnimatedStyle = useAnimatedStyle(() => ({
    opacity: profileOpacity.value,
    transform: [{ scale: profileScale.value }],
  }));

  const tabsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabsTranslateY.value }],
  }));

  const user = {
    name: "Ethan Carter",
    username: "@ethancarter",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=Ethan",
    level: "İleri Seviye",
    levelProgress: 75,
    totalPoints: 2456,
    coursesCompleted: 12,
    exercisesCompleted: 247,
    streak: 23,
    followers: 156,
    following: 89,
    joinDate: "Ocak 2023",
  };

  const achievements = [
    {
      id: 1,
      title: "İlk Kod",
      description: "İlk Hello World programını yazdın",
      icon: "code-slash",
      color: "#3b82f6",
      unlocked: true,
      date: "15 Ocak 2023",
    },
    {
      id: 2,
      title: "Hızlı Öğrenci",
      description: "7 gün üst üste egzersiz çözdün",
      icon: "flash",
      color: "#f59e0b",
      unlocked: true,
      date: "22 Ocak 2023",
    },
    {
      id: 3,
      title: "Kurs Tamamlayıcı",
      description: "İlk kursunu tamamladın",
      icon: "trophy",
      color: "#10b981",
      unlocked: true,
      date: "5 Şubat 2023",
    },
    {
      id: 4,
      title: "Problem Çözücü",
      description: "100 egzersiz tamamladın",
      icon: "bulb",
      color: "#8b5cf6",
      unlocked: true,
      date: "20 Mart 2023",
    },
    {
      id: 5,
      title: "Topluluk Üyesi",
      description: "Forum'da 50 mesaj attın",
      icon: "people",
      color: "#06b6d4",
      unlocked: true,
      date: "10 Nisan 2023",
    },
    {
      id: 6,
      title: "Uzman",
      description: "İleri seviye kursu tamamla",
      icon: "school",
      color: "#ef4444",
      unlocked: false,
      date: null,
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "C++ Nesne Yönelimli Programlama",
      action: "Bölüm 5 tamamlandı",
      time: "2 saat önce",
      icon: "book",
      color: "#3b82f6",
    },
    {
      id: 2,
      type: "exercise",
      title: "Pointer Manipülasyonu",
      action: "Egzersiz çözüldü",
      time: "5 saat önce",
      icon: "code-slash",
      color: "#10b981",
    },
    {
      id: 3,
      type: "achievement",
      title: "Problem Çözücü",
      action: "Rozet kazanıldı",
      time: "1 gün önce",
      icon: "trophy",
      color: "#f59e0b",
    },
    {
      id: 4,
      type: "forum",
      title: "Array vs Pointer Farkları",
      action: "Soruya yanıt verildi",
      time: "2 gün önce",
      icon: "chatbubble",
      color: "#8b5cf6",
    },
  ];

  const stats = [
    { label: "Puan", value: user.totalPoints, icon: "star", color: "#f59e0b" },
    {
      label: "Tamamlanan Kurs",
      value: user.coursesCompleted,
      icon: "book",
      color: "#3b82f6",
    },
    {
      label: "Egzersiz",
      value: user.exercisesCompleted,
      icon: "code-slash",
      color: "#10b981",
    },
    {
      label: "Seri",
      value: `${user.streak} gün`,
      icon: "flash",
      color: "#ef4444",
    },
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
          style={styles.statIcon}
        >
          <Ionicons name={stat.icon} size={20} color="white" />
        </LinearGradient>
        <Text style={styles.statValue}>{stat.value}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </View>
    </AnimatedCard>
  );

  const renderAchievement = (achievement, index) => (
    <AnimatedCard
      key={achievement.id}
      delay={index * 100}
      gradientColors={
        achievement.unlocked
          ? [`${achievement.color}20`, `${achievement.color}10`]
          : ["rgba(75, 85, 99, 0.2)", "rgba(75, 85, 99, 0.1)"]
      }
      shadowColor={achievement.unlocked ? achievement.color : "#4b5563"}
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.lockedAchievement,
      ]}
    >
      <View style={styles.achievementContent}>
        <LinearGradient
          colors={
            achievement.unlocked
              ? [achievement.color, `${achievement.color}80`]
              : ["#4b5563", "#374151"]
          }
          style={styles.achievementIcon}
        >
          <Ionicons
            name={achievement.unlocked ? achievement.icon : "lock-closed"}
            size={24}
            color="white"
          />
        </LinearGradient>

        <View style={styles.achievementText}>
          <Text
            style={[
              styles.achievementTitle,
              !achievement.unlocked && styles.lockedText,
            ]}
          >
            {achievement.title}
          </Text>
          <Text
            style={[
              styles.achievementDescription,
              !achievement.unlocked && styles.lockedText,
            ]}
          >
            {achievement.description}
          </Text>
          {achievement.date && (
            <Text style={styles.achievementDate}>{achievement.date}</Text>
          )}
        </View>
      </View>
    </AnimatedCard>
  );

  const renderActivity = (activity, index) => (
    <AnimatedCard
      key={activity.id}
      delay={index * 150}
      gradientColors={[`${activity.color}15`, `${activity.color}08`]}
      shadowColor={activity.color}
      style={styles.activityCard}
    >
      <View style={styles.activityContent}>
        <LinearGradient
          colors={[activity.color, `${activity.color}80`]}
          style={styles.activityIcon}
        >
          <Ionicons name={activity.icon} size={20} color="white" />
        </LinearGradient>

        <View style={styles.activityText}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={styles.activityAction}>{activity.action}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "achievements":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Rozetler</Text>
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement, index) =>
                renderAchievement(achievement, index),
              )}
            </View>
          </View>
        );
      case "activity":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Son Aktiviteler</Text>
            <View style={styles.activityList}>
              {recentActivity.map((activity, index) =>
                renderActivity(activity, index),
              )}
            </View>
          </View>
        );
      case "about":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Hakkında</Text>
            <AnimatedCard
              delay={200}
              gradientColors={[
                "rgba(59, 130, 246, 0.1)",
                "rgba(29, 78, 216, 0.05)",
              ]}
              shadowColor="#3b82f6"
              style={styles.aboutCard}
            >
              <View style={styles.aboutContent}>
                <View style={styles.aboutItem}>
                  <Ionicons name="calendar" size={20} color="#3b82f6" />
                  <Text style={styles.aboutLabel}>Katılım Tarihi</Text>
                  <Text style={styles.aboutValue}>{user.joinDate}</Text>
                </View>

                <View style={styles.aboutItem}>
                  <Ionicons name="people" size={20} color="#3b82f6" />
                  <Text style={styles.aboutLabel}>Takipçi</Text>
                  <Text style={styles.aboutValue}>{user.followers}</Text>
                </View>

                <View style={styles.aboutItem}>
                  <Ionicons name="person-add" size={20} color="#3b82f6" />
                  <Text style={styles.aboutLabel}>Takip Edilen</Text>
                  <Text style={styles.aboutValue}>{user.following}</Text>
                </View>

                <View style={styles.aboutItem}>
                  <Ionicons name="trending-up" size={20} color="#3b82f6" />
                  <Text style={styles.aboutLabel}>Seviye</Text>
                  <Text style={styles.aboutValue}>{user.level}</Text>
                </View>
              </View>
            </AnimatedCard>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <AnimatedBackground variant="profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <Animated.View style={[styles.profileHeader, profileAnimatedStyle]}>
          <LinearGradient
            colors={["rgba(6, 182, 212, 0.2)", "transparent"]}
            style={styles.profileGradient}
          >
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={["#06b6d4", "#0891b2"]}
                  style={styles.avatarGradient}
                >
                  <Image source={{ uri: user.avatar }} style={styles.avatar} />
                </LinearGradient>
                <View style={styles.levelBadge}>
                  <CircularProgress
                    progress={user.levelProgress}
                    size={50}
                    strokeWidth={3}
                  />
                </View>
              </View>

              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userHandle}>{user.username}</Text>
              <Text style={styles.userLevel}>{user.level}</Text>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.followButton}>
                  <LinearGradient
                    colors={["#3b82f6", "#1d4ed8"]}
                    style={styles.buttonGradient}
                  >
                    <Ionicons name="person-add" size={16} color="white" />
                    <Text style={styles.buttonText}>Takip Et</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity style={styles.messageButton}>
                  <View style={styles.messageButtonBorder}>
                    <Ionicons name="chatbubble" size={16} color="#3b82f6" />
                    <Text style={styles.messageButtonText}>Mesaj</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => renderStatCard(stat, index))}
          </View>
        </View>

        {/* Tabs */}
        <Animated.View style={[styles.tabsContainer, tabsAnimatedStyle]}>
          <View style={styles.tabButtons}>
            {[
              { key: "achievements", label: "Rozetler", icon: "trophy" },
              { key: "activity", label: "Aktivite", icon: "time" },
              { key: "about", label: "Hakkında", icon: "information-circle" },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.tabButton,
                  activeTab === tab.key && styles.activeTab,
                ]}
                onPress={() => setActiveTab(tab.key)}
              >
                {activeTab === tab.key && (
                  <LinearGradient
                    colors={["#3b82f6", "#1d4ed8"]}
                    style={styles.activeTabGradient}
                  />
                )}
                <Ionicons
                  name={tab.icon}
                  size={16}
                  color={activeTab === tab.key ? "white" : "#9ca3af"}
                />
                <Text
                  style={[
                    styles.tabButtonText,
                    activeTab === tab.key && styles.activeTabText,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        icon="settings"
        onPress={() => navigation.navigate("Settings")}
        colors={["#06b6d4", "#0891b2"]}
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
  profileHeader: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  profileGradient: {
    alignItems: "center",
  },
  profileInfo: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatarGradient: {
    padding: 4,
    borderRadius: 50,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  levelBadge: {
    position: "absolute",
    bottom: -5,
    right: -5,
  },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginBottom: 4,
  },
  userHandle: {
    fontSize: 16,
    color: "#9ca3af",
    marginBottom: 8,
  },
  userLevel: {
    fontSize: 14,
    color: "#06b6d4",
    fontWeight: "600",
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  followButton: {
    borderRadius: 24,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  messageButton: {
    borderRadius: 24,
  },
  messageButtonBorder: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#3b82f6",
    borderRadius: 24,
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
  },
  statsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    padding: 16,
  },
  statContent: {
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  tabButtons: {
    flexDirection: "row",
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    position: "relative",
    gap: 6,
  },
  activeTab: {
    overflow: "hidden",
  },
  activeTabGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9ca3af",
  },
  activeTabText: {
    color: "white",
  },
  tabContent: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  tabTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 20,
  },
  achievementsGrid: {
    gap: 12,
  },
  achievementCard: {
    padding: 16,
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: "#9ca3af",
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  lockedText: {
    color: "#6b7280",
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    padding: 16,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  activityAction: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 11,
    color: "#6b7280",
  },
  aboutCard: {
    padding: 20,
  },
  aboutContent: {
    gap: 16,
  },
  aboutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  aboutLabel: {
    flex: 1,
    fontSize: 14,
    color: "#9ca3af",
  },
  aboutValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});

export default ProfileScreen;
