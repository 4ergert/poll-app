import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survices } from '../shared/services/survices';
import { Survey } from '../shared/interfaces/survey';

@Component({
  selector: 'app-vote',
  imports: [],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class Vote {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survices = inject(Survices);
  readonly survey = signal<Survey | undefined>(undefined);

  async ngOnInit() {
    console.log('Survey ID:', this.surveyId);

    const surveys = await this.survices.getSurveys();
    const survey = surveys.find((item) => String(item.id) === this.surveyId);

    this.survey.set(survey);
    console.log('Survey Data:', survey?.name);
  }
}
