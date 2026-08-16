import { Component } from '@angular/core';
import { EndingSurvey } from './ending-survey/ending-survey';

@Component({
  selector: 'app-ending-soon',
  imports: [EndingSurvey],
  templateUrl: './ending-soon.html',
  styleUrl: './ending-soon.scss',
})
export class EndingSoon {}
