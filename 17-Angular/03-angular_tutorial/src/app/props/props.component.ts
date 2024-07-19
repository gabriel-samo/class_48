import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { UserInputComponent } from '../user-input/user-input.component';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-props',
  standalone: true,
  imports: [FormsModule, NgFor, UserInputComponent, ListComponent],
  templateUrl: './props.component.html',
  styleUrl: './props.component.css',
})
export class PropsComponent {
  title = 'My Cart';
  listFruits_ar = ['apple', 'mango'];

  addProduct(fruit: string) {
    this.listFruits_ar.push(fruit);
  }
}
