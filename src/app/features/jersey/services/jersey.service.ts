import { Injectable, signal } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

@Injectable({
  providedIn: 'root',
})
export class JerseyService {
  private readonly STORAGE_KEY = 'jerseys';

  private jerseys = signal<Jersey[]>(this.loadFromStorage());

  // Sauvegarde dans localStorage
  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.jerseys()));
  }

  // Chargement depuis localStorage
  private loadFromStorage(): Jersey[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data
      ? JSON.parse(data)
      : [
          {
            id: 1,
            team: 'PSG',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/psgdom.webp',
            championship: 'Ligue 1',
            stock: 1,
          },
          {
            id: 2,
            team: 'PSG',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/psgext.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 3,
            team: 'PSG',
            name: 'third',
            price: 80,
            image: 'assets/icon/psgthird.webp',
            championship: 'Ligue 1',
            stock: 100,
          },

          {
            id: 4,
            team: 'OM',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/omdom.webp',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 5,
            team: 'OM',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/omext.avif',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 6,
            team: 'OM',
            name: 'third',
            price: 80,
            image: 'assets/icon/omthird.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },

          {
            id: 7,
            team: 'OL',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/oldom.webp',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 8,
            team: 'OL',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/olext.webp',
            championship: 'Ligue 1',
            stock: 100,
          },

          {
            id: 9,
            team: 'LOSC',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/loscdom.webp',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 10,
            team: 'LOSC',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/loscext.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 11,
            team: 'LOSC',
            name: 'third',
            price: 80,
            image: 'assets/icon/loscthird.png',
            championship: 'Ligue 1',
            stock: 100,
          },

          {
            id: 12,
            team: 'ASM',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/asmdom.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 13,
            team: 'ASM',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/asmext.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },
          {
            id: 14,
            team: 'ASM',
            name: 'third',
            price: 80,
            image: 'assets/icon/asmthird.jpg',
            championship: 'Ligue 1',
            stock: 100,
          },

          {
            id: 15,
            team: 'Inter Miami',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/intermiamidom.avif',
            championship: 'goat',
            stock: 100,
          },
          {
            id: 16,
            team: 'Inter Miami',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/intermiamiext.avif',
            championship: 'goat',
            stock: 100,
          },
          {
            id: 17,
            team: 'Inter Miami',
            name: 'third',
            price: 80,
            image: 'assets/icon/intermiamithird.avif',
            championship: 'goat',
            stock: 100,
          },

          {
            id: 18,
            team: 'Santos',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/santosdom.jpg',
            championship: 'goat',
            stock: 100,
          },
          {
            id: 19,
            team: 'Santos',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/santosext.jpg',
            championship: 'goat',
            stock: 100,
          },

          {
            id: 20,
            team: 'Al Nassr',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/alnassrdom.webp',
            championship: 'goat',
            stock: 100,
          },

          {
            id: 21,
            team: 'Liverpool',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/liverpooldom.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 22,
            team: 'Liverpool',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/liverpoolext.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 23,
            team: 'Liverpool',
            name: 'third',
            price: 80,
            image: 'assets/icon/liverpoolthird.jpg',
            championship: 'Premier League',
            stock: 100,
          },

          {
            id: 24,
            team: 'Arsenal',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/arsenaldom.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 25,
            team: 'Arsenal',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/arsenalext.webp',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 26,
            team: 'Arsenal',
            name: 'third',
            price: 80,
            image: 'assets/icon/arsenalthird.jpg',
            championship: 'Premier League',
            stock: 100,
          },

          {
            id: 27,
            team: 'Chelsea',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/chelseadom.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 28,
            team: 'Chelsea',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/chelseaext.webp',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 29,
            team: 'Chelsea',
            name: 'third',
            price: 80,
            image: 'assets/icon/chelseathird.jpg',
            championship: 'Premier League',
            stock: 100,
          },

          {
            id: 30,
            team: 'Man United',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/uniteddom.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 31,
            team: 'Man United',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/unitedext.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 32,
            team: 'Man United',
            name: 'third',
            price: 80,
            image: 'assets/icon/unitedthird.jpg',
            championship: 'Premier League',
            stock: 100,
          },

          {
            id: 33,
            team: 'Man City',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/citydom.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 34,
            team: 'Man City',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/cityext.jpg',
            championship: 'Premier League',
            stock: 100,
          },
          {
            id: 35,
            team: 'Man City',
            name: 'third',
            price: 80,
            image: 'assets/icon/citythird.jpg',
            championship: 'Premier League',
            stock: 100,
          },

          {
            id: 36,
            team: 'Real Madrid',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/realdom.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 37,
            team: 'Real Madrid',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/realext.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 38,
            team: 'Real Madrid',
            name: 'third',
            price: 80,
            image: 'assets/icon/realthird.webp',
            championship: 'La Liga',
            stock: 100,
          },

          {
            id: 39,
            team: 'Barcelona',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/barcadom.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 40,
            team: 'Barcelona',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/barcaext.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 41,
            team: 'Barcelona',
            name: 'third',
            price: 80,
            image: 'assets/icon/barcathird.jpg',
            championship: 'La Liga',
            stock: 100,
          },

          {
            id: 42,
            team: 'Atletico Madrid',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/athleticomadriddom.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 43,
            team: 'Atletico Madrid',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/athleticomadridext.jpg',
            championship: 'La Liga',
            stock: 100,
          },
          {
            id: 44,
            team: 'Atletico Madrid',
            name: 'third',
            price: 80,
            image: 'assets/icon/athleticomadridthird.jpg',
            championship: 'La Liga',
            stock: 100,
          },

          {
            id: 45,
            team: 'Bayern',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/bayerndom.webp',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 46,
            team: 'Bayern',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/bayernext.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 47,
            team: 'Bayern',
            name: 'third',
            price: 80,
            image: 'assets/icon/bayernthird.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },

          {
            id: 48,
            team: 'BVB',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/dortmunddom.webp',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 49,
            team: 'BVB',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/dortmundext.avif',
            championship: 'Bundesliga',
            stock: 100,
          },

          {
            id: 50,
            team: 'Francfort',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/francfortdom.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 51,
            team: 'Francfort',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/francfortext.webp',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 52,
            team: 'Francfort',
            name: 'third',
            price: 80,
            image: 'assets/icon/francfortthird.webp',
            championship: 'Bundesliga',
            stock: 100,
          },

          {
            id: 53,
            team: 'Leverkusen',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/leverkusendom.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 54,
            team: 'Leverkusen',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/leverkusenext.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },
          {
            id: 55,
            team: 'Leverkusen',
            name: 'third',
            price: 80,
            image: 'assets/icon/leverkusenthird.jpg',
            championship: 'Bundesliga',
            stock: 100,
          },

          {
            id: 56,
            team: 'Juventus',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/juvedom.webp',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 57,
            team: 'Juventus',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/juveext.webp',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 58,
            team: 'Juventus',
            name: 'third',
            price: 80,
            image: 'assets/icon/juvethird.jpg',
            championship: 'Serie A',
            stock: 100,
          },

          {
            id: 59,
            team: 'AC Milan',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/acmilandom.webp',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 60,
            team: 'AC Milan',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/acmilanext.jpg',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 61,
            team: 'AC Milan',
            name: 'third',
            price: 80,
            image: 'assets/icon/acmilanthird.webp',
            championship: 'Serie A',
            stock: 100,
          },

          {
            id: 62,
            team: 'Inter Milan',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/intermilandom.webp',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 63,
            team: 'Inter Milan',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/intermilanext.jpg',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 64,
            team: 'Inter Milan',
            name: 'third',
            price: 80,
            image: 'assets/icon/intermilanthird.jpg',
            championship: 'Serie A',
            stock: 100,
          },

          {
            id: 65,
            team: 'AS Rome',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/romedom.jpeg',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 66,
            team: 'AS Rome',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/romeext.avif',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 67,
            team: 'AS Rome',
            name: 'third',
            price: 80,
            image: 'assets/icon/romethird.jpg',
            championship: 'Serie A',
            stock: 100,
          },

          {
            id: 68,
            team: 'Naples',
            name: 'domicile',
            price: 80,
            image: 'assets/icon/naplesdom.jpg',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 69,
            team: 'Naples',
            name: 'exterieur',
            price: 80,
            image: 'assets/icon/naplesext.jpg',
            championship: 'Serie A',
            stock: 100,
          },
          {
            id: 70,
            team: 'Naples',
            name: 'third',
            price: 80,
            image: 'assets/icon/naplesthird.jpg',
            championship: 'Serie A',
            stock: 100,
          },
        ];
  }

  getAllJersey(): Jersey[] {
    return this.jerseys();
  }

  addJersey(jersey: Jersey) {
    const newJersey = { ...jersey, id: jersey.id ?? Date.now() };
    this.jerseys.update((list) => [...list, newJersey]);
    this.saveToStorage();
  }

  updateJersey(id: number, updated: Partial<Jersey>) {
    this.jerseys.update((list) => list.map((j) => (j.id === id ? { ...j, ...updated } : j)));
    this.saveToStorage();
  }

  deleteJersey(id: number) {
    this.jerseys.update((list) => list.filter((j) => j.id !== id));
    this.saveToStorage();
  }

  toggleBlockJersey(id: number) {
    this.jerseys.update((list) =>
      list.map((j) => (j.id === id ? { ...j, blocked: !j.blocked } : j)),
    );
    this.saveToStorage();
  }

  decrementStock(id: number, quantity = 1) {
    this.jerseys.update((list) =>
      list.map((j) => (j.id === id ? { ...j, stock: Math.max(0, j.stock - quantity) } : j)),
    );
    this.saveToStorage();
  }
}
