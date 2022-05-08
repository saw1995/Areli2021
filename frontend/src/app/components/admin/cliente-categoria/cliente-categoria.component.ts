import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-categoria',
  templateUrl: './cliente-categoria.component.html',
  styleUrls: ['./cliente-categoria.component.css']
})
export class ClienteCategoriaComponent implements OnInit {

  url:string = globals.url;

  nombre_categoria:string = '';
  detalle_categoria:string = '';

  listaCategoriaCliente:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.listaCategoriaByIdEmpresaByEstado();
  }


  agregarTiendaCategoria(){

    if(this.nombre_categoria == "")
    {
      Swal.fire("Error en validación", "El campo nombre categoría de clientes no puede estar vacío", "warning");
    }
    else if(this.detalle_categoria == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació agregue al menos un detalle, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Esperando peticion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'nombre': this.nombre_categoria, 
        'detalle': this.detalle_categoria, 
        'id_empresa': localStorage.getItem("id_empresa"),
        'estado': 1
      };
  
      this.http.post(this.url+"tienda/agregarTiendaCategoria", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.listaCategoriaByIdEmpresaByEstado();
              this.nombre_categoria = '';
              this.detalle_categoria = '';
            }
  
          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });

    }
  }

  

  listaCategoriaByIdEmpresaByEstado(){
    Swal.fire({title: 'Cargando listado de registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "estado": 1};

    this.http.post(this.url + "tienda/listaTiendaCategoriaByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoriaCliente = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }



}
