import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslateService } from '../services/translate.services';

@Pipe({
  name: 'stockStatus',
  standalone: true,
  pure: false,
})
export class StockStatusPipe implements PipeTransform {
  private translateService = inject(TranslateService);

  transform(value: number): string {
    if (value > 0) {
      return this.translateService.translate('inStock');
    }
    return this.translateService.translate('outofstock');
  }
}
