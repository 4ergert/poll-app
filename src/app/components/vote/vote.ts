import { Component, inject } from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { Button } from '../shared/button/button';
import { VoteContent } from './vote-content/vote-content';
import { SurveyResults } from './survey-results/survey-results';

@Component({
  selector: 'app-vote',
  imports: [Button, VoteContent, SurveyResults],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
/** Hosts voting and result views for the selected survey. */
export class Vote {
  readonly dialogService = inject(DialogService);
}
