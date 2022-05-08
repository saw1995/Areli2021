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
  selector: 'app-compra-detalle-agregar',
  templateUrl: './compra-detalle-agregar.component.html',
  styleUrls: ['./compra-detalle-agregar.component.css']
})
export class CompraDetalleAgregarComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement:any = DataTableDirective;
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  url:string = globals.url;
  
  id_almacen:any;
  id_compra:any;
  id_producto:any;
  id_producto_stock:any;
  imagen_producto:any = [];

  cantidad:any = 0;
  medida:any = "0";
  cantUnit:any = 0;
  fecha_vencimiento:any;
  costo:any = 0;
  costoUnit:any;
  precio_sugerido:any = "0.0";
  stocko_minimo:any = "1";
  cantidad_minima:any = "1";
  sub_total:any = 0;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaCategoria:any;
  listaFamiliaProductos:any;
  listaProductos:any;
  listaPresentacion:any;
  datosCompra:any;

  swPrimeraCompra:boolean = true;

  showModalAgregarCompra:boolean = false;
  showModalHistorialCompra:boolean = false;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))
      this.id_compra = decryptNumber(this.route.snapshot.paramMap.get("id_compra"))
      this.servicio.setIdAlmacen(this.id_almacen);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };
      
      this.listaCategoriaByIdEmpresaByEstado();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  click_detalleCompra(id_producto:any){
    this.id_producto = id_producto;
    this.showModalAgregarCompra = true;
    this.listaCompraDetalleHistorialByProductoEmpresa();
    this.listaMedidaByProductoEstado(id_producto)
  }

  click_historialCompra(id_producto:any){
    this.id_producto = id_producto;
    this.showModalHistorialCompra = true;
    this.listaCompraDetalleHistorialByProductoEmpresa()
  }

  calcularSubTotal(){
    if(this.cantidad != ""){
      if(this.costo != ""){
        this.cantUnit = this.cantidad * this.medida;
        this.costoUnit = parseFloat(this.costo) / parseFloat(this.medida);
        this.sub_total = this.cantidad * this.costo
      }else{
        Swal.fire("Campo Vacio", "No puede dejar vacio el costo", "warning");
      }
    }else{
      Swal.fire("Campo Vacio", "No puede dejar vacio la cantidad", "warning");
    }
  }

  agregarCompraDetalle(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Agregando detalle de compra',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_compra": this.id_compra,
      "cantidad": this.cantUnit,
      "costo_adquisicion": this.costoUnit,
      "estado": 1,
      "id_usuario": localStorage.getItem("id_usuario"),
      "id_empresa": localStorage.getItem("id_empresa"),
      "id_producto": this.id_producto,
      "id_almacen": this.id_almacen,
      "fecha_vencimiento": this.fecha_vencimiento,
      "stock": this.cantUnit,
      "precio_sugerido": this.precio_sugerido,
      "stock_minimo": this.stocko_minimo,
      "cantidad_minima": this.cantidad_minima
    };

    console.log(parametros)
    this.http.post(this.url+"compra/agregarCompraDetalle", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoria = datos;
          
          this.showModalAgregarCompra = false;
          this.cerrarModal.nativeElement.click();

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
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

  listaCategoriaByIdEmpresaByEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1
    };

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

  listaProductoGrupoByCategoriaEmpresa(id_categoria:string){
    this.listaProductos = [];

    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_categoria': id_categoria
    };

    this.http.post(this.url+"producto/listaProductoGrupoByCategoriaEmpresa", parametros).subscribe((datos_recibidos:any) => {
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

  listaProductoByGrupoEmpresa(id_producto_grupo:string){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': 1,
      'id_producto_grupo': id_producto_grupo
    };

    this.http.post(this.url+"producto/listaProductoByGrupoEmpresa", parametros).subscribe((datos_recibidos:any) => {
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

  listaCompraDetalleHistorialByProductoEmpresa() {
    Swal.fire({title: 'Buscando historial',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_producto": this.id_producto,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"compra/listaCompraDetalleHistorialByProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosCompra = datos;

          if(this.datosCompra.length > 0){
            for(let i=0; i<this.datosCompra.length; i++){
              if(this.id_almacen == this.datosCompra[i]["id_almacen"]){
                this.swPrimeraCompra = false;
                let costoAdq = parseFloat(this.datosCompra[i]["costo_adquisicion"])
                this.costo = costoAdq;
              }
            }
          }else{
            this.swPrimeraCompra = true;
          }
          

          if(this.swPrimeraCompra){
            let elemento:any = document.querySelector("#divAjuste");
            elemento.style.display = 'block';
          }else{
            let elemento:any = document.querySelector("#divAjuste");
            elemento.style.display = 'none';
          }

          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
  
            this.dtOptions = {
              pagingType: 'full_numbers',
              pageLength: 5,
              lengthMenu : [5, 10, 25],
              processing: true,
              language: {
                url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
              }
            };
            this.dtTrigger.next(this.dtOptions);
          });
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
