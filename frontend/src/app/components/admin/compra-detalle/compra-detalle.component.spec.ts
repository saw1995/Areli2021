import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraDetalleComponent } from './compra-detalle.component';

describe('CompraDetalleComponent', () => {
  let component: CompraDetalleComponent;
  let fixture: ComponentFixture<CompraDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
