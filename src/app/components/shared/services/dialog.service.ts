import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/** Stores and updates visibility state for application dialogs. */
export class DialogService {
  readonly isCreateSurveyDialogOpen = signal(false);

  /** Marks the create-survey dialog as open. */
  openCreateSurveyDialog() {
    this.isCreateSurveyDialogOpen.set(true);
  }

  /** Marks the create-survey dialog as closed. */
  closeCreateSurveyDialog() {
    this.isCreateSurveyDialogOpen.set(false);
  }
}
