import { TestBed } from '@angular/core/testing';
import { TranslatePipe } from './translate.pipe';
import { TranslateService } from '../services/translate.services';

// 🔹 Mock du service
class MockTranslateService {
  translate(key: string): string {
    const dict: Record<string, string> = {
      panier: 'Panier',
      bienvenu: 'Bienvenue',
    };
    return dict[key] || key; // si clé inconnue, renvoie la clé
  }
}

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        TranslatePipe, // 🔹 important pour inject()
      ],
    });

    // Création de la pipe dans un contexte d'injection
    pipe = TestBed.inject(TranslatePipe);
  });

  it('should translate known keys', () => {
    expect(pipe.transform('panier')).toBe('Panier');
    expect(pipe.transform('bienvenu')).toBe('Bienvenue');
  });

  it('should return the key if translation is missing', () => {
    expect(pipe.transform('unknown_key')).toBe('unknown_key');
  });
});
