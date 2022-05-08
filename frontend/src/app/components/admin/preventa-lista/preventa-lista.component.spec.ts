import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventaListaComponent } from './preventa-lista.component';

describe('PreventaListaComponent', () => {
  let component: PreventaListaComponent;
  let fixture: ComponentFixture<PreventaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreventaListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
