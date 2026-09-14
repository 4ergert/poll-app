import { Vote } from './vote';

export interface Survey {
  id?: number;
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Question[];
  vote?: Vote;
}

export interface Question {
  question: string;
  multipleChoice: boolean;
  answers: string[];
}
