import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateNewSurvey } from './components/create-new-survey/create-new-survey';
import { DialogService } from './components/shared/services/dialog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CreateNewSurvey],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('poll-app');
  readonly dialogService = inject(DialogService);
}
