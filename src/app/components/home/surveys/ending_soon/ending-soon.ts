import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EndingSurvey } from './ending-survey/ending-survey';
import { Survices } from '../../../shared/services/survices';
import { getEndsInDays } from '../../../shared/utils/date';
import { getEndingSoonSurveys } from '../../../shared/utils/survey';

@Component({
  selector: 'app-ending-soon',
  imports: [EndingSurvey, RouterLink],
  templateUrl: './ending-soon.html',
  styleUrl: './ending-soon.scss',
})
/** Displays the active surveys with the nearest end dates. */
export class EndingSoon {
  readonly surveyService = inject(Survices);
  readonly endingSoonSurveys = computed(() =>
    getEndingSoonSurveys(this.surveyService.surveys()),
  );
  readonly getEndsInDays = getEndsInDays;


  async ngOnInit() {
    this.getEndingSoonSurveys();
  }

  /** Refreshes the survey collection used by the ending-soon view. */
  async getEndingSoonSurveys() {
    await this.surveyService.getSurveys();
  }
}
