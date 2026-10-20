import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { allLevels } from "./content";
import { daysBetween, todayKey } from "./utils";

const STORAGE_KEY = "zipmath:v1";

type Saved = {
  xp: number;
  streak: number;
  lastPlayed: string | null;
  stars: Record<string, number>;
};

const EMPTY: Saved = { xp: 0, streak: 0, lastPlayed: null, stars: {} };

type Ctx = {
  loaded: boolean;
  xp: number;
  streak: number;
  stars: Record<string, number>;
  isUnlocked: (levelId: string) => boolean;
  currentLevelId: string | null;
  completeLevel: (levelId: string, stars: number, xpGained: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<Saved>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setSaved({ ...EMPTY, ...(JSON.parse(raw) as Saved) });
      } catch {
        // start fresh if storage is unavailable
      }
      setLoaded(true);
    })();
  }, []);

  const persist = useCallback((next: Saved) => {
    setSaved(next);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {});
  }, []);

  const isUnlocked = useCallback(
    (levelId: string) => {
      const idx = allLevels.findIndex((l) => l.id === levelId);
      if (idx <= 0) return idx === 0;
      return saved.stars[allLevels[idx - 1].id] !== undefined;
    },
    [saved.stars]
  );

  const currentLevelId = useMemo(() => {
    const next = allLevels.find((l) => saved.stars[l.id] === undefined);
    return next ? next.id : null;
  }, [saved.stars]);

  const completeLevel = useCallback(
    (levelId: string, stars: number, xpGained: number) => {
      const today = todayKey();
      let streak = saved.streak;
      if (saved.lastPlayed === null) streak = 1;
      else {
        const gap = daysBetween(saved.lastPlayed, today);
        if (gap === 1) streak = saved.streak + 1;
        else if (gap > 1) streak = 1;
      }
      const best = Math.max(saved.stars[levelId] ?? 0, stars);
      persist({
        xp: saved.xp + xpGained,
        streak,
        lastPlayed: today,
        stars: { ...saved.stars, [levelId]: best },
      });
    },
    [saved, persist]
  );

  const reset = useCallback(() => persist(EMPTY), [persist]);

  const value: Ctx = {
    loaded,
    xp: saved.xp,
    streak: saved.streak,
    stars: saved.stars,
    isUnlocked,
    currentLevelId,
    completeLevel,
    reset,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
