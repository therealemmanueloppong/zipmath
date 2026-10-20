import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, Platform, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ProgressProvider, useProgress } from "./src/progress";
import { CheatSheetScreen } from "./src/screens/CheatSheetScreen";
import { LessonScreen } from "./src/screens/LessonScreen";
import { MapScreen } from "./src/screens/MapScreen";
import { QuizScreen } from "./src/screens/QuizScreen";
import { ResultScreen } from "./src/screens/ResultScreen";
import { colors } from "./src/theme";

type Screen =
  | { name: "map" }
  | { name: "cheat" }
  | { name: "lesson"; levelId: string }
  | { name: "quiz"; levelId: string; attempt: number }
  | { name: "result"; levelId: string; mistakes: number; failed: boolean };

function Root() {
  const { loaded } = useProgress();
  const [screen, setScreen] = useState<Screen>({ name: "map" });

  if (!loaded) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={colors.green} />
      </View>
    );
  }

  const toMap = () => setScreen({ name: "map" });

  switch (screen.name) {
    case "cheat":
      return <CheatSheetScreen onClose={toMap} />;
    case "lesson":
      return (
        <LessonScreen
          levelId={screen.levelId}
          onClose={toMap}
          onStartPractice={() => setScreen({ name: "quiz", levelId: screen.levelId, attempt: 0 })}
        />
      );
    case "quiz":
      return (
        <QuizScreen
          key={`${screen.levelId}-${screen.attempt}`}
          levelId={screen.levelId}
          onClose={toMap}
          onFinish={({ mistakes, failed }) =>
            setScreen({ name: "result", levelId: screen.levelId, mistakes, failed })
          }
        />
      );
    case "result":
      return (
        <ResultScreen
          levelId={screen.levelId}
          mistakes={screen.mistakes}
          failed={screen.failed}
          onDone={toMap}
          onRetry={() => setScreen({ name: "lesson", levelId: screen.levelId })}
        />
      );
    default:
      return (
        <MapScreen
          onOpenLevel={(levelId) => setScreen({ name: "lesson", levelId })}
          onOpenCheatSheet={() => setScreen({ name: "cheat" })}
        />
      );
  }
}

// On the web the app is shown in a centered, phone-width column so it does not stretch across a wide screen.
const webFrame = {
  flex: 1,
  alignItems: "center" as const,
  backgroundColor: "#0B1418",
};
const webColumn = { flex: 1, width: "100%" as const, maxWidth: 480, backgroundColor: colors.bg };

export default function App() {
  const content = (
    <SafeAreaProvider>
      <ProgressProvider>
        <StatusBar style="light" />
        <Root />
      </ProgressProvider>
    </SafeAreaProvider>
  );
  if (Platform.OS !== "web") return content;
  return (
    <View style={webFrame}>
      <View style={webColumn}>{content}</View>
    </View>
  );
}
