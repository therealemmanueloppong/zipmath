import { colors } from "../theme";
import { reviewOf } from "./helpers";
import {
  div4,
  div8,
  percentSwap,
  percentTens,
  squareEnding5,
  squareNear50,
  times25,
  times99,
  tip15,
} from "./generators";
import { World } from "./types";

export const intermediateWorlds: World[] = [
  {
    id: "multiply2",
    title: "Multiply Magic II",
    subtitle: "Bigger shortcuts",
    color: colors.green,
    colorDark: colors.greenDark,
    levels: [
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
        id: "multiply-99",
        title: "Times 99",
        icon: "💯",
        lesson: [
          {
            title: "99 is 100 minus 1",
            body: "Multiply by 100 by adding two zeros, then subtract the number once.",
            example: "47 × 99 → 4700 − 47 = 4653",
          },
          {
            title: "Always a little under",
            body: "The answer sits just below the hundreds, so check that it feels right.",
            example: "23 × 99 → 2300 − 23 = 2277",
          },
        ],
        makeQuestion: times99,
      },
      {
        id: "multiply2-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see ×25 and ×99.",
          },
        ],
        makeQuestion: reviewOf(times25, times99),
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
        id: "squares-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see squares ending in 5 and squares near 50.",
          },
        ],
        makeQuestion: reviewOf(squareEnding5, squareNear50),
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
    id: "divisibility2",
    title: "Divisibility Desert II",
    subtitle: "Harder factor tests",
    color: colors.orange,
    colorDark: colors.orangeDark,
    levels: [
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
        id: "div-8",
        title: "By 8",
        icon: "8️⃣",
        lesson: [
          {
            title: "Only the last three digits",
            body: "A number is divisible by 8 if its last three digits form a number divisible by 8.",
            example: "5,128 → 128 = 8 × 16 → yes",
          },
        ],
        makeQuestion: div8,
      },
      {
        id: "div2-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see tests for 4 and 8. Both look only at the end of the number.",
          },
        ],
        makeQuestion: reviewOf(div4, div8),
      },
    ],
  },
];
