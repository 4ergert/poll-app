import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survices } from '../../shared/services/survices';
import { Survey } from '../../shared/interfaces/survey';

@Component({
  selector: 'vote-content',
  imports: [],
  templateUrl: './vote-content.html',
  styleUrl: './vote-content.scss',
})
export class VoteContent {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
  readonly survices = inject(Survices);
  readonly survey = signal<Survey | undefined>(undefined);

  async ngOnInit() {
    const surveys = await this.survices.getSurveys();
    const survey = surveys.find((item) => String(item.id) === this.surveyId);

    this.survey.set(survey);
  }
}
