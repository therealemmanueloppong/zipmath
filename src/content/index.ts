import { colors } from "../theme";
import { advancedWorlds } from "./advanced";
import { basicWorlds } from "./basic";
import { intermediateWorlds } from "./intermediate";
import { Level, Tier, World } from "./types";

export type { LessonStep, Level, Question, Tier, World } from "./types";

export const tiers: Tier[] = [
  {
    id: "basic",
    title: "Basic",
    subtitle: "Start here",
    icon: "🌱",
    color: colors.green,
    colorDark: colors.greenDark,
    worlds: basicWorlds,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    subtitle: "Level up your speed",
    icon: "⚡",
    color: colors.blue,
    colorDark: colors.blueDark,
    worlds: intermediateWorlds,
  },
  {
    id: "advanced",
    title: "Advanced",
    subtitle: "Mental math master",
    icon: "🔥",
    color: colors.purple,
    colorDark: colors.purpleDark,
    worlds: advancedWorlds,
  },
];

export const worlds: World[] = tiers.flatMap((t) => t.worlds);
export const allLevels: Level[] = worlds.flatMap((w) => w.levels);

export const tierLevels = (tier: Tier): Level[] => tier.worlds.flatMap((w) => w.levels);

export const findLevel = (
  id: string
): { tier: Tier; world: World; level: Level; index: number } => {
  const index = allLevels.findIndex((l) => l.id === id);
  const level = allLevels[index];
  const world = worlds.find((w) => w.levels.some((l) => l.id === id)) as World;
  const tier = tiers.find((t) => t.worlds.includes(world)) as Tier;
  return { tier, world, level, index };
};
