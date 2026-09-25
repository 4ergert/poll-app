import { DOCUMENT } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
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
export class Vote implements OnDestroy {
  readonly dialogService = inject(DialogService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.document.body.classList.remove('page-home');
    this.document.body.classList.add('page-vote');
  }

  ngOnDestroy() {
    this.document.body.classList.remove('page-vote');
  }
}
