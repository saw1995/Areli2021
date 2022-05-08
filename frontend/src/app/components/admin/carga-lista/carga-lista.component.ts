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
  selector: 'app-carga-lista',
  templateUrl: './carga-lista.component.html',
  styleUrls: ['./carga-lista.component.css']
})
export class CargaListaComponent implements OnInit {

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

  estado_venta:string = "'0','1','2','3','4','5','6'";

  tipo_consulta_venta:number = 1;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  datosGestion:any = []
  datosUsuario:any = []
  datosUsuarioPreventa:any = [];
  datosVenta:any = []
  datosVentaProductosAgrupados:any = [];

  showModalDetalleCarga:boolean = false;

  resultadoPreVentasByCarga:any;

  nro_carga_seleccionado:number=0;
  fecha_entrega_seleccionado:any;
  distribuidor_seleccionado:any;

  total_saldos_carga:number = 0;

  total_saldo_agrupados_productos:number = 0;

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
      this.listaCargaByUsuarioFecha();
    }
    else if(this.tipo_consulta_venta == 2)
    {
      this.listaCargaProductoAgrupadoByUsuarioFecha();
    }
  }

  clickImprimirReportePreventa(){
    if(this.tipo_consulta_venta == 1)
    {
      this.reporteListaCargaByUsuarioFechaSucursal();
    }
    else if(this.tipo_consulta_venta == 2)
    {
      this.reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal();
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

  click_AbrirDetalleCarga(_nroCarga:number, _fecha:any, _distribuidor:string){
    this.distribuidor_seleccionado = _distribuidor;
    this.fecha_entrega_seleccionado = _fecha;
    this.listaDetallePreventaClienteByNroCarga(_nroCarga);
    this.nro_carga_seleccionado = _nroCarga;
    this.showModalDetalleCarga = true;
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

  listaCargaByUsuarioFecha(){
    
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_usuario": this.id_usuario,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "estado_venta": this.estado_venta,
      "estado": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"carga/listaCargaByUsuarioFecha", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.total_saldos_carga = 0;

          this.datosVenta = datos;
          for(let i = 0; i<= datos.length -1;i++){
            this.total_saldos_carga = this.total_saldos_carga + datos[i].total;
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

  listaCargaProductoAgrupadoByUsuarioFecha(){
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_usuario": this.id_usuario,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "estado_venta": this.estado_venta,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"carga/listaCargaProductoAgrupadoByUsuarioFecha", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosVentaProductosAgrupados = datos;

          this.total_saldo_agrupados_productos = 0;

          for(let i = 0 ; i<= datos.length-1; i++){
            this.datosVentaProductosAgrupados[i].imagen = datos[i].imagen.split(",");

            this.total_saldo_agrupados_productos = this.total_saldo_agrupados_productos + datos[i].total;
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaDetallePreventaClienteByNroCarga(_nro_carga:number){
    Swal.fire({title: 'Buscando Ventas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "nro_carga": _nro_carga,
      "id_sucursal": this.id_sucursal,
      "estado_venta": this.estado_venta,
      "estado_detalle": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };
    
    this.http.post(this.url+"carga/listaDetallePreventaClienteByNroCarga", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.resultadoPreVentasByCarga = datos;
          
          for(let i = 0; i<= datos.length -1;i++){
            for(let j =0; j<= datos[i].detalle.length -1 ;j++){
              this.resultadoPreVentasByCarga[i].detalle[j].imagen_uno = datos[i].detalle[j].imagen[0];
            }

            if(datos[i].venta=='1'){
              this.resultadoPreVentasByCarga[i].venta_estado = 'Venta Realizada';
            }else if(datos[i].venta == '6'){
              this.resultadoPreVentasByCarga[i].venta_estado = 'Devolución aceptada';
            }else if(datos[i].venta == '10'){
              this.resultadoPreVentasByCarga[i].venta_estado = 'Cambiar por Dev';
            }else if(datos[i].venta == '2'){
              this.resultadoPreVentasByCarga[i].venta_estado = 'En ruta para entrega';
            }else if(datos[i].venta == '0'){
              this.resultadoPreVentasByCarga[i].venta_estado = 'Estado venta cero';
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

  reporteListaCargaByUsuarioFechaSucursal() {
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_usuario": this.id_usuario,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_sucursal": this.id_sucursal,
      "estado_venta": this.estado_venta,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"carga/reporteListaCargaByUsuarioFechaSucursal", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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

  reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal() {
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {
      "id_usuario": this.id_usuario,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_sucursal": this.id_sucursal,
      "estado_venta": this.estado_venta,
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
    });

    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"carga/reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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
