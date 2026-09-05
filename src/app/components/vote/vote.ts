import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vote',
  imports: [],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class Vote {
  readonly surveyId = inject(ActivatedRoute).snapshot.paramMap.get('id');
}
