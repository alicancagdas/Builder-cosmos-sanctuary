import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card, Chip, Button, Avatar, ProgressBar } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("achievements");

  const achievements = [
    {
      id: 1,
      title: "C++ Master",
      description: "Completed all C++ courses",
      icon: "code-slash",
      color: "#3b82f6",
      earned: true,
      date: "2024",
    },
    {
      id: 2,
      title: "Algorithm Expert",
      description: "Solved 100+ algorithm challenges",
      icon: "brain",
      color: "#8b5cf6",
      earned: true,
      date: "2024",
    },
    {
      id: 3,
      title: "Code Reviewer",
      description: "Reviewed 50+ code submissions",
      icon: "checkmark-circle",
      color: "#10b981",
      earned: true,
      date: "2024",
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Helped 25+ community members",
      icon: "people",
      color: "#f59e0b",
      earned: false,
      progress: 18,
    },
    {
      id: 5,
      title: "Speed Coder",
      description: "Complete 10 challenges under 30 min",
      icon: "flash",
      color: "#ef4444",
      earned: false,
      progress: 7,
    },
  ];

  const stats = [
    { label: "Tamamlanan Kurs", value: "12", icon: "book" },
    { label: "Çözülen Problem", value: "247", icon: "code-slash" },
    { label: "Çalışma Serisi", value: "15 gün", icon: "calendar" },
    { label: "Topluluk Sırası", value: "#342", icon: "trophy" },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "course",
      title: "C++ Constructors dersini tamamladı",
      time: "2 saat önce",
      points: 25,
    },
    {
      id: 2,
      type: "exercise",
      title: "Binary Search alıştırmasını çözdü",
      time: "5 saat önce",
      points: 40,
    },
    {
      id: 3,
      type: "quiz",
      title: "OOP Quiz'ini %90 ile geçti",
      time: "1 gün önce",
      points: 50,
    },
    {
      id: 4,
      type: "achievement",
      title: "C++ Uzmanı rozetini kazandı",
      time: "2 gün önce",
      points: 100,
    },
  ];

  const currentGoals = [
    {
      title: "Advanced C++ Course tamamla",
      progress: 65,
      target: "Bu ay sonu",
    },
    {
      title: "50 Algorithm Problem çöz",
      progress: 32,
      target: "Bu hafta",
    },
    {
      title: "10 Topluluk üyesine yardım et",
      progress: 80,
      target: "Devam ediyor",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "course":
        return "book";
      case "exercise":
        return "code-slash";
      case "quiz":
        return "help-circle";
      case "achievement":
        return "trophy";
      default:
        return "flash";
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "achievements":
        return (
          <View style={styles.tabContent}>
            {/* Achievement Grid */}
            <View style={styles.achievementsGrid}>
              {achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    achievement.earned && styles.earnedAchievementCard,
                  ]}
                >
                  <Card.Content style={styles.achievementContent}>
                    <LinearGradient
                      colors={
                        achievement.earned
                          ? [achievement.color, `${achievement.color}80`]
                          : ["#64748b", "#64748b80"]
                      }
                      style={styles.achievementIcon}
                    >
                      <Ionicons
                        name={achievement.icon as any}
                        size={24}
                        color="white"
                      />
                    </LinearGradient>

                    <Text style={styles.achievementTitle}>
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementDescription}>
                      {achievement.description}
                    </Text>

                    {achievement.earned ? (
                      <Chip
                        mode="outlined"
                        style={styles.earnedChip}
                        textStyle={styles.earnedChipText}
                      >
                        <Ionicons
                          name="checkmark-circle"
                          size={12}
                          color="#10b981"
                        />{" "}
                        {achievement.date}
                      </Chip>
                    ) : (
                      <View style={styles.progressContainer}>
                        <Text style={styles.progressText}>
                          {achievement.progress}/
                          {achievement.title.includes("Community")
                            ? "25"
                            : achievement.title.includes("Speed")
                              ? "10"
                              : "5"}
                        </Text>
                        <ProgressBar
                          progress={
                            achievement.progress! /
                            (achievement.title.includes("Community")
                              ? 25
                              : achievement.title.includes("Speed")
                                ? 10
                                : 5)
                          }
                          color={achievement.color}
                          style={styles.progressBar}
                        />
                      </View>
                    )}
                  </Card.Content>
                </Card>
              ))}
            </View>

            {/* Current Goals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mevcut Hedefler</Text>
              {currentGoals.map((goal, index) => (
                <Card key={index} style={styles.goalCard}>
                  <Card.Content style={styles.goalContent}>
                    <View style={styles.goalHeader}>
                      <Text style={styles.goalTitle}>{goal.title}</Text>
                      <Text style={styles.goalTarget}>{goal.target}</Text>
                    </View>
                    <ProgressBar
                      progress={goal.progress / 100}
                      color="#3b82f6"
                      style={styles.goalProgressBar}
                    />
                    <Text style={styles.goalProgressText}>
                      {goal.progress}% tamamlandı
                    </Text>
                  </Card.Content>
                </Card>
              ))}
            </View>
          </View>
        );

      case "activity":
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
            {recentActivity.map((activity) => (
              <Card key={activity.id} style={styles.activityCard}>
                <Card.Content style={styles.activityContent}>
                  <View style={styles.activityIcon}>
                    <Ionicons
                      name={getActivityIcon(activity.type) as any}
                      size={20}
                      color="#3b82f6"
                    />
                  </View>
                  <View style={styles.activityInfo}>
                    <Text style={styles.activityTitle}>{activity.title}</Text>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                  <Chip
                    mode="outlined"
                    style={styles.pointsChip}
                    textStyle={styles.pointsText}
                  >
                    +{activity.points}
                  </Chip>
                </Card.Content>
              </Card>
            ))}
          </View>
        );

      default:
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Hakkında</Text>
            <Card style={styles.aboutCard}>
              <Card.Content style={styles.aboutContent}>
                <Text style={styles.aboutText}>
                  Software engineer with 3+ years of experience in C++
                  development. Passionate about system programming, algorithms,
                  and helping others learn to code. Currently focusing on
                  advanced C++ features and contributing to open source
                  projects.
                </Text>
              </Card.Content>
            </Card>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={["#030712", "#0f172a", "#1e293b"]}
        style={styles.headerGradient}
      >
        <View style={styles.profileHeader}>
          <Avatar.Image
            size={100}
            source={{
              uri: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
            }}
            style={styles.profileAvatar}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Ethan Carter</Text>
            <Text style={styles.profileRole}>Software Engineer</Text>
            <View style={styles.profileBadges}>
              <Chip
                mode="outlined"
                style={styles.levelChip}
                textStyle={styles.levelChipText}
              >
                <Ionicons name="trophy" size={12} color="#3b82f6" />
                {" Intermediate Level"}
              </Chip>
              <Chip
                mode="outlined"
                style={styles.expertChip}
                textStyle={styles.expertText}
              >
                C++ Expert
              </Chip>
            </View>
            <Text style={styles.profileDescription}>
              Joined 2021 • Passionate about algorithms and system programming
            </Text>
          </View>

          <View style={styles.profileActions}>
            <Button
              mode="contained"
              style={styles.followButton}
              labelStyle={styles.followButtonText}
            >
              Follow
            </Button>
            <Button
              mode="outlined"
              style={styles.messageButton}
              labelStyle={styles.messageButtonText}
              onPress={() => navigation.navigate("AI Chat")}
            >
              Message
            </Button>
          </View>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <Card.Content style={styles.statContent}>
              <Ionicons name={stat.icon as any} size={24} color="#64748b" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScrollView}
        >
          {[
            { key: "achievements", label: "Achievements" },
            { key: "activity", label: "Activity" },
            { key: "about", label: "About" },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      {renderTabContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },
  headerGradient: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  profileHeader: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  profileAvatar: {
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#3b82f6",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 16,
    color: "#94a3b8",
    marginBottom: 12,
  },
  profileBadges: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  levelChip: {
    borderColor: "#3b82f6",
  },
  levelChipText: {
    color: "#3b82f6",
    fontSize: 12,
  },
  expertChip: {
    borderColor: "#8b5cf6",
  },
  expertText: {
    color: "#8b5cf6",
    fontSize: 12,
  },
  profileDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    maxWidth: 280,
  },
  profileActions: {
    flexDirection: "row",
    gap: 12,
  },
  followButton: {
    borderRadius: 8,
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  messageButton: {
    borderRadius: 8,
    borderColor: "#3b82f6",
  },
  messageButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    marginTop: -10,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  statContent: {
    alignItems: "center",
    padding: 12,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f9fafb",
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#64748b",
    textAlign: "center",
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  tabsScrollView: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#3b82f6",
  },
  tabText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  tabContent: {
    padding: 20,
  },
  section: {
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#f9fafb",
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  achievementCard: {
    width: (width - 52) / 2,
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  earnedAchievementCard: {
    borderColor: "#10b981",
  },
  achievementContent: {
    alignItems: "center",
    padding: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 12,
  },
  earnedChip: {
    borderColor: "#10b981",
  },
  earnedChipText: {
    color: "#10b981",
    fontSize: 11,
  },
  progressContainer: {
    width: "100%",
    alignItems: "center",
  },
  progressText: {
    fontSize: 12,
    color: "#f9fafb",
    marginBottom: 4,
  },
  progressBar: {
    width: "100%",
    height: 4,
    borderRadius: 2,
  },
  goalCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  goalContent: {
    padding: 16,
  },
  goalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f9fafb",
    flex: 1,
  },
  goalTarget: {
    fontSize: 14,
    color: "#64748b",
  },
  goalProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
  },
  goalProgressText: {
    fontSize: 14,
    color: "#94a3b8",
  },
  activityCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 12,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#f9fafb",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#64748b",
  },
  pointsChip: {
    borderColor: "#10b981",
  },
  pointsText: {
    color: "#10b981",
    fontSize: 12,
  },
  aboutCard: {
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
  },
  aboutContent: {
    padding: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#94a3b8",
    lineHeight: 24,
  },
});

export default ProfileScreen;
