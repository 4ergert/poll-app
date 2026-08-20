import { Component, output } from '@angular/core';

@Component({
  selector: 'add-answer-button',
  imports: [],
  templateUrl: './add-answer-button.html',
  styleUrl: './add-answer-button.scss',
})
export class AddAnswerButton {
  readonly add = output<void>();
}
