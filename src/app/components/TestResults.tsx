// src/components/TestResults.tsx
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { questionObj } from "../api/questions/route";
import { arraysAreEqual, getRandomQuestions } from "@/lib/frontend/fn";

interface Question {
  disc: string;
  question: string;
  a: string;
  b: string;
  c: string;
  answ: string[];
  number: number;
}

interface TestResultsProps {
  quizQuestions: Question[];
  answers: Map<string, Set<string>>;
  score: number;
  handleReset: () => void;
}

const TestResults: React.FC<TestResultsProps> = ({
  quizQuestions,
  answers,
  score,
  handleReset,
}) => {
  const [wq, toggleWq] = useState(false);
  const intrebariSlabe: Question[] = [];
  useEffect(() => {
    const runAwait = async () => {
      for (const [key, value] of Array.from(answers)) {
        const question = quizQuestions.find(
          (q) => key === `${q.disc} ${q.number}`
        );
        if (question === undefined) throw new Error("question ID is undefined");
        const valuesArr = Array.from(value);
        if (arraysAreEqual(valuesArr, question.answ)) continue;
        intrebariSlabe.push(question);
      }
      console.log("intrebariSlabe", intrebariSlabe);

      await fetch("/api/saveQuestions", {
        method: "POST",
        body: JSON.stringify({ intrebari: intrebariSlabe }),
      });
    };
    runAwait();
  }, []);

  return (
    <div className="bg-gray-600 p-8 rounded-lg shadow-md">
      <div className="text-xl text-black font-semibold mb-4">Test Results</div>
      <div className="mb-6">Your score: {score.toFixed(2)}</div>
      <button className="w-24 h-12 bg-orange-600" onClick={handleReset}>
        Again
      </button>
      <button
        className=" w-24 h-12 bg-orange-600"
        onClick={() => toggleWq((v) => !v)}
      >
        {" "}
        See bad results
      </button>
    </div>
  );
};

export default TestResults;
