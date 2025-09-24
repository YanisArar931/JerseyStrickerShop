import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../../panier/services/panier.service';
import { JerseyService } from '../../jersey/services/jersey.service';
import { Jersey } from '../../auth/models/jersey.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="min-h-screen flex justify-center items-center bg-gray-50">
      <div class="bg-white shadow-md rounded-lg flex w-full max-w-4xl">
        <!-- Formulaire paiement -->
        <div class="w-2/3 p-8">
          <h2 class="text-2xl font-bold mb-6">Paiement</h2>

          <form class="space-y-6" #paymentForm="ngForm" (ngSubmit)="submitPayment(paymentForm)">
            <div>
              <label for="cardName" class="block text-sm font-medium mb-1">Nom Prénom</label>
              <input
                id="cardName"
                type="text"
                [(ngModel)]="cardName"
                name="cardName"
                class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label for="cardNumber" class="block text-sm font-medium mb-1">Numéro de carte</label>
              <div class="relative">
                <input
                  id="cardNumber"
                  type="text"
                  [(ngModel)]="cardNumber"
                  name="cardNumber"
                  maxlength="16"
                  class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 pr-16"
                  required
                />
                <div class="absolute inset-y-0 right-3 flex items-center space-x-1 text-gray-500">
                  <span class="text-xs">💳</span>
                  <span class="text-xs">VISA</span>
                </div>
              </div>
            </div>

            <div class="flex gap-4">
              <div class="flex-1">
                <label for="expDate" class="block text-sm font-medium mb-1">MM/AA</label>
                <input
                  id="expDate"
                  type="text"
                  [(ngModel)]="expDate"
                  name="expDate"
                  maxlength="5"
                  class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div class="flex-1">
                <label for="cvv" class="block text-sm font-medium mb-1">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  [(ngModel)]="cvv"
                  name="cvv"
                  maxlength="3"
                  class="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <!-- Bouton de paiement -->
            <button
              type="submit"
              [disabled]="isLoading"
              class="w-full bg-green-600 text-white py-3 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              <span *ngIf="!isLoading">Commander</span>
              <span *ngIf="isLoading">Paiement en cours...</span>
            </button>

            <!-- Pop-up de succès -->
            <div
              *ngIf="showSuccessPopup"
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500"
            >
              <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 class="text-xl font-bold mb-2">Paiement réussi !</h2>
                <p>Merci pour votre achat !</p>
              </div>
            </div>
          </form>
        </div>

        <!-- Résumé panier -->
        <div class="w-1/3 bg-gray-100 p-6 rounded-r-lg">
          <h3 class="text-lg font-bold mb-4">Résumé</h3>
          <ul class="space-y-2">
            <li *ngFor="let item of panierItems" class="flex justify-between">
              <span>{{ item.jersey.team }} - {{ item.jersey.name }}</span>
              <span>{{ item.jersey.price }} €</span>
            </li>
          </ul>
          <hr class="my-3" />
          <p class="text-right font-bold">Total: {{ getTotal() }} €</p>
        </div>
      </div>
    </div>
  `,
})
export class PaymentComponent implements OnInit {
  cardName = '';
  cardNumber = '';
  expDate = '';
  cvv = '';

  panierItems: { jersey: Jersey; size: string }[] = [];

  isLoading = false; // état du paiement
  showSuccessPopup = false; // pour afficher le pop-up

  private panierService = inject(PanierService);
  private jerseyService = inject(JerseyService);
  private router = inject(Router);

  ngOnInit() {
    this.panierItems = this.panierService.panierItems();
  }

  getTotal(): number {
    return this.panierItems.reduce((sum, item) => sum + item.jersey.price, 0);
  }

  async submitPayment(form: NgForm) {
    if (!form.valid) return;

    this.isLoading = true;

    try {
      // Simuler un paiement asynchrone
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Décrémenter le stock
      this.panierItems.forEach((item) => {
        this.jerseyService.decrementStock(item.jersey.id, 1);
      });

      // Vider le panier
      this.panierService.clearPanier();

      // Afficher le pop-up
      this.showSuccessPopup = true;

      // Fermer automatiquement après 3,5 secondes
      setTimeout(() => {
        this.showSuccessPopup = false;
        this.router.navigate(['/jersey']);
      }, 3500);
    } finally {
      this.isLoading = false;
    }
  }
}
