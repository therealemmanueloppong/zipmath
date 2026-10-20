import { numberChoices, pick } from "../utils";
import { Question } from "./types";

export const numQ = (prompt: string, answer: number, explain: string): Question => {
  const { choices, answerIndex } = numberChoices(answer);
  return { prompt, choices, answerIndex, explain };
};

export const yesNoQ = (prompt: string, yes: boolean, explain: string): Question => ({
  prompt,
  choices: ["Yes", "No"],
  answerIndex: yes ? 0 : 1,
  explain,
});

export const digitSum = (n: number): number =>
  String(n)
    .split("")
    .reduce((s, c) => s + Number(c), 0);

export const reviewOf = (...gens: Array<() => Question>) => () => pick(gens)();
