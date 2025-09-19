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
      interface_admin: 'Interface admin',
      domicile: 'Domicile',
      exterieur: 'Extérieur',
      third: 'Third',
      size: 'Taille',
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
      interface_admin: 'Admin Interface',
      domicile: 'Home',
      exterieur: 'Away',
      third: 'Third',
      size: 'Size',
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
