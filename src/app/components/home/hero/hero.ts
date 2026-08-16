import { Component } from '@angular/core';
import { Survey } from './survey/survey';
import { ImgAnimation } from './img-animation/img-animation';

@Component({
  selector: 'app-hero',
  imports: [Survey, ImgAnimation],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {}
