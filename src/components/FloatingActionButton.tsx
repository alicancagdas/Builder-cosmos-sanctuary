import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

interface FloatingActionButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: number;
  colors?: string[];
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  icon,
  onPress,
  size = 60,
  colors = ["#3b82f6", "#1d4ed8"],
  position = "bottom-right",
}) => {
  const scale = useSharedValue(0);
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    // Initial animation
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });

    // Continuous pulse animation
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 }),
      ),
      -1,
      true,
    );

    // Subtle rotation
    rotation.value = withRepeat(withTiming(5, { duration: 2000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value * pulse.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const getPositionStyle = () => {
    switch (position) {
      case "bottom-right":
        return { bottom: 30, right: 20 };
      case "bottom-left":
        return { bottom: 30, left: 20 };
      case "top-right":
        return { top: 100, right: 20 };
      case "top-left":
        return { top: 100, left: 20 };
      default:
        return { bottom: 30, right: 20 };
    }
  };

  return (
    <Animated.View
      style={[
        styles.container,
        getPositionStyle(),
        { width: size, height: size },
        animatedStyle,
      ]}
    >
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <LinearGradient
          colors={colors}
          style={[styles.gradient, { borderRadius: size / 2 }]}
        >
          <Ionicons name={icon} size={size * 0.4} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Ripple Effect */}
      <Animated.View style={[styles.ripple, { width: size, height: size }]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  button: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ripple: {
    position: "absolute",
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.3)",
    top: 0,
    left: 0,
  },
});

export default FloatingActionButton;
