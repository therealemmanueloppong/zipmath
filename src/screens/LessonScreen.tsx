import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button3D } from "../components/Button3D";
import { ProgressBar } from "../components/ProgressBar";
import { findLevel } from "../content";
import { colors, radius } from "../theme";

type Props = { levelId: string; onClose: () => void; onStartPractice: () => void };

export function LessonScreen({ levelId, onClose, onStartPractice }: Props) {
  const insets = useSafeAreaInsets();
  const { world, level } = findLevel(levelId);
  const [step, setStep] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  const reveal = useRef(new Animated.Value(0)).current;

  const total = level.lesson.length;
  const current = level.lesson[step];
  const isLast = step === total - 1;

  useEffect(() => {
    slide.setValue(60);
    reveal.setValue(0);
    Animated.parallel([
      Animated.timing(slide, { toValue: 0, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: true }),
      Animated.sequence([
        Animated.delay(250),
        Animated.spring(reveal, { toValue: 1, friction: 6, useNativeDriver: true }),
      ]),
    ]).start();
  }, [step, slide, reveal]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8, paddingBottom: insets.bottom + 16 }]}>
      <View style={styles.header}>
        <Pressable onPress={onClose} hitSlop={12}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
        <ProgressBar progress={(step + 1) / total} color={world.color} />
      </View>

      <View style={styles.body}>
        <Animated.View
          style={[
            styles.card,
            { opacity: slide.interpolate({ inputRange: [0, 60], outputRange: [1, 0.2] }), transform: [{ translateX: slide }] },
          ]}
        >
          <Text style={styles.levelTag}>{level.icon}  {level.title}</Text>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.text}>{current.body}</Text>
          {current.example ? (
            <Animated.View
              style={[
                styles.example,
                { borderColor: world.color, opacity: reveal, transform: [{ scale: reveal.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) }] },
              ]}
            >
              <Text style={styles.exampleLabel}>EXAMPLE</Text>
              <Text style={styles.exampleText}>{current.example}</Text>
            </Animated.View>
          ) : null}
        </Animated.View>
      </View>

      <Button3D
        label={isLast ? "Start practice" : "Continue"}
        color={world.color}
        darkColor={world.colorDark}
        onPress={() => (isLast ? onStartPractice() : setStep(step + 1))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  header: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 },
  close: { color: colors.muted, fontSize: 24, fontWeight: "800" },
  body: { flex: 1, justifyContent: "center" },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 22,
  },
  levelTag: { color: colors.muted, fontWeight: "800", marginBottom: 10, fontSize: 14 },
  title: { color: colors.text, fontSize: 26, fontWeight: "900", marginBottom: 10 },
  text: { color: colors.text, fontSize: 18, lineHeight: 26, fontWeight: "500" },
  example: {
    marginTop: 18,
    borderWidth: 2,
    borderRadius: radius.md,
    padding: 14,
    backgroundColor: colors.bg,
  },
  exampleLabel: { color: colors.muted, fontSize: 12, fontWeight: "800", letterSpacing: 1.2, marginBottom: 6 },
  exampleText: { color: colors.text, fontSize: 20, fontWeight: "800" },
});
