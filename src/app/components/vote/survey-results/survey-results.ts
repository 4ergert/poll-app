import { Component, inject, signal } from '@angular/core';
import { Survices } from '../../shared/services/survices';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';

@Component({
  selector: 'survey-results',
  imports: [QuestionMarkPipe, FirstCharUpperCasePipe],
  templateUrl: './survey-results.html',
  styleUrl: './survey-results.scss',
})
export class SurveyResults {
  readonly survices = inject(Survices);
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survey = signal<Survey | undefined>(undefined);
  readonly isLoading = signal(true);
  readonly loadError = signal<string | undefined>(undefined);

  getAnswerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  async ngOnInit() {
    try {
      const surveys = await this.survices.getSurveys();

      this.survey.set(surveys.find((survey) => String(survey.id) === this.surveyId));
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'The surveys could not be loaded.';

      this.loadError.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }
}
