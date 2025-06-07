import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface AnimatedProgressProps {
  progress: number; // 0-100
  label?: string;
  height?: number;
  colors?: string[];
  showPercentage?: boolean;
  animated?: boolean;
}

const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  progress,
  label,
  height = 8,
  colors = ["#3b82f6", "#1d4ed8"],
  showPercentage = true,
  animated = true,
}) => {
  const progressValue = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    if (animated) {
      progressValue.value = withSpring(progress / 100, {
        damping: 15,
        stiffness: 100,
      });

      glowOpacity.value = withTiming(progress > 0 ? 1 : 0, { duration: 500 });
    } else {
      progressValue.value = progress / 100;
      glowOpacity.value = progress > 0 ? 1 : 0;
    }
  }, [progress, animated]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    shadowOpacity: glowOpacity.value * 0.5,
  }));

  const getProgressColor = () => {
    if (progress >= 80) return "#10b981"; // Green
    if (progress >= 60) return "#f59e0b"; // Yellow
    if (progress >= 40) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          {showPercentage && (
            <Text style={styles.percentage}>{Math.round(progress)}%</Text>
          )}
        </View>
      )}

      <View style={[styles.track, { height }]}>
        <Animated.View
          style={[styles.progress, { height }, progressBarStyle, glowStyle]}
        >
          <LinearGradient
            colors={[getProgressColor(), colors[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          />

          {/* Shimmer Effect */}
          <Animated.View style={styles.shimmer}>
            <LinearGradient
              colors={["transparent", "rgba(255,255,255,0.3)", "transparent"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.shimmerGradient}
            />
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

// Circular Progress Variant
export const CircularProgress: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}> = ({
  progress,
  size = 60,
  strokeWidth = 6,
  color = "#3b82f6",
  backgroundColor = "rgba(59, 130, 246, 0.2)",
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    rotation.value = withTiming(progress * 3.6, { duration: 1000 }); // 360 degrees for 100%
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  return (
    <View style={[styles.circularContainer, { width: size, height: size }]}>
      <Animated.View style={[styles.circularProgress, animatedStyle]}>
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
            },
          ]}
        />
        <View
          style={[
            styles.progressCircle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: color,
              position: "absolute",
            },
          ]}
        />
      </Animated.View>

      <View style={styles.circularLabel}>
        <Text style={styles.circularPercentage}>{Math.round(progress)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e5e7eb",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3b82f6",
  },
  track: {
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    borderRadius: 50,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 50,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  gradient: {
    flex: 1,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerGradient: {
    flex: 1,
  },
  circularContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  circularProgress: {
    position: "relative",
  },
  circle: {
    position: "absolute",
  },
  progressCircle: {
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
  },
  circularLabel: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  circularPercentage: {
    fontSize: 16,
    fontWeight: "700",
    color: "#3b82f6",
  },
});

export default AnimatedProgress;
