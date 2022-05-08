import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribucionListaComponent } from './distribucion-lista.component';

describe('DistribucionListaComponent', () => {
  let component: DistribucionListaComponent;
  let fixture: ComponentFixture<DistribucionListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistribucionListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribucionListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
