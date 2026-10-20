import { colors } from "./theme";
import { numberChoices, pick, randInt } from "./utils";

export type Question = {
  prompt: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type LessonStep = {
  title: string;
  body: string;
  example?: string;
};

export type Level = {
  id: string;
  title: string;
  icon: string;
  lesson: LessonStep[];
  makeQuestion: () => Question;
};

export type World = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  colorDark: string;
  levels: Level[];
};

const numQ = (prompt: string, answer: number, explain: string): Question => {
  const { choices, answerIndex } = numberChoices(answer);
  return { prompt, choices, answerIndex, explain };
};

const yesNoQ = (prompt: string, yes: boolean, explain: string): Question => ({
  prompt,
  choices: ["Yes", "No"],
  answerIndex: yes ? 0 : 1,
  explain,
});

const digitSum = (n: number): number =>
  String(n)
    .split("")
    .reduce((s, c) => s + Number(c), 0);

// ---------- Multiply Magic ----------
const times5 = (): Question => {
  const n = randInt(12, 98);
  return numQ(
    `${n} × 5 = ?`,
    n * 5,
    `${n} × 10 = ${n * 10}, and half of that is ${n * 5}.`
  );
};

const times9 = (): Question => {
  const n = randInt(12, 99);
  return numQ(
    `${n} × 9 = ?`,
    n * 9,
    `${n} × 10 = ${n * 10}, minus ${n} is ${n * 9}.`
  );
};

const times11 = (): Question => {
  const n = randInt(12, 98);
  const a = Math.floor(n / 10);
  const b = n % 10;
  const s = a + b;
  const explain =
    s < 10
      ? `Digits ${a} and ${b}. Put their sum (${s}) in the middle: ${a}${s}${b} = ${n * 11}.`
      : `Digits ${a} and ${b}. The sum is ${s}, so carry the 1: ${a + 1}${s - 10}${b} = ${n * 11}.`;
  return numQ(`${n} × 11 = ?`, n * 11, explain);
};

const times25 = (): Question => {
  const n = randInt(4, 60);
  return numQ(
    `${n} × 25 = ?`,
    n * 25,
    `${n} × 100 = ${n * 100}, and a quarter of that (÷ 4) is ${n * 25}.`
  );
};

// ---------- Square City ----------
const squareEnding5 = (): Question => {
  const k = randInt(1, 9);
  const n = 10 * k + 5;
  return numQ(
    `${n}² = ?`,
    n * n,
    `${k} × ${k + 1} = ${k * (k + 1)}, then write 25 after it: ${n * n}.`
  );
};

const squareNear50 = (): Question => {
  let n = randInt(41, 59);
  if (n === 50) n = 52;
  const d = n - 50;
  const sign = d < 0 ? "−" : "+";
  return numQ(
    `${n}² = ?`,
    n * n,
    `${n} is 50 ${sign} ${Math.abs(d)}. So 2500 ${sign} ${Math.abs(100 * d)} + ${d * d} = ${n * n}.`
  );
};

const diffSquares = (): Question => {
  const a = randInt(11, 40);
  const b = a - randInt(1, 5);
  return numQ(
    `${a}² − ${b}² = ?`,
    a * a - b * b,
    `(${a} − ${b}) × (${a} + ${b}) = ${a - b} × ${a + b} = ${a * a - b * b}.`
  );
};

// ---------- Percent Peaks ----------
const percentSwap = (): Question => {
  const x = pick([4, 8, 12, 16, 20, 24, 28, 32]);
  const y = pick([25, 50, 75, 100, 150, 200]);
  const ans = (x * y) / 100;
  return numQ(
    `What is ${x}% of ${y}?`,
    ans,
    `${x}% of ${y} is the same as ${y}% of ${x}, which is ${ans}.`
  );
};

const percentTens = (): Question => {
  const n = 10 * randInt(3, 40);
  const p = pick([20, 30, 40, 60, 70]);
  const ans = (n * p) / 100;
  return numQ(
    `What is ${p}% of ${n}?`,
    ans,
    `10% of ${n} is ${n / 10}. Multiply by ${p / 10}: ${ans}.`
  );
};

const tip15 = (): Question => {
  const b = 20 * randInt(1, 12);
  const ans = (b * 15) / 100;
  return numQ(
    `15% tip on a $${b} bill?`,
    ans,
    `10% is ${b / 10}, half of that is ${b / 20}. Add them: ${ans}.`
  );
};

