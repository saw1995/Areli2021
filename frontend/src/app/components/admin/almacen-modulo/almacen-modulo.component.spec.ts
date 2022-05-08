import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenModuloComponent } from './almacen-modulo.component';

describe('AlmacenModuloComponent', () => {
  let component: AlmacenModuloComponent;
  let fixture: ComponentFixture<AlmacenModuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenModuloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenModuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
