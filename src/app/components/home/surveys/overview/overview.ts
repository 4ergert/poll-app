import { Component, computed, inject, signal } from '@angular/core';
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
  readonly selectedCategory = signal('allSurveys');
  readonly displayedSurveys = computed(() => {
    const selectedCategory = this.selectedCategory();
    const surveys = this.allSurveys();

    return selectedCategory === 'allSurveys'
      ? surveys
      : surveys.filter((survey) => survey.category === selectedCategory);
  });
  readonly getEndsInDays = getEndsInDays;

  async ngOnInit() {
    await this.getAllSurveys();
  }

  async getAllSurveys() {
    const surveys = await this.surveyService.getSurveys();
    this.allSurveys.set(surveys);
    return surveys;
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }
}
