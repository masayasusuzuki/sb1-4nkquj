import React from 'react';
import { Sparkles, Star, Moon, Sun } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center relative overflow-hidden">
      {/* 装飾的な要素 */}
      <div className="absolute top-4 left-4">
        <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
      </div>
      <div className="absolute top-4 right-4">
        <Moon className="w-6 h-6 text-blue-300 animate-pulse" />
      </div>
      <div className="absolute bottom-4 left-4">
        <Sun className="w-6 h-6 text-orange-300 animate-pulse" />
      </div>
      <div className="absolute bottom-4 right-4">
        <Sparkles className="w-6 h-6 text-purple-300 animate-pulse" />
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white mb-4">
          忙しい人のためのMBTI診断
        </h2>
        
        <p className="text-purple-200 text-lg mb-6 leading-relaxed">
          通常20分以上かかるMBTI診断を、<br />
          重要な質問に厳選してわずか5分で実施できます。<br />
          あなたの本質的な性格タイプを効率的に診断します。
        </p>

        <div className="space-y-4 bg-white/5 p-6 rounded-xl">
          <p className="text-blue-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            所要時間：約5分
          </p>
          <p className="text-blue-200 flex items-center justify-center gap-2">
            <Star className="w-4 h-4" />
            厳選された20問の質問
          </p>
          <p className="text-blue-200 flex items-center justify-center gap-2">
            <Moon className="w-4 h-4" />
            正確な診断結果
          </p>
        </div>

        <button
          onClick={onStart}
          className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            クイック診断を始める
            <Sparkles className="w-5 h-5" />
          </span>
        </button>
      </div>
    </div>
  );
};