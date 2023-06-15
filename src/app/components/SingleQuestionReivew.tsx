import React, { Dispatch, SetStateAction } from "react";
import { questionObj } from "../api/questions/route";

interface props {
  question: questionObj;
  answer: Set<string>;
  setQuestionCount: Dispatch<SetStateAction<number>>;
  setIsReview: Dispatch<SetStateAction<boolean>>;
}
const possibleOptions = ["a", "b", "c"] as const;

const SingleQuestionReivew = ({
  question,
  answer,
  setQuestionCount,
  setIsReview,
}: props) => {
  return (
    <>
      {
        <div
          key={question.number}
          className="mb-4 flex flex-col items-center justify-center align-middle"
        >
          <div className="font-semibold">{question.disc}</div>
          <div>{question.question}</div>
          {possibleOptions.map((choice) => {
            const isChosenRight =
              question.answ.includes(choice) && answer.has(choice);
            const isChosenWrong =
              !question.answ.includes(choice) && answer.has(choice);
            const isNotChosen =
              question.answ.includes(choice) && !answer.has(choice);
            return (
              <label key={choice} className="inline-flex items-center mt-2">
                <span
                  className={`ml-2 ${isChosenRight ? `text-green-600` : ``}  ${
                    isChosenWrong ? `text-red-600` : ``
                  } ${isNotChosen ? `text-gray-700` : ""}  `}
                >
                  {choice}
                </span>
                <span
                  className={`ml-2 ${isChosenRight ? `text-green-600` : ``}  ${
                    isChosenWrong ? `text-red-600` : ``
                  } ${isNotChosen ? `text-white/40` : ""}  `}
                >
                  {question[choice]}
                </span>
              </label>
            );
          })}
          <button
            className="w-24 h-12 bg-orange-600 my-2"
            onClick={() => {
              setIsReview(false);
              setQuestionCount((v) => v + 1);
            }}
          >
            Next Question
          </button>
        </div>
      }
    </>
  );
};

export default SingleQuestionReivew;
