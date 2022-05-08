import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaProductoListaComponent } from './categoria-producto-lista.component';

describe('CategoriaProductoListaComponent', () => {
  let component: CategoriaProductoListaComponent;
  let fixture: ComponentFixture<CategoriaProductoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaProductoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaProductoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
