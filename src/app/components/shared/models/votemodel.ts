import { Survey } from '../interfaces/survey';
import { Vote, VoteQuestion } from '../interfaces/vote';

export class VoteModel implements Vote {
  surveyId: number;
  questions: VoteQuestion[];

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

  static getControlName(questionIndex: number, answerIndex: number): string {
    return `question${questionIndex}Answer${answerIndex}`;
  }
}
