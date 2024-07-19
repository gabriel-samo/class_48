import { Component } from '@angular/core';

@Component({
  selector: 'app-ilsconvert',
  standalone: true,
  imports: [],
  templateUrl: './ilsconvert.component.html',
  styleUrl: './ilsconvert.component.css',
})
export class ILSConvertComponent {
  USD = 0;
  EURO = 0;
  CAD = 0;

  convert(event: any) {
    const ILS = event.target.value;
    this.USD = ILS * 0.27;
    this.EURO = ILS * 0.25;
    this.CAD = ILS * 0.36;
  }
}
