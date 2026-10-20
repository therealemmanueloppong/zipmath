import React, { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../theme";
import { shortcuts } from "../../shortcuts";

export function CheatSheetScreen({ onClose }: { onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return shortcuts;
    return shortcuts.filter((s) => `${s.title} ${s.category} ${s.steps}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable onPress={onClose} hitSlop={12}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
        <Text style={styles.title}>Cheat sheet</Text>
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search shortcuts"
        placeholderTextColor={colors.muted}
        style={styles.search}
      />
      <FlatList
        data={data}
        keyExtractor={(s) => s.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 24, gap: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cat}>{item.category.toUpperCase()}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.steps}>{item.steps}</Text>
            <Text style={styles.example}>{item.example}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 16, marginBottom: 12 },
  close: { color: colors.muted, fontSize: 24, fontWeight: "800" },
  title: { color: colors.text, fontSize: 22, fontWeight: "900" },
  search: {
    marginHorizontal: 16,
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 2,
    borderRadius: radius.md,
    color: colors.text,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  card: { backgroundColor: colors.card, borderColor: colors.border, borderWidth: 2, borderRadius: radius.md, padding: 16 },
  cat: { color: colors.blue, fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: "800", marginTop: 4 },
  steps: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: 6 },
  example: { color: colors.yellow, fontSize: 15, fontWeight: "700", marginTop: 8 },
});
