import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cargos-accesos',
  templateUrl: './cargos-accesos.component.html',
  styleUrls: ['./cargos-accesos.component.css']
})
export class CargosAccesosComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;

  showModalAgregarCargo:boolean = false;
  showModalListaSucursalNoAgregado:boolean = false;
  showModalListaAlmacenesNoAgregados:boolean = false;
  showModalListaModulosNoAgregados:boolean = false;
  showModalListaCategoriaClienteNoAgregados:boolean = false;

  nombre_cargo_seleccionado:string = '';
  idRolSeleccionado:string = '';

  nombre_cargo:string = '';

  listaRol:any;

  listaSucursal:any;
  listaAlmacen:any;
  listaModulo:any;
  listaTiendaCategoria:any;

  listaSucursalNoAgregado:any;
  listaAlmacenNoAgregado:any;
  listaModuloNoAgregado:any;
  listaCategoriaClienteNoAgregado:any;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("Configuracion") != undefined){
      this.listaRolByIdEmpresa();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  clickAbrirCargo(){
    this.showModalAgregarCargo = true;
  }

  clickAbrirModalListaSucursalNoAgregado(){
    if(this.idRolSeleccionado != '')
    {
    this.listaSucursalRolNoRegistradoByRol();
    this.showModalListaSucursalNoAgregado = true;}
  }

  clickAbrirModalListaAlmacenNoAgregado(){
    if(this.idRolSeleccionado != '')
    {
    this.listaAlmacenRolNoRegistradoByRol();
    this.showModalListaAlmacenesNoAgregados = true;}
  }

  clickAbrirModalListaModuloNoAgregado(){
    if(this.idRolSeleccionado != '')
    {
    this.listaModuloRolNoRegistradoByRol();
    this.showModalListaModulosNoAgregados = true;}
  }

  clickAbrirModalListaCategoriaClienteNoAgregado(){
    if(this.idRolSeleccionado != '')
    {
    this.listaCategoriaTiendaRolNoRegistradoByRol();
    this.showModalListaCategoriaClienteNoAgregados = true;}
  }

  clickCargarDatosByRol(_idRol:string, _rol:string){
    this.idRolSeleccionado = _idRol;
    this.nombre_cargo_seleccionado = _rol.toUpperCase();

    this.listaSucursalRolByRol(_idRol);
    this.listaAlmacenRolByRol(_idRol);
    this.listaModuloRolByRol(_idRol);
    this.listaCategoriaTiendaRolByRol(_idRol);
  }

  agregarRol(){

    if(this.nombre_cargo == '')
    {
      Swal.fire("Error validación de datos. . .", "El Campo nombre cargo no puede estar vacío. . .", "warning");
    }
    else
    {
      Swal.fire({title: 'Agregando Cargo',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
      let parametros = {
        "nombre": this.nombre_cargo,
        "id_empresa": localStorage.getItem("id_empresa")
      };
  
      this.http.post(this.url + "rol/agregarRol", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows == 1)
            {
              this.listaRolByIdEmpresa();
              this.showModalAgregarCargo = false;
              this.cerrarModal.nativeElement.click();
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

  agregarSucursalRol(_idSucursal:string){
    Swal.fire({title: 'Agregando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      "id_sucursal": _idSucursal,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "sucursal/agregarSucursalRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaSucursalRolByRol(this.idRolSeleccionado);
            this.showModalListaModulosNoAgregados = false;
            this.cerrarModal.nativeElement.click();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  agregarAlmacenRol(_idAlmacen:string){
    Swal.fire({title: 'Agregando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      "id_almacen": _idAlmacen,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "almacen/agregarAlmacenRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaAlmacenRolByRol(this.idRolSeleccionado);
            this.showModalListaAlmacenesNoAgregados = false;
            this.cerrarModal.nativeElement.click();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  agregarTiendaCategoriaRol(_idTiendaCategoria:string){
    
    Swal.fire({title: 'Agregando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      "id_tienda_categoria": _idTiendaCategoria,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "tienda/agregarTiendaCategoriaRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaCategoriaTiendaRolByRol(this.idRolSeleccionado);
            this.showModalListaCategoriaClienteNoAgregados = false;
            this.cerrarModal.nativeElement.click();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  agregarRolModulo(_idModulo:string){
    
    Swal.fire({title: 'Agregando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      "id_modulo": _idModulo,
      "estado": 1,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "rol/agregarRolModulo", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaModuloRolByRol(this.idRolSeleccionado);
            this.showModalListaModulosNoAgregados = false;
            this.cerrarModal.nativeElement.click();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  eliminarSucursalRolById(_idSucursal:string){
    
    Swal.fire({title: 'Eliminando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal": _idSucursal,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "sucursal/eliminarSucursalRolById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaSucursalRolByRol(this.idRolSeleccionado);
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  eliminarAlmacenRolById(_idAlmacen:string){
    
    Swal.fire({title: 'Eliminando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}}); 
    let parametros = {
      "id_almacen": _idAlmacen,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "almacen/eliminarAlmacenRolById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaAlmacenRolByRol(this.idRolSeleccionado);
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  eliminarRolModulo(_idModulo:string){
    
    Swal.fire({title: 'Eliminando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_rol": this.idRolSeleccionado,
      "id_modulo": _idModulo
    };

    this.http.post(this.url + "rol/eliminarRolModulo", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaModuloRolByRol(this.idRolSeleccionado);
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  eliminarTiendaCategoriaRolById(_idTiendaCategoria:string){
    
    Swal.fire({title: 'Eliminando acceso',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      "id_tienda_categoria": _idTiendaCategoria,
      "id_rol": this.idRolSeleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "tienda/eliminarTiendaCategoriaRolById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaCategoriaTiendaRolByRol(this.idRolSeleccionado);
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  listaRolByIdEmpresa(){
    Swal.fire({title: 'Buscando cargos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa")};

    this.http.post(this.url + "rol/listaRolByIdEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaRol = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaSucursalRolByRol(_idRol:string){
    let parametros = {"estado": 1, "id_rol": _idRol ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando sucursales',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.post(this.url + "sucursal/listaSucursalRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaSucursal = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaAlmacenRolByRol(_idRol:string){
    let parametros = {"estado": 1, "id_sucursal": 1, "id_rol": _idRol ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando almacenes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.post(this.url + "almacen/listaAlmacenRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaAlmacen = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaModuloRolByRol(_idRol:string){
    let parametros = {"id_rol": _idRol ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando modulos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    this.http.post(this.url + "rol/listaModuloRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaModulo = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  listaCategoriaTiendaRolByRol(_idRol:string){
    let parametros = {"estado": 1,"id_rol": _idRol ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando categorias de tiendas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.post(this.url + "tienda/listaCategoriaTiendaRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaTiendaCategoria = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaSucursalRolNoRegistradoByRol(){
    let parametros = {"estado": 1,"id_rol": this.idRolSeleccionado ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando sucursales',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    this.http.post(this.url + "sucursal/listaSucursalRolNoRegistradoByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaSucursalNoAgregado = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  listaAlmacenRolNoRegistradoByRol(){
    let parametros = {"estado": 1,"id_rol": this.idRolSeleccionado ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando almacen',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    this.http.post(this.url + "almacen/listaAlmacenRolNoRegistradoByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaAlmacenNoAgregado = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaModuloRolNoRegistradoByRol(){
    let parametros = {"id_rol": this.idRolSeleccionado ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando modulos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.post(this.url + "rol/listaModuloRolNoRegistradoByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaModuloNoAgregado = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaCategoriaTiendaRolNoRegistradoByRol(){
    let parametros = {"estado": 1, "id_rol": this.idRolSeleccionado ,"id_empresa": localStorage.getItem("id_empresa")};
    Swal.fire({title: 'Buscando categoria de tiendas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    this.http.post(this.url + "tienda/listaCategoriaTiendaRolNoRegistradoByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoriaClienteNoAgregado = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
