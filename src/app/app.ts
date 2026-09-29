import { DOCUMENT } from '@angular/common';
import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateNewSurvey } from './components/create-new-survey/create-new-survey';
import { DialogService } from './components/shared/services/dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateNewSurvey],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
/** Root component that hosts routing and the create-survey dialog. */
export class App implements OnDestroy {
  protected readonly title = signal('poll-app');
  readonly dialogService = inject(DialogService);
  private readonly document = inject(DOCUMENT);

  constructor() {
    effect(() => {
      const isDialogOpen = this.dialogService.isCreateSurveyDialogOpen();
      this.document.documentElement.classList.toggle('dialog-open', isDialogOpen);
      this.document.body.classList.toggle('dialog-open', isDialogOpen);
    });
  }

  ngOnDestroy() {
    this.document.documentElement.classList.remove('dialog-open');
    this.document.body.classList.remove('dialog-open');
  }
}
