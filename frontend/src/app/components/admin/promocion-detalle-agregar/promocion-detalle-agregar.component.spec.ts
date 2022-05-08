import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocionDetalleAgregarComponent } from './promocion-detalle-agregar.component';

describe('PromocionDetalleAgregarComponent', () => {
  let component: PromocionDetalleAgregarComponent;
  let fixture: ComponentFixture<PromocionDetalleAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocionDetalleAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocionDetalleAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
