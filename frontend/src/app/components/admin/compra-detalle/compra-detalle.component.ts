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
  selector: 'app-compra-detalle',
  templateUrl: './compra-detalle.component.html',
  styleUrls: ['./compra-detalle.component.css']
})
export class CompraDetalleComponent implements OnInit {

  url : any;
  id_almacen:any;
  id_compra:any;
  nro_compra:any;
  fecha:any;
  hora:any;
  concepto:any;
  nombre_almacen:any;
  nombre_sucursal:any;
  usuario:any;
  observacion:any;
  total:any = 0.00;

  listaDetalle:any = []


  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Almacenes") != undefined){
      this.url = globals.url;
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))
      this.id_compra = decryptNumber(this.route.snapshot.paramMap.get("id_compra"))
      this.servicio.setIdAlmacen(this.id_almacen);

      this.compraById()
      this.listaCompraDetalleByCompra();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  click_compraDetalleAgregar(){
    this.router.navigate(['/admin/almacen/compra-detalle/agregar/', encryptNumber(this.id_almacen), encryptNumber(this.id_compra)]);
  }
  
  compraById() {
    Swal.fire({title: 'Extrayendo Informacion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_compra": this.id_compra,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"compra/compraById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.nro_compra = datos[0]["nro_compra"]
          this.fecha = datos[0]["fecha"]
          this.hora = datos[0]["hora"]
          this.concepto = datos[0]["concepto"]
          this.nombre_almacen = datos[0]["nombre_almacen"]
          this.nombre_sucursal = datos[0]["nombre_sucursal"]
          this.usuario = datos[0]["usuario"]

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaCompraDetalleByCompra() {
    Swal.fire({title: 'Extrayendo Informacion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_compra": this.id_compra,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"compra/listaCompraDetalleByCompra", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
console.log(datos_recibidos)
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaDetalle = datos
          this.total = 0.00
          for(let i=0; i<this.listaDetalle.length;i++){
            this.total = parseFloat(this.total) + parseFloat(this.listaDetalle[i]["subTotal"])
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
