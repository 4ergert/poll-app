import { Component, inject, signal } from '@angular/core';
import { EndingSurvey } from './ending-survey/ending-survey';
import { Survey } from '../../../shared/interfaces/survey';
import { Survices } from '../../../shared/services/survices';
import { getEndsInDays } from '../../../shared/utils/date';
import { getEndingSoonSurveys } from '../../../shared/utils/survey';

@Component({
  selector: 'app-ending-soon',
  imports: [EndingSurvey],
  templateUrl: './ending-soon.html',
  styleUrl: './ending-soon.scss',
})
export class EndingSoon {
  readonly surveyService = inject(Survices);
  readonly endingSoonSurveys = signal<Survey[]>([]);
  readonly getEndsInDays = getEndsInDays;


  async ngOnInit() {
    this.getEndingSoonSurveys();
  }

  async getEndingSoonSurveys() {
    const surveys = await this.surveyService.getSurveys();

    this.endingSoonSurveys.set(getEndingSoonSurveys(surveys));
  }
}
