import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ErrorAlertComponent } from './components/error-alert/error-alert.component';
import { SuccessAlertComponent } from './components/success-alert/success-alert.component';
import { FahrenheitClacComponent } from './components/fahrenheit-clac/fahrenheit-clac.component';
import { ILSConvertComponent } from './components/ilsconvert/ilsconvert.component';
import { SmToInchComponent } from './components/sm-to-inch/sm-to-inch.component';
import { MToFeetComponent } from './components/mto-feet/mto-feet.component';
import { GreenDirective } from './dir/green.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SuccessAlertComponent,
    ErrorAlertComponent,
    FahrenheitClacComponent,
    ILSConvertComponent,
    SmToInchComponent,
    MToFeetComponent,
    GreenDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  name = 'Gabriel';
  greeting = 'Welcome to your first angular app';
  isTrue = true;
}
