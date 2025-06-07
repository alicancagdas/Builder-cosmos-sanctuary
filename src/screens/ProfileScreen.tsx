import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  Card,
  Chip,
  Button,
  Avatar,
  ProgressBar,
  Switch,
  Divider,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitch from "../components/common/LanguageSwitch";
import AnimatedBackground from "../components/AnimatedBackground";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const { currentLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState("achievements");

  const user = {
    name: "Ethan Carter",
    email: "ethan.carter@example.com",
    level: "Intermediate",
    joinDate: "Ocak 2024",
    coursesCompleted: 12,
    exercisesSolved: 247,
    totalPoints: 2456,
    currentStreak: 15,
    rank: 1834,
    avatar: "https://i.pravatar.cc/150?img=5",
  };

  const achievements = [
    {
      id: 1,
      title: t("profile.achievements.cppMaster", "C++ Master"),
      description: t(
        "profile.achievements.cppMasterDesc",
        "Completed all C++ courses",
      ),
      icon: "code-slash",
      color: "#3b82f6",
      earned: true,
      date: "2024",
    },
    {
      id: 2,
      title: t("profile.achievements.algorithmExpert", "Algorithm Expert"),
      description: t(
        "profile.achievements.algorithmExpertDesc",
        "Solved 100+ algorithm challenges",
      ),
      icon: "bulb",
      color: "#8b5cf6",
      earned: true,
      date: "2024",
    },
    {
      id: 3,
      title: t("profile.achievements.codeReviewer", "Code Reviewer"),
      description: t(
        "profile.achievements.codeReviewerDesc",
        "Reviewed 50+ code submissions",
      ),
      icon: "checkmark-circle",
      color: "#10b981",
      earned: true,
      date: "2024",
    },
    {
      id: 4,
      title: t("profile.achievements.streakMaster", "Streak Master"),
      description: t(
        "profile.achievements.streakMasterDesc",
        "15 day learning streak",
      ),
      icon: "flame",
      color: "#f59e0b",
      earned: true,
      date: "2024",
    },
    {
      id: 5,
      title: t("profile.achievements.mentor", "Mentor"),
      description: t("profile.achievements.mentorDesc", "Helped 25+ students"),
      icon: "people",
      color: "#ef4444",
      earned: false,
      date: "2024",
    },
    {
      id: 6,
      title: t("profile.achievements.debugger", "Debug Master"),
      description: t(
        "profile.achievements.debuggerDesc",
        "Fixed 50+ code bugs",
      ),
      icon: "bug",
      color: "#3b82f6",
      earned: false,
      date: "2024",
    },
  ];

  const activities = [
    {
      id: 1,
      type: "course_completed",
      title: t("profile.activity.courseCompleted", "Course completed"),
      description: "Advanced C++ Programming",
      time: "2 saat önce",
      icon: "book",
      color: "#10b981",
    },
    {
      id: 2,
      type: "exercise_solved",
      title: t("profile.activity.exerciseSolved", "Exercise solved"),
      description: "Binary Tree Traversal",
      time: "5 saat önce",
      icon: "code-slash",
      color: "#3b82f6",
    },
    {
      id: 3,
      type: "achievement_earned",
      title: t("profile.activity.achievementEarned", "Achievement earned"),
      description: "Streak Master",
      time: "1 gün önce",
      icon: "trophy",
      color: "#f59e0b",
    },
  ];

  const renderAchievements = () => (
    <View style={styles.tabContent}>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            style={[
              styles.achievementCard,
              { backgroundColor: colors.card },
              !achievement.earned && styles.achievementLocked,
            ]}
          >
            <Card.Content style={styles.achievementContent}>
              <View
                style={[
                  styles.achievementIcon,
                  {
                    backgroundColor: achievement.earned
                      ? achievement.color
                      : colors.border,
                  },
                ]}
              >
                <Ionicons
                  name={achievement.icon as any}
                  size={24}
                  color={achievement.earned ? "white" : colors.textSecondary}
                />
              </View>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                {achievement.title}
              </Text>
              <Text
                style={[
                  styles.achievementDesc,
                  { color: colors.textSecondary },
                ]}
              >
                {achievement.description}
              </Text>
              {achievement.earned && (
                <Chip
                  mode="outlined"
                  style={[
                    styles.earnedChip,
                    { borderColor: achievement.color },
                  ]}
                  textStyle={{ color: achievement.color, fontSize: 10 }}
                >
                  {achievement.date}
                </Chip>
              )}
            </Card.Content>
          </Card>
        ))}
      </View>
    </View>
  );

  const renderActivity = () => (
    <View style={styles.tabContent}>
      {activities.map((activity) => (
        <Card
          key={activity.id}
          style={[styles.activityCard, { backgroundColor: colors.card }]}
        >
          <Card.Content style={styles.activityContent}>
            <View
              style={[styles.activityIcon, { backgroundColor: activity.color }]}
            >
              <Ionicons name={activity.icon as any} size={20} color="white" />
            </View>
            <View style={styles.activityText}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                {activity.title}
              </Text>
              <Text
                style={[styles.activityDesc, { color: colors.textSecondary }]}
              >
                {activity.description}
              </Text>
              <Text
                style={[styles.activityTime, { color: colors.textSecondary }]}
              >
                {activity.time}
              </Text>
            </View>
          </Card.Content>
        </Card>
      ))}
    </View>
  );

  const renderSettings = () => (
    <View style={styles.tabContent}>
      <Card style={[styles.settingsCard, { backgroundColor: colors.card }]}>
        <Card.Content style={styles.settingsContent}>
          <Text style={[styles.settingsSection, { color: colors.text }]}>
            {t("profile.settings.appearance", "Görünüm")}
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t("profile.settings.darkMode", "Koyu Mod")}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color={colors.primary}
            />
          </View>

          <Divider
            style={{ backgroundColor: colors.border, marginVertical: 15 }}
          />

          <Text style={[styles.settingsSection, { color: colors.text }]}>
            {t("profile.settings.language", "Dil")}
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="language" size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t("profile.settings.appLanguage", "Uygulama Dili")}
              </Text>
            </View>
            <LanguageSwitch variant="button" showLabel={true} />
          </View>

          <Divider
            style={{ backgroundColor: colors.border, marginVertical: 15 }}
          />

          <Text style={[styles.settingsSection, { color: colors.text }]}>
            {t("profile.settings.notifications", "Bildirimler")}
          </Text>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name="notifications" size={20} color={colors.text} />
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {t("profile.settings.pushNotifications", "Push Bildirimleri")}
              </Text>
            </View>
            <Switch
              value={true}
              onValueChange={() => {}}
              color={colors.primary}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "achievements":
        return renderAchievements();
      case "activity":
        return renderActivity();
      case "settings":
        return renderSettings();
      default:
        return renderAchievements();
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <AnimatedBackground variant="profile" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={[colors.primary, colors.secondary]}
          style={styles.header}
        >
          <View style={styles.profileSection}>
            <Avatar.Image
              size={80}
              source={{ uri: user.avatar }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              <Chip
                mode="outlined"
                style={styles.levelChip}
                textStyle={styles.levelText}
              >
                {t(`userLevels.${user.level.toLowerCase()}`, user.level)}
              </Chip>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            <Card style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Card.Content style={styles.statContent}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {user.coursesCompleted}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {t("profile.coursesCompleted")}
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Card.Content style={styles.statContent}>
                <Text style={[styles.statValue, { color: colors.secondary }]}>
                  {user.exercisesSolved}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {t("profile.exercisesSolved")}
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Card.Content style={styles.statContent}>
                <Text style={[styles.statValue, { color: colors.success }]}>
                  {user.totalPoints}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {t("profile.totalPoints")}
                </Text>
              </Card.Content>
            </Card>

            <Card style={[styles.statCard, { backgroundColor: colors.card }]}>
              <Card.Content style={styles.statContent}>
                <Text style={[styles.statValue, { color: colors.warning }]}>
                  #{user.rank}
                </Text>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  {t("profile.rank")}
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabsScrollView}
          >
            {[
              {
                id: "achievements",
                label: t("profile.achievements"),
                icon: "trophy",
              },
              { id: "activity", label: t("profile.activity"), icon: "time" },
              {
                id: "settings",
                label: t("profile.settings.title", "Ayarlar"),
                icon: "settings",
              },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  { borderBottomColor: colors.border },
                  activeTab === tab.id && [
                    styles.activeTab,
                    { borderBottomColor: colors.primary },
                  ],
                ]}
                onPress={() => setActiveTab(tab.id)}
              >
                <Ionicons
                  name={tab.icon as any}
                  size={20}
                  color={
                    activeTab === tab.id ? colors.primary : colors.textSecondary
                  }
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color:
                        activeTab === tab.id
                          ? colors.primary
                          : colors.textSecondary,
                    },
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    marginRight: 20,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  levelChip: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  levelText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    padding: 20,
    marginTop: -15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 56) / 2,
    borderRadius: 12,
    elevation: 2,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
  },
  tabsContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  tabsScrollView: {
    flexDirection: "row",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomWidth: 2,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  tabContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  achievementCard: {
    width: (width - 56) / 2,
    borderRadius: 12,
    elevation: 2,
  },
  achievementLocked: {
    opacity: 0.6,
  },
  achievementContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 11,
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 14,
  },
  earnedChip: {
    backgroundColor: "transparent",
  },
  activityCard: {
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
  activityContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  activityText: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  activityDesc: {
    fontSize: 14,
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
  },
  settingsCard: {
    borderRadius: 12,
    elevation: 2,
  },
  settingsContent: {
    paddingVertical: 20,
  },
  settingsSection: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
});

export default ProfileScreen;
