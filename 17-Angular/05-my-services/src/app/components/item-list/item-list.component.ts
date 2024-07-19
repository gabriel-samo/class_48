import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FruitsService } from '../../services/fruits.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent {
  constructor(private fruitsService: FruitsService) {}
  fruits = this.fruitsService.fruits;
  drinks = this.fruitsService.drinks;
}
