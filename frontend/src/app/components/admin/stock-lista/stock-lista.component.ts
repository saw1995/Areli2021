import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { decryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-stock-lista',
  templateUrl: './stock-lista.component.html',
  styleUrls: ['./stock-lista.component.css']
})
export class StockListaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;

  id_almacen:any;
  id_producto:any;
  id_producto_stock:any;
  imagen_producto:any = [];

  url:string = globals.url;

  listaCategoria:any;
  listaFamiliaProductos:any;
  listaProductos:any;
  listaStockDetalle:any;
  listaKardex:any;

  objProductoSeleccionado:any;

  showModalStockDetalle:boolean = false;
  showModalKardex:boolean = false;

  suma_total_adquisicion:number = 0;
  suma_total_venta:number = 0;

  suma_entradas_saldo:number = 0;
  suma_salidas_saldo:number = 0;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))
      this.servicio.setIdAlmacen(this.id_almacen);

      this.listaCategoriaByIdEmpresaByEstado();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  clickAbrirStockDetalle(_idProducto:string, imagen_producto:any){
    this.id_producto = _idProducto;
    this.imagen_producto = imagen_producto;
    this.listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(this.id_producto)
    this.showModalStockDetalle = true;
  }

  clickAbrirKardex(_idProductoStock:any){
    this.id_producto_stock = _idProductoStock;
    this.listaKardexStockByProductoStockEmpresa(this.id_producto_stock)
    this.showModalKardex = true;
  }

  listaCategoriaByIdEmpresaByEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "estado": 1};

    this.http.post(this.url+"categoria/listaCategoriaByIdEmpresaByEstado", parametros).subscribe((datos_recibidos:any) => {
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
    this.listaProductos = [];

    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
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

  listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa(id_producto_grupo:string){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_almacen": this.id_almacen,
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': 1,
      'id_producto_grupo': id_producto_grupo
    };

    this.http.post(this.url+"productostock/listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;
          }
          this.listaProductos = datos;
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(id_producto:string){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_almacen": this.id_almacen,
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': 1,
      'id_producto': id_producto
    };

    this.http.post(this.url+"productostock/listaProductoEmpresaStockCeroByAlmacenProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.objProductoSeleccionado = datos[0];
          this.objProductoSeleccionado.imagen = datos[0].imagen.split(",");
          this.listaStockDetalle = datos;

          this.suma_total_adquisicion = 0;
          this.suma_total_venta = 0;

          for(let i = 0 ; i<= datos.length - 1; i++){
            this.suma_total_adquisicion = this.suma_total_adquisicion + datos[i].total_costo_adquisicion;
            this.suma_total_venta = this.suma_total_venta + datos[i].total_precio_sugerido;
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaKardexStockByProductoStockEmpresa(id_producto_stock:string){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'id_producto_stock': id_producto_stock
    };
    
    this.http.post(this.url+"productostock/listaKardexStockByProductoStockEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaKardex = datos;

          this.suma_entradas_saldo = 0;
          this.suma_salidas_saldo = 0;

          for(let  i = 0 ;i<= datos.length -1; i++){
            this.listaKardex[i].entrada_saldo = datos[i].entrada_salida == '0' ?  datos[i].total: null;
            this.listaKardex[i].salida_saldo = datos[i].entrada_salida == '1' ?  datos[i].total: null;

            this.suma_entradas_saldo = this.suma_entradas_saldo + this.listaKardex[i].entrada_saldo;
            this.suma_salidas_saldo = this.suma_salidas_saldo + this.listaKardex[i].salida_saldo

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
