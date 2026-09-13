import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyModel } from '../models/surveymodel';
import { Vote } from '../interfaces/vote';
import { mergeVotes } from '../utils/vote';

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

    const vote = mergeVotes(data.vote, newVote);

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

}
