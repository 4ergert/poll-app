import { Component } from '@angular/core';
import { CreateNewSurvey } from '../create-new-survey/create-new-survey';
import { MainHeader } from './header/header';
import { Hero } from './hero/hero';
import { Surveys } from './surveys/surveys';


@Component({
  selector: 'app-home',
  imports: [MainHeader, Hero, Surveys, CreateNewSurvey],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  isCreateSurveyDialogOpen = false;
}
