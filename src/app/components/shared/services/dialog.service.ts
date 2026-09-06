import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  readonly isCreateSurveyDialogOpen = signal(false);

  openCreateSurveyDialog() {
    this.isCreateSurveyDialogOpen.set(true);
  }

  closeCreateSurveyDialog() {
    this.isCreateSurveyDialogOpen.set(false);
  }
}
