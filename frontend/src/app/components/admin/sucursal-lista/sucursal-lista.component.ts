import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { encryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal-lista',
  templateUrl: './sucursal-lista.component.html',
  styleUrls: ['./sucursal-lista.component.css']
})
export class SucursalListaComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;

  listaSucursal:any;

  listaHorarioSucursal:any;

  showModalHorariosSucursal:boolean = false;
  showModalServicioSucursal:boolean = false;

  objSucursal:any;
  imagenesServicio:any;

  datosHoras:any = [];

  info_servicio:any = '';

  files: File[] = [];
  count_file:any = 0;

  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit(): void {
    this.listaSucursalRolByRol();
    this.llenarDatosHorario();
  }

  clickNavegarHaciaVerSucursal(_idSucursal:string){
    this.route.navigate(['admin/sucursal/panel/', encryptNumber(_idSucursal)]);
  }

  clickNavegarHaciaAgregarSucursal(){
    this.route.navigate(['admin/sucursal/agregar']);
  }

  clickNavegarHaciaActualizarSucursal(_idSucursal:string){
    this.route.navigate(['admin/sucursal/actualizar', encryptNumber(_idSucursal)]);
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  click_servicioSucursal(_idSucursal:string){
    this.showModalServicioSucursal = true;
    this.SucursalById(_idSucursal);
  }

  actualizarHorarioSucursalById(_hora_inicio_uno:string, _hora_final_uno:string, _hora_inicio_dos:string, _hora_final_dos:string, _id:string){

    let parametros = {
      "hora_inicio_uno": _hora_inicio_uno, 
      "hora_final_uno": _hora_final_uno,
      "hora_inicio_dos": _hora_inicio_dos,
      "hora_final_dos": _hora_final_dos,
      "id": _id,
      "id_usuario": localStorage.getItem('id_usuario')
    };
  
    Swal.fire({title: 'Actualizando Horario de la sucursal. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.post(this.url + "sucursal/actualizarHorarioSucursalById", parametros).subscribe((datos_recibidos:any) => {
      
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1){
            //mostramos mensaje de ok!
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  eliminarImagenById(_img:string){
    let parametros = {
      "imagen": _img, 
      "id": this.objSucursal.id,
      "id_empresa": localStorage.getItem('id_empresa')
    };
  
    Swal.fire({title: 'Actualizando información Servicio de la sucursal. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.post(this.url + "sucursal/eliminarImagenById", parametros).subscribe((datos_recibidos:any) => {
      
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1){
            this.SucursalById(this.objSucursal.id);
          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  actualizarInformacionServicioSucursal(){
    let parametros = {
      "info_servicio": this.info_servicio, 
      "id_sucursal": this.objSucursal.id,
      "id_empresa": localStorage.getItem('id_empresa')
    };
  
    Swal.fire({title: 'Actualizando información Servicio de la sucursal. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.post(this.url + "sucursal/actualizarInformacionServicioSucursal", parametros).subscribe((datos_recibidos:any) => {
      
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == 1){
            //mostramos mensaje de ok!
            if(this.files.length > 0)
            {
              this.count_file = 0;
              this.agregarImagenServicioSucursal();
            }

            this.cerrarModal.nativeElement.click();
            this.showModalServicioSucursal = false;

          }
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  agregarImagenServicioSucursal(){
    console.log(this.files.length , " " ,this.count_file);
    if(this.files.length > this.count_file ) {
      Swal.fire({title: 'Agregando imagen ' + (this.count_file+1) + "/" + this.files.length,text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      const formData: FormData = new FormData();
      formData.append('imagen', this.files[this.count_file]);
      
      this.http.post(this.url+"sucursal/agregarImagenServicioSucursal/" + this.objSucursal.id + "/"+ localStorage.getItem('id_empresa'), formData).subscribe((datos_recibidos:any) => {
        Swal.close();
        this.count_file = this.count_file + 1;  
        this.agregarImagenServicioSucursal()
      });
    }else{
      console.log('fin');      
      this.files = [];
    }
  }

  listaSucursalRolByRol(){
    let parametros = {"estado": 1, "id_rol": localStorage.getItem("id_rol") ,"id_empresa": localStorage.getItem("id_empresa")};

    this.http.post(this.url + "sucursal/listaSucursalRolByRol", parametros).subscribe((datos_recibidos:any) => {
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaSucursal = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  llenarDatosHorario(){
    for(let i = 0; i< 24;i++){
      let text = '0';
      if(i >= 10){
        text = '';
      }
      this.datosHoras.push({hora: text + i.toString() + ':00:00'}); 
      this.datosHoras.push({hora: text + i.toString() + ':30:00'});
    }
  }

  listaHorarioSucursalByIdSucursal(_idSucursal:string){

    this.showModalHorariosSucursal = true;

    this.listaHorarioSucursal = [];

    let parametros = {
      "estado": 1, 
      "id_sucursal": _idSucursal,
      "id_empresa": localStorage.getItem("id_empresa")
    };
  
    this.http.post(this.url + "sucursal/listaHorarioSucursalByIdSucursal", parametros).subscribe((datos_recibidos:any) => {
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaHorarioSucursal = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  SucursalById(_id_sucursal:string){    

    let parametros = {
      "id_empresa": localStorage.getItem('id_empresa'),
      "id": _id_sucursal
    };
  
    Swal.fire({title: 'Buscando información Sucursal. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    this.http.post(this.url + "sucursal/SucursalById", parametros).subscribe((datos_recibidos:any) => {
      
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.objSucursal = datos[0];
          this.info_servicio = this.objSucursal.info_servicio;

          this.imagenesServicio = datos[0].imagen_servicio.split(",");
          //console.log(this.imagenesServicio)
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
