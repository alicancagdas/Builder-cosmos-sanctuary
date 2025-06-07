import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  interpolate,
  Easing,
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
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
        withTiming(0.8, { duration: 3000, easing: Easing.inOut(Easing.quad) }),
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
        withTiming(-30, { duration: 4000, easing: Easing.inOut(Easing.sine) }),
        withTiming(30, { duration: 4000, easing: Easing.inOut(Easing.sine) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedStyle1 = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${-rotation.value * 0.5}deg` },
      { scale: interpolate(scale.value, [0.8, 1.2], [1.1, 0.9]) },
      { translateY: floatY.value },
    ],
    opacity: opacity.value * 0.7,
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value * 0.3}deg` },
      { scale: interpolate(scale.value, [0.8, 1.2], [0.9, 1.1]) },
      { translateX: floatY.value * 0.5 },
    ],
    opacity: opacity.value * 0.5,
  }));

  const getGradientColors = () => {
    switch (variant) {
      case "home":
        return ["#3b82f6", "#1d4ed8", "#1e40af"];
      case "courses":
        return ["#8b5cf6", "#7c3aed", "#6d28d9"];
      case "profile":
        return ["#06b6d4", "#0891b2", "#0e7490"];
      case "chat":
        return ["#10b981", "#059669", "#047857"];
      default:
        return ["#3b82f6", "#1d4ed8", "#1e40af"];
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#030712", "#111827", "#1f2937"]}
        style={styles.backgroundGradient}
      />

      {/* Animated Shape 1 - Large Circle */}
      <Animated.View style={[styles.shape1, animatedStyle1]}>
        <Svg width={width * 0.8} height={width * 0.8}>
          <Circle
            cx={width * 0.4}
            cy={width * 0.4}
            r={width * 0.3}
            fill="url(#gradient1)"
            opacity={0.1}
          />
          <Circle
            cx={width * 0.4}
            cy={width * 0.4}
            r={width * 0.2}
            fill="none"
            stroke={getGradientColors()[0]}
            strokeWidth={2}
            opacity={0.3}
          />
        </Svg>
      </Animated.View>

      {/* Animated Shape 2 - Polygon */}
      <Animated.View style={[styles.shape2, animatedStyle2]}>
        <Svg width={200} height={200}>
          <Polygon
            points="100,20 180,100 100,180 20,100"
            fill={getGradientColors()[1]}
            opacity={0.15}
          />
          <Polygon
            points="100,40 160,100 100,160 40,100"
            fill="none"
            stroke={getGradientColors()[2]}
            strokeWidth={1.5}
            opacity={0.4}
          />
        </Svg>
      </Animated.View>

      {/* Animated Shape 3 - Wave Path */}
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

      {/* Floating Particles */}
      <FloatingParticles variant={variant} />
    </View>
  );
};

const FloatingParticles: React.FC<{ variant: string }> = ({ variant }) => {
  const particles = Array.from({ length: 8 }, (_, i) => {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0.3);

    useEffect(() => {
      const delay = i * 500;

      translateY.value = withRepeat(
        withSequence(
          withTiming(-50, {
            duration: 3000 + delay,
            easing: Easing.inOut(Easing.sine),
          }),
          withTiming(50, {
            duration: 3000 + delay,
            easing: Easing.inOut(Easing.sine),
          }),
        ),
        -1,
        true,
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(30, {
            duration: 4000 + delay,
            easing: Easing.inOut(Easing.sine),
          }),
          withTiming(-30, {
            duration: 4000 + delay,
            easing: Easing.inOut(Easing.sine),
          }),
        ),
        -1,
        true,
      );

      opacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: 2000 + delay }),
          withTiming(0.1, { duration: 2000 + delay }),
        ),
        -1,
        true,
      );
    }, []);

    const animatedParticleStyle = useAnimatedStyle(() => ({
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
      ],
      opacity: opacity.value,
    }));

    return (
      <Animated.View
        key={i}
        style={[
          styles.particle,
          {
            left: (i * width) / 8 + Math.random() * 50,
            top: height * 0.1 + Math.random() * height * 0.8,
          },
          animatedParticleStyle,
        ]}
      >
        <View
          style={[
            styles.particleDot,
            {
              backgroundColor: i % 2 === 0 ? "#3b82f6" : "#8b5cf6",
              width: 4 + Math.random() * 8,
              height: 4 + Math.random() * 8,
            },
          ]}
        />
      </Animated.View>
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
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shape1: {
    position: "absolute",
    top: -width * 0.2,
    right: -width * 0.2,
  },
  shape2: {
    position: "absolute",
    bottom: height * 0.3,
    left: -50,
  },
  shape3: {
    position: "absolute",
    top: height * 0.4,
    left: 0,
  },
  particle: {
    position: "absolute",
  },
  particleDot: {
    borderRadius: 50,
    shadowColor: "#3b82f6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default AnimatedBackground;
