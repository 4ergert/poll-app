import { Component, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Trashcan } from '../trashcan/trashcan';
import { AddAnswerButton } from '../add-answer-button/add-answer-button';

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
export class AddQuestion {
  readonly questionForm = input.required<QuestionForm>();
  readonly questionNumber = input.required<number>();
  readonly answerNumbers = ["A", "B", "C", "D", "E", "F"];

  addAnswer() {
    if (this.answers.controls.length < this.answerNumbers.length) {
      this.answers.push(new FormControl(''));
    }
  }

  get answers() {
    return this.questionForm().controls.answers;
  }

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
          this.answers.push(new FormControl(''));
        }

        break;
    }
  }
}
