import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { Card } from './card/card';
import { Survices } from '../../../shared/services/survices';
import { Survey } from '../../../shared/interfaces/survey';
import { getEndsInDays, isSurveyActive } from '../../../shared/utils/date';
import { OverviewButton } from './button/button';

@Component({
  selector: 'app-overview',
  imports: [DropdownMenu, Card, OverviewButton, RouterLink, DatePipe],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
})
export class Overview {
  readonly surveyService = inject(Survices);
  readonly allSurveys = this.surveyService.surveys;
  readonly selectedCategory = signal('allSurveys');
  readonly selectedSurveyStatus = signal<'active' | 'past'>('active');
  readonly displayedSurveys = computed(() => {
    const selectedCategory = this.selectedCategory();
    const selectedSurveyStatus = this.selectedSurveyStatus();
    const surveys = this.allSurveys();
    const surveysByStatus = surveys.filter((survey) =>
      selectedSurveyStatus === 'active'
        ? isSurveyActive(survey.date)
        : !isSurveyActive(survey.date),
    );

    return selectedCategory === 'allSurveys'
      ? surveysByStatus
      : surveysByStatus.filter((survey) => survey.category === selectedCategory);
  });
  readonly getEndsInDays = getEndsInDays;
  readonly isSurveyActive = isSurveyActive;

  async ngOnInit() {
    await this.getAllSurveys();
  }

  async getAllSurveys() {
    return this.surveyService.getSurveys();
  }

  selectCategory(category: string) {
    this.selectedCategory.set(category);
  }

}
