import { Injectable, signal } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

@Injectable({
  providedIn: 'root',
})
export class JerseyService {
  private jersey = signal<Jersey[]>([
    {
      id: 1,
      team: 'Olympique de Marseille',
      price: 90,
    },
    {
      id: 2,
      team: 'Paris Saint-Germain',
      price: 90,
    },
    {
      id: 3,
      team: 'Olympique Lyonnais',
      price: 90,
    },
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
