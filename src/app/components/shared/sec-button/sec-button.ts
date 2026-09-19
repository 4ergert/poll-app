import { Component, input } from '@angular/core';

@Component({
  selector: 'sec-button',
  imports: [],
  templateUrl: './sec-button.html',
  styleUrl: './sec-button.scss',
})
export class SecButton {
  readonly type = input<'button' | 'submit'>('button');
  readonly backgroundColor = input('#72524a');
  readonly textColor = input('aliceblue');
  readonly hoverBackgroundColor = input('#ffb770c6');
}
