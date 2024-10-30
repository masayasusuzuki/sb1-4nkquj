export function calculateMBTI(answers: string[]): string {
  const scores = {
    E: 0, I: 0,  // 外向 vs 内向
    S: 0, N: 0,  // 感覚 vs 直感
    T: 0, F: 0,  // 思考 vs 感情
    J: 0, P: 0   // 判断 vs 知覚
  };

  // 回答の重みづけ
  const weights = {
    A: { E: 2, S: 2, T: 2, J: 2 },
    B: { E: 1, S: 1, T: 1, J: 1 },
    C: { I: 0, N: 0, F: 0, P: 0 }, // ニュートラル
    D: { I: 1, N: 1, F: 1, P: 1 },
    E: { I: 2, N: 2, F: 2, P: 2 }
  };

  // 回答を集計
  answers.forEach(answer => {
    const weight = weights[answer as keyof typeof weights];
    if (weight) {
      Object.entries(weight).forEach(([trait, value]) => {
        scores[trait as keyof typeof scores] += value;
      });
    }
  });

  // MBTIタイプを決定
  return [
    scores.E > scores.I ? 'E' : 'I',
    scores.S > scores.N ? 'S' : 'N',
    scores.T > scores.F ? 'T' : 'F',
    scores.J > scores.P ? 'J' : 'P'
  ].join('');
}