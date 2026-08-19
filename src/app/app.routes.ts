import { Routes } from '@angular/router';
import { CreateNewSurvey } from './components/create-new-survey/create-new-survey';
import { Home } from './components/home/home';

export const routes: Routes = [
  {path: "", component: Home},
  {path: "create_new_survey", component: CreateNewSurvey},
  {path: "**", redirectTo: ""}
];
