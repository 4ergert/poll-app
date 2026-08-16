import { Component } from '@angular/core';
import { MainHeader } from './header/header';
import { Hero } from './hero/hero';

@Component({
  selector: 'app-home',
  imports: [MainHeader, Hero],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
