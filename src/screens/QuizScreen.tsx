import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button3D } from "../components/Button3D";
import { ProgressBar } from "../components/ProgressBar";
import { Question, findLevel } from "../content";
import { colors, radius } from "../theme";

const QUESTION_COUNT = 5;
const MAX_HEARTS = 3;

type Props = {
  levelId: string;
  onClose: () => void;
  onFinish: (result: { mistakes: number; failed: boolean }) => void;
};

const buzz = (kind: "ok" | "bad") => {
  try {
    Haptics.notificationAsync(
      kind === "ok" ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
    );
  } catch {
    // haptics are optional
  }
};

function makeQuestions(levelId: string): Question[] {
  const { level } = findLevel(levelId);
  const seen = new Set<string>();
  const out: Question[] = [];
  let guard = 0;
  while (out.length < QUESTION_COUNT && guard < 60) {
    guard++;
    const q = level.makeQuestion();
    if (seen.has(q.prompt)) continue;
    seen.add(q.prompt);
    out.push(q);
  }
  return out;
}

export function QuizScreen({ levelId, onClose, onFinish }: Props) {
  const insets = useSafeAreaInsets();
  const { world } = findLevel(levelId);
  const [questions] = useState(() => makeQuestions(levelId));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const shake = useRef(new Animated.Value(0)).current;
  const panel = useRef(new Animated.Value(0)).current;

  const q = questions[index];
  const correct = checked && selected === q.answerIndex;
  const hearts = MAX_HEARTS - mistakes;

  const doShake = () =>
    Animated.sequence([
      Animated.timing(shake, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();

  const check = () => {
    if (selected === null) return;
    const ok = selected === q.answerIndex;
    setChecked(true);
    panel.setValue(0);
    Animated.spring(panel, { toValue: 1, friction: 7, useNativeDriver: true }).start();
    buzz(ok ? "ok" : "bad");
    if (!ok) {
      setMistakes((m) => m + 1);
      doShake();
    }
  };

  const next = () => {
    const failed = mistakes >= MAX_HEARTS;
    if (failed) {
      onFinish({ mistakes, failed: true });
      return;
    }
    if (index + 1 >= questions.length) {
      onFinish({ mistakes, failed: false });
      return;
    }
    setIndex(index + 1);
    setSelected(null);
    setChecked(false);
  };

  const choiceStyle = (i: number) => {
    if (!checked) {
      return i === selected
        ? { backgroundColor: "#1B3A4B", borderColor: colors.blue }
        : { backgroundColor: colors.card, borderColor: colors.border };
    }
    if (i === q.answerIndex) return { backgroundColor: "#1F3D12", borderColor: colors.green };
    if (i === selected) return { backgroundColor: "#4A1D1D", borderColor: colors.red };
    return { backgroundColor: colors.card, borderColor: colors.border };
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable onPress={onClose} hitSlop={12}>
          <Text style={styles.close}>✕</Text>
        </Pressable>
        <ProgressBar progress={index / questions.length} color={world.color} />
        <Text style={styles.hearts}>❤️ {hearts}</Text>
      </View>

      <Animated.View style={[styles.body, { transform: [{ translateX: shake }] }]}>
        <Text style={styles.prompt}>{q.prompt}</Text>
        <View style={styles.choices}>
          {q.choices.map((c, i) => (
            <Pressable key={i} disabled={checked} onPress={() => setSelected(i)}>
              <View style={[styles.choice, choiceStyle(i)]}>
                <Text style={styles.choiceText}>{c}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </Animated.View>

      <View
        style={[
          styles.footer,
          { paddingBottom: insets.bottom + 16 },
          checked && { backgroundColor: correct ? "#16300D" : "#3A1616" },
        ]}
      >
        {checked ? (
          <Animated.View
            style={{
              opacity: panel,
              transform: [{ translateY: panel.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
            }}
          >
            <Text style={[styles.verdict, { color: correct ? colors.green : colors.red }]}>
              {correct ? "Nice! ✨" : "Not quite"}
            </Text>
            <Text style={styles.explain}>{q.explain}</Text>
            <Button3D
              label={mistakes >= MAX_HEARTS ? "See results" : "Continue"}
              color={correct ? colors.green : colors.red}
              darkColor={correct ? colors.greenDark : colors.redDark}
              onPress={next}
              style={{ marginTop: 14 }}
            />
          </Animated.View>
        ) : (
          <Button3D label="Check" disabled={selected === null} onPress={check} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, marginBottom: 12 },
  close: { color: colors.muted, fontSize: 24, fontWeight: "800" },
  hearts: { color: colors.red, fontWeight: "900", fontSize: 16 },
  body: { flex: 1, paddingHorizontal: 16, justifyContent: "center" },
  prompt: { color: colors.text, fontSize: 26, fontWeight: "900", textAlign: "center", marginBottom: 28 },
  choices: { gap: 12 },
  choice: { borderWidth: 2, borderBottomWidth: 5, borderRadius: radius.md, paddingVertical: 16, alignItems: "center" },
  choiceText: { color: colors.text, fontSize: 20, fontWeight: "800" },
  footer: { paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 2, borderTopColor: colors.border },
  verdict: { fontSize: 22, fontWeight: "900", marginBottom: 6 },
  explain: { color: colors.text, fontSize: 16, lineHeight: 22 },
});
