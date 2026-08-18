import { Component } from '@angular/core';
import { SecButton } from '../shared/sec-button/sec-button';
import { Button } from '../shared/button/button';

@Component({
  selector: 'app-create-new-survey',
  imports: [Button, SecButton],
  templateUrl: './create-new-survey.html',
  styleUrl: './create-new-survey.scss',
})
export class CreateNewSurvey {

}
