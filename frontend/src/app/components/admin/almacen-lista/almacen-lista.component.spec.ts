import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenListaComponent } from './almacen-lista.component';

describe('AlmacenListaComponent', () => {
  let component: AlmacenListaComponent;
  let fixture: ComponentFixture<AlmacenListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
