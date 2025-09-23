import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.services';
import { JerseyService } from '../jersey/services/jersey.service';
import { Jersey } from '../auth/models/jersey.model';
import { User } from '../auth/models/user.models';
import { firstValueFrom } from 'rxjs';
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

        <button
          (click)="activeTab.set('addjerseys')"
          [class.bg-green-600]="activeTab() === 'addjerseys'"
          [class.text-white]="activeTab() === 'addjerseys'"
          class="px-4 py-2 rounded font-medium hover:bg-green-700"
        >
          {{ 'addjersey' | translate }}
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
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'name' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'mail' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                  >
                    {{ 'role' | translate }}
                  </th>
                  <th
                    class="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
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
                        class="text-blue-600 hover:text-blue-900 font-medium"
                        (click)="editJersey(jersey)"
                      >
                        {{ 'modify' | translate }}
                      </button>

                      <button
                        class="px-3 py-1 rounded text-gray-700"
                        [ngClass]="
                          jersey.blocked
                            ? 'text-green-600 hover:text-green-700'
                            : 'text-red-600 hover:text-red-700'
                        "
                        (click)="toggleBlock(jersey.id)"
                      >
                        {{ jersey.blocked ? ('unblock' | translate) : ('block' | translate) }}
                      </button>

                      <button
                        class="px-3 py-1 rounded text-red-700"
                        (click)="deleteJersey(jersey.id)"
                      >
                        {{ 'delete' | translate }}
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

      <!-- Ajouter un maillot -->
      @if (activeTab() === 'addjerseys') {
        <div class="bg-white shadow rounded-lg p-6">
          <form (ngSubmit)="addJersey()" #jerseyForm="ngForm" class="space-y-4">
            <!-- Championnat -->
            <div>
              <label for="championship" class="block text-sm font-medium mb-1">
                {{ 'championship' | translate }}
              </label>
              <select
                id="championship"
                [(ngModel)]="newJersey.championship"
                name="championship"
                class="w-full border rounded px-3 py-2"
                (ngModelChange)="onChampionshipChange($event)"
                required
              >
                <option *ngFor="let c of championships" [value]="c">{{ c }}</option>
              </select>
            </div>

            <!-- Choix équipe filtrée -->
            <div>
              <label for="team" class="block text-sm font-medium mb-1">
                {{ 'team' | translate }}
              </label>
              <select
                id="team"
                [(ngModel)]="newJersey.team"
                name="team"
                class="w-full border rounded px-3 py-2"
                required
              >
                <option *ngFor="let team of filteredTeams()" [value]="team">{{ team }}</option>
              </select>
            </div>

            <!-- Image -->
            <div>
              <label for="image" class="block text-sm font-medium mb-1">
                {{ 'image' | translate }}
              </label>
              <img
                *ngIf="newJersey.image"
                [src]="newJersey.image"
                alt="Maillot"
                class="w-24 h-auto"
              />
              <input
                id="image"
                type="file"
                (change)="onFileSelected($event)"
                class="w-full border rounded px-3 py-2"
              />
            </div>

            <!-- Type -->
            <div>
              <label for="name" class="block text-sm font-medium mb-1">
                {{ 'type' | translate }}
              </label>
              <select
                id="name"
                [(ngModel)]="newJersey.name"
                name="name"
                class="w-full border rounded px-3 py-2"
                required
              >
                <option *ngFor="let c of name" [value]="c">{{ c }}</option>
              </select>
            </div>

            <!-- Prix -->
            <div>
              <label for="price" class="block text-sm font-medium mb-1">
                {{ 'price' | translate }}
              </label>
              <input
                id="price"
                type="number"
                [(ngModel)]="newJersey.price"
                name="price"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <!-- Stock -->
            <div>
              <label for="stock" class="block text-sm font-medium mb-1">
                {{ 'stock' | translate }}
              </label>
              <input
                id="stock"
                type="number"
                [(ngModel)]="newJersey.stock"
                name="stock"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              [disabled]="jerseyForm.invalid"
            >
              {{ 'add' | translate }}
            </button>
          </form>
        </div>
      }
    </div>
  `,
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private jerseyService = inject(JerseyService);
  private router = inject(Router);
  filteredTeams = signal<string[]>([]);

  activeTab = signal<'users' | 'jerseys' | 'addjerseys'>('users');
  users = signal<User[]>([]);
  maillots = signal<Jersey[]>([]);
  championships = ['Ligue 1', 'Premier League', 'Serie A', 'La Liga', 'Bundesliga'];
  name = ['Domicile', 'Extérieur', 'Third'];

  teamsByChampionship: Record<string, string[]> = {
    'Ligue 1': ['PSG', 'OM', 'OL', 'LOSC', 'ASM'],
    'Premier League': ['Manchester United', 'Manchester City', 'Liverpool', 'Chelsea', 'Arsenal'],
    'Serie A': ['Juventus', 'AC Milan', 'Inter Milan', 'AS Rome', 'Naples'],
    'La Liga': ['Real Madrid', 'Barcelona', 'Atletico Madrid'],
    Bundesliga: ['Bayern', 'BVB', 'Francfort', 'Leverkusen'],
  };

  newJersey: Partial<Jersey> & { championship: string; image?: string; type?: string } = {
    championship: '',
    team: '',
    price: 0,
    stock: 0,
    type: '',
    image: undefined,
  };

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

  async deleteJersey(jerseyId: number) {
    if (confirm('Supprimer ce maillot ?')) {
      this.jerseyService.deleteJersey(jerseyId);
      // Recharge la liste des maillots pour mettre à jour la table
      const jerseys = await this.jerseyService.getAllJersey();
      this.maillots.set(jerseys);
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

      this.loadMaillots();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.newJersey.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  addJersey() {
    if (!this.newJersey.team || !this.newJersey.championship) return;

    this.jerseyService.addJersey(this.newJersey as Jersey);
    this.newJersey = { championship: '', team: '', price: 0, stock: 0, image: undefined };
    this.loadMaillots();
    this.activeTab.set('jerseys');
  }

  onChampionshipChange(championship: string) {
    this.filteredTeams.set(this.teamsByChampionship[championship] || []);
    this.newJersey.team = '';
  }

  blockJersey(id: number) {
    this.jerseyService.toggleBlockJersey(id);
  }

  toggleBlock(id: number) {
    this.jerseyService.toggleBlockJersey(id);
    this.loadMaillots();
  }

  get visibleJerseys() {
    return this.jerseyService.jerseys().filter((j) => !j.blocked);
  }
}
