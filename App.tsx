import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";
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

export default function App() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <StatusBar style="light" />
        <Root />
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
