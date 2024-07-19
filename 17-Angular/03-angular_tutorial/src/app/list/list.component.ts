import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  @Input({ required: true, alias: 'perot' }) listFruits_ar!: string[];
}
