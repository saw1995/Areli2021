import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { globals } from 'src/app/utils/global';
import { decryptNumber } from 'src/app/utils/encrypt';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-carga-asignar',
  templateUrl: './carga-asignar.component.html',
  styleUrls: ['./carga-asignar.component.css']
})
export class CargaAsignarComponent implements OnInit, AfterViewInit, OnDestroy {
  map:any;
  @ViewChild('mapElement') mapElement: any;
  marcador:any;
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  url : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  showModalDetalleProducto:boolean = false;

  id_sucursal:any;

  fecha_distribucion:any;
  id_usuario_preventa:any = '0';
  id_usuario_distribucion:any = '';
  idPreventas:any = "0";

  dtUsuariosPreventa:any = [];
  dtUsuariosDistribucion:any = [];

  opcionVisualizar:number = 1;

  total_preventas_clientes:number = 0;
  total_prven_product:number = 0;

  datosVenta:any;
  datosVentaAgrupadoProducto:any;

  listaCliente:any = [];

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labelIndex = 0;
  markersArray:any = [];

  constructor(private datePipe:DatePipe, private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioSucursalService) { }

  ngOnInit(): void {
    
    let now = new Date();
    now.setDate(now.getDate() + 1);
    this.fecha_distribucion = this.datePipe.transform(now, 'yyyy-MM-dd');

    if(localStorage.getItem("Sucursales") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))

      this.servicio.setIdSucursal(this.id_sucursal);
      
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };

      this.listaUsuarioByEmpresa();
      this.ejecutarConsultas();

    }else{
      this.router.navigate(['/restriccion-admin']);
    }

  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -16.540246638894946, lng: -64.79782730340958},
      zoom: 5
    });

    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  ejecutarConsultas(){
    if(this.opcionVisualizar == 1)
    {
      this.listaPreVentaByVentaFechaEntregaSucursalUsuario();
    }else if(this.opcionVisualizar == 2)
    {
      this.listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario();
    }
  }

  clickConsultaVenta(_nume:number){
    this.opcionVisualizar = _nume;
    this.ejecutarConsultas();
  }

  clickVerMapa(){
    this.listaPreVentaByVentaFechaEntregaSucursalUsuario();
  }

  click_detalleProducto(id_producto:any){
    this.showModalDetalleProducto = true;
    this.listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(id_producto)
  }

  agregarCargaUsuario(){
    if(this.id_usuario_distribucion != ""){
      if(this.idPreventas != ""){
        Swal.fire({title: 'Asignando Carga',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

        let parametros = {
          'id_pre_venta': this.idPreventas,
          'fecha_entrega': this.fecha_distribucion,
          'id_usuario': this.id_usuario_preventa,
          'id_usuario_distribucion': this.id_usuario_distribucion,
          'estado': "1",
          "id_empresa": localStorage.getItem("id_empresa")};

        this.http.post(this.url+"carga/agregarCargaUsuario", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();

          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];

          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              
              if(datos.affectedRows == 1)
              {
                this.listaPreVentaByVentaFechaEntregaSucursalUsuario()
              }

            }else{
              Swal.fire("Error en el Servidor", datosNodejs, "warning");
            }
          }else{
            Swal.fire("Error en la Base de Datos", datosMysql, "warning");
          }
        });
      }else{
        Swal.fire("Sin Pre Ventas", "No existe pre ventas, por tanto no se asignara carga.", "warning");
      }
    }else{
      Swal.fire("Sin Distribuidor", "Seleccione al distribuidor para asignar la carga", "warning");
    }
    
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.dtUsuariosPreventa = datos_recibidos.datos;
      this.dtUsuariosDistribucion = datos_recibidos.datos;
    });
  }

  listaPreVentaByVentaFechaEntregaSucursalUsuario(){
    Swal.fire({title: 'Buscando pre ventas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "venta": 0,
      "fecha_entrega": this.fecha_distribucion,
      "id_sucursal": this.id_sucursal,
      "id_usuario": this.id_usuario_preventa,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"venta/listaPreVentaByVentaFechaEntregaSucursalUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.total_preventas_clientes = 0;
          this.idPreventas = ""
          for(let i=0; i<this.markersArray.length; i++){
            if(this.markersArray.length > 0){
              this.markersArray[i].setMap(null);
            }
          }

          for(let i =0;i<=datos.length-1;i++){
            this.idPreventas = this.idPreventas + datos[i]["id_pre_venta"] + ",";
            datos[i].factura = datos[i].factura=='1'?"Sí":'No';
            let subtotal = datos[i].total == '' ? 0:datos[i].total;
            this.total_preventas_clientes = this.total_preventas_clientes + subtotal;

            let posicion = {lat: parseFloat(datos[i].latitud), lng: parseFloat(datos[i].longitud)}
            this.markersArray[0] = new google.maps.Marker({
              position: posicion,
              label: this.labels[this.labelIndex++ % this.labels.length],
            });
            this.markersArray[0].setMap(this.map);
            this.map.setCenter(posicion);
            this.map.setZoom(15);
          }
          this.idPreventas = this.idPreventas.substring(0, this.idPreventas.length-1);
          this.datosVenta = datos;
          
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

  listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario(){
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "venta": 0,
      "fecha_entrega": this.fecha_distribucion,
      "id_sucursal": this.id_sucursal,
      "id_usuario": this.id_usuario_preventa,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"venta/listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosVentaAgrupadoProducto = datos;
          
          this.total_prven_product = 0;
          for(let i = 0 ;i<= datos.length-1;i++){
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;

            let subtotal = datos[i].total == '' ? 0 : datos[i].total ;
            this.total_prven_product = this.total_prven_product + subtotal;
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(id_producto:any){
    Swal.fire({title: 'Buscando Detalles',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "venta": 0,
      "fecha_entrega": this.fecha_distribucion,
      "id_sucursal": this.id_sucursal,
      "id_usuario": this.id_usuario_preventa,
      "id_empresa": localStorage.getItem("id_empresa"),
      "id_producto": id_producto
    };
    
    this.http.post(this.url+"venta/listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      console.log(datos_recibidos)
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCliente = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }
}
