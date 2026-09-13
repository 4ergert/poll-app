import { Vote } from '../interfaces/vote';

export function mergeVotes(existingVote: unknown, newVote: Vote): Vote {
  if (existingVote === null) {
    return newVote;
  }

  if (isLegacyVote(existingVote)) {
    return mergeLegacyVote(existingVote, newVote);
  }

  if (!isVote(existingVote)) {
    throw new Error('The stored vote data has an invalid format.');
  }

  return {
    surveyId: newVote.surveyId,
    questions: newVote.questions.map((newQuestion) => {
      const existingQuestion = existingVote.questions.find(
        (question) => question.questionIndex === newQuestion.questionIndex,
      );

      return {
        ...newQuestion,
        answers: newQuestion.answers.map((newAnswer) => {
          const existingAnswer = existingQuestion?.answers.find(
            (answer) => answer.answerIndex === newAnswer.answerIndex,
          );

          return {
            ...newAnswer,
            selected: [...(existingAnswer?.selected ?? []), ...newAnswer.selected],
          };
        }),
      };
    }),
  };
}

function mergeLegacyVote(legacyVote: Record<string, boolean>, newVote: Vote): Vote {
  return {
    surveyId: newVote.surveyId,
    questions: newVote.questions.map((question) => ({
      ...question,
      answers: question.answers.map((answer) => {
        const controlName = `question${question.questionIndex}Answer${answer.answerIndex}`;
        const selected: true[] = legacyVote[controlName]
          ? [true, ...answer.selected]
          : [...answer.selected];

        return {
          ...answer,
          selected,
        };
      }),
    })),
  };
}

function isLegacyVote(value: unknown): value is Record<string, boolean> {
  return typeof value === 'object'
    && value !== null
    && !Array.isArray(value)
    && Object.values(value).every((selection) => typeof selection === 'boolean');
}

function isVote(value: unknown): value is Vote {
  if (
    typeof value !== 'object'
    || value === null
    || !('surveyId' in value)
    || typeof value.surveyId !== 'number'
    || !('questions' in value)
    || !Array.isArray(value.questions)
  ) {
    return false;
  }

  return value.questions.every((question: unknown) => isVoteQuestion(question));
}

function isVoteQuestion(value: unknown): boolean {
  if (
    typeof value !== 'object'
    || value === null
    || !('questionIndex' in value)
    || typeof value.questionIndex !== 'number'
    || !('question' in value)
    || typeof value.question !== 'string'
    || !('answers' in value)
    || !Array.isArray(value.answers)
  ) {
    return false;
  }

  return value.answers.every((answer: unknown) => isVoteAnswer(answer));
}

function isVoteAnswer(value: unknown): boolean {
  if (
    typeof value !== 'object'
    || value === null
    || !('answerIndex' in value)
    || typeof value.answerIndex !== 'number'
    || !('answer' in value)
    || typeof value.answer !== 'string'
    || !('selected' in value)
    || !Array.isArray(value.selected)
  ) {
    return false;
  }

  return value.selected.every((selection: unknown) => selection === true);
}
