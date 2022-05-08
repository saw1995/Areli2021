import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { Subject, from } from 'rxjs';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { listaGestion } from 'src/app/utils/fecha-hora';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';


@Component({
  selector: 'app-compra-lista',
  templateUrl: './compra-lista.component.html',
  styleUrls: ['./compra-lista.component.css']
})
export class CompraListaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  url : any;

  id_usuario:any;
  id_almacen:any;
  mes:any;
  gestionActual:any;
  rangoUno:string = ""
  rangoDos:string = ""
  fecha_inicio:string = ""
  fecha_final:string = ""
  enviar_fecha_inicio:string = ""
  enviar_fecha_final:string = ""

  total:any = "";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  datosGestion:any = []
  datosUsuario:any = []
  datosCompra:any = []

  swGestion:boolean = true;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Almacenes") != undefined){
      this.url = globals.url;
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

      this.listaUsuarioByEmpresa()
      
      this.datosGestion = listaGestion();
      this.gestionActual = this.datosGestion[ this.datosGestion.length - 1 ]["gestion"]
      this.id_usuario = "0"
      this.rangoUno = "Mes"
      this.rangoDos = "Año"
      this.mes = (Number(new Date().getMonth()) +1)
      this.fecha_inicio = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()
      this.fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()

      this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
      this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();

      this.listaCompraByAlmacenFechaUsuario()
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

    this.listaCompraByAlmacenFechaUsuario()
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

    this.listaCompraByAlmacenFechaUsuario()
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaCompraByAlmacenFechaUsuario()
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaCompraByAlmacenFechaUsuario()
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaCompraByAlmacenFechaUsuario()
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaCompraByAlmacenFechaUsuario()
  }

  changeUsuario() {
    this.listaCompraByAlmacenFechaUsuario()
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuario = datos_recibidos.datos;
    });
  }

  click_compraDetalle(id_compra:any){
    this.router.navigate(['/admin/almacen/compra-detalle/', encryptNumber(this.id_almacen), encryptNumber(id_compra+"")]);
  }
  
  listaCompraByAlmacenFechaUsuario() {
    Swal.fire({title: 'Buscando compras',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_almacen": this.id_almacen,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa"),
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario
    };

    this.http.post(this.url+"compra/listaCompraByAlmacenFechaUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.datosCompra = datos;

          this.total = 0.0
          for(let i=0; i<this.datosCompra.length;i++){
            this.total = parseFloat(this.total) + parseFloat(this.datosCompra[i]["total"])
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

  reporteListaCompraByAlmacenFechaUsuario() {
    Swal.fire({title: 'Generando reporte PDF',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    const params = new HttpParams({
      fromObject: {"id_almacen": this.id_almacen,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa") || "",
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_final": this.enviar_fecha_final,
      "id_usuario": this.id_usuario,
      "id_usuario_impresion": localStorage.getItem("id_usuario")  || ""
      }
      });
    let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    this.http.post(this.url+"compra/reporteListaCompraByAlmacenFechaUsuario", params, {responseType: 'arraybuffer',headers:headers}).subscribe((datos_recibidos:any) => {
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
