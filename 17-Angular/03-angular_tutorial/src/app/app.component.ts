import {
  NgClass,
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropsComponent } from './props/props.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NgFor,
    NgClass,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgbModule,
    PropsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = '3-angular_tutorial';
  names = ['John', 'Jane', 'Doe', 'Jim', 'Jill', 'Joe'];
  genders = [
    'boy',
    'girl',
    'boy',
    'boy',
    'boy',
    'girl',
    'girl',
    'gabriel',
    'girl',
    'girl',
    'girl',
    'boy',
    'gabriel',
  ];
}
