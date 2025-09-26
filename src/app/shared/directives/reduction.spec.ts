import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReductionDirective } from './reduction.directive';
import { TranslateService } from '../services/translate.services';
import { By } from '@angular/platform-browser';

@Component({
  template: `<span [appReduction]="price"></span>`,
  standalone: true,
  imports: [ReductionDirective],
})
class TestHostComponent {
  price!: number;
}

class FakeTranslateService {
  translate(key: string) {
    return `translated-${key}`;
  }
}

describe('ReductionDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: TranslateService, useClass: FakeTranslateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
  });

  it('should display reduction text and styles for price < 80', () => {
    host.price = 50;
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.directive(ReductionDirective)).nativeElement;

    expect(span.textContent).toBe('translated-reduction');
    expect(span.style.display).toBe('inline-block');
    expect(span.style.backgroundColor).toBe('rgb(74, 140, 210)');
    expect(span.style.color).toBe('white');
  });

  it('should remove text and styles for price >= 80', () => {
    host.price = 100;
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.directive(ReductionDirective)).nativeElement;

    expect(span.textContent).toBe('');
    expect(span.getAttribute('style')).toBeNull();
  });
});
