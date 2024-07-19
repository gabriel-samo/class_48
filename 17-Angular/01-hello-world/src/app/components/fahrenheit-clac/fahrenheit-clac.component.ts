import { Component } from '@angular/core';

@Component({
  selector: 'app-fahrenheit-clac',
  standalone: true,
  imports: [],
  templateUrl: './fahrenheit-clac.component.html',
  styleUrl: './fahrenheit-clac.component.css',
})
export class FahrenheitClacComponent {
  farenheit = 0;
  celcius = 0;

  convet(event: any) {
    return (this.farenheit = (event.target.value * 9.0) / 5.0 + 32.0);
  }
}
