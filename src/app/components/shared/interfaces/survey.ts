import { Vote } from './vote';

/** Persisted survey data, including optional identifiers and vote totals. */
export interface Survey {
  id?: number;
  name: string;
  date: Date;
  category: string;
  describing: string;
  questions: Question[];
  vote?: Vote;
}

/** A survey question and its available answer choices. */
export interface Question {
  question: string;
  multipleChoice: boolean;
  answers: string[];
}
