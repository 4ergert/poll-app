import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { SurveyModel } from '../models/surveymodel';

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

  async saveVote(surveyId: number, vote: Record<string, boolean>) {
    const { error } = await this.supabase
      .from('Survey_Form')
      .insert({
        // survey_id: surveyId,
        vote,
      });

    if (error) {
      throw error;
    }
  }

}
