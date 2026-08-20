import { Component, output } from '@angular/core';
import { SecButton } from '../../shared/sec-button/sec-button';

@Component({
  selector: 'cns-header',
  imports: [SecButton],
  templateUrl: './cns-header.html',
  styleUrl: './cns-header.scss',
})
export class CnsHeader {
  readonly close = output<void>();
}
