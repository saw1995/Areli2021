import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioAlmacenService {

  public id_almacen:any = "";

  constructor() { }

  setIdAlmacen(id_almacen: any) {
    this.id_almacen = id_almacen;
  }

  getIdAlmacen() {
    return this.id_almacen;
  }
}
