import { questionObj } from "@/app/api/questions/route";

export function getRandomQuestions(
  questions: questionObj[] | null,
  num: number
) {
  if (questions === null) return;
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export function areArrayAndSetEqual(array: string[], setB: Set<string>) {
  if (array.length !== setB.size) {
    return false;
  }

  const uniqueArray = Array.from(new Set(array));

  return uniqueArray.every((item) => setB.has(item));
}
