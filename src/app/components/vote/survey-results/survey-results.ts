import { Component, computed, inject, input, signal } from '@angular/core';
import { Survices } from '../../shared/services/survices';
import { ActivatedRoute } from '@angular/router';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';
import {
  getAnswerVoteCount as getStoredAnswerVoteCount,
  getQuestionVoteCount as getStoredQuestionVoteCount,
} from '../../shared/utils/vote-statistics';
import { ProgressBar } from '../../shared/progress-bar/progress-bar';
import { getAnswerLabel as getAnswerLabelForIndex } from '../../shared/utils/answer-label';
import { VoteModel } from '../../shared/models/votemodel';

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
  readonly votePreview = input<Record<string, boolean>>({});

  getAnswerVoteCount(survey: Survey, questionIndex: number, answerIndex: number): number {
    const controlName = VoteModel.getControlName(questionIndex, answerIndex);
    return getStoredAnswerVoteCount(survey, questionIndex, answerIndex)
      + (this.votePreview()[controlName] ? 1 : 0);
  }

  getQuestionVoteCount(survey: Survey, questionIndex: number): number {
    const previewSelections = survey.questions[questionIndex]?.answers
      .filter((_, answerIndex) =>
        this.votePreview()[VoteModel.getControlName(questionIndex, answerIndex)],
      ).length ?? 0;

    return getStoredQuestionVoteCount(survey, questionIndex) + previewSelections;
  }

  getAnswerVotePercentage(survey: Survey, questionIndex: number, answerIndex: number): number {
    const totalVotes = this.getQuestionVoteCount(survey, questionIndex);

    if (totalVotes === 0) {
      return 0;
    }

    return Math.round((this.getAnswerVoteCount(survey, questionIndex, answerIndex) / totalVotes) * 100);
  }

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
