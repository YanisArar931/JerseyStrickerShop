import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private lang = signal<'fr' | 'en'>('fr');

  private translations: Record<string, Record<string, string>> = {
    fr: {
      panier: 'Ajouter au panier',
      payer: 'Payer',
      vider: 'Vider le panier',
      bienvenu: 'Bienvenu',
      championnats: 'Choisissez un championnats',
      clubs: 'Choisissez une équipe',
      mon_panier: 'Votre Panier',
      panier_vide: 'Votre panier est vide',
      connexion: 'Connexion',
      mail: 'Email',
      password: 'Mot de passe',
      register: 'Inscription',
      name: 'Nom',
      firstname: 'Prénom',
      confirm: 'Confirmer',
      createaccount: 'Créer un compte',
      users: 'Utilisateurs',
      jerseys: 'Maillots',
      role: 'Rôle',
      action: 'Action',
      delete: 'Supprimer',
      protected_admin: 'Admin protégé',
      team: 'Équipe',
      type: 'Type',
      price: 'Prix',
      stock: 'Stock',
      no_jerseys: 'Aucun maillot trouvé',
      interface_admin: 'Interface administrateur',
      domicile: 'Domicile',
      exterieur: 'Extérieur',
      third: 'Third',
      size: 'Taille',
      inStock: 'En stock',
      outofstock: 'Rupture de stock',
      admin_cant_pay: 'Les administrateurs ne peuvent pas ajouter au panier.',
      reduction: 'Réduction',
      modify: 'Modifier',
      addjersey: 'Ajouter un maillot',
      add: 'Ajouter',
      championship: 'Championnats',
      image: 'Image',
      unblock: 'Débloquer',
      block: 'Bloqué',
    },
    en: {
      panier: 'Add to Cart',
      payer: 'Pay',
      vider: 'Empty cart',
      bienvenu: 'Welcome',
      championnats: 'Choose a championship',
      clubs: 'Choose a team',
      mon_panier: 'Your cart',
      panier_vide: 'Your cart is empty',
      connexion: 'Login',
      mail: 'Email',
      password: 'Password',
      register: 'Register',
      name: 'Name',
      firstname: 'Firstname',
      welcome: 'Welcome',
      confirm: 'Confirm',
      createaccount: 'Create an account',
      users: 'Users',
      jerseys: 'Jerseys',
      role: 'Role',
      action: 'Action',
      delete: 'Delete',
      protected_admin: 'Protected Admin',
      team: 'Team',
      type: 'Like',
      price: 'Price',
      stock: 'Stock',
      no_jerseys: 'No Jerseys Found',
      interface_admin: 'Administrator Interface',
      domicile: 'Home',
      exterieur: 'Away',
      third: 'Third',
      size: 'Size',
      inStock: 'In stock',
      outofstock: 'Out of stock',
      admin_cant_pay: 'Admins cannot add to cart.',
      reduction: 'Reduction',
      modify: 'Modify',
      addjersey: 'Add a jersey',
      add: 'Add',
      championship: 'Championship',
      image: 'Image',
      unblock: 'Unblocked',
      block: 'Blocked',
    },
  };

  translate(key: string): string {
    const currentLang = this.lang();
    return this.translations[currentLang][key] || key;
  }

  setLang(lang: 'fr' | 'en') {
    this.lang.set(lang);
  }

  getLang() {
    return this.lang();
  }
}
