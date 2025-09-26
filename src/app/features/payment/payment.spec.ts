import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './component/payment.component';
import { PanierService } from '../panier/services/panier.service';
import { FormsModule } from '@angular/forms';
import { Jersey } from '../auth/models/jersey.model';

describe('PaymentComponent Integration', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let panierService: jasmine.SpyObj<PanierService>;

  beforeEach(async () => {
    const panierSpy = jasmine.createSpyObj('PanierService', ['panierItems', 'clearPanier']);

    await TestBed.configureTestingModule({
      imports: [PaymentComponent, FormsModule],
      providers: [{ provide: PanierService, useValue: panierSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;

    panierService = TestBed.inject(PanierService) as jasmine.SpyObj<PanierService>;

    const mockJersey: Jersey = {
      id: 1,
      name: 'Domicile',
      team: 'PSG',
      price: 50,
      stock: 10,
      image: '',
      championship: 'Ligue 1',
    };
    panierService.panierItems.and.returnValue([{ jersey: mockJersey, size: 'M' }]);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display items from the panier', () => {
    fixture.detectChanges();
    expect(component.panierItems.length).toBe(1);
    expect(component.panierItems[0].jersey.name).toBe('Domicile');
  });

  it('should calculate the total correctly', () => {
    expect(component.getTotal()).toBe(50);
  });
});
