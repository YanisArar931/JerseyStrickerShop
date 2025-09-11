import { Injectable, signal } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

@Injectable({
  providedIn: 'root',
})
export class JerseyService {
  private jersey = signal<Jersey[]>([
    { id: 1, team: 'PSG', name: 'Domicile', price: 80, image: 'assets/icon/psgdom.webp' },
    { id: 2, team: 'PSG', name: 'Extérieur', price: 80, image: 'assets/icon/psgext.jpg' },
    { id: 3, team: 'PSG', name: 'Third', price: 80, image: 'assets/icon/psgthird.webp' },

    { id: 4, team: 'OM', name: 'Domicile', price: 80, image: 'assets/icon/omdom.webp' },
    { id: 5, team: 'OM', name: 'Extérieur', price: 80, image: 'assets/icon/omext.avif' },
    { id: 6, team: 'OM', name: 'Third', price: 80, image: 'assets/icon/omthird.jpg' },

    { id: 7, team: 'OL', name: 'Domicile', price: 80, image: 'assets/icon/oldom.webp' },
    { id: 8, team: 'OL', name: 'Extérieur', price: 80, image: 'assets/icon/olext.webp' },

    { id: 9, team: 'LOSC', name: 'Domicile', price: 80, image: 'assets/icon/loscdom.webp' },
    { id: 10, team: 'LOSC', name: 'Extérieur', price: 80, image: 'assets/icon/loscext.jpg' },
    { id: 11, team: 'LOSC', name: 'Third', price: 80, image: 'assets/icon/loscthird.png' },

    { id: 12, team: 'ASM', name: 'Domicile', price: 80, image: 'assets/icon/asmdom.jpg' },
    { id: 13, team: 'ASM', name: 'Extérieur', price: 80, image: 'assets/icon/asmext.jpg' },
    { id: 14, team: 'ASM', name: 'Third', price: 80, image: 'assets/icon/asmthird.jpg' },

    {
      id: 15,
      team: 'Inter Miami',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/intermiamidom.avif',
    },
    {
      id: 16,
      team: 'Inter Miami',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/intermiamiext.avif',
    },
    {
      id: 17,
      team: 'Inter Miami',
      name: 'Third',
      price: 80,
      image: 'assets/icon/intermiamithird.avif',
    },

    { id: 18, team: 'Santos', name: 'Domicile', price: 80, image: 'assets/icon/santosdom.jpg' },
    { id: 19, team: 'Santos', name: 'Extérieur', price: 80, image: 'assets/icon/santosext.jpg' },

    { id: 20, team: 'Al Nassr', name: 'Domicile', price: 80, image: 'assets/icon/alnassrdom.webp' },
  ]);

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAllJersey(): Promise<Jersey[]> {
    console.log('Service : Récupération de tous les maillots ...');
    await this.delay(300);
    console.log('Service : Maillots récupérés avec succès');
    return this.jersey();
  }
}
