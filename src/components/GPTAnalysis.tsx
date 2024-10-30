import React, { useState } from 'react';
import { Sparkles, AlertCircle, Loader } from 'lucide-react';
import { MBTIType } from '../types';
import { OpenAI } from 'openai';

interface GPTAnalysisProps {
  mbtiType: MBTIType;
  onClose: () => void;
}

export const GPTAnalysis: React.FC<GPTAnalysisProps> = ({ mbtiType, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(true);

  const handleAnalysis = async () => {
    setLoading(true);
    setError('');
    
    try {
      const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
      
      const prompt = `あなたは性格診断の専門家です。以下のMBTIタイプについて、より詳細な解析を提供してください：

タイプ: ${mbtiType.type}
タイトル: ${mbtiType.title}
基本説明: ${mbtiType.description}

以下の観点から、具体的で実用的なアドバイスを含めて詳しく解説してください：

1. キャリアにおける強みと適性
2. 対人関係での特徴とコミュニケーションスタイル
3. ストレス管理と自己ケアの方法
4. 個人の成長と自己啓発のためのアドバイス
5. 他のMBTIタイプとの相性と協力の仕方

できるだけ具体的な例を挙げながら、実践的なアドバイスを提供してください。`;

      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "あなたは経験豊富なMBTI診断の専門家です。" },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
      });

      setAnalysis(response.choices[0].message.content || '');
      setShowInput(false);
    } catch (err) {
      setError('APIキーが無効か、分析中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-4 text-center">
          <Loader className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-purple-200">AIによる詳細な診断結果を生成中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full mx-auto my-8">
        {showInput ? (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">AI詳細診断</h3>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>

            <p className="text-purple-200 text-center mb-6">
              OpenAI APIキーを入力して、AIによる詳細な診断結果を取得できます。
            </p>

            <div className="space-y-4">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="OpenAI APIキーを入力"
                className="w-full px-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-500"
              />

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white/10 text-purple-200 rounded-lg hover:bg-white/20 transition-all"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAnalysis}
                  disabled={!apiKey}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  詳細診断を開始
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold text-white">AI詳細診断結果</h3>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>

            <div className="prose prose-invert max-w-none">
              {analysis.split('\n').map((paragraph, index) => (
                <p key={index} className="text-purple-200 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all mx-auto block"
            >
              閉じる
            </button>
          </div>
        )}
      </div>
    </div>
  );
};