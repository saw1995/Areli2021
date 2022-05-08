import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { listaGestion } from 'src/app/utils/fecha-hora';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preventa-lista',
  templateUrl: './preventa-lista.component.html',
  styleUrls: ['./preventa-lista.component.css']
})
export class PreventaListaComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  url : any;

  id_usuario:any;
  id_sucursal:any;
  mes:any;
  gestionActual:any;
  rangoUno:string = ""
  rangoDos:string = ""
  fecha_inicio:string = ""
  fecha_final:string = ""
  enviar_fecha_inicio:string = ""
  enviar_fecha_final:string = ""

  estado_preventa:string = '-1';
  tipo_preventa:string = '-1';

  tipo_consulta:number = 1;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  datosGestion:any = []
  datosUsuario:any = []
  datosVenta:any = []
  datosVentaAgrupadoProducto:any;

  objPreventa:any;
  listaDetallePreventa:any;
  total_detalle_preventa:number = 0;

  total_saldo_agrupados_productos:number = 0;

  swGestion:boolean = true;

  showDetallePreventa:boolean = false;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioSucursalService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Sucursales") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))

      this.servicio.setIdSucursal(this.id_sucursal);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 25,
        lengthMenu : [25, 50, 100],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };

      this.listaUsuarioByEmpresa()
      
      this.datosGestion = listaGestion();
      this.gestionActual = this.datosGestion[ this.datosGestion.length - 1 ]["gestion"]
      this.id_usuario = "0"
      this.rangoUno = "Mes"
      this.rangoDos = "Año"
      this.mes = (Number(new Date().getMonth()) +1)
      this.fecha_inicio = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()
      this.fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate()
      
      this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
      this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();

      this.consultaOpcionPreventaTipo();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  consultaOpcionPreventaTipo(){
    if(this.tipo_consulta == 1)
    {
      this.listaPreVentaBySucursalFechaVentaEstado();
    }
    else if(this.tipo_consulta == 2)
    {
      this.listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado();
    }
  }

  clickConsultaPreventa(_valor:number){
    this.tipo_consulta = _valor;
    this.consultaOpcionPreventaTipo();
  }

  clickImprimirReportePreventa(){
    if(this.tipo_consulta == 1)
    {
      this.reporteListaPreVentaBySucursalFechaVentaEstado();
    }
    else if(this.tipo_consulta == 2)
    {
      this.reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado();
    }
  }

  clickRbMes() {
    this.rangoUno = "Mes"
    this.rangoDos = "Año"
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();

    let elemento:any = document.querySelector("#divFechaInicio");
    elemento.style.display = 'none';
    elemento = document.querySelector("#divFechaFinal");
    elemento.style.display = 'none';
    elemento = document.querySelector("#cbMes");
    elemento.style.display = 'flex';
    elemento = document.querySelector("#cbGestion");
    elemento.style.display = 'flex';

    this.consultaOpcionPreventaTipo();
  }

  clickRbFecha() {
    this.rangoUno = "Fecha Inicio"
    this.rangoDos = "Fecha Final"
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;

    let elemento:any = document.querySelector("#cbMes");
    elemento.style.display = 'none';
    elemento = document.querySelector("#cbGestion");
    elemento.style.display = 'none';
    elemento = document.querySelector("#divFechaInicio");
    elemento.style.display = 'flex';
    elemento = document.querySelector("#divFechaFinal");
    elemento.style.display = 'flex';

    this.consultaOpcionPreventaTipo();
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.consultaOpcionPreventaTipo();
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.consultaOpcionPreventaTipo();
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.consultaOpcionPreventaTipo();
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.consultaOpcionPreventaTipo();
  }

  changeUsuario() {
    this.consultaOpcionPreventaTipo();
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuario = datos_recibidos.datos;
    });
  }

  preVentaById(_id_pre_venta:string){
    this.showDetallePreventa = true;

    Swal.fire({title: 'Buscando pre-ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_pre_venta": _id_pre_venta
    };
    
    this.http.post(this.url+"venta/preVentaById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.objPreventa = datos[0];
          this.objPreventa.factura_opcion = datos[0].factura==1? 'Si tiene factura': 'Sin factura';
          this.listaPreVentaDetalleByEstadoPreVenta(this.objPreventa.id);
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaPreVentaDetalleByEstadoPreVenta(_id_pre_venta:string){
    this.showDetallePreventa = true;

    Swal.fire({title: 'Buscando pre-ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_pre_venta": _id_pre_venta,
      "estado": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"venta/listaPreVentaDetalleByEstadoPreVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.total_detalle_preventa = 0;
          this.listaDetallePreventa = datos;
          for(let  i = 0; i<= datos.length-1; i++){
            let imagenes = datos[i].imagen.split(",");
            this.listaDetallePreventa[i].imagen_uno = imagenes[0];
            this.total_detalle_preventa = this.total_detalle_preventa + datos[i].total_descuento;
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaPreVentaBySucursalFechaVentaEstado(){
    Swal.fire({title: 'Buscando pre-ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem('id_empresa'),
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario,
      "venta": this.tipo_preventa,
      "estado_venta": this.estado_preventa
    };
    
    this.http.post(this.url+"venta/listaPreVentaBySucursalFechaVentaEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosVenta = datos;
          
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
  
            this.dtOptions = {
              pagingType: 'full_numbers',
              pageLength: 25,
              lengthMenu : [25, 50, 100],
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

  listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(){
    Swal.fire({title: 'Buscando pre-ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem('id_empresa'),
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario,
      "venta": this.tipo_preventa,
      "estado_venta": this.estado_preventa
    };
    
    this.http.post(this.url+"venta/listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.total_saldo_agrupados_productos = 0;
          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;
            this.total_saldo_agrupados_productos = this.total_saldo_agrupados_productos + datos[i].total;
          }

          this.datosVentaAgrupadoProducto = datos;          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  reporteListaPreVentaBySucursalFechaVentaEstado(){
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario,
      "venta": this.tipo_preventa,
      "estado_venta": this.estado_preventa,
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"venta/reporteListaPreVentaBySucursalFechaVentaEstado", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
      var blob = new Blob([datos_recibidos], { type: "application/pdf" });
      var url = window.URL.createObjectURL(blob);
      var pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
      /*const fileName = 'reporte_comora.pdf';
      FileSaver.saveAs(blob, fileName);*/
      Swal.close();
    });
  }

  reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(){
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario,
      "venta": this.tipo_preventa,
      "estado_venta": this.estado_preventa,
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"venta/reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
      var blob = new Blob([datos_recibidos], { type: "application/pdf" });
      var url = window.URL.createObjectURL(blob);
      var pwa = window.open(url);
      if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert('Please disable your Pop-up blocker and try again.');
      }
      /*const fileName = 'reporte_comora.pdf';
      FileSaver.saveAs(blob, fileName);*/
      Swal.close();
    });
  }
}
