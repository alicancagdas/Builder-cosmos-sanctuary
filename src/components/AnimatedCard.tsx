import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface AnimatedCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  gradientColors?: string[];
  delay?: number;
  shadowColor?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  onPress,
  style,
  gradientColors = ["rgba(59, 130, 246, 0.1)", "rgba(29, 78, 216, 0.05)"],
  delay = 0,
  shadowColor = "#3b82f6",
}) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const isPressed = useSharedValue(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, { duration: 600 });
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const pressAnimatedStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(isPressed.value ? 1 : 0, [0, 1], [1, 0.95]);

    return {
      transform: [{ scale: scaleValue }],
    };
  });

  const handlePressIn = () => {
    isPressed.value = true;
  };

  const handlePressOut = () => {
    isPressed.value = false;
    if (onPress) {
      runOnJS(onPress)();
    }
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <Animated.View style={[styles.container, style, pressAnimatedStyle]}>
          <LinearGradient colors={gradientColors} style={styles.gradient} />
          <Animated.View style={styles.content}>{children}</Animated.View>
          <Animated.View
            style={[
              styles.shadowOverlay,
              {
                shadowColor,
              },
            ]}
          />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: "100%",
  },
  container: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.2)",
  },
  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    position: "relative",
    zIndex: 1,
  },
  shadowOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default AnimatedCard;
