import { Directive, Input, ElementRef, OnChanges, Renderer2, inject } from '@angular/core';
import { TranslateService } from '../services/translate.services';

@Directive({
  selector: '[appReduction]',
  standalone: true,
})
export class ReductionDirective implements OnChanges {
  @Input('appReduction') price!: number;

  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  private translateService = inject(TranslateService);

  ngOnChanges() {
    const element = this.el.nativeElement;

    if (this.price < 80) {
      const text = this.translateService.translate('reduction');

      this.renderer.setProperty(element, 'textContent', text);
      this.renderer.setStyle(element, 'display', 'inline-block');
      this.renderer.setStyle(element, 'padding', '4px 8px');
      this.renderer.setStyle(element, 'borderRadius', '8px');
      this.renderer.setStyle(element, 'backgroundColor', '#4a8cd2');
      this.renderer.setStyle(element, 'color', 'white');
      this.renderer.setStyle(element, 'fontWeight', 'bold');
      this.renderer.setStyle(element, 'fontSize', '0.9rem');
      this.renderer.setStyle(element, 'textTransform', 'uppercase');
      this.renderer.setStyle(element, 'letterSpacing', '1px');
      this.renderer.setStyle(element, 'marginTop', '6px');
      this.renderer.setStyle(element, 'boxShadow', '0 2px 6px rgba(0,0,0,0.2)');
    } else {
      this.renderer.setProperty(element, 'textContent', '');
      this.renderer.removeAttribute(element, 'style');
    }
  }
}
