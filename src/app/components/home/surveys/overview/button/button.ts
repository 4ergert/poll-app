import { Component, computed, input, model } from '@angular/core';

type SurveyStatus = 'active' | 'past';

@Component({
  selector: 'overview-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class OverviewButton {
  readonly surveyStatus = input.required<SurveyStatus>();
  readonly selectedSurveyStatus = model.required<SurveyStatus>();
  readonly active = computed(() => this.selectedSurveyStatus() === this.surveyStatus());

  protected select(): void {
    this.selectedSurveyStatus.set(this.surveyStatus());
  }
}
