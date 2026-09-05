import { Component } from '@angular/core';

@Component({
  selector: 'overview-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class OverviewButton {
  protected isActive = false;

  protected toggleActive(): void {
    this.isActive = !this.isActive;
  }
}