// ---------- Divisibility Desert ----------
const makeCandidate = (divisor: number, lo: number, hi: number): number => {
  if (Math.random() < 0.5) {
    const start = Math.ceil(lo / divisor);
    const end = Math.floor(hi / divisor);
    return divisor * randInt(start, end);
  }
  return randInt(lo, hi);
};

const div3 = (): Question => {
  const n = makeCandidate(3, 100, 9999);
  const s = digitSum(n);
  return yesNoQ(
    `Is ${n} divisible by 3?`,
    n % 3 === 0,
    `Digit sum = ${s}. ${s % 3 === 0 ? `${s} is divisible by 3, so yes.` : `${s} is not divisible by 3, so no.`}`
  );
};

const div9 = (): Question => {
  const n = makeCandidate(9, 100, 9999);
  const s = digitSum(n);
  return yesNoQ(
    `Is ${n} divisible by 9?`,
    n % 9 === 0,
    `Digit sum = ${s}. ${s % 9 === 0 ? `${s} is divisible by 9, so yes.` : `${s} is not divisible by 9, so no.`}`
  );
};

const div4 = (): Question => {
  const n = makeCandidate(4, 100, 9999);
  const last2 = n % 100;
  return yesNoQ(
    `Is ${n} divisible by 4?`,
    n % 4 === 0,
    `Look at the last two digits: ${last2}. ${last2 % 4 === 0 ? `${last2} is divisible by 4, so yes.` : `${last2} is not divisible by 4, so no.`}`
  );
};

const reviewOf = (...gens: Array<() => Question>) => () => pick(gens)();

