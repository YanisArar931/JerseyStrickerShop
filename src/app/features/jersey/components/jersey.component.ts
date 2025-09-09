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
    <div class="max-w-5xl mx-auto">
      <br />

      <!-- Championnats -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="flex justify-center flex-wrap space-x-10">
          @for (champ of championnats; track champ.logo) {
            <div
              class="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-150 focus:outline-none"
              [class.scale-150]="selectedChamp() === champ"
              (click)="selectChamp(champ)"
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
        <div class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
          <div class="flex flex-wrap justify-center gap-x-10 gap-y-6">
            @for (club of selectedChamp()?.clubs; track club.logo) {
              <div
                class="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-125 focus:outline-none"
                [class.scale-125]="selectedClub() === club"
                (click)="selectClub(club)"
                tabindex="0"
                role="button"
              >
                <img [src]="club.logo" [alt]="club.name" class="h-16 w-16 object-contain" />
              </div>
            }
          </div>
        </div>
      }

      <!-- Maillots du club sélectionné -->
      @if (selectedClub()) {
        <div class="bg-white p-6 rounded-lg shadow-md">
          <div
            class="grid gap-6 justify-center"
            style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));"
          >
            @for (jersey of filteredJerseys(); track jersey.id) {
              <div
                class="flex flex-col items-center p-2 border rounded-lg hover:shadow-lg transition"
              >
                <img [src]="jersey.image" [alt]="jersey.name" class="h-24 w-24 object-contain" />
                <span class="mt-2 text-sm text-gray-700 text-center">{{ jersey.name }}</span>
                <span class="mt-1 text-sm font-medium text-gray-500">
                  {{ jersey.price | currency: 'EUR' }}
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
  selectedClub = signal<Club | null>(null);

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
    this.selectedClub.set(null); // reset club quand on change de championnat
  }

  selectClub(club: Club) {
    this.selectedClub.set(club);
  }

  // Filtrer les maillots pour le club sélectionné
  filteredJerseys(): Jersey[] {
    const club = this.selectedClub();
    if (!club) return [];
    return this.jerseys().filter((j) => j.team === club.name);
  }

  // Liste des championnats + clubs
  championnats: Championnat[] = [
    {
      name: 'Ligue 1',
      logo: 'assets/icon/ligue1mcdo.png',
      clubs: [
        { name: 'PSG', logo: 'assets/icon/psg.png' },
        { name: 'OM', logo: 'assets/icon/om.svg' },
        { name: 'OL', logo: 'assets/icon/ol.svg' },
        { name: 'ASM', logo: 'assets/icon/monaco.png' },
        { name: 'LOSC', logo: 'assets/icon/losc.png' },
      ],
    },
    {
      name: 'Premier League',
      logo: 'assets/icon/premierleague.png',
      clubs: [
        { name: 'Arsenal', logo: 'assets/icon/arsenal.png' },
        { name: 'Chelsea', logo: 'assets/icon/chelsea.png' },
        { name: 'Liverpool', logo: 'assets/icon/liverpool.png' },
        { name: 'Man United', logo: 'assets/icon/manunited.png' },
        { name: 'Man City', logo: 'assets/icon/mancity.png' },
      ],
    },
    {
      name: 'La Liga',
      logo: 'assets/icon/laliga.png',
      clubs: [
        { name: 'Real Madrid', logo: 'assets/icon/realmadrid.png' },
        { name: 'Barcelona', logo: 'assets/icon/barca.png' },
        { name: 'Atletico Madrid', logo: 'assets/icon/athleticomadrid.png' },
      ],
    },
    {
      name: 'Bundesliga',
      logo: 'assets/icon/bundesliga.png',
      clubs: [
        { name: 'Bayern', logo: 'assets/icon/bayern.png' },
        { name: 'BVB', logo: 'assets/icon/bvb.png' },
        { name: 'Francfort', logo: 'assets/icon/francfort.png' },
        { name: 'Leverkusen', logo: 'assets/icon/leverkusen.png' },
      ],
    },
    {
      name: 'Serie A',
      logo: 'assets/icon/seriea.png',
      clubs: [
        { name: 'Juve', logo: 'assets/icon/juve.png' },
        { name: 'AC Milan', logo: 'assets/icon/acmilan.png' },
        { name: 'Inter Milan', logo: 'assets/icon/intermilan.png' },
        { name: 'AS Rome', logo: 'assets/icon/asrome.svg' },
        { name: 'Naples', logo: 'assets/icon/naples.png' },
      ],
    },
    {
      name: 'Autres',
      logo: 'assets/icon/goat.png',
      clubs: [
        { name: 'Al Nassr', logo: 'assets/icon/alnassr.png' },
        { name: 'Inter Miami', logo: 'assets/icon/intermiami.png' },
        { name: 'Santos', logo: 'assets/icon/santos.png' },
      ],
    },
  ];
}
