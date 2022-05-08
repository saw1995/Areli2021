import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoCantidadComponent } from './descuento-cantidad.component';

describe('DescuentoCantidadComponent', () => {
  let component: DescuentoCantidadComponent;
  let fixture: ComponentFixture<DescuentoCantidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescuentoCantidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescuentoCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
