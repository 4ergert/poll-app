import { Component, computed, inject, signal } from '@angular/core';
import { Survices } from '../../shared/services/survices';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';
import {
  getAnswerVoteCount,
  getAnswerVotePercentage,
  getQuestionVoteCount,
} from '../../shared/utils/vote-statistics';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';
import { getAnswerLabel as getAnswerLabelForIndex } from '../../shared/utils/answer-label';

@Component({
  selector: 'survey-results',
  imports: [QuestionMarkPipe, FirstCharUpperCasePipe, ProgressBar],
  templateUrl: './survey-results.html',
  styleUrl: './survey-results.scss',
})
/** Loads and presents aggregated results for the routed survey. */
export class SurveyResults {
  readonly survices = inject(Survices);
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survey = computed(() =>
    this.survices.surveys().find((survey) => String(survey.id) === this.surveyId),
  );
  readonly isLoading = signal(true);
  readonly loadError = signal<string | undefined>(undefined);
  readonly getAnswerLabel = getAnswerLabelForIndex;

  readonly getAnswerVoteCount = getAnswerVoteCount;
  readonly getQuestionVoteCount = getQuestionVoteCount;
  readonly getAnswerVotePercentage = getAnswerVotePercentage;

  async ngOnInit() {
    try {
      await this.survices.getSurveys();
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
