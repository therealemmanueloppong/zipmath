import { colors } from "../theme";
import { reviewOf } from "./helpers";
import {
  div3,
  div9,
  times11,
  times5,
  times9,
} from "./generators";
import { World } from "./types";

export const basicWorlds: World[] = [
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
        id: "multiply-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see ×5, ×9 and ×11. Pick the right shortcut for each one.",
          },
        ],
        makeQuestion: reviewOf(times5, times9, times11),
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
        id: "div-review",
        title: "Review",
        icon: "🏆",
        lesson: [
          {
            title: "Mix it up",
            body: "You will see tests for 3 and 9. Both use the digit sum.",
          },
        ],
        makeQuestion: reviewOf(div3, div9),
      },
    ],
  },
];
