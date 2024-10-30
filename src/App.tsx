import React, { useState } from 'react';
import { Result } from './components/Result';
import { QuestionList } from './components/QuestionList';
import { StartScreen } from './components/StartScreen';
import { ResultType } from './types';
import { Sparkles } from 'lucide-react';

function App() {
  const [result, setResult] = useState<ResultType | null>(null);
  const [started, setStarted] = useState(false);

  const handleComplete = (newResult: ResultType) => {
    setResult(newResult);
  };

  const handleReset = () => {
    setResult(null);
    setStarted(false);
  };

  const handleStart = () => {
    setStarted(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a1f] py-8 relative overflow-hidden">
      {/* 魔法陣の背景 */}
      <div 
        className="fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url("https://i.imgur.com/5kzVwN3.png")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      />

      {/* 装飾的な光の効果 */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-[#00ffff] rounded-full filter blur-3xl opacity-10 -top-48 -left-48 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#ff9900] rounded-full filter blur-3xl opacity-10 -bottom-48 -right-48 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-[#00ffff]" />
          <h1 className="text-4xl font-bold text-center text-white">
            忙しい人のためのMBTI診断
          </h1>
          <Sparkles className="w-8 h-8 text-[#00ffff]" />
        </div>

        <div className="max-w-4xl mx-auto">
          {!started ? (
            <StartScreen onStart={handleStart} />
          ) : result ? (
            <Result result={result} onReset={handleReset} />
          ) : (
            <QuestionList onComplete={handleComplete} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;