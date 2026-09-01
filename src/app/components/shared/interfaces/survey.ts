export interface Survey {
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Question[];
}

export interface Question {
  question: string;
  multipleChoice: boolean;
  answers: string[];
}
