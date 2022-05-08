import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { globals } from '../../../utils/global';
import { decryptNumber } from '../../../utils/encrypt';
import { listaGestion } from '../../../utils/fecha-hora';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-traspaso-lista',
  templateUrl: './traspaso-lista.component.html',
  styleUrls: ['./traspaso-lista.component.css']
})
export class TraspasoListaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  url : any;

  entradaSalida:any = "";
  id_sucursal:any;
  id_almacen:any;
  id_sucursal_select:any;
  id_almacen_select:any;
  id_sucursal_emisor:any;
  id_almacen_emisor:any;
  id_sucursal_receptor:any;
  id_almacen_receptor:any;
  id_usuario:any;
  mes:any;
  gestionActual:any;
  rangoUno:string = ""
  rangoDos:string = ""
  tipoAlmacen:string = ""
  tipoSucursal:string = ""
  fecha_inicio:string = ""
  fecha_final:string = ""
  enviar_fecha_inicio:string = ""
  enviar_fecha_final:string = ""

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  datosGestion:any = []
  datosUsuario:any = []
  datosSucursal:any = []
  datosAlmacen:any = []
  datosTraspaso:any = []

  swGestion:boolean = true;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Traspasos") != undefined){
      this.url = globals.url;
      this.entradaSalida = this.route.snapshot.paramMap.get("tipo")
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))
      
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

      if(this.entradaSalida === "entrada"){
        this.tipoSucursal = "Sucursal de Origen"
        this.tipoAlmacen = "Almacen de Origen";
        this.id_sucursal_emisor = "0";
        this.id_almacen_emisor = "0";
        this.id_sucursal_receptor = this.id_sucursal;
        this.id_almacen_receptor = this.id_almacen;
      }else{
        this.tipoSucursal = "Sucursal de Recepcion";
        this.tipoAlmacen = "Almacen de Recepcion";
        this.id_sucursal_emisor = this.id_sucursal;
        this.id_almacen_emisor = this.id_almacen;
        this.id_sucursal_receptor = "0";
        this.id_almacen_receptor = "0";
      }

      this.listaUsuarioByEmpresa()
      this.listaSucursalByEmpresa()

      this.datosGestion = listaGestion();
      this.gestionActual = this.datosGestion[ this.datosGestion.length - 1 ]["gestion"]
      this.id_usuario = "0"
      this.id_sucursal_select = "0";
      this.id_almacen_select = "0";
      this.rangoUno = "Mes"
      this.rangoDos = "Año"
      this.mes = (Number(new Date().getMonth()) +1)
      this.fecha_inicio = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()
      this.fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()

      this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
      this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();

      this.listaTraspasoByFechaAlmacenesEstado()
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

    this.listaTraspasoByFechaAlmacenesEstado()
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

    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeUsuario() {
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeSucursal() {
    if(this.entradaSalida == "entrada"){
      this.id_sucursal_emisor = this.id_sucursal_select;
    }else{
      this.id_sucursal_receptor = this.id_sucursal_select;
    }
    this.id_almacen_select = 0;
    this.listaAlmacenBySucursalEmpresa();

    this.listaTraspasoByFechaAlmacenesEstado()
  }

  changeAlmacen() {
    if(this.entradaSalida == "entrada"){
      this.id_almacen_emisor = this.id_almacen_select;
    }else{
      this.id_almacen_receptor = this.id_almacen_select;
    }
    this.listaTraspasoByFechaAlmacenesEstado()
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuario = datos_recibidos.datos;
    });
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
      "id_sucursal": this.id_sucursal_select,
    };
    this.http.post(this.url+"almacen/listaAlmacenBySucursalEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosAlmacen = datos_recibidos.datos;
    });
  }

  listaTraspasoByFechaAlmacenesEstado() {
    Swal.fire({title: 'Buscando traspasos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_sucursal_receptor": this.id_sucursal_receptor,
      "id_almacen_receptor": this.id_almacen_receptor,
      "id_sucursal_emisor": this.id_sucursal_emisor,
      "id_almacen_emisor": this.id_almacen_emisor,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa"),
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario
    };

    this.http.post(this.url+"traspaso/listaTraspasoByFechaAlmacenesEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          for(let i=0; i<datos.length; i++){
            if(this.entradaSalida == "entrada"){
              datos[i]["sucursal"] = datos[i]["nombre_sucursal"];
              datos[i]["almacen"] = datos[i]["nombre_almacen"];
            }else{
              datos[i]["sucursal"] = datos[i]["nombre_sucursal_rec"];
              datos[i]["almacen"] = datos[i]["nombre_almacen_rec"];
            }
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;
          }
          this.datosTraspaso = datos;

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

  reporteListaTraspasoByFechaAlmacenesEstado() {
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    const params = new HttpParams({
      fromObject: {
        "id_sucursal_receptor": this.id_sucursal_receptor,
        "id_almacen_receptor": this.id_almacen_receptor,
        "id_sucursal_emisor": this.id_sucursal_emisor,
        "id_almacen_emisor": this.id_almacen_emisor,
        "estado": "1",
        "id_empresa": localStorage.getItem("id_empresa") || "",
        "fecha_inicio": this.enviar_fecha_inicio,
        "fecha_final": this.enviar_fecha_final,
        "id_usuario": this.id_usuario,
        "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
      });
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"traspaso/reporteListaTraspasoByFechaAlmacenesEstado", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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
