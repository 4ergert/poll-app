import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survices } from '../../shared/services/survices';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecButton } from '../../shared/sec-button/sec-button';
import { VoteModel } from '../../shared/models/votemodel';
import { getAnswerLabel as getAnswerLabelForIndex } from '../../shared/utils/answer-label';


@Component({
  selector: 'vote-content',
  imports: [SecButton, QuestionMarkPipe, FirstCharUpperCasePipe, ReactiveFormsModule],
  templateUrl: './vote-content.html',
  styleUrl: './vote-content.scss',
})
export class VoteContent {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survices = inject(Survices);
  readonly survey = signal<Survey | undefined>(undefined);
  readonly voteForm = new FormGroup<Record<string, FormControl<boolean>>>({});
  readonly getAnswerLabel = getAnswerLabelForIndex;

  async ngOnInit() {
    const surveys = await this.survices.getSurveys();
    const survey = surveys.find((item) => String(item.id) === this.surveyId);

    this.survey.set(survey);

    for (const [questionIndex, question] of (survey?.questions ?? []).entries()) {
      for (const answerIndex of question.answers.keys()) {
        this.voteForm.addControl(
          this.getControlName(questionIndex, answerIndex),
          new FormControl(false, { nonNullable: true }),
        );
      }
    }
  }

  async onSubmit() {
    const survey = this.survey();

    if (survey?.id === undefined) {
      throw new Error('Survey was not found.');
    }

    const vote = new VoteModel(survey, this.voteForm.getRawValue());
    await this.survices.updateVote(survey.id, vote);
  }

  getControlName(questionIndex: number, answerIndex: number): string {
    return VoteModel.getControlName(questionIndex, answerIndex);
  }
}
