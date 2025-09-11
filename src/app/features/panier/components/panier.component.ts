import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierService } from '../../panier/services/panier.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  template: `
    <br />
    <div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold mb-4">Votre Panier</h2>

      <div *ngIf="panierService.panierItems().length === 0" class="text-gray-500">
        Votre panier est vide.
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
          <h3 class="font-semibold">{{ item.jersey.name }}</h3>
          <p class="text-sm text-gray-500">Taille: {{ item.size }}</p>
          <p class="text-sm text-gray-500">Quantité: {{ item.quantity }}</p>
          <p class="text-sm font-medium">
            {{ item.jersey.price | currency: 'EUR' }}
          </p>
        </div>
        <button
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          (click)="panierService.removeFromPanier(i)"
        >
          Supprimer
        </button>
      </div>

      <div *ngIf="panierService.panierItems().length > 0" class="mt-6">
        <button class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Payer
        </button>
        <br />
        <button
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-red-700"
          (click)="panierService.clearPanier()"
        >
          Vider le panier
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class PanierComponent {
  panierService = inject(PanierService);
}
