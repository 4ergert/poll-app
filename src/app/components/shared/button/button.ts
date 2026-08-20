import { Component, input } from '@angular/core';

@Component({
  selector: 'poll-app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  readonly icon = input<'add' | 'check'>('add');
  readonly type = input<'button' | 'submit'>('button');
}
