import { pick, randInt } from "../utils";
import { digitSum, numQ, yesNoQ } from "./helpers";
import { Question } from "./types";

// ---------- Multiplication ----------
export const times5 = (): Question => {
  const n = randInt(12, 98);
  return numQ(
    `${n} × 5 = ?`,
    n * 5,
    `${n} × 10 = ${n * 10}, and half of that is ${n * 5}.`
  );
};

export const times9 = (): Question => {
  const n = randInt(12, 99);
  return numQ(
    `${n} × 9 = ?`,
    n * 9,
    `${n} × 10 = ${n * 10}, minus ${n} is ${n * 9}.`
  );
};

export const times11 = (): Question => {
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

export const times25 = (): Question => {
  const n = randInt(4, 60);
  return numQ(
    `${n} × 25 = ?`,
    n * 25,
    `${n} × 100 = ${n * 100}, and a quarter of that (÷ 4) is ${n * 25}.`
  );
};

// ---------- Squares ----------
export const squareEnding5 = (): Question => {
  const k = randInt(1, 9);
  const n = 10 * k + 5;
  return numQ(
    `${n}² = ?`,
    n * n,
    `${k} × ${k + 1} = ${k * (k + 1)}, then write 25 after it: ${n * n}.`
  );
};

export const squareNear50 = (): Question => {
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

export const diffSquares = (): Question => {
  const a = randInt(11, 40);
  const b = a - randInt(1, 5);
  return numQ(
    `${a}² − ${b}² = ?`,
    a * a - b * b,
    `(${a} − ${b}) × (${a} + ${b}) = ${a - b} × ${a + b} = ${a * a - b * b}.`
  );
};

// ---------- Percents ----------
export const percentSwap = (): Question => {
  const x = pick([4, 8, 12, 16, 20, 24, 28, 32]);
  const y = pick([25, 50, 75, 100, 150, 200]);
  const ans = (x * y) / 100;
  return numQ(
    `What is ${x}% of ${y}?`,
    ans,
    `${x}% of ${y} is the same as ${y}% of ${x}, which is ${ans}.`
  );
};

export const percentTens = (): Question => {
  const n = 10 * randInt(3, 40);
  const p = pick([20, 30, 40, 60, 70]);
  const ans = (n * p) / 100;
  return numQ(
    `What is ${p}% of ${n}?`,
    ans,
    `10% of ${n} is ${n / 10}. Multiply by ${p / 10}: ${ans}.`
  );
};

export const tip15 = (): Question => {
  const b = 20 * randInt(1, 12);
  const ans = (b * 15) / 100;
  return numQ(
    `15% tip on a $${b} bill?`,
    ans,
    `10% is ${b / 10}, half of that is ${b / 20}. Add them: ${ans}.`
  );
};

// ---------- Divisibility ----------
const makeCandidate = (divisor: number, lo: number, hi: number): number => {
  if (Math.random() < 0.5) {
    const start = Math.ceil(lo / divisor);
    const end = Math.floor(hi / divisor);
    return divisor * randInt(start, end);
  }
  return randInt(lo, hi);
};

export const div3 = (): Question => {
  const n = makeCandidate(3, 100, 9999);
  const s = digitSum(n);
  return yesNoQ(
    `Is ${n} divisible by 3?`,
    n % 3 === 0,
    `Digit sum = ${s}. ${s % 3 === 0 ? `${s} is divisible by 3, so yes.` : `${s} is not divisible by 3, so no.`}`
  );
};

export const div9 = (): Question => {
  const n = makeCandidate(9, 100, 9999);
  const s = digitSum(n);
  return yesNoQ(
    `Is ${n} divisible by 9?`,
    n % 9 === 0,
    `Digit sum = ${s}. ${s % 9 === 0 ? `${s} is divisible by 9, so yes.` : `${s} is not divisible by 9, so no.`}`
  );
};

export const div4 = (): Question => {
  const n = makeCandidate(4, 100, 9999);
  const last2 = n % 100;
  return yesNoQ(
    `Is ${n} divisible by 4?`,
    n % 4 === 0,
    `Look at the last two digits: ${last2}. ${last2 % 4 === 0 ? `${last2} is divisible by 4, so yes.` : `${last2} is not divisible by 4, so no.`}`
  );
};

export const div8 = (): Question => {
  const n = makeCandidate(8, 1000, 99999);
  const last3 = n % 1000;
  return yesNoQ(
    `Is ${n} divisible by 8?`,
    n % 8 === 0,
    `Look at the last three digits: ${last3}. ${last3 % 8 === 0 ? `${last3} is divisible by 8, so yes.` : `${last3} is not divisible by 8, so no.`}`
  );
};

export const div11 = (): Question => {
  const n = makeCandidate(11, 100, 99999);
  const digits = String(n).split("").reverse().map(Number);
  const alt = digits.reduce((s, d, i) => (i % 2 === 0 ? s + d : s - d), 0);
  const terms = digits.map((d, i) => (i === 0 ? `${d}` : `${i % 2 === 0 ? "+" : "−"} ${d}`)).join(" ");
  return yesNoQ(
    `Is ${n} divisible by 11?`,
    n % 11 === 0,
    `From the right, alternate adding and subtracting: ${terms} = ${alt}. ${alt % 11 === 0 ? `${alt} is a multiple of 11 (0 counts), so yes.` : `${alt} is not a multiple of 11, so no.`}`
  );
};

// ---------- Near 100 ----------
export const times99 = (): Question => {
  const n = randInt(12, 98);
  return numQ(
    `${n} × 99 = ?`,
    n * 99,
    `${n} × 100 = ${n * 100}, minus ${n} is ${n * 99}.`
  );
};

export const squareNear100 = (): Question => {
  const d = pick([-9, -8, -7, -6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const n = 100 + d;
  const sign = d < 0 ? "−" : "+";
  return numQ(
    `${n}² = ?`,
    n * n,
    `${n} is 100 ${sign} ${Math.abs(d)}. So 10000 ${sign} ${Math.abs(200 * d)} + ${d * d} = ${n * n}.`
  );
};

export const product100 = (): Question => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const x = 100 - a;
  const y = 100 - b;
  return numQ(
    `${x} × ${y} = ?`,
    x * y,
    `The gaps from 100 are ${a} and ${b}. ${x} − ${b} = ${x - b}, so start with ${(x - b) * 100}. Then add ${a} × ${b} = ${a * b}: ${x * y}.`
  );
};

