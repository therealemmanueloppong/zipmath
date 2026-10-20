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

export type Tier = {
  id: "basic" | "intermediate" | "advanced";
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  colorDark: string;
  worlds: World[];
};
