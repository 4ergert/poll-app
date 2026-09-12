export interface VoteAnswer {
  answer: string;
  selected: boolean;
}

export interface VoteQuestion {
  question: string;
  answers: VoteAnswer[];
}

export interface Vote {
  questions: VoteQuestion[];
}
