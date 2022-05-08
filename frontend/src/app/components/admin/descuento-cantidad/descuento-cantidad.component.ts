import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descuento-cantidad',
  templateUrl: './descuento-cantidad.component.html',
  styleUrls: ['./descuento-cantidad.component.css']
})
export class DescuentoCantidadComponent implements OnInit {
  
  url:string = globals.url;

  showModalDecuentoCantidad:boolean = false;

  id_sucursal:string = '';
  id_almacen:string = '';
  id_grupo_producto:string = '';

  listaCategoria:any;
  listaFamiliaProductos:any;
  listaDescuentoProductos:any;

  nombre_producto:string = '';
  precio_unidad:number = 0;

  cantidad_minima_agregar:number = 0;
  cantidad_maxima_agregar:number = 0;
  fecha_limite_agregar:string = '';
  precio_descuento_agregar:number = 0;

  descuento_calculado:number = 0;
  porcentaje_calculado:number = 0;


  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioSucursalService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))
      this.servicio.setIdSucursal(this.id_sucursal);
      
      this.almacenVentaSucursalBySucursalVenta();
      
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }
  
  keyupCalcularPorcentajeDescuento(){
    this.descuento_calculado =  this.precio_unidad - this.precio_descuento_agregar;
    this.porcentaje_calculado = (this.descuento_calculado/this.precio_unidad) * 100;
  }

  clickAbrirDescuentoCantidad(_idGrupoProducto:string)
  {
    this.id_grupo_producto = _idGrupoProducto;
    this.listaDescuentoCantidadBySucursalProductoGrupo();
    this.listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa();
    this.showModalDecuentoCantidad = true;
  }

  actualizarEstadoDescuentoCantidadById(_estado:number, _id:string){

    Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "estado": _estado,
      'id': _id,
      'id_empresa': localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"descuento/actualizarEstadoDescuentoCantidadById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
    
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1)
          {
            this.listaDescuentoCantidadBySucursalProductoGrupo();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }

  agregarDescuentoCantidad(){
    if(this.cantidad_minima_agregar > 0)
    {
      if(this.cantidad_maxima_agregar > 0)
      {
        if(this.precio_descuento_agregar > 0)
        {
          if(this.precio_descuento_agregar <= this.precio_unidad)
          {

            Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
            let parametros = {
              "id_sucursal": this.id_sucursal,
              'id_producto_grupo': this.id_grupo_producto,
              'fecha_limite': this.fecha_limite_agregar,
              'cantidad_inicio': this.cantidad_minima_agregar,
              "cantidad_limite": this.cantidad_maxima_agregar,
              'precio': this.precio_unidad,
              'porcentaje_descuento': this.porcentaje_calculado,
              'estado': 1,
              'id_usuario': localStorage.getItem("id_usuario"),
              'id_empresa': localStorage.getItem("id_empresa")
            };

            this.http.post(this.url+"descuento/agregarDescuentoCantidad", parametros).subscribe((datos_recibidos:any) => {
              Swal.close();
              
              let datos = datos_recibidos["datos"];
              let datosMysql = datos_recibidos["mysql"];
              let datosNodejs = datos_recibidos["nodejs"];
            
              if(datosMysql === undefined){
                if(datosNodejs === undefined){
                  if(datos.affectedRows == 1)
                  {
                    this.listaDescuentoCantidadBySucursalProductoGrupo();

                    this.cantidad_minima_agregar = 0;
                    this.cantidad_maxima_agregar = 0;
                    this.precio_descuento_agregar = 0;
                    this.descuento_calculado = 0;
                    this.porcentaje_calculado = 0;
                  }
                }else{
                  Swal.fire("Error en el Servidor", datosNodejs, "warning");
                }
              }else{
                Swal.fire("Error en la Base de Datos", datosMysql, "warning");
              }
            });
          }
          else
          {
            Swal.fire("Error en validación", "El precio des descuento no es valido este no puede ser menor o igual a cero, intente nuevamente. . .", "warning");
          }
        }
        else
        {
          Swal.fire("Error en validación", "El precio des descuento no es valido este no puede ser menor o igual a cero, intente nuevamente. . .", "warning");
        }
      }
      else
      {
        Swal.fire("Error en validación", "La cantidad maxima a agregar no puede ser menor o igual a cero, intente nuevamente. . .", "warning");
      }
    }
    else
    {
      Swal.fire("Error en validación", "La cantidad minima a agregar no puede ser menor o igual a cero, intente nuevamente. . .", "warning");
    }
  }
  

  listaDescuentoCantidadBySucursalProductoGrupo(){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_sucursal": this.id_sucursal,
      'id_producto_grupo': this.id_grupo_producto,
      'estado': 1,
      'id_empresa': localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"descuento/listaDescuentoCantidadBySucursalProductoGrupo", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
    
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaDescuentoProductos = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }

  listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(){
    
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_producto_grupo': this.id_grupo_producto,
      'id_almacen': this.id_almacen
    };

    this.http.post(this.url+"productostock/listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.nombre_producto = datos[0].nombre;
          this.precio_unidad = datos[0].precio_sugerido;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  
  listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria:string){

    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_categoria': id_categoria,
      'id_almacen': this.id_almacen
    };

    this.http.post(this.url+"productostock/listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaFamiliaProductos = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "id_almacen": this.id_almacen
    };
    
    this.http.post(this.url+"categoria/listaCategoriaProductoStockCeroByAlmacenEmpresaEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoria = datos;

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  almacenVentaSucursalBySucursalVenta(){

    Swal.fire({title: 'Buscando datos de sucursal. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "venta": 1,
      'id_sucursal': this.id_sucursal
    };

    this.http.post(this.url+"almacen/almacenVentaSucursalBySucursalVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.id_almacen = datos[0].id;

          this.listaCategoriaProductoStockCeroByAlmacenEmpresaEstado()
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

}
