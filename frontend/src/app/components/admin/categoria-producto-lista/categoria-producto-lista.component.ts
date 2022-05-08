import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-categoria-producto-lista',
  templateUrl: './categoria-producto-lista.component.html',
  styleUrls: ['./categoria-producto-lista.component.css']
})
export class CategoriaProductoListaComponent implements OnInit {

  url:string = globals.url;

  idCategoria:string = decryptNumber(this.router.snapshot.paramMap.get("id_categoria"));
  nombre_categoria:string = "";
  descripcion_categoria:string = "";
  imagen_categoria:string = "";

  listaProductoByCategoria:any;

  constructor(private router:ActivatedRoute, private http:HttpClient) {}

  ngOnInit(): void {
    this.categoriaById();
    
    this.listaProductoGrupoByCategoriaEmpresa();
  }

  //metodos para listados y peticiones
  categoriaById(){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "id_categoria": this.idCategoria};

    this.http.post(this.url+"categoria/categoriaById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.nombre_categoria = datos[0].nombre;
          this.descripcion_categoria = datos[0].descripcion;
          this.imagen_categoria = this.url + "imagenes/categorias/" + datos[0].imagen;
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaProductoGrupoByCategoriaEmpresa()
  {
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "id_categoria": this.idCategoria, 'estado': 1};

    this.http.post(this.url+"producto/listaProductoGrupoByCategoriaEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      console.log(datos_recibidos);
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaProductoByCategoria = datos;
        
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
