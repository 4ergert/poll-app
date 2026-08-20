import { Component, output } from '@angular/core';
import { Button } from '../../../shared/button/button';


@Component({
  selector: 'app-hero-description',
  imports: [Button],
  templateUrl: './hero-description.html',
  styleUrl: './hero-description.scss',
})
export class HeroDescription {
  readonly createSurvey = output<void>();
}
