import React from 'react';
import { QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
  questionNumber: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  onAnswer,
  questionNumber,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm font-medium">
          質問 {questionNumber}
        </span>
        <h2 className="text-xl font-semibold text-white">{question.text}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 rounded-xl border-2 border-purple-500/20 hover:border-purple-400/50 bg-white/5 hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-200 text-sm font-medium group-hover:bg-purple-400/30 transition-colors duration-200">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-purple-100 group-hover:text-white">
                {option.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;