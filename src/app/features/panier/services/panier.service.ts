import { Injectable, signal, effect, computed, inject } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';
import { AuthService } from '../../auth/services/auth.services';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private authService = inject(AuthService);
  private _userId = signal<number | null>(null);

  private _panierItems = signal<{ jersey: Jersey; size: string }[]>([]);
  panierItems = this._panierItems.asReadonly();

  count = computed(() => this._panierItems().length);
  total = computed(() => this._panierItems().reduce((sum, i) => sum + (i.jersey?.price ?? 0), 0));

  constructor() {
    effect(() => {
      const user = this.authService.getCurrentUser();
      const userId = user?.id ?? null;

      if (userId !== this._userId()) {
        this._userId.set(userId);
        this._panierItems.set(userId ? this.loadFromStorage(userId) : []);
      }
    });

    effect(() => {
      const userId = this._userId();
      if (userId !== null) {
        this.saveToStorage(userId, this._panierItems());
      }
    });
  }

  addToPanier(jersey: Jersey, size: string) {
    this._panierItems.update((list) => [...list, { jersey, size }]);
  }

  removeFromPanier(index: number) {
    this._panierItems.update((list) => list.filter((_, i) => i !== index));
  }

  clearPanier() {
    this._panierItems.set([]);
  }

  private saveToStorage(userId: number, items: { jersey: Jersey; size: string }[]) {
    localStorage.setItem(`panier_user_${userId}`, JSON.stringify(items));
  }

  private loadFromStorage(userId: number): { jersey: Jersey; size: string }[] {
    const data = localStorage.getItem(`panier_user_${userId}`);
    return data ? JSON.parse(data) : [];
  }
}
