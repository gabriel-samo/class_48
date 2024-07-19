import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appSuccess]',
  standalone: true,
})
export class SuccessDirective implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.background = 'green';
    this.elRef.nativeElement.style.color = 'white';
  }
}
