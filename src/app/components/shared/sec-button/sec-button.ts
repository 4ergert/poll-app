import { Component, input } from '@angular/core';

@Component({
  selector: 'sec-button',
  imports: [],
  templateUrl: './sec-button.html',
  styleUrl: './sec-button.scss',
})
/** Secondary action button with a configurable native button type. */
export class SecButton {
  readonly type = input<'button' | 'submit'>('button');
}
