import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SecButton } from '../sec-button/sec-button';
import { Trashcan } from '../trashcan/trashcan';
import { AddAnswerButton } from '../add-answer-button/add-answer-button';

@Component({
  selector: 'add-question',
  imports: [ReactiveFormsModule, SecButton, Trashcan, AddAnswerButton],
  templateUrl: './add-question.html',
  styleUrl: './add-question.scss',
})
export class AddQuestion {
  readonly formGroup = input.required<FormGroup>();
  readonly answerNumbers = ["A", "B", "C", "D", "E", "F"];
  answersCount = 2;

  addAnswer() {
    if (this.answersCount < this.answerNumbers.length) this.answersCount++;
  }

  questionNumber = 1;
}
