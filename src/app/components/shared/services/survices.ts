import { Injectable, OnDestroy, signal } from '@angular/core';
import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { SurveyModel } from '../models/surveymodel';
import { Survey } from '../interfaces/survey';
import { Vote } from '../interfaces/vote';
import { mergeVotes } from '../utils/vote';

@Injectable({
  providedIn: 'root',
})
/** Provides survey persistence, vote updates, and real-time synchronization. */
export class Survices implements OnDestroy {
  private readonly supabase = createClient(
    'https://ifoidagatwwfdivhzvcw.supabase.co',
    'sb_publishable_ceUCpzz33kkThuMO6nTylg_kYwvskeQ',
  );

  readonly surveys = signal<Survey[]>([]);
  private readonly channel: RealtimeChannel;

  constructor() {
    this.channel = this.supabase.channel('survey-form-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Survey_Form' },
        (payload) => {
          if (payload.eventType === 'DELETE') {
            const id = payload.old['id'];

            if (typeof id === 'number') {
              this.surveys.update((surveys) =>
                surveys.filter((survey) => survey.id !== id),
              );
            }

            return;
          }

          this.upsertSurvey(payload.new as Survey);
        }
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.supabase.removeChannel(this.channel);
  }

  /** Loads all surveys and replaces the local survey collection. */
  async getSurveys(): Promise<Survey[]> {
    const { data, error } = await this.supabase
      .from('Survey_Form')
      .select('*');

    if (error) {
      throw error;
    }

    this.surveys.set(data);

    return data;
  }

  /** Persists a new survey and merges the returned row into local state. */
  async saveSurvey(survey: SurveyModel) {
    const { data, error } = await this.supabase
      .from('Survey_Form')
      .insert(survey)
      .select()
      .single();

    if (error) {
      throw error;
    }

    this.upsertSurvey(data);
  }

  /** Merges a submitted vote into the stored vote totals for a survey. */
  async updateVote(id: number, newVote: Vote) {
    const { data, error: selectError } = await this.supabase
      .from('Survey_Form')
      .select('vote')
      .eq('id', id)
      .single();

    if (selectError) {
      throw selectError;
    }

    const vote = mergeVotes(data.vote, newVote);

    const { data: updatedSurvey, error } = await this.supabase
      .from('Survey_Form')
      .update({
        vote,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    this.upsertSurvey(updatedSurvey);
  }

  /** Persists an existing survey and refreshes its local representation. */
  async updateSurvey(survey: SurveyModel) {
    const { data, error } = await this.supabase
      .from('Survey_Form')
      .update(survey)
      .eq('id', survey.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    this.upsertSurvey(data);
  }

  private upsertSurvey(updatedSurvey: Survey) {
    this.surveys.update((surveys) => {
      const surveyIndex = surveys.findIndex(
        (survey) => survey.id === updatedSurvey.id,
      );

      if (surveyIndex === -1) {
        return [...surveys, updatedSurvey];
      }

      return surveys.map((survey, index) =>
        index === surveyIndex ? updatedSurvey : survey,
      );
    });
  }
}
