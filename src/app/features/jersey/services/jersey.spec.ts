import { JerseyService } from './jersey.service';
import { Jersey } from '../../auth/models/jersey.model';

describe('JerseyService', () => {
  let service: JerseyService;

  beforeEach(() => {
    localStorage.clear();
    service = new JerseyService();
  });

  it('should delete a jersey by id', () => {
    const initialCount = service.getAllJersey().length;

    const jersey1: Jersey = {
      id: 1000,
      team: 'PSG',
      name: 'domicile',
      price: 80,
      image: '',
      championship: 'Ligue 1',
      stock: 1,
    };
    const jersey2: Jersey = {
      id: 1001,
      team: 'OM',
      name: 'exterieur',
      price: 70,
      image: '',
      championship: 'Ligue 1',
      stock: 5,
    };

    service.addJersey(jersey1);
    service.addJersey(jersey2);

    expect(service.getAllJersey().length).toBe(initialCount + 2);

    service.deleteJersey(1001);

    const remaining = service.getAllJersey();
    expect(remaining.length).toBe(initialCount + 1);
    expect(remaining.find((j) => j.id === 1001)).toBeUndefined();
  });
});
