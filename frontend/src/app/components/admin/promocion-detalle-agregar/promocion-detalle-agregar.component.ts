import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { globals } from '../../../utils/global';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { listaGestion } from '../../../utils/fecha-hora';
import Swal from 'sweetalert2';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-promocion-detalle-agregar',
  templateUrl: './promocion-detalle-agregar.component.html',
  styleUrls: ['./promocion-detalle-agregar.component.css']
})
export class PromocionDetalleAgregarComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement:any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  showModalDetallePromocion:boolean = false;
  showModalAgregarDetalle:boolean = false;

  url:string = "";
  titulo:string = "AGREGAR PROMOCION";

  id_sucursal:any = "";
  id_promocion:any = "";
  id_almacen:any = "";
  id_producto_grupo:any = "";
  id_producto:any = "";

  nombre:any = ""
  descripcion:any = ""
  precio_promocion:any = "0"
  cantidad_limite:any = "0"
  fecha_inicio:any = ""
  fecha_final:any = ""
  
  precio_detalle:any = "0.0"
  cantidad_detalle:any = "0"

  files: File[] = [];
  count_file:any = 0;

  listaCategoria:any;
  listaFamiliaProductos:any;
  listaProductos:any;
  listaPromocionDetalle:any;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicioAlmacen: ServicioAlmacenService, private servicioSucursal: ServicioSucursalService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Sucursales") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"));
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"));
      this.servicioSucursal.setIdSucursal(this.id_sucursal);
      this.servicioAlmacen.setIdAlmacen(this.id_almacen);

      this.listaCategoriaProductoStockByAlmacenEmpresaEstado()
    }else{
      this.router.navigate(['/restriccion-admin']);
    }  
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  click_AbrirDetallePromocion(){
    this.showModalDetallePromocion = true;
    this.listaPromocionDetalleProductoByIdPromocion();
  }

  click_AbrirAgregarDetalle(id_producto:any, precio_sugerido:any){
    this.id_producto = id_producto;
    this.precio_detalle = precio_sugerido;
    this.showModalAgregarDetalle = true;
  }

  agregarPromocionProductoEmpresa(){
    if(this.cantidad_detalle == "")
    {
      Swal.fire("Campo Vacio", "El campo cantidad de producto no puede estar vacío", "warning");
    }
    else
    {

      Swal.fire({title: 'Agregando Detalle',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      let parametros = {
        'id_promocion': this.id_promocion,
        'id_producto': this.id_producto,
        'precio': this.precio_detalle,
        'cantidad': this.cantidad_detalle,
        'id_usuario': localStorage.getItem('id_usuario'),
        "id_empresa": localStorage.getItem("id_empresa")
      };
      
      console.log(parametros)
      this.http.post(this.url+"promocion/agregarPromocionProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarDetalle = false;
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

  agregarPromocion(){
    if(this.nombre == "")
    {
      Swal.fire("Campo Vacio", "El campo nombre de la promocion no puede estar vacío", "warning");
    }
    else if(this.descripcion == "")
    {
      Swal.fire("Campo Vacio", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else if(this.precio_promocion == "")
    {
      Swal.fire("Campo Vacio", 
      "El campo precio promocion no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else if(this.fecha_inicio == "")
    {
      Swal.fire("Campo Vacio", 
      "El campo fecha inicio no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else if(this.fecha_final == "")
    {
      Swal.fire("Campo Vacio", 
      "El campo fecha final no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Agregando Promocion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'id_sucursal': this.id_sucursal,
        'nombre': this.nombre,
        'descripcion': this.descripcion,
        'precio': this.precio_promocion,
        'imagen': "",
        'fecha_inicio': this.fecha_inicio,
        'fecha_limite': this.fecha_final,
        'cantidad_limite': this.cantidad_limite,
        'id_usuario': localStorage.getItem('id_usuario'),
        "id_empresa": localStorage.getItem("id_empresa")
      };
      
      console.log(parametros)
      this.http.post(this.url+"promocion/agregarPromocion", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.id_promocion = datos.id_promocion

              this.titulo = "ENLAZAR PRODUCTOS A LA PROMOCION"
              let elemento:any = document.querySelector("#buttonEnlazar");
              elemento.style.display = 'block';
              elemento = document.querySelector("#cardPromocion");
              elemento.style.display = 'none';
              elemento = document.querySelector("#cardCategoria");
              elemento.style.display = 'block';

              if(this.files.length > 0){
                this.agregarImagenById()
              }else{
                this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
              }
             
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

  agregarImagenById(){
    console.log(this.files.length , " " ,this.count_file);
    console.log(this.id_promocion)
    if(this.files.length > this.count_file ) {
      Swal.fire({title: 'Agregando imagen ' + (this.count_file+1) + "/" + this.files.length,text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      const formData: FormData = new FormData();
      formData.append('imagen', this.files[this.count_file]);
      
      this.http.post(this.url+"promocion/agregarImagenById/" + this.id_promocion, formData).subscribe((datos_recibidos:any) => {
        Swal.close();
        this.count_file = this.count_file + 1;  
        this.agregarImagenById()
      });
    }else{  
      this.files = [];

      this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
    }
  }

  listaCategoriaProductoStockByAlmacenEmpresaEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_almacen": this.id_almacen,
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
      'id_almacen': this.id_almacen
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
      "id_almacen": this.id_almacen,
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

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaPromocionDetalleProductoByIdPromocion(){
    Swal.fire({title: 'Buscando Productos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_promocion": this.id_promocion,
      "estado": 1
    };

    this.http.post(this.url+"promocion/listaPromocionDetalleProductoByIdPromocion", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
  
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaPromocionDetalle = datos;

          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            this.listaPromocionDetalle[i]['imagen_uno'] = imagenes[0];
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
