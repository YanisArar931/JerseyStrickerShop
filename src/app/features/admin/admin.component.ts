import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.services';
import { JerseyService } from '../jersey/services/jersey.service';
import { Jersey } from '../auth/models/jersey.model';
import { User } from '../auth/models/user.models';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">Interface Admin</h1>

      <!-- Onglets -->
      <div class="flex space-x-4 mb-6">
        <button
          (click)="activeTab.set('users')"
          [class.bg-green-600]="activeTab() === 'users'"
          [class.text-white]="activeTab() === 'users'"
          class="px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          Utilisateurs
        </button>

        <button
          (click)="activeTab.set('jerseys')"
          [class.bg-green-600]="activeTab() === 'jerseys'"
          [class.text-white]="activeTab() === 'jerseys'"
          class="px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          Maillots
        </button>
      </div>

      <!-- Liste utilisateurs -->
      @if (activeTab() === 'users') {
        <div class="bg-white shadow rounded-lg p-6">
          @if (users().length > 0) {
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Pseudo</th>
                  <th>Email</th>
                  <th>Rôle</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (user of users(); track user.id) {
                  <tr>
                    <td>{{ user.name }}</td>
                    <td>{{ user.pseudo }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                      @if (user.role !== 'admin') {
                        <button
                          (click)="deleteUser(user.id)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      } @else {
                        <span class="text-gray-400">Admin protégé</span>
                      }
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p>Aucun utilisateur trouvé</p>
          }
        </div>
      }

      <!-- Liste maillots -->
      @if (activeTab() === 'jerseys') {
        <div class="bg-white shadow rounded-lg p-6">
          @if (maillots().length > 0) {
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th>Équipe</th>
                  <th>Prix</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                @for (jersey of maillots(); track jersey.id) {
                  <tr>
                    <td>{{ jersey.team }}</td>
                    <td>{{ jersey.price }}</td>
                    <!--                     <td>
                      <input type="number" [(ngModel)]="jersey.stock" class="border px-2 rounded w-20" />
                    </td>
                    <td>
                      <button (click)="updateStock(jersey)" class="text-blue-600 hover:text-blue-900">
                        Mettre à jour
                      </button>
                    </td> -->
                  </tr>
                }
              </tbody>
            </table>
          } @else {
            <p>Aucun maillot trouvé</p>
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

  /*   async updateStock(jersey: Jersey) {
    try {
      await this.jerseyService.updateStock(jersey.id, jersey.stock);
      alert('Stock mis à jour');
      await this.loadMaillots();
    } catch (error) {
      console.error('Erreur mise à jour stock :', error);
    }
  } */
}
