import { Component, output } from '@angular/core';
import { Button } from '../../shared/button/button';
import { ImgAnimation } from './img-animation/img-animation';
import { HeroDescription } from './hero_description/hero-description';

@Component({
  selector: 'app-hero',
  imports: [Button, HeroDescription, ImgAnimation],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/** Home-page hero that exposes the create-survey action. */
export class Hero {
  readonly createSurvey = output<void>();
}
