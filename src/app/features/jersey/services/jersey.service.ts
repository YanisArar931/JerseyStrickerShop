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

    {
      id: 21,
      team: 'Liverpool',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/liverpooldom.jpg',
    },
    {
      id: 22,
      team: 'Liverpool',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/liverpoolext.jpg',
    },
    {
      id: 23,
      team: 'Liverpool',
      name: 'Third',
      price: 80,
      image: 'assets/icon/liverpoolthird.jpg',
    },

    { id: 24, team: 'Arsenal', name: 'Domicile', price: 80, image: 'assets/icon/arsenaldom.jpg' },
    { id: 25, team: 'Arsenal', name: 'Extérieur', price: 80, image: 'assets/icon/arsenalext.webp' },
    { id: 26, team: 'Arsenal', name: 'Third', price: 80, image: 'assets/icon/arsenalthird.jpg' },

    { id: 27, team: 'Chelsea', name: 'Domicile', price: 80, image: 'assets/icon/chelseadom.jpg' },
    { id: 28, team: 'Chelsea', name: 'Extérieur', price: 80, image: 'assets/icon/chelseaext.webp' },
    { id: 29, team: 'Chelsea', name: 'Third', price: 80, image: 'assets/icon/chelseathird.jpg' },

    { id: 30, team: 'Man United', name: 'Domicile', price: 80, image: 'assets/icon/uniteddom.jpg' },
    {
      id: 31,
      team: 'Man United',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/unitedext.jpg',
    },
    { id: 32, team: 'Man United', name: 'Third', price: 80, image: 'assets/icon/unitedthird.jpg' },

    { id: 33, team: 'Man City', name: 'Domicile', price: 80, image: 'assets/icon/citydom.jpg' },
    { id: 34, team: 'Man City', name: 'Extérieur', price: 80, image: 'assets/icon/cityext.jpg' },
    { id: 35, team: 'Man City', name: 'Third', price: 80, image: 'assets/icon/citythird.jpg' },

    { id: 36, team: 'Real Madrid', name: 'Domicile', price: 80, image: 'assets/icon/realdom.jpg' },
    { id: 37, team: 'Real Madrid', name: 'Extérieur', price: 80, image: 'assets/icon/realext.jpg' },
    { id: 38, team: 'Real Madrid', name: 'Third', price: 80, image: 'assets/icon/realthird.webp' },

    { id: 39, team: 'Barcelona', name: 'Domicile', price: 80, image: 'assets/icon/barcadom.jpg' },
    { id: 40, team: 'Barcelona', name: 'Extérieur', price: 80, image: 'assets/icon/barcaext.jpg' },
    { id: 41, team: 'Barcelona', name: 'Third', price: 80, image: 'assets/icon/barcathird.jpg' },

    {
      id: 42,
      team: 'Atletico Madrid',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/athleticomadriddom.jpg',
    },
    {
      id: 43,
      team: 'Atletico Madrid',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/athleticomadridext.jpg',
    },
    {
      id: 44,
      team: 'Atletico Madrid',
      name: 'Third',
      price: 80,
      image: 'assets/icon/athleticomadridthird.jpg',
    },

    { id: 45, team: 'Bayern', name: 'Domicile', price: 80, image: 'assets/icon/bayerndom.webp' },
    { id: 46, team: 'Bayern', name: 'Extérieur', price: 80, image: 'assets/icon/bayernext.jpg' },
    { id: 47, team: 'Bayern', name: 'Third', price: 80, image: 'assets/icon/bayernthird.jpg' },

    { id: 48, team: 'BVB', name: 'Domicile', price: 80, image: 'assets/icon/dortmunddom.webp' },
    { id: 49, team: 'BVB', name: 'Extérieur', price: 80, image: 'assets/icon/dortmundext.avif' },

    {
      id: 50,
      team: 'Francfort',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/francfortdom.jpg',
    },
    {
      id: 51,
      team: 'Francfort',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/francfortext.webp',
    },
    {
      id: 52,
      team: 'Francfort',
      name: 'Third',
      price: 80,
      image: 'assets/icon/francfortthird.webp',
    },

    {
      id: 53,
      team: 'Leverkusen',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/leverkusendom.jpg',
    },
    {
      id: 54,
      team: 'Leverkusen',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/leverkusenext.jpg',
    },
    {
      id: 55,
      team: 'Leverkusen',
      name: 'Third',
      price: 80,
      image: 'assets/icon/leverkusenthird.jpg',
    },

    { id: 56, team: 'Juventus', name: 'Domicile', price: 80, image: 'assets/icon/juvedom.webp' },
    { id: 57, team: 'Juventus', name: 'Extérieur', price: 80, image: 'assets/icon/juveext.webp' },
    { id: 58, team: 'Juventus', name: 'Third', price: 80, image: 'assets/icon/juvethird.jpg' },

    { id: 59, team: 'AC Milan', name: 'Domicile', price: 80, image: 'assets/icon/acmilandom.webp' },
    { id: 60, team: 'AC Milan', name: 'Extérieur', price: 80, image: 'assets/icon/acmilanext.jpg' },
    { id: 61, team: 'AC Milan', name: 'Third', price: 80, image: 'assets/icon/acmilanthird.webp' },

    {
      id: 62,
      team: 'Inter Milan',
      name: 'Domicile',
      price: 80,
      image: 'assets/icon/intermilandom.webp',
    },
    {
      id: 63,
      team: 'Inter Milan',
      name: 'Extérieur',
      price: 80,
      image: 'assets/icon/intermilanext.jpg',
    },
    {
      id: 64,
      team: 'Inter Milan',
      name: 'Third',
      price: 80,
      image: 'assets/icon/intermilanthird.jpg',
    },

    { id: 65, team: 'AS Rome', name: 'Domicile', price: 80, image: 'assets/icon/romedom.jpeg' },
    { id: 66, team: 'AS Rome', name: 'Extérieur', price: 80, image: 'assets/icon/romeext.avif' },
    { id: 67, team: 'AS Rome', name: 'Third', price: 80, image: 'assets/icon/romethird.jpg' },

    { id: 68, team: 'Naples', name: 'Domicile', price: 80, image: 'assets/icon/naplesdom.jpg' },
    { id: 69, team: 'Naples', name: 'Extérieur', price: 80, image: 'assets/icon/naplesext.jpg' },
    { id: 70, team: 'Naples', name: 'Third', price: 80, image: 'assets/icon/naplesthird.jpg' },
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
