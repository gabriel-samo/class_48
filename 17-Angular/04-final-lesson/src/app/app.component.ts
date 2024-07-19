import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LiStyleDirective } from './dir/li-style.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LiStyleDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '4-final-lesson';
}
