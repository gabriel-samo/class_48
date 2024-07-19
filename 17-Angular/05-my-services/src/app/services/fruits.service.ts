import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FruitsService {
  constructor() {}

  fruits: string[] = ['apple', 'banana', 'orange'];

  drinks: any[] = [
    { name: 'beer', price: 3.5, alcohol: 0.05, expired: '2022-12-25' },
    { name: 'cola', price: 2.5, alcohol: 0.0, expired: '2025-01-01' },
    { name: 'sprite', price: 2, alcohol: 0.0, expired: '2023-11-15' },
  ];

  addFruit(fruit: string) {
    this.fruits.push(fruit);
  }
}
