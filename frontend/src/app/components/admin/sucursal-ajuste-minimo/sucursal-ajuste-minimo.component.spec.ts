import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalAjusteMinimoComponent } from './sucursal-ajuste-minimo.component';

describe('SucursalAjusteMinimoComponent', () => {
  let component: SucursalAjusteMinimoComponent;
  let fixture: ComponentFixture<SucursalAjusteMinimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucursalAjusteMinimoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalAjusteMinimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
