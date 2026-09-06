import { Component, inject } from '@angular/core';
import { MainHeader } from './header/header';
import { Hero } from './hero/hero';
import { Surveys } from './surveys/surveys';
import { Survices } from '../shared/services/survices';
import { DialogService } from '../shared/services/dialog.service';


@Component({
  selector: 'app-home',
  imports: [MainHeader, Hero, Surveys],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  surveyService = inject(Survices);
  readonly dialogService = inject(DialogService);

  constructor() {
    this.surveyService.getSurveys();
  }

  openCreateSurveyDialog() {
    this.dialogService.openCreateSurveyDialog();
  }
}
