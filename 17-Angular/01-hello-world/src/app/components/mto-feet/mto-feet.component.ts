import { Component } from '@angular/core';

@Component({
  selector: 'app-mto-feet',
  standalone: true,
  imports: [],
  templateUrl: './mto-feet.component.html',
  styleUrl: './mto-feet.component.css',
})
export class MToFeetComponent {
  feet = 0;
  isTrue = true;

  convert(event: any) {
    const m = event.target.value;
    this.feet = 3.2808399 * m;
  }
}
