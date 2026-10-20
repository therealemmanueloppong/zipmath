import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Level, Tier, World, findLevel, tierLevels, tiers } from "../content";
import { useProgress } from "../progress";
import { colors, radius } from "../theme";

const OFFSETS = [0, 44, 76, 44, 0, -44, -76, -44];

type NodeProps = {
  level: Level;
  world: World;
  index: number;
  stars: number | undefined;
  unlocked: boolean;
  current: boolean;
  onPress: () => void;
};

function LevelNode({ level, world, index, stars, unlocked, current, onPress }: NodeProps) {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!current) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.1, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [current, pulse]);

  const done = stars !== undefined;
  const bg = done || current ? world.color : colors.locked;
  const edge = done || current ? world.colorDark : colors.lockedDark;

  return (
    <View style={[styles.nodeWrap, { transform: [{ translateX: OFFSETS[index % OFFSETS.length] }] }]}>
      {current && (
        <View style={styles.startBubble}>
          <Text style={styles.startText}>START</Text>
        </View>
      )}
      <Animated.View style={{ transform: [{ scale: current ? pulse : 1 }] }}>
        <Pressable disabled={!unlocked} onPress={onPress}>
          <View style={[styles.node, { backgroundColor: bg, borderBottomColor: edge }]}>
            <Text style={styles.nodeIcon}>{unlocked ? level.icon : "🔒"}</Text>
          </View>
        </Pressable>
      </Animated.View>
      <Text style={styles.nodeLabel}>{level.title}</Text>
      {done && (
        <Text style={styles.stars}>{"★".repeat(stars ?? 0)}{"☆".repeat(3 - (stars ?? 0))}</Text>
      )}
    </View>
  );
}

type Props = {
  onOpenLevel: (levelId: string) => void;
  onOpenCheatSheet: () => void;
};

export function MapScreen({ onOpenLevel, onOpenCheatSheet }: Props) {
  const insets = useSafeAreaInsets();
  const { xp, streak, stars, isUnlocked, currentLevelId } = useProgress();
  const [tierId, setTierId] = useState<Tier["id"]>(() =>
    currentLevelId ? findLevel(currentLevelId).tier.id : tiers[tiers.length - 1].id
  );
  const tier = tiers.find((t) => t.id === tierId) as Tier;
  const tierUnlocked = isUnlocked(tierLevels(tier)[0].id);
  const previousTier = tiers[tiers.indexOf(tier) - 1];

  return (
    <View style={styles.container}>
      <View style={[styles.topBar, { paddingTop: insets.top + 8 }]}>
        <Text style={styles.brand}>ZipMath</Text>
        <View style={styles.stats}>
          <Text style={styles.stat}>🔥 {streak}</Text>
          <Text style={styles.stat}>⚡ {xp}</Text>
          <Pressable onPress={onOpenCheatSheet} hitSlop={10}>
            <Text style={styles.stat}>📖</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.tabs}>
        {tiers.map((t) => {
          const levels = tierLevels(t);
          const done = levels.filter((l) => stars[l.id] !== undefined).length;
          const open = isUnlocked(levels[0].id);
          const active = t.id === tierId;
          return (
            <Pressable key={t.id} style={{ flex: 1 }} onPress={() => setTierId(t.id)}>
              <View
                style={[
                  styles.tab,
                  active && { borderColor: t.color, backgroundColor: colors.card },
                ]}
              >
                <Text style={styles.tabIcon}>{open ? t.icon : "🔒"}</Text>
                <Text style={[styles.tabTitle, active && { color: t.color }]}>{t.title}</Text>
                <Text style={styles.tabCount}>
                  {done}/{levels.length}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}>
        {!tierUnlocked && previousTier && (
          <View style={styles.lockedNote}>
            <Text style={styles.lockedText}>
              🔒 Finish every level in {previousTier.title} to unlock {tier.title}.
            </Text>
          </View>
        )}
        {tier.worlds.map((world) => (
          <View key={world.id}>
            <View style={[styles.worldBanner, { backgroundColor: world.color, borderBottomColor: world.colorDark }]}>
              <Text style={styles.worldTitle}>{world.title}</Text>
              <Text style={styles.worldSub}>{world.subtitle}</Text>
            </View>
            <View style={styles.path}>
              {world.levels.map((level, i) => (
                <LevelNode
                  key={level.id}
                  level={level}
                  world={world}
                  index={i}
                  stars={stars[level.id]}
                  unlocked={isUnlocked(level.id)}
                  current={currentLevelId === level.id}
                  onPress={() => onOpenLevel(level.id)}
                />
              ))}
            </View>
          </View>
        ))}
        <Text style={styles.footer}>More worlds coming soon 🚀</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  brand: { color: colors.green, fontSize: 24, fontWeight: "900" },
  stats: { flexDirection: "row", gap: 16, alignItems: "center" },
  stat: { color: colors.text, fontSize: 18, fontWeight: "800" },
  tabs: { flexDirection: "row", gap: 8, paddingHorizontal: 12, paddingVertical: 10 },
  tab: {
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  tabIcon: { fontSize: 18 },
  tabTitle: { color: colors.muted, fontWeight: "900", fontSize: 13, marginTop: 2 },
  tabCount: { color: colors.muted, fontWeight: "700", fontSize: 11, marginTop: 1 },
  lockedNote: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  lockedText: { color: colors.muted, fontWeight: "700", textAlign: "center" },
  worldBanner: {
    margin: 16,
    padding: 16,
    borderRadius: radius.lg,
    borderBottomWidth: 5,
  },
  worldTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "900" },
  worldSub: { color: "#FFFFFFCC", fontSize: 14, marginTop: 2, fontWeight: "600" },
  path: { alignItems: "center", paddingVertical: 8 },
  nodeWrap: { alignItems: "center", marginVertical: 14 },
  node: {
    width: 76,
    height: 70,
    borderRadius: 38,
    borderBottomWidth: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  nodeIcon: { fontSize: 30 },
  nodeLabel: { color: colors.text, fontWeight: "800", marginTop: 8, fontSize: 14 },
  stars: { color: colors.yellow, fontSize: 14, marginTop: 2, letterSpacing: 2 },
  startBubble: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 8,
  },
  startText: { color: colors.green, fontWeight: "900", letterSpacing: 1 },
  footer: { color: colors.muted, textAlign: "center", marginTop: 24, fontWeight: "700" },
});
