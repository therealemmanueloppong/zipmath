import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button3D } from "../components/Button3D";
import { Confetti } from "../components/Confetti";
import { findLevel } from "../content";
import { useProgress } from "../progress";
import { colors } from "../theme";

type Props = {
  levelId: string;
  mistakes: number;
  failed: boolean;
  onDone: () => void;
  onRetry: () => void;
};

export function starsFor(mistakes: number): number {
  return mistakes === 0 ? 3 : mistakes === 1 ? 2 : 1;
}

export function ResultScreen({ levelId, mistakes, failed, onDone, onRetry }: Props) {
  const insets = useSafeAreaInsets();
  const { completeLevel } = useProgress();
  const { world, level } = findLevel(levelId);
  const stars = failed ? 0 : starsFor(mistakes);
  const xpGained = failed ? 0 : 10 + stars * 5;
  const saved = useRef(false);
  const pops = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!failed && !saved.current) {
      saved.current = true;
      completeLevel(levelId, stars, xpGained);
    }
    Animated.stagger(
      300,
      pops.map((v, i) => Animated.spring(v, { toValue: i < stars ? 1 : 0.5, friction: 4, tension: 120, useNativeDriver: true }))
    ).start();
  }, [failed, levelId, stars, xpGained, completeLevel, pops]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }]}>
      {!failed && <Confetti />}
      <View style={styles.center}>
        <Text style={styles.big}>{failed ? "💔" : level.icon}</Text>
        <Text style={styles.title}>{failed ? "Out of hearts" : "Level complete!"}</Text>
        <Text style={styles.sub}>{failed ? "Review the lesson and try again, you've got this." : level.title}</Text>

        <View style={styles.starRow}>
          {pops.map((v, i) => (
            <Animated.Text
              key={i}
              style={[styles.star, { color: i < stars ? colors.yellow : colors.locked, transform: [{ scale: v }] }]}
            >
              ★
            </Animated.Text>
          ))}
        </View>

        {!failed && (
          <View style={[styles.xpCard, { borderColor: world.color }]}>
            <Text style={styles.xpText}>⚡ +{xpGained} XP</Text>
          </View>
        )}
      </View>

      <Button3D
        label={failed ? "Try again" : "Continue"}
        color={failed ? colors.blue : colors.green}
        darkColor={failed ? colors.blueDark : colors.greenDark}
        onPress={failed ? onRetry : onDone}
      />
      {failed && (
        <Button3D
          label="Back to map"
          color={colors.locked}
          darkColor={colors.lockedDark}
          onPress={onDone}
          style={{ marginTop: 12 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, paddingHorizontal: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  big: { fontSize: 72 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginTop: 12 },
  sub: { color: colors.muted, fontSize: 16, fontWeight: "600", marginTop: 6, textAlign: "center" },
  starRow: { flexDirection: "row", gap: 10, marginTop: 28 },
  star: { fontSize: 64 },
  xpCard: { marginTop: 28, borderWidth: 2, borderRadius: 16, paddingHorizontal: 22, paddingVertical: 12, backgroundColor: colors.card },
  xpText: { color: colors.yellow, fontSize: 22, fontWeight: "900" },
});
