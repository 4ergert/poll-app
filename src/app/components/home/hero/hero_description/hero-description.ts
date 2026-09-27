import { Component } from '@angular/core';
import { ImgAnimation } from '../img-animation/img-animation';

@Component({
  selector: 'app-hero-description',
  imports: [ImgAnimation],
  templateUrl: './hero-description.html',
  styleUrl: './hero-description.scss',
})
/** Hero copy for the survey landing page. */
export class HeroDescription {}
