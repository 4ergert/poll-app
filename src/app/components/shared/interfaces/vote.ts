export interface VoteAnswer {
  answerIndex: number;
  answer: string;
  selected: true[];
}

export interface VoteQuestion {
  questionIndex: number;
  question: string;
  answers: VoteAnswer[];
}

export interface Vote {
  surveyId: number;
  questions: VoteQuestion[];
}
