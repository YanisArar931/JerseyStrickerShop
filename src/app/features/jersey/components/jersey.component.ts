import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jersey } from '../../auth/models/jersey.model';
import { JerseyService } from '../services/jersey.service';

@Component({
  selector: 'app-jersey-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">Jersey</h2>

      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 place-items-center">
          @for (champ of championnats; track champ.name) {
            <div class="flex flex-col items-center">
              <img [src]="champ.logo" [alt]="champ.name" class="h-16 w-16 object-contain" />
              <span class="mt-2 text-sm text-gray-700 font-medium">
                {{ champ.name }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class JerseyListComponent implements OnInit {
  jerseys = signal<Jersey[]>([]);
  loading = signal(true);

  private jerseyService = inject(JerseyService);

  async ngOnInit() {
    await this.loadJerseys();
  }

  async loadJerseys() {
    try {
      this.loading.set(true);
      const jerseys = await this.jerseyService.getAllJersey();
      this.jerseys.set(jerseys);
    } catch (error) {
      console.error('Erreur lors du chargement des maillots :', error);
    } finally {
      this.loading.set(false);
    }
  }

  championnats = [
    { name: '', logo: 'assets/icon/ligue1mcdo.png' },
    { name: '', logo: 'assets/icon/premierleague.png' },
    { name: '', logo: 'assets/icon/laliga.png' },
    { name: '', logo: 'assets/icon/bundesliga.png' },
    { name: '', logo: 'assets/icon/seriea.png' },
  ];
}
