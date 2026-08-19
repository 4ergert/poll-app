import { Component } from '@angular/core';
import { Button } from '../shared/button/button';
import { CnsHeader } from './cns-header/cns-header';

@Component({
  selector: 'app-create-new-survey',
  imports: [Button, CnsHeader],
  templateUrl: './create-new-survey.html',
  styleUrl: './create-new-survey.scss',
})
export class CreateNewSurvey {

}
