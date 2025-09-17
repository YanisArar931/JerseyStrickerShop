import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Jersey } from '../../auth/models/jersey.model';
import { JerseyService } from '../services/jersey.service';
import { PanierService } from '../../panier/services/panier.service';
import { AuthService } from '../../auth/services/auth.services';

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

      <!-- Overlay pour maillot sélectionné -->
      <div
        *ngIf="selectedJersey()"
        class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
        (click)="selectedJersey.set(null)"
        tabindex="0"
        (keyup.escape)="selectedJersey.set(null)"
      >
        <!-- Contenu du modal -->
        <div
          class="bg-white p-4 rounded-lg max-w-lg w-11/12 sm:w-full max-h-screen overflow-y-auto"
          (click)="$event.stopPropagation()"
          tabindex="0"
          (keyup.enter)="$event.stopPropagation()"
        >
          <img
            [src]="selectedJersey()?.image"
            [alt]="selectedJersey()?.name"
            class="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
          />
          <h2 class="mt-2 text-center font-semibold">
            {{ selectedJersey()?.name }}
          </h2>
          <p class="text-center text-gray-500">
            {{ selectedJersey()?.price | currency: 'EUR' }}
          </p>

          <!-- Sélection de la taille -->
          <div class="flex justify-center flex-wrap gap-2 mt-4">
            <button
              *ngFor="let size of ['XS', 'S', 'M', 'L', 'XL']"
              (click)="selectedSize = size"
              [class.bg-green-600]="selectedSize === size"
              [class.text-white]="selectedSize === size"
              class="px-3 py-1 border rounded-lg hover:bg-green-100 transition text-sm sm:text-base"
            >
              {{ size }}
            </button>
          </div>

          <!-- Bouton Ajouter au panier -->
          <button
            class="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            [disabled]="!selectedSize"
            (click)="addToPanier(selectedJersey())"
          >
            Ajouter au panier
          </button>
        </div>
      </div>

      <div class="text-lg mb-4 text-right">Bienvenu {{ currentUser?.name }}</div>

      <!-- Championnats -->
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <div class="text-lg font-semibold mb-4">Choisissez un championnats</div>
        <div class="flex justify-center flex-wrap gap-10">
          <div
            *ngFor="let champ of championnats; trackBy: trackByLogo"
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
              class="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
          </div>
        </div>
      </div>

      <!-- Clubs -->
      <div *ngIf="selectedChamp()" class="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
        <div class="text-lg font-semibold mb-4">Choisissez un club</div>
        <div class="flex flex-wrap justify-center gap-10">
          <div
            *ngFor="let club of selectedChamp()?.clubs; trackBy: trackByLogo"
            class="flex flex-col items-center cursor-pointer transform transition-transform duration-300 hover:scale-125 focus:outline-none"
            [class.scale-125]="selectedClub() === club"
            (click)="selectClub(club)"
            (keyup.enter)="selectClub(club)"
            tabindex="0"
            role="button"
          >
            <img
              [src]="club.logo"
              [alt]="club.name || 'Championnat'"
              class="h-12 w-12 sm:h-16 sm:w-16 object-contain"
            />
          </div>
        </div>
      </div>

      <!-- Maillots du club sélectionné -->
      <div *ngIf="selectedClub()" class="bg-white p-6 rounded-lg shadow-md">
        <div
          class="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          style="grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));"
        >
          <div
            *ngFor="let jersey of filteredJerseys(); trackBy: trackById"
            class="flex flex-col items-center p-2 border rounded-lg hover:shadow-lg transition cursor-pointer transform duration-300"
            tabindex="0"
            role="button"
            (click)="selectJersey(jersey)"
            (keyup.enter)="selectJersey(jersey)"
            [class.scale-90]="selectedJersey()?.id === jersey.id"
          >
            <img
              [src]="jersey.image"
              [alt]="jersey.name"
              class="h-24 w-24 object-contain sm:h-28 sm:w-28 lg:h-32 lg:w-32"
            />
            <span class="mt-2 text-sm text-gray-700 text-center">{{ jersey.name }}</span>
            <span class="mt-1 text-sm font-medium text-gray-500">
              {{ jersey.price | currency: 'EUR' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class JerseyListComponent implements OnInit {
  private authService = inject(AuthService);
  jerseys = signal<Jersey[]>([]);
  loading = signal(true);
  selectedChamp = signal<Championnat | null>(null);
  selectedClub = signal<Club | null>(null);
  selectedJersey = signal<Jersey | null>(null);
  private panierService = inject(PanierService);

  // Pour la taille sélectionnée
  selectedSize: string | null = null;

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
    this.selectedClub.set(null);
    this.selectedJersey.set(null);
    this.selectedSize = null;
  }

  selectClub(club: Club) {
    this.selectedClub.set(club);
    this.selectedJersey.set(null);
    this.selectedSize = null;
  }

  selectJersey(jersey: Jersey) {
    this.selectedJersey.set(jersey);
    this.selectedSize = null;
  }

  filteredJerseys(): Jersey[] {
    const club = this.selectedClub();
    if (!club) return [];
    return this.jerseys().filter((j) => j.team === club.name);
  }

  addToCart(jersey: Jersey | null) {
    if (!jersey || !this.selectedSize) return;
    console.log('Ajout au panier :', jersey, 'Taille :', this.selectedSize);
    alert(`"${jersey.name}" (Taille: ${this.selectedSize}) a été ajouté au panier !`);
  }

  trackByLogo(index: number, item: { logo: string }) {
    return item.logo;
  }

  trackById(index: number, item: { id: number }) {
    return item.id;
  }

  addToPanier(jersey: Jersey | null) {
    if (!jersey || !this.selectedSize) return;
    this.panierService.addToPanier(jersey, this.selectedSize);
    alert(`"${jersey.name}" (Taille: ${this.selectedSize}) a été ajouté au panier !`);
    this.selectedJersey.set(null);
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

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
        { name: 'Juventus', logo: 'assets/icon/juve.png' },
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
        { name: 'Santos', logo: 'assets/icon/santos.png' },
        { name: 'Inter Miami', logo: 'assets/icon/intermiami.png' },
        { name: 'Al Nassr', logo: 'assets/icon/alnassr.png' },
      ],
    },
  ];
}
