import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { listaGestion } from 'src/app/utils/fecha-hora';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-venta-lista',
  templateUrl: './venta-lista.component.html',
  styleUrls: ['./venta-lista.component.css']
})

export class VentaListaComponent implements OnInit, AfterViewInit, OnDestroy {

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

  tipo_venta:string = '-1';
  id_usuario_preventa:string = '0';

  opciones_credito:string = "'0','1'";

  tipo_consulta_venta:number = 1;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  datosGestion:any = []
  datosUsuario:any = []
  datosUsuarioPreventa:any = [];
  datosVenta:any = []
  datosVentaProductosAgrupados:any = [];

  total_ventas:number = 0;

  total_saldo_agrupados_productos:number = 0;

  swGestion:boolean = true;

  objVenta:any;
  listaVentaDetalle:any;
  totalDetalleVenta:number = 0;

  showModalDetalleVenta:boolean = false;
  
  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioSucursalService) { }

  ngOnInit(): void {
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

      this.consultaOpcionVentaTipo();
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

  clickConsultaVenta(_valor:number){
    this.tipo_consulta_venta = _valor;
    this.consultaOpcionVentaTipo();
  }

  consultaOpcionVentaTipo(){
    if(this.tipo_consulta_venta == 1)
    {
      this.listaVentaBySucursalFechaUsuario();
    }
    else if(this.tipo_consulta_venta == 2)
    {
      this.listaVentaProductoAgrupadoBySucursalFechaUsuario();
    }
  }

  clickImprimirReportePreventa(){
    if(this.tipo_consulta_venta == 1)
    {
      this.reporteListaVentaBySucursalFechaUsuario();
    }
    else if(this.tipo_consulta_venta == 2)
    {
      this.reporteListaVentaProductoAgrupadoBySucursalFechaUsuario();
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

    this.consultaOpcionVentaTipo();
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

    this.consultaOpcionVentaTipo();
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.consultaOpcionVentaTipo();
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.consultaOpcionVentaTipo();
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.consultaOpcionVentaTipo();
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.consultaOpcionVentaTipo();
  }

  changeUsuario() {
    this.consultaOpcionVentaTipo();
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuario = datos_recibidos.datos;
      this.datosUsuarioPreventa = datos_recibidos.datos;
    });
  }

  listaVentaBySucursalFechaUsuario(){
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem('id_empresa'),
      "estado": 1,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "tipo_venta": this.tipo_venta,
      "id_usuario": this.id_usuario,
      "id_usuario_pre_venta": this.id_usuario_preventa,
      "credito": this.opciones_credito
    };
    
    this.http.post(this.url+"venta/listaVentaBySucursalFechaUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosVenta = datos;

          this.total_ventas = 0;
          
          for(let i = 0; i<= datos.length-1; i++){
            this.datosVenta[i].factura = datos[i].factura=='1'?'Sí':'No';
            this.total_ventas = this.total_ventas + datos[i].total;
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

  listaVentaProductoAgrupadoBySucursalFechaUsuario(){
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem('id_empresa'),
      "estado": 1,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "tipo_venta": this.tipo_venta,
      "id_usuario": this.id_usuario,
      "id_usuario_pre_venta": this.id_usuario_preventa
    };
    
    this.http.post(this.url+"venta/listaVentaProductoAgrupadoBySucursalFechaUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosVentaProductosAgrupados = datos;
          
          this.total_saldo_agrupados_productos = 0;
          for(let i = 0; i<= datos.length - 1; i++){
            this.datosVentaProductosAgrupados[i].imagen = datos[i].imagen.split(",");

            this.total_saldo_agrupados_productos = this.total_saldo_agrupados_productos + datos[i].total;
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

  ventaById(_idVenta:string){

    this.showModalDetalleVenta = true;

    Swal.fire({title: 'Buscando registro de venta. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_venta": _idVenta
    };
    
    this.http.post(this.url+"venta/ventaById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.objVenta = datos[0];

          this.listaVentaDetalleByEstadoVenta(this.objVenta.id);
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaVentaDetalleByEstadoVenta(_idVenta:string){
    Swal.fire({title: 'Buscando registro de venta. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_venta": _idVenta,
      "estado":1,
      "id_empresa": localStorage.getItem('id_empresa')
    };
    
    this.http.post(this.url+"venta/listaVentaDetalleByEstadoVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaVentaDetalle = datos;
          this.totalDetalleVenta = 0;
          for(let  i = 0; i<= datos.length-1; i++){
            let imagenes = datos[i].imagen.split(",");
            this.listaVentaDetalle[i].imagen_uno = imagenes[0];
            this.totalDetalleVenta = this.totalDetalleVenta + datos[0].total;
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  reporteListaVentaBySucursalFechaUsuario() {
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "estado": 1,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "tipo_venta": this.tipo_venta,
      "id_usuario": this.id_usuario,
      "id_usuario_pre_venta": this.id_usuario_preventa,
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"venta/reporteListaVentaBySucursalFechaUsuario", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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

  reporteListaVentaProductoAgrupadoBySucursalFechaUsuario(){
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_sucursal": this.id_sucursal,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "estado": 1,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "tipo_venta": this.tipo_venta,
      "id_usuario": this.id_usuario,
      "id_usuario_pre_venta": this.id_usuario_preventa,
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"venta/reporteListaVentaBySucursalFechaUsuario", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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
