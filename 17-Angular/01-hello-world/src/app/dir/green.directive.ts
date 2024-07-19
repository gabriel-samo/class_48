import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appGreen]',
  standalone: true,
})
export class GreenDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}
  ngOnInit(): void {
    this.elementRef.nativeElement.style.color = 'white';
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
