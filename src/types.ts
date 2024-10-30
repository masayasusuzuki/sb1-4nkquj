export interface QuestionOption {
  text: string;
  value: string;
}

export interface QuestionType {
  text: string;
  options: QuestionOption[];
}

export interface ResultType {
  personalityType: string;
  answers: string[];
}

export interface MBTIType {
  type: string;
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
}