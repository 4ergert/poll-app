import { Component, output } from '@angular/core';

@Component({
  selector: 'cns-header',
  imports: [],
  templateUrl: './cns-header.html',
  styleUrl: './cns-header.scss',
})
/** Header for the create-survey dialog with a close action. */
export class CnsHeader {
  readonly close = output<void>();
}
