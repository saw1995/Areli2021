import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosAccesosComponent } from './cargos-accesos.component';

describe('CargosAccesosComponent', () => {
  let component: CargosAccesosComponent;
  let fixture: ComponentFixture<CargosAccesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosAccesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosAccesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
