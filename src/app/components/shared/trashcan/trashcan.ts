import { Component, input } from '@angular/core';

@Component({
  selector: 'trashcan',
  imports: [],
  templateUrl: './trashcan.html',
  styleUrl: './trashcan.scss',
})
/** Presentational trash-can icon used by delete controls. */
export class Trashcan {
  readonly ariaLabel = input('Frage löschen');
  readonly tooltip = input<string>();
}
