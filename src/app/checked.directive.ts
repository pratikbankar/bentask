import { Directive,ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChecked]'
})
export class CheckedDirective {

  constructor(private  el: ElementRef) {}

   @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellowgreen');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

}
