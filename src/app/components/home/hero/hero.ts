import { Component } from '@angular/core';
import { ImgAnimation } from './img-animation/img-animation';
import { HeroDescription } from './hero_description/hero-description';

@Component({
  selector: 'app-hero',
  imports: [HeroDescription, ImgAnimation],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
