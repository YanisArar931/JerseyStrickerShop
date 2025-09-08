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

      <!-- Loading state -->
      @if (loading()) {
        <div class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          ></div>
          <p class="mt-2 text-gray-600">Chargement des maillots ...</p>
        </div>
      } @else {
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 class="text-xl font-semibold mb-4">Championats</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
        <!-- Liste des maillots -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">JERSEY STRICKER</div>
      }
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
}
