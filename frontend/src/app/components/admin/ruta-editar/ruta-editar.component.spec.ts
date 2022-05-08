import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaEditarComponent } from './ruta-editar.component';

describe('RutaEditarComponent', () => {
  let component: RutaEditarComponent;
  let fixture: ComponentFixture<RutaEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RutaEditarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
