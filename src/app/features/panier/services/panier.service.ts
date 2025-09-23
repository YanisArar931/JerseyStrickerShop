import { Injectable, signal, effect, computed } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private readonly STORAGE_KEY = 'panier';

  private _panierItems = signal<{ jersey: Jersey; size: string }[]>(this.loadFromStorage());
  panierItems = this._panierItems.asReadonly();

  get count(): number {
    return this._panierItems().length;
  }

  total = computed(() => this._panierItems().reduce((sum, item) => sum + item.jersey.price, 0));

  constructor() {
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

  private saveToStorage(items: { jersey: Jersey; size: string }[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  private loadFromStorage(): { jersey: Jersey; size: string }[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
}
