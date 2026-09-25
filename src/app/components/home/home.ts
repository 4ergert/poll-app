import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
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
/** Home page that loads surveys and coordinates the creation dialog. */
export class Home implements OnDestroy {
  surveyService = inject(Survices);
  readonly dialogService = inject(DialogService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.document.body.classList.remove('page-vote');
    this.document.body.classList.add('page-home');
    this.surveyService.getSurveys();
  }

  ngOnDestroy() {
    this.document.body.classList.remove('page-home');
  }

  /** Opens the create-survey dialog. */
  openCreateSurveyDialog() {
    this.dialogService.openCreateSurveyDialog();
  }
}
