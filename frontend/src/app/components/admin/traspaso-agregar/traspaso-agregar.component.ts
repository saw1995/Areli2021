import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { globals } from '../../../utils/global';
import { decryptNumber } from '../../../utils/encrypt';
import { listaGestion } from '../../../utils/fecha-hora';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-traspaso-agregar',
  templateUrl: './traspaso-agregar.component.html',
  styleUrls: ['./traspaso-agregar.component.css']
})
export class TraspasoAgregarComponent implements OnInit {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  url : any;

  id_sucursal_emisor:any = "";
  id_almacen_emisor:any = "";
  id_sucursal_receptor:any = "1";
  id_almacen_receptor:any = "";
  id_producto_grupo:any;
  id_producto:any = "";
  stock:any = "";
  cantidad_minima:any = "";
  concepto:any = "";

  cant_envio:any = 0
  cantidad:any = "0";
  medida:any = "0";

  datosSucursal:any = []
  datosAlmacen:any = []
  listaCategoria:any;
  listaFamiliaProductos:any;
  listaProductos:any;
  listaPresentacion:any = [];

  showModalPresentacion:boolean = false;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    this.url = globals.url;
      this.id_sucursal_emisor = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))
      this.id_almacen_emisor = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))

      this.servicio.setIdAlmacen(this.id_almacen_emisor);

      this.listaSucursalByEmpresa();
      this.listaAlmacenBySucursalEmpresa();
      this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
  }

  changeSucursal() {
    this.id_almacen_receptor = "";
    this.listaAlmacenBySucursalEmpresa();
  }
  
  click_presentacion(id_producto:any, stock:any, cantidad_minima:any) {
    this.cantidad = 0;
    this.medida = 0;

    this.id_producto = id_producto;
    this.stock = stock;
    this.cantidad_minima = cantidad_minima;
    this.showModalPresentacion = true;
    this.listaMedidaByProductoEstado(id_producto)
  }

  agregarTraspaso(){
    if(this.calcular_cantidad()){
      if(this.concepto != ""){
        if(this.id_almacen_receptor != ""){
          if(parseInt(this.medida) != 0){
            Swal.fire({title: 'Traspasando producto',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
            let parametros = {
              "concepto": this.concepto,
              "id_producto": this.id_producto,
              "id_almacen_emisor": this.id_almacen_emisor,
              "id_almacen_receptor": this.id_almacen_receptor,
              "cantidad": this.cant_envio,
              "estado": "1",
              "id_usuario": localStorage.getItem("id_usuario"),
              "id_empresa": localStorage.getItem("id_empresa")
            };
            this.http.post(this.url+"traspaso/agregarTraspaso", parametros).subscribe((datos_recibidos:any) => {
              Swal.close();
          
              let datos = datos_recibidos["datos"];
              let datosMysql = datos_recibidos["mysql"];
              let datosNodejs = datos_recibidos["nodejs"];
  
              if(datosMysql === undefined){
                if(datosNodejs === undefined){
                
                  if(datos.affectedRows == 1)
                  {
                    this.cerrarModal.nativeElement.click();
                    this.showModalPresentacion = false;
                    this.listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(this.id_producto_grupo)
                  }
                }else{
                  Swal.fire("Error en el Servidor", datosNodejs, "warning");
                }
              }else{
                Swal.fire("Error en la Base de Datos", datosMysql, "warning");
              }
            });
          }else{
            Swal.fire("Error en validación", "Seleccione una presentacion del producto, intente nuevamente", "warning");
          }
        }else{
          Swal.fire("Error en validación", "Introduza el concepto de traspaso, intente nuevamente", "warning");
        }
      }else{
        Swal.fire("Error en validación", "Seleccione el almacen de recepcion, intente nuevamente", "warning");
      }
      
    }
  }
  
  calcular_cantidad(){
    this.cant_envio = parseInt(this.cantidad) * parseInt(this.medida);

    if(this.cant_envio <= parseInt(this.stock)){
      return true;
    }else{
      Swal.fire("Stock Insuficiente", "Ingrese una cantidad menor al stock actual", "info");
      return false;
    }
  }

  listaSucursalByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"sucursal/listaSucursalByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosSucursal = datos_recibidos.datos;
    });
  }

  listaAlmacenBySucursalEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "id_sucursal": this.id_sucursal_receptor,
    };
    this.http.post(this.url+"almacen/listaAlmacenBySucursalEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosAlmacen = datos_recibidos.datos;
    });
  }

  listaMedidaByProductoEstado(id_producto:any) {
    let parametros = {
      "id_producto": id_producto,
      "estado": "1",
    };
    this.http.post(this.url+"producto/listaMedidaByProductoEstado", parametros).subscribe((datos_recibidos:any) => {
      this.listaPresentacion = datos_recibidos.datos;
    });
  }

  listaCategoriaProductoStockByAlmacenEmpresaEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_almacen": this.id_almacen_emisor,
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1
    };

    this.http.post(this.url+"categoria/listaCategoriaProductoStockByAlmacenEmpresaEstado", parametros).subscribe((datos_recibidos:any) => {
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

  listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria:string){
    this.listaProductos = [];

    Swal.fire({title: 'Buscando familia de producto',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_categoria': id_categoria,
      'id_almacen': this.id_almacen_emisor
    };

    this.http.post(this.url+"productostock/listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa", parametros).subscribe((datos_recibidos:any) => {
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

  listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_producto_grupo:string){
    this.id_producto_grupo = id_producto_grupo;
    Swal.fire({title: 'Buscando productos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_almacen": this.id_almacen_emisor,
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': 1,
      'id_producto_grupo': id_producto_grupo
    };

    this.http.post(this.url+"productostock/listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
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
          console.log(this.listaProductos)
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
