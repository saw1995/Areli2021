import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { listaGestion } from 'src/app/utils/fecha-hora';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liquidacion-lista',
  templateUrl: './liquidacion-lista.component.html',
  styleUrls: ['./liquidacion-lista.component.css']
})
export class LiquidacionListaComponent implements OnInit {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  url:string = globals.url;
  id_sucursal:any;
  
  showModalAgregarLiquidacion:Boolean = false;
  showModalListaProductoCarga:boolean = false;
  showModalProductosCarga:boolean = false;

  corte10:any = 0;
  corte20:any = 0;
  corte50:any = 0;
  corte100:any = 0;
  corte200:any = 0;
  corteCentavo10:any = 0;
  corteCentavo20:any = 0;
  corteCentavo50:any = 0;
  corte1:any = 0;
  corte2:any = 0;
  corte5:any = 0;

  subTotal10:any = 0;
  subTotal20:any = 0;
  subTotal50:any = 0;
  subTotal100:any = 0;
  subTotal200:any = 0;
  subTotalCentavo10:any = 0;
  subTotalCentavo20:any = 0;
  subTotalCentavo50:any = 0;
  subTotal1:any = 0;
  subTotal2:any = 0;
  subTotal5:any = 0;

  subTotalMoneda:any = 0;
  subTotalBillete:any = 0;
  totalBolivianos:any = 0;
  observacion:any = "";

  id_usuario_liquidacion:any = "0";
  id_usuario_adm:any = "0";
  id_usuario_liquidacion_agregar:any = "";

  id_usuario_seleccion_lista_carga:any = '';

  id_liquidacion_seleccionado:any = '';
  sobrante_liquidacion_seleccionado:any='';
  nro_carga_seleccionado:any;

  mes:any;
  gestionActual:any;
  rangoUno:string = ""
  rangoDos:string = ""
  fecha_inicio:string = ""
  fecha_final:string = ""
  enviar_fecha_inicio:string = ""
  enviar_fecha_final:string = ""
  
  datosGestion:any = []
  datosUsuarioLiquidacion:any = []
  datosUsuarioAdm:any = []
  datosUsuarioAdmAgregar:any = []
 
  total_suma_liquidacion:number = 0;
  
  datosLiquidacion:any = [];

  listaProductosLiquidacion:any = [];

  swGestion:boolean = true;

  listaCargasByUsuario:any = [];

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
      this.id_usuario_liquidacion = "0"
      this.id_usuario_adm = "0"
      this.rangoUno = "Mes"
      this.rangoDos = "Año"
      this.mes = (Number(new Date().getMonth()) +1)
      this.fecha_inicio = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()
      this.fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate()
      
      this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
      this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();

      this.listaLiquidacionGeneralByIdSucursal();

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

    this.listaLiquidacionGeneralByIdSucursal();
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

