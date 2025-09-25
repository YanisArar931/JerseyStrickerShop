import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../panier/services/panier.service';
import { JerseyService } from '../../jersey/services/jersey.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <br />
    <div class="max-w-3xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        {{ 'mon_panier' | translate }}
      </h2>

      <!-- Panier vide -->
      <div *ngIf="panierService.panierItems().length === 0" class="text-gray-500 text-center">
        {{ 'panier_vide' | translate }}
      </div>

      <!-- Liste des items -->
      <div
        *ngFor="let item of panierService.panierItems(); let i = index"
        class="flex flex-col sm:flex-row items-center sm:items-start mb-4 border-b pb-4"
      >
        <img
          [src]="item.jersey.image"
          alt="{{ item.jersey.name }}"
          class="h-20 w-20 sm:h-24 sm:w-24 object-contain mb-2 sm:mb-0 sm:mr-4"
        />
        <div class="flex-1 text-center sm:text-left">
          <h3 class="font-semibold text-sm sm:text-base">
            {{ item.jersey.team | translate }} {{ item.jersey.name | translate }}
          </h3>
          <p class="text-xs sm:text-sm text-gray-500">{{ 'size' | translate }} : {{ item.size }}</p>
          <p class="text-sm sm:text-base font-medium">{{ item.jersey.price | currency: 'EUR' }}</p>
        </div>
        <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 mt-2 sm:mt-0 sm:ml-4"
          (click)="panierService.removeFromPanier(i)"
        >
          {{ 'delete' | translate }}
        </button>
      </div>

      <!-- Total -->
      <div
        *ngIf="panierService.panierItems().length > 0"
        class="mt-6 text-right text-sm sm:text-base font-medium"
      >
        <span>Total : </span>
        <span>{{ panierService.total() }} €</span>
      </div>

      <!-- Actions -->
      <div
        *ngIf="panierService.panierItems().length > 0"
        class="mt-6 flex flex-col sm:flex-row gap-2"
      >
        <button
          class="w-full sm:w-auto flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 text-sm sm:text-base"
          (click)="goToPayment()"
        >
          {{ 'payer' | translate }}
        </button>
        <button
          class="w-full sm:w-auto flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 text-sm sm:text-base"
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
  private router = inject(Router);

  goToPayment() {
    this.router.navigate(['/payment']);
  }
}
