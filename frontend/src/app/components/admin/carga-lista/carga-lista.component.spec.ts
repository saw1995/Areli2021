import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaListaComponent } from './carga-lista.component';

describe('CargaListaComponent', () => {
  let component: CargaListaComponent;
  let fixture: ComponentFixture<CargaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
