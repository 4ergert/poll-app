import type { Survey } from '../interfaces/survey';
import type { VoteQuestion } from '../interfaces/vote';

/** Returns the selection count for one answer in a survey question. */
export function getAnswerVoteCount(
  survey: Survey,
  questionIndex: number,
  answerIndex: number,
): number {
  return getVoteQuestions(survey)
    .find((question) => question.questionIndex === questionIndex)
    ?.answers.find((answer) => answer.answerIndex === answerIndex)
    ?.selected.length ?? 0;
}

/** Returns the total selections recorded for a survey question. */
export function getQuestionVoteCount(survey: Survey, questionIndex: number): number {
  return getVoteQuestions(survey)
    .find((question) => question.questionIndex === questionIndex)
    ?.answers.reduce((total, answer) => total + answer.selected.length, 0) ?? 0;
}

/** Returns an answer's rounded percentage of all selections for its question. */
export function getAnswerVotePercentage(
  survey: Survey,
  questionIndex: number,
  answerIndex: number,
): number {
  const totalVotes = getQuestionVoteCount(survey, questionIndex);

  if (totalVotes === 0) {
    return 0;
  }

  return Math.round((getAnswerVoteCount(survey, questionIndex, answerIndex) / totalVotes) * 100);
}

function getVoteQuestions(survey: Survey): VoteQuestion[] {
  const questions = survey.vote?.questions;

  return Array.isArray(questions) ? questions : [];
}
