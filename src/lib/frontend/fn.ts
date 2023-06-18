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
export function arraysAreEqual(arr1: any[], arr2: any[]) {
  // Check if the arrays have the same length
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort the arrays
  const sortedArr1 = arr1.slice().sort();
  const sortedArr2 = arr2.slice().sort();

  // Iterate over the elements of the arrays and compare them
  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  // If all elements are equal, return true
  return true;
}
