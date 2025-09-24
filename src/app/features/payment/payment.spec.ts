import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './component/payment.component';
import { PanierService } from '../panier/services/panier.service';
import { JerseyService } from '../jersey/services/jersey.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Jersey } from '../auth/models/jersey.model';
describe('PaymentComponent Integration', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let panierService: jasmine.SpyObj<PanierService>;
  let jerseyService: jasmine.SpyObj<JerseyService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const panierSpy = jasmine.createSpyObj('PanierService', ['panierItems', 'clearPanier']);
    const jerseySpy = jasmine.createSpyObj('JerseyService', ['decrementStock']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [PaymentComponent, FormsModule],
      providers: [
        { provide: PanierService, useValue: panierSpy },
        { provide: JerseyService, useValue: jerseySpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;

    panierService = TestBed.inject(PanierService) as jasmine.SpyObj<PanierService>;
    jerseyService = TestBed.inject(JerseyService) as jasmine.SpyObj<JerseyService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    // Simuler un panier avec 1 maillot
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

  it('should call services and navigate on successful payment', () => {
    // Remplir le formulaire avec des valeurs valides
    component.cardName = 'John Doe';
    component.cardNumber = '1234567812345678';
    component.expDate = '12/25';
    component.cvv = '123';

    const fakeForm = { valid: true } as NgForm;

    component.submitPayment(fakeForm);

    expect(jerseyService.decrementStock).toHaveBeenCalledWith(1, 1);
    expect(panierService.clearPanier).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/jersey']);
  });
});
