import { Component, output } from '@angular/core';
import { SecButton } from '../../shared/sec-button/sec-button';

@Component({
  selector: 'cns-header',
  imports: [SecButton],
  templateUrl: './cns-header.html',
  styleUrl: './cns-header.scss',
})
/** Header for the create-survey dialog with a close action. */
export class CnsHeader {
  readonly close = output<void>();
}
