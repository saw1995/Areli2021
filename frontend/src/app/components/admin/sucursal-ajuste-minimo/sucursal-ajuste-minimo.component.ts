import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal-ajuste-minimo',
  templateUrl: './sucursal-ajuste-minimo.component.html',
  styleUrls: ['./sucursal-ajuste-minimo.component.css']
})
export class SucursalAjusteMinimoComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  showModalAjusteStockMinimo:boolean = false;

  url:string = globals.url;

  id_sucursal:string = '';
  id_almacen:string = '';
  id_producto_grupo:string = '';
  producto_selecionado:string = '';

  stock_minimo_unidad:number = 0;
  cantidad_minimo_unidad:number = 0;

  listaCategoria:any;
  listaFamiliaProductos:any;

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

  clickAbrirAjusteStock(_idGrupo:string, _productoDescripcion:string){
    this.id_producto_grupo = _idGrupo;
    this.producto_selecionado = _productoDescripcion;
    this.showModalAjusteStockMinimo = true;

    this.stockMinimoCantidadMinimaByProductoGrupoAlmacen();
  }

  actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen(){    
    Swal.fire({title: 'Actualizando datos. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    if(this.stock_minimo_unidad != 0)
    {
      if(this.cantidad_minimo_unidad != 0)
      {
        let parametros = {
          "stock_minimo": this.stock_minimo_unidad,
          "cantidad_minima": this.cantidad_minimo_unidad,
          "id_producto_grupo": this.id_producto_grupo,
          "id_almacen": this.id_almacen,
          "id_empresa": localStorage.getItem("id_empresa")
        };
        
        this.http.post(this.url+"productostock/actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();

          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
          
          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              if(datos.affectedRows == 1)
              {
                this.cerrarModal.nativeElement.click();
                this.showModalAjusteStockMinimo = false;
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
        Swal.fire("Error en validación", "La cantidad minima en unidades para la venta no puede ser igual o menor a cero, intente nuevamente. . .", "warning");  
      }
    }
    else
    {
      Swal.fire("Error en validación", "El stock minimo en unidades de alerta no puede ser igual o menor a cero, intente nuevamente. . .", "warning");
    }

  }

  stockMinimoCantidadMinimaByProductoGrupoAlmacen(){

    Swal.fire({title: 'Cargando registros. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "id_producto_grupo": this.id_producto_grupo,
      "id_almacen": this.id_almacen
    };
    
    this.http.post(this.url + "productostock/stockMinimoCantidadMinimaByProductoGrupoAlmacen", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){

          this.stock_minimo_unidad = datos[0].stock_minimo;
          this.cantidad_minimo_unidad = datos[0].cantidad_minima;

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
          
          this.listaCategoriaProductoStockCeroByAlmacenEmpresaEstado();

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
