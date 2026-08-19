import { Component } from '@angular/core';
import { Button } from '../../../shared/button/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-hero-description',
  imports: [Button, RouterLink],
  templateUrl: './hero-description.html',
  styleUrl: './hero-description.scss',
})
export class HeroDescription {

}