    this.listaLiquidacionGeneralByIdSucursal();
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaLiquidacionGeneralByIdSucursal();
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaLiquidacionGeneralByIdSucursal();
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaLiquidacionGeneralByIdSucursal();
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaLiquidacionGeneralByIdSucursal();
  }

  changeUsuario() {
    this.listaLiquidacionGeneralByIdSucursal();
  }

  click_gregarCategoria(){
    this.showModalAgregarLiquidacion = true;
  }

  click_abrirDetalleProductosPendientes(_nroCarga:number){
    this.nro_carga_seleccionado = _nroCarga;
    this.showModalProductosCarga = true;
    this.listaPreventaProductosByCargaParaLiquidacion();
  }

  click_AbrirListaCargaProductos(_idUsuario:string, _idLiquidacion:string, _sobrante:number){
    this.id_liquidacion_seleccionado = _idLiquidacion;
    this.id_usuario_seleccion_lista_carga = _idUsuario;
    this.sobrante_liquidacion_seleccionado = _sobrante;
    this.listaCargaTotalMontosParaLiquidacion();
    this.showModalListaProductoCarga = true;
  }

  click_actualizarLiquidacionPagoSobrante(){

  }

  calcularTotal(){
    this.subTotal10 = 10 * parseInt(this.corte10);
    this.subTotal20 = 20 * parseInt(this.corte20);
    this.subTotal50 = 50 * parseInt(this.corte50);
    this.subTotal100 = 100 * parseInt(this.corte100);
    this.subTotal200 = 200 * parseInt(this.corte200);
    
    this.subTotalCentavo10 = 0.1 * parseInt(this.corteCentavo10);
    this.subTotalCentavo20 = 0.2 * parseInt(this.corteCentavo20);
    this.subTotalCentavo50 = 0.5 * parseInt(this.corteCentavo50);
    this.subTotal1 = 1 * parseInt(this.corte1);
    this.subTotal2 = 2 * parseInt(this.corte2);
    this.subTotal5 = 5 * parseInt(this.corte5);

    this.subTotalBillete = parseInt(this.subTotal10) + parseInt(this.subTotal20) + parseInt(this.subTotal50) + parseInt(this.subTotal100) + parseInt(this.subTotal200)
    this.subTotalMoneda = parseFloat(this.subTotalCentavo10) + parseFloat(this.subTotalCentavo20) + parseFloat(this.subTotalCentavo50) + parseInt(this.subTotal1) + parseInt(this.subTotal2) + parseInt(this.subTotal5)
    this.totalBolivianos = parseInt(this.subTotalBillete) + parseFloat(this.subTotalMoneda);
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuarioAdm = datos_recibidos.datos;
      this.datosUsuarioAdmAgregar = datos_recibidos.datos;
      this.datosUsuarioLiquidacion = datos_recibidos.datos;
    });
  }

  actualizarLiquidacionItemProducto(_id_preventa_detalle:string, _saldoProducto:number){
    if(_saldoProducto > this.sobrante_liquidacion_seleccionado || this.sobrante_liquidacion_seleccionado <=0){
      Swal.fire("Error en validar datos", "Error el saldo es insuficiente para liquidar el producto seleccionado. . .", "warning");
    }
    else{
      Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      this.sobrante_liquidacion_seleccionado = this.sobrante_liquidacion_seleccionado - _saldoProducto;

      let parametros = 
      {
        "id_liquidacion": this.id_liquidacion_seleccionado, 
        "sobrante": this.sobrante_liquidacion_seleccionado,
        "id_preventa_detalle": _id_preventa_detalle
      };
  
      
      this.http.post(this.url+"liquidacion/actualizarLiquidacionItemProducto", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows == 1){
              this.listaPreventaProductosByCargaParaLiquidacion();
              this.listaCargaTotalMontosParaLiquidacion();
              this.listaLiquidacionGeneralByIdSucursal();
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

  actualizarLiquidacionPagoSobrante(_nro_carga:string){
    
    this.nro_carga_seleccionado = _nro_carga;
    Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = 
    {
      "id_liquidacion": this.id_liquidacion_seleccionado, 
      "sobrante": this.sobrante_liquidacion_seleccionado,
      "nro_carga": this.nro_carga_seleccionado,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"liquidacion/actualizarLiquidacionPagoSobrante", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1){
              this.cerrarModal.nativeElement.click();
              this.showModalListaProductoCarga = false;
              this.listaLiquidacionGeneralByIdSucursal();
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  agregarLiquidacion(){
    if(this.totalBolivianos <=0){
      Swal.fire("Error validar datos", "El importe total de la liquidación no puede ser menor o igual a cero, intente nuevamente. . .", "warning");
    }else if(this.id_usuario_liquidacion_agregar == ""){
      Swal.fire("Error validar datos", "Debe Seleccionar un usuario para guardar registro de liquidación. . .", "warning");
    }else if(this.observacion == ""){
      Swal.fire("Error validar datos", "Debe agregar el motivo de la liquidación no puede estar vacío. . .", "warning");
    }else{
      Swal.fire({title: 'Guardando registro de liquidación',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      let parametros = 
      {
        "id_sucursal": this.id_sucursal, 
        "id_usuario_cuenta": this.id_usuario_liquidacion_agregar,
        "id_usuario": localStorage.getItem("id_usuario"),
        "observacion": this.observacion,
        "corte_centavo_10": this.corteCentavo10,
        "corte_centavo_20": this.corteCentavo20,
        "corte_centavo_50": this.corteCentavo50,
        "corte_boliviano_1": this.corte1,
        "corte_boliviano_2": this.corte2,
        "corte_boliviano_5": this.corte5,
        "corte_boliviano_10": this.corte10,
        "corte_boliviano_20": this.corte20,
        "corte_boliviano_50": this.corte50,
        "corte_boliviano_100": this.corte100,
        "corte_boliviano_200": this.corte200,
        "total": this.totalBolivianos,
        "sobrante": this.totalBolivianos,
        "id_empresa": localStorage.getItem("id_empresa")
      };
  
      this.http.post(this.url+"liquidacion/agregarLiquidacion", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows==1){

              this.corte10 = 0;
              this.corte20 = 0;
              this.corte50 = 0;
              this.corte100 = 0;
              this.corte200 = 0;
              this.corteCentavo10 = 0;
              this.corteCentavo20 = 0;
              this.corteCentavo50 = 0;
              this.corte1 = 0;
              this.corte2 = 0;
              this.corte5 = 0;

              this.subTotal10 = 0;
              this.subTotal20 = 0;
              this.subTotal50 = 0;
              this.subTotal100 = 0;
              this.subTotal200 = 0;
              this.subTotalCentavo10 = 0;
              this.subTotalCentavo20 = 0;
              this.subTotalCentavo50 = 0;
              this.subTotal1 = 0;
              this.subTotal2 = 0;
              this.subTotal5 = 0;

              this.subTotalMoneda = 0;
              this.subTotalBillete = 0;
              this.totalBolivianos = 0;
              this.observacion = "";

              this.listaLiquidacionGeneralByIdSucursal();
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarLiquidacion = false;
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


  listaPreventaProductosByCargaParaLiquidacion(){
    Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = 
    {
      "nro_carga": this.nro_carga_seleccionado, 
      "estado": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"liquidacion/listaPreventaProductosByCargaParaLiquidacion", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaProductosLiquidacion = datos;
          for(let i = 0 ;i<= datos.length-1;i++){
            var imagenes = datos[i].imagen.split(",");
            this.listaProductosLiquidacion[i].imagen_uno = imagenes[0];
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  

  listaCargaTotalMontosParaLiquidacion(){
    Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = 
    {
      "id_usuario": this.id_usuario_seleccion_lista_carga, 
      "estado": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"liquidacion/listaCargaTotalMontosParaLiquidacion", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCargasByUsuario = datos;
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaLiquidacionGeneralByIdSucursal(){
    Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = 
    {
      "id_sucursal": this.id_sucursal, 
      "estado": 1,
      "id_usuario_cuenta":this.id_usuario_liquidacion,
      "id_usuario": this.id_usuario_adm,
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_fin": this.enviar_fecha_final,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"liquidacion/listaLiquidacionGeneralByIdSucursal", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.total_suma_liquidacion =0;
          this.datosLiquidacion = datos;
          
          for(let i = 0 ; i<= datos.length-1;i++){
            let subtotal = datos[i].total == null ? 0 : datos[i].total;
            this.total_suma_liquidacion = this.total_suma_liquidacion + subtotal;
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

  reporteGenerar(){
    /*Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
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
      FileSaver.saveAs(blob, fileName);
      Swal.close();
    });*/
  }


}
