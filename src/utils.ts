export const randInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick<T>(items: T[]): T {
  return items[randInt(0, items.length - 1)];
}

export function numberChoices(correct: number): {
  choices: string[];
  answerIndex: number;
} {
  const set = new Set<number>([correct]);
  const offsets = shuffle([1, -1, 2, -2, 10, -10, 9, -9, 11, -11, 5, -5, 20, -20, 100, -100]);
  for (const o of offsets) {
    if (set.size >= 4) break;
    const v = correct + o;
    if (v >= 0) set.add(v);
  }
  let bump = 3;
  while (set.size < 4) {
    set.add(correct + bump);
    bump += 1;
  }
  const arr = shuffle([...set]);
  return { choices: arr.map(String), answerIndex: arr.indexOf(correct) };
}

export const todayKey = (d: Date = new Date()): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const daysBetween = (a: string, b: string): number => {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const da = Date.UTC(ay, am - 1, ad);
  const db = Date.UTC(by, bm - 1, bd);
  return Math.round((db - da) / 86400000);
};
