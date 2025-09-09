import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jersey } from '../../auth/models/jersey.model';
import { JerseyService } from '../services/jersey.service';

interface Club {
  name: string;
  logo: string;
}

interface Championnat {
  name: string;
  logo: string;
  clubs: Club[];
}

@Component({
  selector: 'app-jersey-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <br />
      <!-- Championnats -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="flex justify-center flex-wrap space-x-10">
          @for (champ of championnats; track champ.logo) {
            <div
              class="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-150 focus:outline-none"
              [class.scale-150]="selectedChamp() === champ"
              (click)="selectChamp(champ)"
              (keyup.enter)="selectChamp(champ)"
              tabindex="0"
              role="button"
            >
              <img
                [src]="champ.logo"
                [alt]="champ.name || 'Championnat'"
                class="h-16 w-16 object-contain"
              />
            </div>
          }
        </div>
      </div>

      <!-- Clubs -->
      @if (selectedChamp()) {
        <div class="bg-gray-50 p-6 rounded-lg shadow-md">
          <div class="flex flex-wrap justify-center gap-x-10 gap-y-6">
            @for (club of selectedChamp()?.clubs; track club.logo) {
              <div
                class="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-125 focus:outline-none"
                tabindex="0"
                role="button"
              >
                <img [src]="club.logo" [alt]="club.name" class="h-16 w-16 object-contain" />
                <span class="mt-2 text-sm text-gray-600 font-medium">
                  {{ club.name }}
                </span>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: [],
})
export class JerseyListComponent implements OnInit {
  jerseys = signal<Jersey[]>([]);
  loading = signal(true);
  selectedChamp = signal<Championnat | null>(null);

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

  selectChamp(champ: Championnat) {
    this.selectedChamp.set(champ);
  }

  championnats: Championnat[] = [
    {
      name: '',
      logo: 'assets/icon/ligue1mcdo.png',
      clubs: [
        { name: '', logo: 'assets/icon/psg.png' },
        { name: '', logo: 'assets/icon/om.svg' },
        { name: '', logo: 'assets/icon/ol.svg' },
        { name: '', logo: 'assets/icon/monaco.png' },
        { name: '', logo: 'assets/icon/losc.png' },
      ],
    },
    {
      name: '',
      logo: 'assets/icon/premierleague.png',
      clubs: [
        { name: '', logo: 'assets/icon/arsenal.png' },
        { name: '', logo: 'assets/icon/chelsea.png' },
        { name: '', logo: 'assets/icon/liverpool.png' },
        { name: '', logo: 'assets/icon/manunited.png' },
        { name: '', logo: 'assets/icon/mancity.png' },
      ],
    },
    {
      name: '',
      logo: 'assets/icon/laliga.png',
      clubs: [
        { name: '', logo: 'assets/icon/realmadrid.png' },
        { name: '', logo: 'assets/icon/barca.png' },
        { name: '', logo: 'assets/icon/athleticomadrid.png' },
      ],
    },
    {
      name: '',
      logo: 'assets/icon/bundesliga.png',
      clubs: [
        { name: '', logo: 'assets/icon/bayern.png' },
        { name: '', logo: 'assets/icon/bvb.png' },
        { name: '', logo: 'assets/icon/francfort.png' },
        { name: '', logo: 'assets/icon/leverkusen.png' },
      ],
    },
    {
      name: '',
      logo: 'assets/icon/seriea.png',
      clubs: [
        { name: '', logo: 'assets/icon/juve.png' },
        { name: '', logo: 'assets/icon/acmilan.png' },
        { name: '', logo: 'assets/icon/intermilan.png' },
        { name: '', logo: 'assets/icon/asrome.svg' },
        { name: '', logo: 'assets/icon/naples.png' },
      ],
    },
    {
      name: '',
      logo: 'assets/icon/goat.png',
      clubs: [
        { name: '', logo: 'assets/icon/alnassr.png' },
        { name: '', logo: 'assets/icon/intermiami.png' },
        { name: '', logo: 'assets/icon/santos.png' },
      ],
    },
  ];
}
