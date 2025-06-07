import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

// Screens
import HomeScreen from "./src/screens/HomeScreen";
import CoursesScreen from "./src/screens/CoursesScreen";
import ExercisesScreen from "./src/screens/ExercisesScreen";
import CodeEditorScreen from "./src/screens/CodeEditorScreen";
import QuizScreen from "./src/screens/QuizScreen";
import ForumScreen from "./src/screens/ForumScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import ProgressScreen from "./src/screens/ProgressScreen";
import AIMentorScreen from "./src/screens/AIMentorScreen";
import AIChatScreen from "./src/screens/AIChatScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CourseDetailScreen from "./src/screens/CourseDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom theme matching CodeMentor AI design
const customTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#3b82f6",
    secondary: "#8b5cf6",
    background: "#030712",
    surface: "#0f172a",
    surfaceVariant: "#1e293b",
    outline: "#334155",
    onBackground: "#f9fafb",
    onSurface: "#f9fafb",
  },
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          switch (route.name) {
            case "Ana Sayfa":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Kurslar":
              iconName = focused ? "book" : "book-outline";
              break;
            case "Alıştırmalar":
              iconName = focused ? "code-slash" : "code-slash-outline";
              break;
            case "AI Chat":
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              break;
            case "Profil":
              iconName = focused ? "person" : "person-outline";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#3b82f6",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#0f172a",
          borderTopColor: "#334155",
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          backgroundColor: "#0f172a",
          borderBottomColor: "#334155",
        },
        headerTintColor: "#f9fafb",
        headerTitleStyle: {
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Kurslar" component={CoursesScreen} />
      <Tab.Screen name="Alıştırmalar" component={ExercisesScreen} />
      <Tab.Screen name="AI Chat" component={AIChatScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider theme={customTheme}>
      <SafeAreaProvider>
        <NavigationContainer
          theme={{
            dark: true,
            colors: {
              primary: "#3b82f6",
              background: "#030712",
              card: "#0f172a",
              text: "#f9fafb",
              border: "#334155",
              notification: "#3b82f6",
            },
          }}
        >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#0f172a",
              },
              headerTintColor: "#f9fafb",
              headerTitleStyle: {
                fontWeight: "600",
              },
            }}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CodeEditor"
              component={CodeEditorScreen}
              options={{ title: "Kod Editörü" }}
            />
            <Stack.Screen
              name="Quiz"
              component={QuizScreen}
              options={{ title: "Quiz" }}
            />
            <Stack.Screen
              name="Forum"
              component={ForumScreen}
              options={{ title: "Forum" }}
            />
            <Stack.Screen
              name="Progress"
              component={ProgressScreen}
              options={{ title: "İlerleme" }}
            />
            <Stack.Screen
              name="AIMentor"
              component={AIMentorScreen}
              options={{ title: "AI Mentor" }}
            />
            <Stack.Screen
              name="CourseDetail"
              component={CourseDetailScreen}
              options={{ title: "Kurs Detayı" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" backgroundColor="#030712" />
      </SafeAreaProvider>
    </PaperProvider>
  );
}
