import { Component } from '@angular/core';
import { SecButton } from '../sec-button/sec-button';

@Component({
  selector: 'add-question',
  imports: [SecButton],
  templateUrl: './add-question.html',
  styleUrl: './add-question.scss',
})
export class AddQuestion {
  questionNumber = 1;
  answerNumber = "";

  answersCount = 2;
  answerNumbers = ["A", "B", "C", "D", "E", "F"];

  addQuestion() {
    this.answersCount++;
  }
}
