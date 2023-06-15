// src/components/TestResults.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import { questionObj } from "../api/questions/route";
import { getRandomQuestions } from "@/lib/frontend/fn";

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

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="text-xl font-semibold mb-4">Test Results</div>
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
