import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'poll-progress-bar',
  imports: [],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.scss',
})
/** Displays a value relative to a required maximum. */
export class ProgressBar {
  readonly value = input.required<number>();
  readonly max = input.required<number>();
  readonly percentage = computed(() => {
    const max = this.max();

    if (max <= 0) {
      return 0;
    }

    return Math.min(100, Math.max(0, (this.value() / max) * 100));
  });
}
