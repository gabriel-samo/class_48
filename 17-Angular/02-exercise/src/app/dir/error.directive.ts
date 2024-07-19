import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appError]',
  standalone: true,
})
export class ErrorDirective implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.background = 'red';
  }
}
