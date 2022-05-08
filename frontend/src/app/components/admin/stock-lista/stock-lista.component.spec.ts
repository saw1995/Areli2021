import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockListaComponent } from './stock-lista.component';

describe('StockListaComponent', () => {
  let component: StockListaComponent;
  let fixture: ComponentFixture<StockListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
