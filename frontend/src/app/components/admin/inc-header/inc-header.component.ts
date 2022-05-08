import { Component, OnInit } from '@angular/core';
import { globals } from '../../../utils/global';

@Component({
  selector: 'inc-header',
  templateUrl: './inc-header.component.html',
  styleUrls: ['./inc-header.component.css']
})
export class IncHeaderComponent implements OnInit {
  url : any;
  usuario : any;
  foto : any;
  cargo : any;
  logo : any;

  menu_selec: any = "";

  constructor() { }

  ngOnInit(): void {
    this.url = globals.url;
    this.usuario = localStorage.getItem("nombre_usuario") + " " + localStorage.getItem("appat_usuario") + " " + localStorage.getItem("apmat_usuario");
    this.foto = localStorage.getItem("foto_usuario");
    this.cargo = localStorage.getItem("nombre_rol");
    this.logo = localStorage.getItem("logo_empresa");
  }
}
