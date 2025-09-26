import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PanierService } from '../../panier/services/panier.service';
import { JerseyService } from '../../jersey/services/jersey.service';
import { Jersey } from '../../auth/models/jersey.model';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule, CommonModule, TranslatePipe],
  template: `
    <div class="min-h-screen flex justify-center items-center bg-gray-50 p-4 sm:p-6">
      <div class="bg-white shadow-md rounded-lg w-full max-w-4xl flex flex-col lg:flex-row">
        <div class="w-full lg:w-2/3 p-6 lg:p-8">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-center lg:text-left">
            {{ 'payment' | translate }}
          </h2>

          <form class="space-y-6" #paymentForm="ngForm" (ngSubmit)="submitPayment(paymentForm)">
            <div>
              <label for="cardName" class="block text-sm sm:text-base font-medium mb-1">{{
                'name' | translate
              }}</label>
              <input
                id="cardName"
                type="text"
                [(ngModel)]="cardName"
                name="cardName"
                class="w-full border rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label for="cardNumber" class="block text-sm sm:text-base font-medium mb-1">{{
                'card_number' | translate
              }}</label>
              <div class="relative">
                <input
                  id="cardNumber"
                  type="text"
                  [(ngModel)]="cardNumber"
                  name="cardNumber"
                  maxlength="16"
                  class="w-full border rounded-md px-3 py-2 sm:px-4 sm:py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <div
                  class="absolute inset-y-0 right-3 flex items-center space-x-1 text-gray-500 text-xs sm:text-sm"
                >
                  <span>💳</span>
                  <span>VISA</span>
                </div>
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-4">
              <div class="flex-1">
                <label for="expDate" class="block text-sm sm:text-base font-medium mb-1">
                  MM/AA
                </label>
                <input
                  id="expDate"
                  type="text"
                  [(ngModel)]="expDate"
                  name="expDate"
                  maxlength="5"
                  (blur)="validateExpDate()"
                  class="w-full border rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <p *ngIf="expDateError" class="text-red-500 text-sm mt-1">Date invalide</p>
              </div>

              <div class="flex-1">
                <label for="cvv" class="block text-sm sm:text-base font-medium mb-1">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  [(ngModel)]="cvv"
                  name="cvv"
                  maxlength="3"
                  class="w-full border rounded-md px-3 py-2 sm:px-4 sm:py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              [disabled]="isLoading"
              class="w-full bg-green-600 text-white py-3 sm:py-4 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              <span *ngIf="!isLoading">{{ 'command' | translate }}</span>
              <span *ngIf="isLoading">{{ 'command_inprogress' | translate }}</span>
            </button>

            <div
              *ngIf="showSuccessPopup"
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-500"
            >
              <div class="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h2 class="text-xl font-bold mb-2 text-green-600">{{ 'pay_done' | translate }}</h2>
                <p>{{ 'thank_for_pay' | translate }}</p>
              </div>
            </div>
          </form>
        </div>

        <div class="w-full lg:w-1/3 bg-gray-100 p-6 lg:rounded-r-lg mt-6 lg:mt-0">
          <h3 class="text-lg sm:text-xl font-bold mb-4 text-center lg:text-left">
            {{ 'resume' | translate }}
          </h3>
          <ul class="space-y-2">
            <li *ngFor="let item of panierItems" class="flex justify-between text-sm sm:text-base">
              <span>{{ item.jersey.team }} - {{ item.jersey.name | translate }}</span>

              <span>{{ item.jersey.price }} €</span>
            </li>
          </ul>
          <hr class="my-3" />
          <p class="text-right font-bold text-sm sm:text-base">Total: {{ getTotal() }} €</p>
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
  expDateError = false;

  panierItems: { jersey: Jersey; size: string }[] = [];

  isLoading = false;
  showSuccessPopup = false;

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      this.panierItems.forEach((item) => {
        this.jerseyService.decrementStock(item.jersey.id, 1);
      });

      this.panierService.clearPanier();

      this.showSuccessPopup = true;

      setTimeout(() => {
        this.showSuccessPopup = false;
        this.router.navigate(['/jersey']);
      }, 3500);
    } finally {
      this.isLoading = false;
    }
  }

  validateExpDate() {
    if (!this.expDate || this.expDate.length !== 5) {
      this.expDateError = true;
      return;
    }

    const [monthStr, yearStr] = this.expDate.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10) + 2000;

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
      this.expDateError = true;
      return;
    }

    const expDate = new Date(year, month - 1, 1);
    expDate.setMonth(expDate.getMonth() + 1);

    const now = new Date();
    this.expDateError = expDate <= now;
  }
}
