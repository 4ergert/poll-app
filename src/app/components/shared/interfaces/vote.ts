/** Aggregated selections for one answer choice. */
export interface VoteAnswer {
  answerIndex: number;
  answer: string;
  selected: true[];
}

/** Aggregated answer selections for one survey question. */
export interface VoteQuestion {
  questionIndex: number;
  question: string;
  answers: VoteAnswer[];
}

/** Vote data associated with a survey. */
export interface Vote {
  surveyId: number;
  questions: VoteQuestion[];
}
