import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Survices } from '../../shared/services/survices';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecButton } from '../../shared/sec-button/sec-button';
import { VoteModel } from '../../shared/models/votemodel';
import { getAnswerLabel as getAnswerLabelForIndex } from '../../shared/utils/answer-label';
import { isSurveyActive } from '../../shared/utils/date';


@Component({
  selector: 'vote-content',
  imports: [SecButton, QuestionMarkPipe, FirstCharUpperCasePipe, ReactiveFormsModule],
  templateUrl: './vote-content.html',
  styleUrl: './vote-content.scss',
})
/** Builds and submits the answer form for the routed survey. */
export class VoteContent {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survices = inject(Survices);
  readonly router = inject(Router);
  readonly survey = computed(() =>
    this.survices.surveys().find((survey) => String(survey.id) === this.surveyId),
  );
  readonly voteForm = new FormGroup<Record<string, FormControl<boolean>>>({});
  readonly getAnswerLabel = getAnswerLabelForIndex;
  readonly isSurveyActive = isSurveyActive;
  /** Tracks whether the current vote was successfully saved. */
  readonly isSurveyCompleted = signal(false);
  private readonly formVersion = signal(0);

  constructor() {
    effect(() => {
      const survey = this.survey();

      if (survey) {
        this.addVoteControls(survey);
      }
    });
  }

  async ngOnInit() {
    await this.survices.getSurveys();
  }

  private addVoteControls(survey: Survey) {
    let controlsAdded = false;

    for (const [questionIndex, question] of survey.questions.entries()) {
      for (const answerIndex of question.answers.keys()) {
        const controlName = this.getControlName(questionIndex, answerIndex);

        if (!this.voteForm.contains(controlName)) {
          this.voteForm.addControl(
            controlName,
            new FormControl(false, { nonNullable: true }),
          );
          controlsAdded = true;
        }
      }
    }

    if (controlsAdded) {
      this.formVersion.update((version) => version + 1);
    }
  }

  /** Checks whether the generated form contains a control for an answer. */
  hasControl(questionIndex: number, answerIndex: number): boolean {
    this.formVersion();
    return this.voteForm.get(this.getControlName(questionIndex, answerIndex)) !== null;
  }

  /**
   * Saves the selected answers on the first submission.
   * Subsequent submissions return the user to the home page.
   */
  async onSubmit() {
    if (this.isSurveyCompleted()) {
      await this.router.navigateByUrl('/');
      return;
    }

    const survey = this.survey();

    if (survey?.id === undefined) {
      throw new Error('Survey was not found.');
    }

    if (!this.isSurveyActive(survey.date)) {
      throw new Error('This survey has ended and can no longer be completed.');
    }

    const vote = new VoteModel(survey, this.voteForm.getRawValue());
    await this.survices.updateVote(survey.id, vote);
    this.voteForm.disable();
    this.isSurveyCompleted.set(true);
  }

  /** Clears sibling answers when a single-choice answer is selected. */
  onAnswerChange(
    questionIndex: number,
    selectedAnswerIndex: number,
    multipleChoice: boolean,
    answerCount: number,
    isSelected: boolean,
  ) {
    if (multipleChoice || !isSelected) return;

    for (let answerIndex = 0; answerIndex < answerCount; answerIndex += 1) {
      if (answerIndex !== selectedAnswerIndex) {
        this.voteForm.controls[
          this.getControlName(questionIndex, answerIndex)
        ].setValue(false);
      }
    }
  }

  /** Returns the stable form-control name for an answer choice. */
  getControlName(questionIndex: number, answerIndex: number): string {
    return VoteModel.getControlName(questionIndex, answerIndex);
  }
}
