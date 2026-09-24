import { Component, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Trashcan } from '../../shared/trashcan/trashcan';
import { getAnswerLabel as getAnswerLabelForIndex } from '../../shared/utils/answer-label';
import { AddAnswerButton } from '../add-answer-button/add-answer-button';

/** Typed reactive-form structure for a survey question and its answers. */
export type QuestionForm = FormGroup<{
  question: FormControl<string | null>;
  multipleChoice: FormControl<boolean | null>;
  answers: FormArray<FormControl<string | null>>;
}>;

@Component({
  selector: 'add-question',
  imports: [ReactiveFormsModule, Trashcan, AddAnswerButton],
  templateUrl: './add-question.html',
  styleUrl: './add-question.scss',
})
/** Edits one question within the create-survey form. */
export class AddQuestion {
  readonly questionForm = input.required<QuestionForm>();
  readonly questionNumber = input.required<number>();
  readonly getAnswerLabel = getAnswerLabelForIndex;

  /** Appends a required, initially empty answer control. */
  addAnswer() {
    this.answers.push(new FormControl('', Validators.required));
  }

  get answers() {
    return this.questionForm().controls.answers;
  }

  /**
   * Clears a question or removes an empty answer.
   *
   * @param field - The question field to update.
   * @param index - The answer index when updating an answer.
   */
  delete(field: string, index?: number) {
    switch (field) {
      case 'question':
        this.questionForm().controls.question.reset('');
        break;
      case 'answers':
        if (index !== undefined) {
          const answerControl = this.answers.at(index);

          if (answerControl.value?.trim()) {
            answerControl.reset('');
          } else {
            this.answers.removeAt(index);
          }
        } else {
          this.answers.clear();
          this.answers.push(new FormControl('', Validators.required));
        }

        break;
    }
  }
}
