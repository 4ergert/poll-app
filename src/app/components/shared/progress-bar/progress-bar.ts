import { Component, input } from '@angular/core';

@Component({
  selector: 'poll-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
export class ProgressBar {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
}
