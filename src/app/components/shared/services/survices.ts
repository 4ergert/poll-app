import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyModel } from '../models/surveymodel';
import { Vote } from '../interfaces/vote';

@Injectable({
  providedIn: 'root',
})
export class Survices {
  private readonly supabase = createClient(
    'https://ifoidagatwwfdivhzvcw.supabase.co',
    'sb_publishable_ceUCpzz33kkThuMO6nTylg_kYwvskeQ',
  );

  async getSurveys() {
    const { data, error } = await this.supabase
      .from('Survey_Form')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  }

  async saveSurvey(survey: SurveyModel) {
    const { error } = await this.supabase
      .from('Survey_Form')
      .insert(survey);

    if (error) {
      throw error;
    }
  }

  async updateVote(id: number, newVote: Vote) {
    const { data, error: selectError } = await this.supabase
      .from('Survey_Form')
      .select('vote')
      .eq('id', id)
      .single();

    if (selectError) {
      throw selectError;
    }

    const vote = this.mergeVotes(data.vote, newVote);

    const { error } = await this.supabase
      .from('Survey_Form')
      .update({
        vote,
      })
      .eq('id', id);

    if (error) {
      throw error;
    }
  }

  private mergeVotes(existingVote: unknown, newVote: Vote): Vote {
    if (existingVote === null) {
      return newVote;
    }

    if (this.isLegacyVote(existingVote)) {
      return this.mergeLegacyVote(existingVote, newVote);
    }

    if (!this.isVote(existingVote)) {
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

  private mergeLegacyVote(legacyVote: Record<string, boolean>, newVote: Vote): Vote {
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

  private isLegacyVote(value: unknown): value is Record<string, boolean> {
    return typeof value === 'object'
      && value !== null
      && !Array.isArray(value)
      && Object.values(value).every((selection) => typeof selection === 'boolean');
  }

  private isVote(value: unknown): value is Vote {
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

    return value.questions.every((question: unknown) => this.isVoteQuestion(question));
  }

  private isVoteQuestion(value: unknown): boolean {
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

    return value.answers.every((answer: unknown) => this.isVoteAnswer(answer));
  }

  private isVoteAnswer(value: unknown): boolean {
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

}
