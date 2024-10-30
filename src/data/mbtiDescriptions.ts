interface MBTIDescription {
  title: string;
  traits: string[];
}

interface MBTIDescriptions {
  [key: string]: MBTIDescription;
}

export const mbtiDescriptions: MBTIDescriptions = {
  ISTJ: {
    title: "誠実な管理者",
    traits: [
      "責任感が強く、約束や義務を真剣に受け止める",
      "組織的で計画的に行動する",
      "現実主義者で、具体的な事実やデータを重視する",
      "伝統を重んじ、既存のルールや慣習を尊重する",
      "一人の時間を大切にし、深く考えることを好む"
    ]
  },
  // 他のMBTIタイプも同様に定義...
  ENTJ: {
    title: "指導的な統率者",
    traits: [
      "戦略的なリーダーシップを発揮する",
      "迅速かつ効率的な決断力を持つ",
      "論理的な分析に基づいて計画を立てる",
      "高い目標を設定し、その達成に向けて努力する",
      "多くの人と関わり、影響力を持つことを好む"
    ]
  }
};