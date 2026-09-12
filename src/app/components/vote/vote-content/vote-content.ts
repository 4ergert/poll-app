import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survices } from '../../shared/services/survices';
import { Survey } from '../../shared/interfaces/survey';
import { QuestionMarkPipe } from '../../shared/pipes/question-mark-pipe';
import { FirstCharUpperCasePipe } from '../../shared/pipes/first-char-upper-case-pipe';
import { SecButton } from '../../shared/sec-button/sec-button';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Vote } from '../../shared/interfaces/vote';

@Component({
  selector: 'vote-content',
  imports: [QuestionMarkPipe, FirstCharUpperCasePipe, SecButton, ReactiveFormsModule],
  templateUrl: './vote-content.html',
  styleUrl: './vote-content.scss',
})
export class VoteContent {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survices = inject(Survices);
  readonly survey = signal<Survey | undefined>(undefined);
  readonly answerForm = new FormGroup({
    questions: new FormArray<FormArray<FormControl<boolean>>>([]),
  });

  getAnswerLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  async onSubmit() {
    const survey = this.survey();

    if (survey?.id === undefined) {
      throw new Error('Survey was not found.');
    }

    const formValue = this.answerForm.getRawValue();
    const vote: Vote = {
      questions: survey.questions.map((question, questionIndex) => ({
        question: question.question,
        answers: question.answers.map((answer, answerIndex) => ({
          answer,
          selected: formValue.questions[questionIndex][answerIndex],
        })),
      })),
    };

    await this.survices.saveSurveyAnswer(survey.id, vote);
  }

  async ngOnInit() {
    const surveys = await this.survices.getSurveys();
    const survey = surveys.find((item) => String(item.id) === this.surveyId);

    this.survey.set(survey);
    this.createAnswerControls(survey);
  }

  private createAnswerControls(survey: Survey | undefined) {
    this.answerForm.controls.questions.clear();

    for (const question of survey?.questions ?? []) {
      this.answerForm.controls.questions.push(
        new FormArray(
          question.answers.map(() => new FormControl(false, { nonNullable: true })),
        ),
      );
    }
  }
}
