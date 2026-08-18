import { Component } from '@angular/core';
import { MainHeader } from './header/header';
import { Hero } from './hero/hero';
import { Surveys } from './surveys/surveys';


@Component({
  selector: 'app-home',
  imports: [MainHeader, Hero, Surveys,],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
