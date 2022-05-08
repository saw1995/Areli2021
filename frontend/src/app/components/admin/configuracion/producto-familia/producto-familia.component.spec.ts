import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoFamiliaComponent } from './producto-familia.component';

describe('ProductoFamiliaComponent', () => {
  let component: ProductoFamiliaComponent;
  let fixture: ComponentFixture<ProductoFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
