import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appLiStyle]',
  standalone: true,
})
export class LiStyleDirective implements OnInit {
  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.elRef.nativeElement.style.backgroundColor = 'yellow';
    this.elRef.nativeElement.style.width = '10rem';
    this.elRef.nativeElement.style.height = '2rem';
    this.elRef.nativeElement.style.margin = '0.5rem';
    this.elRef.nativeElement.style.borderRadius = '0.5rem';
    this.elRef.nativeElement.style.display = 'flex';
    this.elRef.nativeElement.style.alignItems = 'center';
    this.elRef.nativeElement.style.justifyContent = 'center';
    this.elRef.nativeElement.style.fontSize = '1rem';
    this.elRef.nativeElement.style.cursor = 'pointer';
    this.elRef.nativeElement.style.transition =
      'background-color 0.3s, color 0.3s, box-shadow 0.15s, transform 0.15s';
  }

  @HostListener('mouseover') onMouseOver() {
    this.elRef.nativeElement.style.boxShadow = '0 0 10px 0 rgba(0, 0, 0, 0.5)';
    this.elRef.nativeElement.style.transform = 'scale(1.05)';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.elRef.nativeElement.style.boxShadow = 'none';
    this.elRef.nativeElement.style.transform = 'scale(1)';
  }
}