export const worlds: World[] = [
  {
    id: "multiply",
    title: "Multiply Magic",
    subtitle: "Fast products in your head",
    color: colors.green,
    colorDark: colors.greenDark,
    levels: [
      {
        id: "multiply-5",
        title: "Times 5",
        icon: "5️⃣",
        lesson: [
          {
            title: "5 is half of 10",
            body: "Multiplying by 5 is the same as multiplying by 10 and then cutting the answer in half.",
            example: "48 × 5 → 48 × 10 = 480 → half is 240",
          },
          {
            title: "Halving is easier",
            body: "Adding a zero is easy, and halving a number is easier than multiplying by 5 directly.",
            example: "62 × 5 → 620 → half is 310",
          },
          {
            title: "Your turn",
            body: "Add a zero, then halve. Try it on 84 × 5 in your head before the practice starts.",
            example: "84 × 5 → 840 → half is 420",
          },
        ],
        makeQuestion: times5,
      },
      {
        id: "multiply-9",
        title: "Times 9",
        icon: "9️⃣",
        lesson: [
          {
            title: "9 is 10 minus 1",
            body: "To multiply by 9, multiply by 10 and subtract the number once.",
            example: "34 × 9 → 340 − 34 = 306",
          },
          {
            title: "Subtract carefully",
            body: "Write the ×10 answer first, then take away the original number.",
            example: "57 × 9 → 570 − 57 = 513",
          },
        ],
        makeQuestion: times9,
      },
      {
        id: "multiply-11",
        title: "Times 11",
        icon: "🔟",
        lesson: [
          {
            title: "Split and add",
            body: "For a 2-digit number, keep the digits apart and put their sum in the middle.",
            example: "36 × 11 → 3 (3+6) 6 = 396",
          },
          {
            title: "Carry the 1",
            body: "If the middle sum is 10 or more, write the ones digit and add 1 to the first digit.",
            example: "78 × 11 → 7 (15) 8 → 8 5 8 = 858",
          },
        ],
        makeQuestion: times11,
      },
      {
        id: "multiply-25",
        title: "Times 25",
        icon: "🪙",
        lesson: [
          {
            title: "25 is a quarter of 100",
            body: "Multiply by 100 (add two zeros), then divide by 4.",
            example: "16 × 25 → 1600 ÷ 4 = 400",
          },
          {
            title: "Divide by 4 = halve twice",
            body: "To divide by 4, just halve the number two times.",
            example: "3600 → 1800 → 900, so 36 × 25 = 900",
          },
        ],
        makeQuestion: times25,
      },
      {
        id: "multiply-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see ×5, ×9, ×11 and ×25. Pick the right shortcut for each one.",
          },
        ],
        makeQuestion: reviewOf(times5, times9, times11, times25),
      },
    ],
  },
  {
    id: "squares",
    title: "Square City",
    subtitle: "Squares in seconds",
    color: colors.blue,
    colorDark: colors.blueDark,
    levels: [
      {
        id: "squares-5",
        title: "Ends in 5",
        icon: "🏙️",
        lesson: [
          {
            title: "The first digits",
            body: "For a number ending in 5, take the digits before the 5 and multiply by the next number up.",
            example: "35² → 3 × 4 = 12",
          },
          {
            title: "Add 25",
            body: "Write 25 after that product.",
            example: "35² → 12 then 25 → 1225",
          },
        ],
        makeQuestion: squareEnding5,
      },
      {
        id: "squares-50",
        title: "Near 50",
        icon: "🎯",
        lesson: [
          {
            title: "Start from 2500",
            body: "50² = 2500. For a number d away from 50, add 100 × d, then add d².",
            example: "53² → 2500 + 300 + 9 = 2809",
          },
          {
            title: "Below 50 works too",
            body: "If the number is below 50, d is negative, so 100 × d is subtracted.",
            example: "47² → 2500 − 300 + 9 = 2209",
          },
        ],
        makeQuestion: squareNear50,
      },
      {
        id: "squares-diff",
        title: "Difference",
        icon: "➖",
        lesson: [
          {
            title: "a² − b² factors",
            body: "a² − b² equals (a − b) × (a + b). The difference is often tiny, so it's easy.",
            example: "27² − 25² → 2 × 52 = 104",
          },
        ],
        makeQuestion: diffSquares,
      },
      {
        id: "squares-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see squares ending in 5, squares near 50, and differences of squares.",
          },
        ],
        makeQuestion: reviewOf(squareEnding5, squareNear50, diffSquares),
      },
    ],
  },
  {
    id: "percent",
    title: "Percent Peaks",
    subtitle: "Percents without a calculator",
    color: colors.purple,
    colorDark: colors.purpleDark,
    levels: [
      {
        id: "percent-swap",
        title: "Swap It",
        icon: "🔄",
        lesson: [
          {
            title: "x% of y = y% of x",
            body: "You can swap the two numbers. Pick whichever version is easier.",
            example: "8% of 50 → 50% of 8 = 4",
          },
        ],
        makeQuestion: percentSwap,
      },
      {
        id: "percent-tens",
        title: "Build from 10%",
        icon: "🧱",
        lesson: [
          {
            title: "10% is one decimal place",
            body: "Move the decimal one place left to get 10%, then multiply for other percents.",
            example: "30% of 240 → 10% is 24 → 24 × 3 = 72",
          },
        ],
        makeQuestion: percentTens,
      },
      {
        id: "percent-tip",
        title: "15% Tip",
        icon: "💵",
        lesson: [
          {
            title: "10% plus half of it",
            body: "15% is 10% plus 5%, and 5% is half of 10%.",
            example: "$80 → 10% is 8, 5% is 4 → tip is 12",
          },
        ],
        makeQuestion: tip15,
      },
      {
        id: "percent-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see swaps, 10% building blocks, and tips.",
          },
        ],
        makeQuestion: reviewOf(percentSwap, percentTens, tip15),
      },
    ],
  },
  {
    id: "divisibility",
    title: "Divisibility Desert",
    subtitle: "Spot factors at a glance",
    color: colors.orange,
    colorDark: colors.orangeDark,
    levels: [
      {
        id: "div-3",
        title: "By 3",
        icon: "3️⃣",
        lesson: [
          {
            title: "Add the digits",
            body: "A number is divisible by 3 if the sum of its digits is divisible by 3.",
            example: "471 → 4 + 7 + 1 = 12 → yes",
          },
        ],
        makeQuestion: div3,
      },
      {
        id: "div-9",
        title: "By 9",
        icon: "9️⃣",
        lesson: [
          {
            title: "Same trick, bigger target",
            body: "A number is divisible by 9 if its digit sum is divisible by 9.",
            example: "729 → 7 + 2 + 9 = 18 → yes",
          },
        ],
        makeQuestion: div9,
      },
      {
        id: "div-4",
        title: "By 4",
        icon: "4️⃣",
        lesson: [
          {
            title: "Only the last two digits",
            body: "A number is divisible by 4 if its last two digits form a number divisible by 4.",
            example: "3,516 → 16 is divisible by 4 → yes",
          },
        ],
        makeQuestion: div4,
      },
      {
        id: "div-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see tests for 3, 9 and 4.",
          },
        ],
        makeQuestion: reviewOf(div3, div9, div4),
      },
    ],
  },
];

export const allLevels: Level[] = worlds.flatMap((w) => w.levels);

export const findLevel = (id: string): { world: World; level: Level; index: number } => {
  const index = allLevels.findIndex((l) => l.id === id);
  const level = allLevels[index];
  const world = worlds.find((w) => w.levels.some((l) => l.id === id)) as World;
  return { world, level, index };
};
