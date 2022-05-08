import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
declare const google: any;

@Component({
  selector: 'app-distribucion-lista',
  templateUrl: './distribucion-lista.component.html',
  styleUrls: ['./distribucion-lista.component.css']
})
export class DistribucionListaComponent implements OnInit, AfterViewInit {
  map:any;
  @ViewChild('mapElement') mapElement: any;
  marcador:any;
  url : any;

  id_sucursal:any = "";
  id_usuario:any = "";
  fecha_entrega:any = "";

  venta_estado:any = "-1";
  totalPuntos:number = 0;
  NoEntregadoPuntos:number = 0;
  VendidoPuntos:number = 0;
  ObservacionPuntos:number = 0;


  datosUsuario:any = [];
  listaPreVenta:any = [];
  listaPreVentaVenta:any = [];
  listaPreVentaDevolucion:any = [];
  listaPreVentaDetalle:any = [];

  totalDetalle:any = 0.0;
  showModalDetalleCarga:boolean = false;

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labelIndex = 0;
  markersArray:any = [];

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicioSucursal: ServicioSucursalService) { }

  ngOnInit(): void {
    this.url = globals.url;
    this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"));
    this.servicioSucursal.setIdSucursal(this.id_sucursal);

    let date = new Date()
    this.fecha_entrega = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    
    this.listaUsuarioByEmpresa()
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -16.540246638894946, lng: -64.79782730340958},
      zoom: 5
    });
  }

  changeFechaEntrega(){
    this.listaCargaRutaByFechaUsuario();
    this.listaDetallePreventaClienteByDistribuidorFecha(this.venta_estado)
  }

  changeUsuario(){
    this.listaCargaRutaByFechaUsuario();
    this.listaDetallePreventaClienteByDistribuidorFecha(this.venta_estado)
  }

  click_rutaDistribucion(){
    this.listaCargaRutaByFechaUsuario();
  }

  click_cargaTotalCliente(estado_venta:any){
    this.venta_estado = estado_venta;
    this.listaDetallePreventaClienteByDistribuidorFecha(this.venta_estado)
  }

  click_verDetalle(listaDetalle:any){
    this.showModalDetalleCarga = true;
    this.totalDetalle = 0.0;console.log(listaDetalle)
    for(let i=0;i<listaDetalle.length;i++){
      listaDetalle[i]["imagen_uno"] = listaDetalle[i]["imagen"][0]
      this.totalDetalle = parseFloat(this.totalDetalle) + parseFloat(listaDetalle[i]["total_descuento"])
    }

    this.listaPreVentaDetalle = listaDetalle;
  }

  listaUsuarioByEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"usuario/listaUsuarioByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosUsuario = datos_recibidos.datos;
    });
  }

  listaCargaRutaByFechaUsuario(){
    if(this.fecha_entrega != ""){
      if(this.id_usuario != ""){
        Swal.fire({title: 'Buscando Ruta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
        let parametros = {
          "estado": "1",
          "fecha": this.fecha_entrega,
          "id_usuario": this.id_usuario,
          "id_empresa": localStorage.getItem("id_empresa")
        };
        
        this.http.post(this.url+"ruta/listaCargaRutaByFechaUsuario", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();
          console.log(datos_recibidos)
          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
          if(datosMysql === undefined){
            if(datosNodejs === undefined){

              for(let i=0; i<this.markersArray.length; i++){
                if(this.markersArray.length > 0){
                  this.markersArray[i].setMap(null);
                }
              }

              this.ObservacionPuntos = 0;
              this.VendidoPuntos = 0;
              this.NoEntregadoPuntos = 0;
              for(let i =0;i<=datos.length-1;i++){
                let posicion = {lat: parseFloat(datos[i].latitud), lng: parseFloat(datos[i].longitud)}
                let path_icon = "/assets/plantilla/img/marker.png"

                if(datos[i].observacion_inicio != ""){
                  path_icon = "/assets/plantilla/img/marker_azul.png"
                  this.ObservacionPuntos++;
                }

                if(datos[i].venta == "4"){
                  path_icon = "/assets/plantilla/img/marker_rojo.png"
                  this.NoEntregadoPuntos++;
                }
                if(datos[i].venta == "3"){
                  this.NoEntregadoPuntos++;
                }
                if(datos[i].venta == "1"){
                  this.VendidoPuntos++
                  path_icon = "/assets/plantilla/img/marker_verde.png"
                }

                this.markersArray[0] = new google.maps.Marker({
                  position: posicion,
                  icon: path_icon,
                });

                this.markersArray[0].setMap(this.map);
                this.map.setCenter(posicion);
                this.map.setZoom(15);
              }

              this.totalPuntos = parseInt(datos.length);
            }else{
              Swal.fire("Error en el Servidor", datosNodejs, "warning");
            }
          }else{
            Swal.fire("Error en la Base de Datos", datosMysql, "warning");
          }
        });
      }
    }
  }

  listaDetallePreventaClienteByDistribuidorFecha(estado_venta:any){
    Swal.fire({title: 'Buscando pre-ventas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "fecha_entrega": this.fecha_entrega,
      "id_empresa": localStorage.getItem('id_empresa'),
      "id_usuario": this.id_usuario,
      "id_sucursal": this.id_sucursal,
      "estado_venta": estado_venta,
      "estado_detalle": "1"
    };
    console.log(parametros)
    this.http.post(this.url+"carga/listaDetallePreventaClienteByDistribuidorFecha", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){

          if(datos.length > 0){
            if(estado_venta == "-1"){
              this.listaPreVenta = datos;
            }
            if(estado_venta == "1"){
              this.listaPreVentaVenta = datos;
            }
            if(estado_venta == "3','4"){
              this.listaPreVentaDevolucion = datos;
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
