import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../panier/services/panier.service';
import { JerseyService } from '../../jersey/services/jersey.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <br />
    <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">{{ 'mon_panier' | translate }}</h2>

      <div *ngIf="panierService.panierItems().length === 0" class="text-gray-500">
        {{ 'panier_vide' | translate }}
      </div>

      <div
        *ngFor="let item of panierService.panierItems(); let i = index"
        class="flex items-center mb-4 border-b pb-2"
      >
        <img
          [src]="item.jersey.image"
          alt="{{ item.jersey.name }}"
          class="h-16 w-16 object-contain mr-4"
        />
        <div class="flex-1">
          <h3 class="font-semibold">{{ item.jersey.name | translate }}</h3>
          <p class="text-sm text-gray-500">{{ 'size' | translate }} : {{ item.size }}</p>
          <p class="text-sm font-medium">
            {{ item.jersey.price | currency: 'EUR' }}
          </p>
        </div>
        <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          (click)="panierService.removeFromPanier(i)"
        >
          {{ 'delete' | translate }}
        </button>
      </div>
      <!-- <div>TOTAL : €</div> -->

      <div *ngIf="panierService.panierItems().length > 0" class="mt-6">
        <button
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          (click)="payer()"
        >
          {{ 'payer' | translate }}
        </button>
        <br />
        <button
          class="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 mt-2"
          (click)="panierService.clearPanier()"
        >
          {{ 'vider' | translate }}
        </button>
      </div>
    </div>
  `,
})
export class PanierComponent {
  panierService = inject(PanierService);
  jerseyService = inject(JerseyService);

  payer() {
    // Décrémenter le stock de chaque maillot du panier
    for (const item of this.panierService.panierItems()) {
      this.jerseyService.decrementStock(item.jersey.id, 1);
    }

    // Vider le panier après paiement
    this.panierService.clearPanier();

    alert('✅ Paiement validé !');
  }
}
