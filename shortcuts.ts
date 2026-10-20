export type Shortcut = {
  id: string;
  title: string;
  category: string;
  steps: string;
  example: string;
};

export const shortcuts: Shortcut[] = [
  {
    id: "sq5",
    title: "Square a number ending in 5",
    category: "Squares",
    steps:
      "Take the digits before the 5, multiply by the next number up, then write 25 after it.",
    example: "35² → 3×4 = 12 → 1225",
  },
  {
    id: "x11",
    title: "Multiply a 2-digit number by 11",
    category: "Multiplication",
    steps:
      "Write the two digits with their sum in the middle. If the sum is 10 or more, carry the 1.",
    example: "36×11 → 3 (3+6) 6 = 396; 78×11 → 7 (15) 8 = 858",
  },
  {
    id: "x5",
    title: "Multiply by 5",
    category: "Multiplication",
    steps: "Multiply by 10, then halve.",
    example: "48×5 → 480 ÷ 2 = 240",
  },
  {
    id: "pct",
    title: "Swap percentages",
    category: "Percentages",
    steps: "x% of y equals y% of x. Use whichever is easier.",
    example: "8% of 50 = 50% of 8 = 4",
  },
  {
    id: "div3",
    title: "Divisible by 3",
    category: "Divisibility",
    steps:
      "Add the digits. If the sum is divisible by 3, so is the number.",
    example: "471 → 4+7+1 = 12 → divisible by 3",
  },
];
