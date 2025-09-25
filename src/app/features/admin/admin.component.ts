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
                        <!-- bouton supprimer utilisateur -->
                        <button
                          (click)="confirmDeleteUser(user.id)"
                          class="p-2 rounded hover:bg-red-500 transition-colors duration-200"
                        >
                          <img src="assets/icon/dustbin.png" alt="Supprimer" class="h-5 w-5" />
                        </button>

                        <!-- popup confirmation suppression utilisateur -->
                        <div
                          *ngIf="showDeleteUserConfirm"
                          class="fixed inset-0 bg-gray-300 bg-opacity-30 flex items-center justify-center z-50"
                        >
                          <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
                            <h2 class="text-xl font-bold mb-4 text-red-600">Confirmation</h2>
                            <p class="text-gray-700 mb-6">
                              Voulez-vous vraiment supprimer cet utilisateur ?
                            </p>

                            <div class="flex justify-end gap-2">
                              <button
                                class="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                (click)="cancelDeleteUser()"
                              >
                                Annuler
                              </button>
                              <button
                                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                (click)="deleteUserConfirmed()"
                              >
                                Supprimer
                              </button>
                            </div>
                          </div>
                        </div>
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
                        class="flex items-center justify-center h-9 w-9 rounded-full bg-gray-100 
                              hover:bg-red-500 hover:scale-110 active:scale-95 
                              transition-all duration-200 "
                        (click)="deleteJersey(jersey.id)"
                      >
                        <img src="assets/icon/dustbin.png" alt="Supprimer" class="h-5 w-5" />
                      </button>

                      <!-- Pop-up confirmation suppression maillot -->
                      <div
                        *ngIf="showDeleteConfirm()"
                        class="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50"
                      >
                        <div class="bg-white rounded-lg p-6 w-96 shadow-lg">
                          <h2 class="text-xl font-bold mb-4 text-red-600">Confirmation</h2>
                          <p class="text-gray-700 mb-6">
                            Voulez-vous vraiment supprimer ce maillot ?
                          </p>

                          <div class="flex justify-end gap-2">
                            <button class="px-4 py-2 bg-gray-200 rounded" (click)="cancelDelete()">
                              Annuler
                            </button>
                            <button
                              class="px-4 py-2 bg-red-600 text-white rounded"
                              (click)="confirmDelete()"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
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
            <div>
              <label for="championship" class="block text-sm font-medium mb-1">{{
                'championship' | translate
              }}</label>
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

            <div>
              <label for="team" class="block text-sm font-medium mb-1">{{
                'team' | translate
              }}</label>
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

            <div>
              <label for="image" class="block text-sm font-medium mb-1">{{
                'image' | translate
              }}</label>
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

            <div>
              <label for="name" class="block text-sm font-medium mb-1">{{
                'type' | translate
              }}</label>
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

            <div>
              <label for="price" class="block text-sm font-medium mb-1">{{
                'price' | translate
              }}</label>
              <input
                id="price"
                type="number"
                [(ngModel)]="newJersey.price"
                name="price"
                class="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label for="stock" class="block text-sm font-medium mb-1">{{
                'stock' | translate
              }}</label>
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
              class="bg-green-600 text-white px-4 py-2 rounded font-hover:bg-green-700"
              [disabled]="jerseyForm.invalid"
            >
              {{ 'add' | translate }}
            </button>
          </form>
        </div>
      }

      <!-- Modal édition maillot -->
      <div
        *ngIf="selectedJersey()"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-lg p-6 w-96 relative shadow-lg">
          <h2 class="text-xl font-bold mb-4">{{ 'modify' | translate }}</h2>

          <label for="editPrice" class="block mb-2">{{ 'price' | translate }} (€)</label>
          <input
            id="editPrice"
            type="number"
            [(ngModel)]="editPrice"
            class="w-full border rounded px-2 py-1 mb-4"
          />

          <label for="editStock" class="block mb-2">{{ 'stock' | translate }}</label>
          <input
            id="editStock"
            type="number"
            [(ngModel)]="editStock"
            class="w-full border rounded px-2 py-1 mb-4"
          />

          <div class="flex justify-end gap-2">
            <button class="px-4 py-2 bg-gray-200 rounded" (click)="closeModal()">
              {{ 'cancel' | translate }}
            </button>
            <button class="px-4 py-2 bg-green-600 text-white rounded" (click)="saveEdit()">
              {{ 'save' | translate }}
            </button>
          </div>
        </div>
      </div>

      <!-- Pop-up succès modification -->
      <div
        *ngIf="showEditSuccess()"
        class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500"
      >
        {{ 'jersey_updated' | translate }}
      </div>
      <!-- Pop-up succès ajout -->
      <div
        *ngIf="showAddSuccess()"
        class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-1000"
      >
        {{ 'jersey_added' | translate }}
      </div>
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
  showAddSuccess = signal(false);
  selectedUserId: number | null = null;
  showDeleteUserConfirm = false;
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

  // Modal édition
  selectedJersey = signal<Jersey | null>(null);
  editPrice = signal<number>(0);
  editStock = signal<number>(0);
  showEditSuccess = signal(false);

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

  confirmDeleteUser(userId: number) {
    this.selectedUserId = userId;
    this.showDeleteUserConfirm = true;
  }

  deleteUserConfirmed() {
    if (this.selectedUserId === null) return;
    this.authService.deleteUser(this.selectedUserId).subscribe(() => {
      this.loadUsers(); // recharge la liste
      this.showDeleteUserConfirm = false;
      this.selectedUserId = null;
    });
  }

  cancelDeleteUser() {
    this.showDeleteUserConfirm = false;
    this.selectedUserId = null;
  }

  async deleteJersey(jerseyId: number) {
    this.jerseyToDelete = jerseyId;
    this.showDeleteConfirm.set(true);
  }

  confirmDelete() {
    if (this.jerseyToDelete !== null) {
      this.jerseyService.deleteJersey(this.jerseyToDelete);
      this.loadMaillots();
      this.showDeleteConfirm.set(false);
      this.jerseyToDelete = null;
    }
  }

  cancelDelete() {
    this.showDeleteConfirm.set(false);
    this.jerseyToDelete = null;
  }

  // Ajoute ces propriétés
  showDeleteConfirm = signal(false);
  jerseyToDelete: number | null = null;

  editJersey(jersey: Jersey) {
    this.selectedJersey.set(jersey);
    this.editPrice.set(jersey.price);
    this.editStock.set(jersey.stock);
  }

  saveEdit() {
    const jersey = this.selectedJersey();
    if (!jersey) return;

    this.jerseyService.updateJersey(jersey.id, {
      price: this.editPrice(),
      stock: this.editStock(),
    });

    this.selectedJersey.set(null);
    this.loadMaillots();

    // Show success pop-up
    this.showEditSuccess.set(true);
    setTimeout(() => this.showEditSuccess.set(false), 3000);
  }

  closeModal() {
    this.selectedJersey.set(null);
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

    // ✅ Affiche la pop-up succès
    this.showAddSuccess.set(true);
    setTimeout(() => this.showAddSuccess.set(false), 2000);
  }

  onChampionshipChange(championship: string) {
    this.filteredTeams.set(this.teamsByChampionship[championship] || []);
    this.newJersey.team = '';
  }

  toggleBlock(id: number) {
    this.jerseyService.toggleBlockJersey(id);
    this.loadMaillots();
  }
}
