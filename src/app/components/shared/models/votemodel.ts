import { Survey } from '../interfaces/survey';
import { Vote, VoteQuestion } from '../interfaces/vote';

/** Converts submitted form controls into structured vote data. */
export class VoteModel implements Vote {
  surveyId: number;
  questions: VoteQuestion[];

  /**
   * Creates vote data for every answer in a survey.
   *
   * @param survey - Survey whose questions define the vote structure.
   * @param formValue - Boolean selections keyed by generated control names.
   * @throws If the survey has no persisted identifier.
   */
  constructor(survey: Survey, formValue: Record<string, boolean>) {
    if (survey.id === undefined) {
      throw new Error('Survey ID is missing.');
    }

    this.surveyId = survey.id;
    this.questions = survey.questions.map((question, questionIndex) => ({
      questionIndex,
      question: question.question,
      answers: question.answers.map((answer, answerIndex) => {
        const selected: true[] = formValue[
          VoteModel.getControlName(questionIndex, answerIndex)
        ] ? [true] : [];

        return {
          answerIndex,
          answer,
          selected,
        };
      }),
    }));
  }

  /** Returns the stable form-control name for an answer choice. */
  static getControlName(questionIndex: number, answerIndex: number): string {
    return `question${questionIndex}Answer${answerIndex}`;
  }
}
