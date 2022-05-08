import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenPanelComponent } from './almacen-panel.component';

describe('AlmacenPanelComponent', () => {
  let component: AlmacenPanelComponent;
  let fixture: ComponentFixture<AlmacenPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlmacenPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
