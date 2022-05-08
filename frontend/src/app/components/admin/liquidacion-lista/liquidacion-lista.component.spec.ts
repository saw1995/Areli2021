import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionListaComponent } from './liquidacion-lista.component';

describe('LiquidacionListaComponent', () => {
  let component: LiquidacionListaComponent;
  let fixture: ComponentFixture<LiquidacionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiquidacionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
