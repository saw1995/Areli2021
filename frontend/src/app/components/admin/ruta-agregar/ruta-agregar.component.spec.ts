import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaAgregarComponent } from './ruta-agregar.component';

describe('RutaAgregarComponent', () => {
  let component: RutaAgregarComponent;
  let fixture: ComponentFixture<RutaAgregarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaAgregarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaAgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
