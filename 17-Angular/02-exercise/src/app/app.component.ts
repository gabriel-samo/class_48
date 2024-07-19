import { NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SuccessDirective } from './dir/success.directive';
import { ErrorDirective } from './dir/error.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, SuccessDirective, ErrorDirective, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  age = 0;
  colorClasses = ['first', 'second', 'third'];
  index = 0;

  calcAge(event: any) {
    this.age = event.target.value;
  }

  changeColor() {
    if (this.index === this.colorClasses.length - 1) {
      this.index = 0;
    } else {
      this.index++;
    }
  }
}
