import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EndingSurvey } from './ending-survey/ending-survey';
import { Survices } from '../../../shared/services/survices';
import { getEndsInDays } from '../../../shared/utils/date';
import { getEndingSoonSurveys } from '../../../shared/utils/survey';
import { MaxCharPipe } from '../../../shared/pipes/max-char-pipe';
import { AndMarkPipe } from '../../../shared/pipes/and-to-char-pipe';
import { FirstCharUpperCasePipe } from '../../../shared/pipes/first-char-upper-case-pipe';

@Component({
  selector: 'app-ending-soon',
  imports: [EndingSurvey, RouterLink, MaxCharPipe, AndMarkPipe, FirstCharUpperCasePipe],
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
