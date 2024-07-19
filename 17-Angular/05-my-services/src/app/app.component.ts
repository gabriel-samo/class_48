import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { UserInputComponent } from './components/user-input/user-input.component';
import { NgFor } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemListComponent } from './components/item-list/item-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    UserInputComponent,
    NgFor,
    NgbModule,
    ItemListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  fruits: string[] = ['apple', 'banana', 'orange'];
  fruitInput: string = '';
}
