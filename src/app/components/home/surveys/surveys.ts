import { Component } from '@angular/core';
import { Overview } from './overview/overview';
import { EndingSoon } from './ending_soon/ending-soon';

@Component({
  selector: 'app-surveys',
  imports: [Overview, EndingSoon],
  templateUrl: './surveys.html',
  styleUrl: './surveys.scss',
})
/** Groups the overview and ending-soon survey sections. */
export class Surveys {}