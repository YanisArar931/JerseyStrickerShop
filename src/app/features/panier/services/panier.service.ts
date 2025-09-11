import { Injectable, signal, effect } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly STORAGE_KEY = 'panier';

  // Signal qui contient le panier
  private _panierItems = signal<{ jersey: Jersey; size: string }[]>(this.loadFromStorage());

  //Getter pour accéder au panier depuis le composant
  panierItems = this._panierItems.asReadonly();

  constructor() {
    // Chaque changement du panier → sauvegarde dans localStorage
    effect(() => {
      this.saveToStorage(this._panierItems());
    });
  }

  addToPanier(jersey: Jersey, size: string) {
    this._panierItems.update((current) => [...current, { jersey, size }]);
  }

  removeFromPanier(index: number) {
    this._panierItems.update((current) => current.filter((_, i) => i !== index));
  }

  clearPanier() {
    this._panierItems.set([]);
  }

  //Sauvegarde localStorage
  private saveToStorage(items: { jersey: Jersey; size: string }[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): { jersey: Jersey; size: string }[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
