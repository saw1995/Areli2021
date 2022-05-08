import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaAsignarComponent } from './carga-asignar.component';

describe('CargaAsignarComponent', () => {
  let component: CargaAsignarComponent;
  let fixture: ComponentFixture<CargaAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaAsignarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
