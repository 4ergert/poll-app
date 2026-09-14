import type { Survey } from '../interfaces/survey';
import type { VoteQuestion } from '../interfaces/vote';

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

export function getQuestionVoteCount(survey: Survey, questionIndex: number): number {
  return getVoteQuestions(survey)
    .find((question) => question.questionIndex === questionIndex)
    ?.answers.reduce((total, answer) => total + answer.selected.length, 0) ?? 0;
}

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
