export interface QuestionOption {
  label: string;
  value: string;
  score: number; // 0-100 for fit score
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  required?: boolean;
}

export interface Section {
  id: string;
  title: string;
  questions: Question[];
}

export interface QuestionnaireData {
  sections: Section[];
}

export interface Answer {
  questionId: string;
  value: string;
  score: number;
}

export interface SectionScore {
  sectionId: string;
  score: number;
  answeredQuestions: number;
  totalQuestions: number;
}
