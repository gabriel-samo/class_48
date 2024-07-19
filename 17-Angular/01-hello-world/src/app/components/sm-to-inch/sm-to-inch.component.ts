import { Component } from '@angular/core';

@Component({
  selector: 'app-sm-to-inch',
  standalone: true,
  imports: [],
  templateUrl: './sm-to-inch.component.html',
  styleUrl: './sm-to-inch.component.css',
})
export class SmToInchComponent {
  inch = 0;

  convert(event: any) {
    const cm = event.target.value;
    this.inch = cm * 0.393700787;
  }
}
