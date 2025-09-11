import { Injectable, signal } from '@angular/core';
import { Jersey } from '../../auth/models/jersey.model';

export interface PanierItem {
  jersey: Jersey;
  size: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private items = signal<PanierItem[]>([]);

  get panierItems() {
    return this.items.asReadonly();
  }

  addToPanier(jersey: Jersey, size: string) {
    const existing = this.items().find(
      (item) => item.jersey.id === jersey.id && item.size === size,
    );

    if (existing) {
      existing.quantity++;
      this.items.set([...this.items()]);
    } else {
      this.items.set([...this.items(), { jersey, size, quantity: 1 }]);
    }
  }

  removeFromPanier(index: number) {
    const updated = [...this.items()];
    updated.splice(index, 1);
    this.items.set(updated);
  }

  clearPanier() {
    this.items.set([]);
  }
}
