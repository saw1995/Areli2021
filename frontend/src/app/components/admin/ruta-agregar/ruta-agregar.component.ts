import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-ruta-agregar',
  templateUrl: './ruta-agregar.component.html',
  styleUrls: ['./ruta-agregar.component.css']
})
export class RutaAgregarComponent implements OnInit, AfterViewInit {
  map:any;
  @ViewChild('mapElement') mapElement: any;
  marcador:any;
  pos_marcador:number = 1;
  latitud_marcador:any;
  longitud_marcador:any;
  polylines:any = [];
  polylineOptions:any;
  poly:any;

  url:string = globals.url;

  id_ruta:any = ''
  nombre:string  = '';
  descripcion:string  = '';
  cont_delimitador:number  = 0;

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -16.540246638894946, lng: -64.79782730340958},
      zoom: 5
    });
    google.maps.event.addListener(this.map, "click", (event:any) => {
      this.agregarMarcador(event.latLng, this.map);
    });
  }

  agregarMarcador(location:any, map:any) {
    if(this.marcador != null){
      this.marcador.setMap(null);
    }
    
    this.marcador = new google.maps.Marker({
      position: location,
      label: this.pos_marcador + "",
    });

    this.marcador.setMap(map);
    this.latitud_marcador = this.marcador["position"].lat().toFixed(6)
    this.longitud_marcador = this.marcador["position"].lng().toFixed(6)
  }

  click_agregarPunto(){
    this.polylines.push(new google.maps.LatLng(this.latitud_marcador, this.longitud_marcador))
    this.pos_marcador++;
    
    this.polylineOptions = {path: this.polylines}
    this.poly = new google.maps.Polyline(this.polylineOptions)

    if(this.polylines.length > 0){
      this.poly.setMap(null)
    }
    this.poly.setMap(this.map)
  }

  click_eliminarPunto(){
    this.polylines.pop()
    this.pos_marcador--;
    
    this.polylineOptions = {path: this.polylines}
    this.poly = new google.maps.Polyline(this.polylineOptions)

    if(this.polylines.length > 0){
      this.poly.setMap(null);
    }
    this.poly.setMap(this.map)
  }

  agregarRuta(){

    if(this.nombre == "")
    {
      Swal.fire("Error en validación", "El campo nombre de la Ruta no puede estar vacío", "warning");
    }
    else if(this.descripcion == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Agregando Ruta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'nombre': this.nombre,
        'descripcion': this.descripcion,
        'estado': '1',
        'id_usuario': localStorage.getItem('id_usuario'),
        "id_empresa": localStorage.getItem("id_empresa")
      };
  
      console.log(parametros)
      this.http.post(this.url+"ruta/agregarRuta", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  console.log(datos_recibidos)
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.cont_delimitador = 0;
              this.id_ruta = datos.id_ruta;
              if(this.polylines.length > 0){
                this.agregarRutaLimite();
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

  agregarRutaLimite(){
    if(this.nombre == "")
    {
      Swal.fire("Error en validación", "El campo nombre de la Ruta no puede estar vacío", "warning");
    }
    else if(this.descripcion == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Agregando Limte ' + (this.cont_delimitador+1) + '/' + this.polylines.length, text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'id_ruta': this.id_ruta,
        'posicion': this.cont_delimitador,
        'latitud': this.polylines[this.cont_delimitador].lat().toFixed(6),
        'longitud': this.polylines[this.cont_delimitador].lng().toFixed(6),
        "id_empresa": localStorage.getItem("id_empresa")
      };
  
      console.log(parametros)
      this.http.post(this.url+"ruta/agregarRutaLimite", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.cont_delimitador++;
              if(this.polylines.length > this.cont_delimitador){
                this.agregarRutaLimite();
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
}
