import { Component, inject, signal } from '@angular/core';
import { EndingSurvey } from './ending-survey/ending-survey';
import { Survey } from '../../../shared/interfaces/survey';
import { Survices } from '../../../shared/services/survices';

@Component({
  selector: 'app-ending-soon',
  imports: [EndingSurvey],
  templateUrl: './ending-soon.html',
  styleUrl: './ending-soon.scss',
})
export class EndingSoon {
  readonly surveyService = inject(Survices);
  readonly endingSoonSurveys = signal<Survey[]>([]);

  ngOnInit() {
    this.getEndingSoonSurveys();
  }

  async getEndingSoonSurveys() {
    const service = await this.surveyService.getSurveys();

    const endingSoonSurveys = [...service]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);

    this.endingSoonSurveys.set(endingSoonSurveys);
  }

  getEndsInDays(endDate: Date): number {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
