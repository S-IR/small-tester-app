// src/components/Quiz.tsx
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import SingleQuestionReivew from "./SingleQuestionReivew";
import { areArrayAndSetEqual } from "@/lib/frontend/fn";

interface Question {
  disc: string;
  question: string;
  a: string;
  b: string;
  c: string;
  answ: string[];
  number: number;
}

interface QuizProps {
  quizQuestions: Question[];
  onSubmit: (answers: Map<string, Set<string>>) => void;
  setWrongAnswersIndexes: Dispatch<SetStateAction<Set<string>>>;
}
const possibleOptions = ["a", "b", "c"] as const;

const Quiz: React.FC<QuizProps> = ({
  quizQuestions,
  onSubmit,
  setWrongAnswersIndexes,
}) => {
  const [answers, setAnswers] = useState<Map<string, Set<string>>>(new Map());

  const [isReview, setIsReview] = useState(false);

  const [questionCount, setQuestionCount] = useState(0);
  const toggleAnswer = (questionIndex: string, answer: string) => {
    const newAnswers = new Map(answers);
    const questionAnswers = newAnswers.get(questionIndex) ?? new Set();
    if (questionAnswers.has(answer)) {
      questionAnswers.delete(answer);
    } else {
      questionAnswers.add(answer);
    }
    console.log("questionAnswers", questionAnswers);

    newAnswers.set(questionIndex, questionAnswers);

    setAnswers(newAnswers);
  };

  const question = useMemo(() => quizQuestions[questionCount], [questionCount]);
  const questionIndex = useMemo(
    () => `${question.disc} ${question.number}`,
    [question]
  );

  return (
    <div className="flex flex-col relative items-center justify-center align-middle bg-orange-900 p-10 rounded-sm min-w-[50vw] min-h-[50vh]">
      <p className="absolute top-0 right-0 text-lg text-gray-300">
        {questionCount} / {Number(process.env.NEXT_PUBLIC_QUESTIONS_TO_SHOW)}
      </p>

      <h1 className="text-2xl font-bold mb-6">Quiz</h1>
      {!isReview ? (
        <div
          key={question.number}
          className="mb-4 flex items-center justify-center align-middle rounded-sm flex-col"
        >
          <div className="font-semibold">{question.disc}</div>
          <div className="text-2xl font-serif my-8">{question.question}</div>
          {possibleOptions.map((choice) => {
            return (
              <label
                key={choice}
                className="inline-flex items-center mt-2 w-full"
              >
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={answers.get(questionIndex)?.has(choice) ?? false}
                  onChange={() => toggleAnswer(questionIndex, choice)}
                />
                <span className="ml-2">{question[choice]}</span>
                <br></br>
              </label>
            );
          })}
          {questionCount <
          Number(process.env.NEXT_PUBLIC_QUESTIONS_TO_SHOW) - 1 ? (
            <button
              disabled={answers.get(questionIndex) === undefined}
              className={`w-24 h-12 bg-orange-700 disabled:bg-gray-700 transition-all duration-300 `}
              onClick={() => {
                const answerForThisQuestion = answers.get(questionIndex);
                if (!answerForThisQuestion) return;
                if (
                  !areArrayAndSetEqual(question.answ, answerForThisQuestion)
                ) {
                  setWrongAnswersIndexes((v) => {
                    v.add(questionIndex);
                    return v;
                  });
                }
                setIsReview(true);
              }}
            >
              Check
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onSubmit(answers)}
            >
              Submit
            </button>
          )}
        </div>
      ) : (
        <SingleQuestionReivew
          question={question}
          answer={answers.get(questionIndex) as Set<string>}
          setQuestionCount={setQuestionCount}
          setIsReview={setIsReview}
        />
      )}
    </div>
  );
};

export default Quiz;
