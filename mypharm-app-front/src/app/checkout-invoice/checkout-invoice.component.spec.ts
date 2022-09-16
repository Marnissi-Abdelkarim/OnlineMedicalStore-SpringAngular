import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutInvoiceComponent } from './checkout-invoice.component';

describe('CheckoutInvoiceComponent', () => {
  let component: CheckoutInvoiceComponent;
  let fixture: ComponentFixture<CheckoutInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
