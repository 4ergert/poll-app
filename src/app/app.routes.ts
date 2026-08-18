import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { CreateNewSurvey } from './components/create-new-survey/create-new-survey';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "create_new_survey", component: CreateNewSurvey},
  {path: "**", redirectTo: ""}
];
