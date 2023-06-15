"use client";
import NoSsr from "@mui/material/NoSsr";
import { useEffect, useMemo, useState } from "react";
import { Document } from "docx";
import { questionObj } from "./api/questions/route";
import { getRandomQuestions } from "@/lib/frontend/fn";
import Quiz from "./components/Quiz";
import TestResults from "./components/TestResults";
function MyApp() {
  const [password, setPassword] = useState<string | null>(null);

  const [isValidUser, setIsValidUser] = useState(false);

  const [questions, setQuestions] = useState<null | questionObj[]>(null);
  const [userAnswers, setUserAnswers] = useState<Map<string, Set<string>>>(
    new Map()
  );
  useEffect(() => {
    if (password === null) return;
    if (password !== "porozitate-mare") return;
    setIsValidUser(true);
  }, [password]);

  const [isTakingTest, setIsTakingTest] = useState(true);
  const [score, setScore] = useState(0);
  const [wrongAnswersIndexes, setWrongAnswersIndexes] = useState<Set<string>>(
    new Set([])
  );

  const [quizQuestions, setQuizQuestions] = useState(() =>
    getRandomQuestions(questions as questionObj[], 70)
  );

  const handleFinalSubmit = (answers: Map<string, Set<string>>) => {
    setUserAnswers(answers);
    const calculatedScore = calculateScore(
      quizQuestions as questionObj[],
      answers
    );
    setScore(calculatedScore);
    setIsTakingTest(false);
  };
  const handleReset = () => setQuizQuestions(getRandomQuestions(questions, 70));

  useEffect(() => {
    const fetcjhQuestions = async () => {
      const res = await fetch("http://localhost:3000/api/questions");
      const data = await res.json();

      setQuestions(data.questions);
      setQuizQuestions(getRandomQuestions(questions, 70));
    };
    fetcjhQuestions();
  }, []);

  if (questions === null || quizQuestions === undefined) return <></>;
  return (
    <div className="w-full h-full bg-black min-h-screen flex items-center justify-center align-middle">
      {!isValidUser ? (
        <input
          type="password"
          className="w-1/2 h-8 bg-orange-600"
          onChange={(e) => setPassword(e.currentTarget.value)}
          name="password"
          placeholder="Password"
        ></input>
      ) : isTakingTest && questions !== null ? (
        <Quiz
          quizQuestions={quizQuestions}
          onSubmit={handleFinalSubmit}
          setWrongAnswersIndexes={setWrongAnswersIndexes}
        />
      ) : (
        <TestResults
          quizQuestions={quizQuestions}
          answers={userAnswers}
          score={score}
          handleReset={handleReset}
        />
      )}
    </div>
  );
}

function calculateScore(
  questions: questionObj[],
  answers: Map<string, Set<string>>
): number {
  const totalQuestions = questions.length;
  const questionValue = 9 / totalQuestions;
  let score = 1;

  questions.forEach((question) => {
    const questionIndex = `${question.disc} ${question.number}`;

    const userAnswers = answers.get(questionIndex) ?? new Set();
    const correctAnswers = question.answ;
    const correctCount = correctAnswers.length;

    let correctSelected = 0;
    correctAnswers.forEach((answer) => {
      if (userAnswers.has(answer)) {
        correctSelected++;
      }
    });

    if (correctSelected === correctCount && userAnswers.size === correctCount) {
      score += questionValue;
    } else if (correctSelected > 0) {
      score += (questionValue / correctCount) * correctSelected;
    }
  });

  return score;
}
export default MyApp;
