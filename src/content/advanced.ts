import { colors } from "../theme";
import { reviewOf } from "./helpers";
import {
  diffSquares,
  div11,
  product100,
  squareNear100,
} from "./generators";
import { World } from "./types";

export const advancedWorlds: World[] = [
  {
    id: "squares-pro",
    title: "Square Master",
    subtitle: "Squares at expert speed",
    color: colors.blue,
    colorDark: colors.blueDark,
    levels: [
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
        id: "squares-100",
        title: "Near 100",
        icon: "💯",
        lesson: [
          {
            title: "Start from 10,000",
            body: "100² = 10,000. For a number d away from 100, add 200 × d, then add d².",
            example: "103² → 10,000 + 600 + 9 = 10,609",
          },
          {
            title: "Below 100 works too",
            body: "If the number is below 100, d is negative, so 200 × d is subtracted.",
            example: "97² → 10,000 − 600 + 9 = 9,409",
          },
        ],
        makeQuestion: squareNear100,
      },
      {
        id: "squares-pro-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see differences of squares and squares near 100.",
          },
        ],
        makeQuestion: reviewOf(diffSquares, squareNear100),
      },
    ],
  },
  {
    id: "big-brain",
    title: "Big Brain",
    subtitle: "Tricks that impress people",
    color: colors.purple,
    colorDark: colors.purpleDark,
    levels: [
      {
        id: "product-100",
        title: "Near 100 Products",
        icon: "🧠",
        lesson: [
          {
            title: "Find the gaps",
            body: "Work out how far each number is below 100.",
            example: "97 × 94 → gaps are 3 and 6",
          },
          {
            title: "Cross-subtract",
            body: "Take either number minus the other number's gap, put two zeros after it, then add the two gaps multiplied together.",
            example: "97 − 6 = 91 → 9100, then 3 × 6 = 18 → 9118",
          },
        ],
        makeQuestion: product100,
      },
      {
        id: "div-11",
        title: "By 11",
        icon: "🔢",
        lesson: [
          {
            title: "Alternate the signs",
            body: "Starting from the right, add a digit, subtract the next, add the next, and so on. If the result is 0 or a multiple of 11, the number is divisible by 11.",
            example: "2,728 → 8 − 2 + 7 − 2 = 11 → yes",
          },
          {
            title: "Negatives are fine",
            body: "The result can be negative. Only check whether it is a multiple of 11.",
            example: "918,082 → 2 − 8 + 0 − 8 + 1 − 9 = −22 → yes",
          },
        ],
        makeQuestion: div11,
      },
      {
        id: "big-brain-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see products near 100 and tests for 11.",
          },
        ],
        makeQuestion: reviewOf(product100, div11),
      },
    ],
  },
];
