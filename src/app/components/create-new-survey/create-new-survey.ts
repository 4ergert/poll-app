import { Component, output } from '@angular/core';
import { CnsHeader } from './cns-header/cns-header';
import { SurveyForm } from './survey-form/survey-form';

@Component({
  selector: 'app-create-new-survey',
  imports: [CnsHeader, SurveyForm],
  templateUrl: './create-new-survey.html',
  styleUrl: './create-new-survey.scss',
})
/** Dialog content that combines the survey header and form. */
export class CreateNewSurvey {
  readonly close = output<void>();
}
