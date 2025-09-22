import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.services';
import { JerseyService } from '../jersey/services/jersey.service';
import { Jersey } from '../auth/models/jersey.model';
import { User } from '../auth/models/user.models';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">{{ 'interface_admin' | translate }}</h1>

      <!-- Onglets -->
      <div class="flex space-x-4 mb-6">
        <button
          (click)="activeTab.set('users')"
          [class.bg-green-600]="activeTab() === 'users'"
          [class.text-white]="activeTab() === 'users'"
          class="px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          {{ 'users' | translate }}
        </button>

        <button
          (click)="activeTab.set('jerseys')"
          [class.bg-green-600]="activeTab() === 'jerseys'"
          [class.text-white]="activeTab() === 'jerseys'"
          class="px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          {{ 'jerseys' | translate }}
        </button>
      </div>

      <!-- Liste utilisateurs -->
      @if (activeTab() === 'users') {
        <div class="bg-white shadow rounded-lg p-6">
          @if (users().length > 0) {
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left"
                  >
                    {{ 'name' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left"
                  >
                    {{ 'mail' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left"
                  >
                    {{ 'role' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left"
                  >
                    {{ 'action' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (user of users(); track user.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ user.name | uppercase }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ user.email }}</td>
                    <td class="px-6 py-4 text-sm text-gray-700 capitalize">{{ user.role }}</td>
                    <td class="px-6 py-4 text-sm">
                      @if (user.role !== 'admin') {
                        <button
                          (click)="deleteUser(user.id)"
                          class="text-red-600 hover:text-red-900 font-medium"
                        >
                          {{ 'delete' | translate }}
                        </button>
                      } @else {
                        <span class="text-gray-400 italic">{{
                          'protected_admin' | translate
                        }}</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p class="text-gray-500 text-sm">Aucun utilisateur trouvé</p>
          }
        </div>
      }

      <!-- Liste maillots -->
      @if (activeTab() === 'jerseys') {
        <div class="bg-white shadow rounded-lg p-6">
          @if (maillots().length > 0) {
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'team' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'type' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'price' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'stock' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'action' | translate }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                @for (jersey of maillots(); track jersey.id) {
                  <tr class="hover:bg-gray-50">
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ jersey.team }}</td>
                    <td class="px-6 py-4 text-sm text-gray-700 capitalize">
                      {{ jersey.name | translate }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ jersey.price }} €</td>
                    <td class="px-6 py-4 text-sm text-gray-700">{{ jersey.stock }}</td>
                    <td class="px-6 py-4 text-sm text-gray-700">
                      <button
                        class="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                        (click)="editJersey(jersey)"
                      >
                        {{ 'modify' | translate }}
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p class="text-gray-500 text-sm">{{ 'no_jerseys' | translate }}</p>
          }
        </div>
      }
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private jerseyService = inject(JerseyService);
  private router = inject(Router);

  activeTab = signal<'users' | 'jerseys'>('users');
  users = signal<User[]>([]);
  maillots = signal<Jersey[]>([]);

  async ngOnInit() {
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      this.router.navigate(['/']);
      return;
    }

    await this.loadUsers();
    await this.loadMaillots();
  }

  async loadUsers() {
    const users = await firstValueFrom(this.authService.getAllUsers());
    this.users.set(users);
  }

  async loadMaillots() {
    const jerseys = await this.jerseyService.getAllJersey();
    this.maillots.set(jerseys);
  }

  async deleteUser(userId: number) {
    if (confirm('Supprimer cet utilisateur ?')) {
      await this.authService.deleteUser(userId);
      await this.loadUsers();
    }
  }

  editJersey(jersey: Jersey) {
    const newPrice = prompt('Nouveau prix (€) :', jersey.price.toString());
    const newStock = prompt('Nouveau stock :', jersey.stock.toString());

    if (newPrice !== null && newStock !== null) {
      this.jerseyService.updateJersey(jersey.id, {
        price: parseFloat(newPrice),
        stock: parseInt(newStock, 10),
      });

      // Mise à jour instantanée
      this.loadMaillots();
    }
  }
}
