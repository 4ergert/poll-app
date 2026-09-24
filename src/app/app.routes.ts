import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Vote } from './components/vote/vote';

/** Top-level routes for the survey list and individual voting pages. */
export const routes: Routes = [
  {path: "", component: Home},
  {path: "vote/:id", component: Vote},
  {path: "**", redirectTo: ""}
];
