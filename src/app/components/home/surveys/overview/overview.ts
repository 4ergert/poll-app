import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownMenu } from '../../../shared/dropdown-menu/dropdown-menu';
import { Card } from './card/card';
import { Survices } from '../../../shared/services/survices';
import { Survey } from '../../../shared/interfaces/survey';
import { getEndsInDays } from '../../../shared/utils/date';
import { OverviewButton } from './button/button';

@Component({
  selector: 'app-overview',
  imports: [DropdownMenu, Card, OverviewButton, RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  readonly surveyService = inject(Survices);
  readonly allSurveys = signal<Survey[]>([]);
  readonly getEndsInDays = getEndsInDays;

  async ngOnInit() {
    await this.getAllSurveys();
  }

  async getAllSurveys() {
    const surveys = await this.surveyService.getSurveys();
    this.allSurveys.set(surveys);
    return surveys;
  }
}
