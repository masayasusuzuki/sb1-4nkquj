import React, { useState } from 'react';
import { ResultType } from '../types';
import { questions } from '../data/questions';
import { calculateMBTI } from '../utils/mbtiCalculator';
import Question from './Question';

interface QuestionListProps {
  onComplete: (result: ResultType) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    if (currentQuestion < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(prev => prev + 1);
    } else {
      const personalityType = calculateMBTI(newAnswers);
      onComplete({ answers: newAnswers, personalityType });
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-purple-200 font-medium">
            質問 {currentQuestion + 1} / {questions.length}
          </span>
          <div className="w-64 h-2 bg-purple-900/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <Question
        question={question}
        onAnswer={handleAnswer}
        questionNumber={currentQuestion + 1}
      />
    </div>
  );
};