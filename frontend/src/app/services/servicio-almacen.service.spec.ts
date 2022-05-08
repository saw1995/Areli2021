import { TestBed } from '@angular/core/testing';

import { ServicioAlmacenService } from './servicio-almacen.service';

describe('ServicioAlmacenService', () => {
  let service: ServicioAlmacenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAlmacenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
