import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
} from "react-native-reanimated";
import Svg, { Circle, Path, Polygon, Ellipse } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

interface AnimatedBackgroundProps {
  variant?: "home" | "courses" | "profile" | "chat";
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = "home",
}) => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.3);
  const floatY = useSharedValue(0);

  useEffect(() => {
    // Simple animations without complex easing
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000 }),
      -1,
      false,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 3000 }),
        withTiming(0.8, { duration: 3000 }),
      ),
      -1,
      true,
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000 }),
        withTiming(0.2, { duration: 2000 }),
      ),
      -1,
      true,
    );

    floatY.value = withRepeat(
      withSequence(
        withTiming(-20, { duration: 4000 }),
        withTiming(20, { duration: 4000 }),
      ),
      -1,
      true,
    );
  }, []);

  const getGradientColors = () => {
    switch (variant) {
      case "courses":
        return ["#3b82f6", "#8b5cf6", "#ef4444"];
      case "profile":
        return ["#10b981", "#3b82f6", "#8b5cf6"];
      case "chat":
        return ["#f59e0b", "#ef4444", "#3b82f6"];
      default:
        return ["#3b82f6", "#8b5cf6", "#ef4444"];
    }
  };

  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: scale.value },
        { translateY: floatY.value },
      ],
      opacity: opacity.value,
    };
  });

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${-rotation.value * 0.5}deg` },
        { scale: scale.value * 0.8 },
        { translateY: -floatY.value },
      ],
      opacity: opacity.value * 0.7,
    };
  });

  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: `${rotation.value * 0.3}deg` },
        { scale: scale.value * 1.1 },
        { translateY: floatY.value * 0.5 },
      ],
      opacity: opacity.value * 0.5,
    };
  });

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={["#030712", "#0f172a", "#1e293b"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Animated Shapes */}
      <Animated.View style={[styles.shape1, animatedStyle1]}>
        <Svg width={200} height={200}>
          <Circle
            cx={100}
            cy={100}
            r={80}
            fill="none"
            stroke={getGradientColors()[0]}
            strokeWidth={2}
            opacity={0.3}
          />
          <Polygon
            points="100,20 180,100 100,180 20,100"
            fill="none"
            stroke={getGradientColors()[1]}
            strokeWidth={1}
            opacity={0.2}
          />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.shape2, animatedStyle2]}>
        <Svg width={150} height={150}>
          <Ellipse
            cx={75}
            cy={75}
            rx={60}
            ry={40}
            fill="none"
            stroke={getGradientColors()[2]}
            strokeWidth={3}
            opacity={0.25}
          />
          <Circle
            cx={75}
            cy={75}
            r={30}
            fill={getGradientColors()[0]}
            opacity={0.1}
          />
        </Svg>
      </Animated.View>

      <Animated.View style={[styles.shape3, animatedStyle3]}>
        <Svg width={width} height={150}>
          <Path
            d={`M0,75 Q${width / 4},25 ${width / 2},75 T${width},75`}
            fill="none"
            stroke={getGradientColors()[0]}
            strokeWidth={3}
            opacity={0.2}
          />
          <Path
            d={`M0,90 Q${width / 4},40 ${width / 2},90 T${width},90`}
            fill="none"
            stroke={getGradientColors()[1]}
            strokeWidth={2}
            opacity={0.3}
          />
        </Svg>
      </Animated.View>

      {/* Simple Floating Particles */}
      <FloatingParticles variant={variant} />
    </View>
  );
};

const FloatingParticles: React.FC<{ variant: string }> = ({ variant }) => {
  const particles = Array.from({ length: 6 }, (_, i) => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
      const delay = i * 500;

      // Simple animations without complex easing
      translateY.value = withRepeat(
        withSequence(
          withTiming(-30, { duration: 3000 + delay }),
          withTiming(30, { duration: 3000 + delay }),
        ),
        -1,
        true,
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(-20, { duration: 4000 + delay }),
          withTiming(20, { duration: 4000 + delay }),
        ),
        -1,
        true,
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 2000 + delay }),
          withTiming(0.2, { duration: 2000 + delay }),
        ),
        -1,
        true,
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          { translateY: translateY.value },
          { translateX: translateX.value },
        ],
        opacity: opacity.value,
      };
    });

    const colors = ["#3b82f6", "#8b5cf6", "#ef4444", "#10b981", "#f59e0b"];
    const size = 4 + (i % 3) * 2;

    return (
      <Animated.View
        key={i}
        style={[
          styles.particle,
          animatedStyle,
          {
            left: `${15 + ((i * 15) % 70)}%`,
            top: `${20 + ((i * 20) % 60)}%`,
            width: size,
            height: size,
            backgroundColor: colors[i % colors.length],
          },
        ]}
      />
    );
  });

  return <>{particles}</>;
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
  },
  shape1: {
    position: "absolute",
    top: height * 0.1,
    right: width * 0.1,
  },
  shape2: {
    position: "absolute",
    bottom: height * 0.2,
    left: width * 0.05,
  },
  shape3: {
    position: "absolute",
    top: height * 0.4,
    left: 0,
  },
  particle: {
    position: "absolute",
    borderRadius: 50,
    boxShadow: "0px 2px 4px rgba(59, 130, 246, 0.8)",
    elevation: 4,
  },
});

export default AnimatedBackground;
