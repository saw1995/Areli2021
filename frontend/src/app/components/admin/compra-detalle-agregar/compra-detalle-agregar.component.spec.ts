import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDetalleAgregarComponent } from './compra-detalle-agregar.component';

describe('CompraDetalleAgregarComponent', () => {
  let component: CompraDetalleAgregarComponent;
  let fixture: ComponentFixture<CompraDetalleAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraDetalleAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDetalleAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
