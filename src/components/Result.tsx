import React, { useState } from 'react';
import { ResultType } from '../types';
import { mbtiTypes } from '../data/mbtiTypes';
import { RefreshCw, Sparkles, Star, Share2, Zap } from 'lucide-react';
import { GPTAnalysis } from './GPTAnalysis';

interface ResultProps {
  result: ResultType;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ result, onReset }) => {
  const [showGPTAnalysis, setShowGPTAnalysis] = useState(false);
  const mbtiType = mbtiTypes.find(type => type.type === result.personalityType);

  if (!mbtiType) {
    return <div className="text-white">結果の読み込みに失敗しました。</div>;
  }

  const shareText = `私のMBTIタイプは「${mbtiType.type} - ${mbtiType.title}」でした！\n#MBTI診断 #性格診断`;
  const shareUrl = encodeURIComponent(window.location.href);
  
  const shareLinks = {
    line: `https://social-plugins.line.me/lineit/share?url=${shareUrl}&text=${encodeURIComponent(shareText)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`,
  };

  const handleShare = (platform: 'line' | 'twitter') => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute top-4 right-4">
          <Star className="w-6 h-6 text-yellow-300 animate-pulse" />
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full text-purple-200 mb-4">
            <Sparkles className="w-4 h-4" />
            診断結果
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            {mbtiType.type} - {mbtiType.title}
          </h2>
          <p className="text-purple-200 text-lg">{mbtiType.description}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-500/20">
            <h4 className="text-lg font-semibold text-purple-200 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              長所
            </h4>
            <ul className="space-y-2">
              {mbtiType.strengths.map((strength, index) => (
                <li key={index} className="flex items-start text-purple-100">
                  <span className="text-purple-400 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pink-500/10 p-6 rounded-xl border border-pink-500/20">
            <h4 className="text-lg font-semibold text-pink-200 mb-4 flex items-center gap-2">
              <Star className="w-5 h-5" />
              短所
            </h4>
            <ul className="space-y-2">
              {mbtiType.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start text-pink-100">
                  <span className="text-pink-400 mr-2">•</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setShowGPTAnalysis(true)}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl mb-4"
          >
            <Zap className="w-5 h-5" />
            AIによる詳細診断を受ける
            <Zap className="w-5 h-5" />
          </button>

          <div className="flex gap-4 mb-4">
            <button
              onClick={() => handleShare('line')}
              className="flex items-center gap-2 px-6 py-3 bg-[#00B900] text-white rounded-full hover:bg-[#00a000] transform hover:scale-105 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              LINEで共有
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="flex items-center gap-2 px-6 py-3 bg-[#1DA1F2] text-white rounded-full hover:bg-[#1a8cd8] transform hover:scale-105 transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              Xで共有
            </button>
          </div>

          <button
            onClick={onReset}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            もう一度診断する
          </button>
        </div>
      </div>

      {showGPTAnalysis && (
        <GPTAnalysis
          mbtiType={mbtiType}
          onClose={() => setShowGPTAnalysis(false)}
        />
      )}
    </>
  );
};