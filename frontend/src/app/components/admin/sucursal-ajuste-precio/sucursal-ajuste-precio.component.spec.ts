import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalAjustePrecioComponent } from './sucursal-ajuste-precio.component';

describe('SucursalAjustePrecioComponent', () => {
  let component: SucursalAjustePrecioComponent;
  let fixture: ComponentFixture<SucursalAjustePrecioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalAjustePrecioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalAjustePrecioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
