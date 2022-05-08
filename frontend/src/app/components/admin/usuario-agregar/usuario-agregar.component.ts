import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-usuario-agregar',
  templateUrl: './usuario-agregar.component.html',
  styleUrls: ['./usuario-agregar.component.css']
})
export class UsuarioAgregarComponent implements OnInit, AfterViewInit {
  map:any;
  @ViewChild('mapElement') mapElement: any;
  url:string = globals.url;

  datosRol: any;
  datosDepartamento: any;
  datosProvincia: any;
  datosMunicipio: any;

  ci_usuario:string  = '';
  expedicion_usuario:string = '';
  genero_usuario:string = '';
  estado_civil_usuario:string = '';
  nombre_usuario:string = '';
  apellido_paterno_usuario:string = '';
  apellido_materno_usuario:string = '';
  fecha_nacimiento_usuario:string = '';
  estudio_usuario:string = '';
  correo_usuario:string = '';
  telefono_usuario:string = '';

  departamento:string = '';
  provincia:string = '';
  id_municipio:string = '';

  zona_usuario:string = '';
  avenida_usuario:string = '';
  calle_usuario:string = '';
  numero_casa_usuario:string = '';
  referencia_usuario:string = '';
  latitud_usuario:string = '';
  longitud_usuario:string = '';

  id_rol:string = '';
  password_uno:string = '';
  password_dos:string = '';

  swDepartamento:boolean = true;

  files: File[] = [];

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labelIndex = 0;
  markersArray:any = [];

  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;

      this.listaDepartamentoByEstado();
      this.listaRolByIdEmpresa();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
    
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -16.540246638894946, lng: -64.79782730340958},
      zoom: 5
    });
    google.maps.event.addListener(this.map, "click", (event:any) => {
      this.addMarker(event.latLng, this.map);
    });
  }

  addMarker(location:any, map:any) {
    if(this.markersArray.length > 0){
      this.markersArray[0].setMap(null);
    }
    
    this.markersArray[0] = new google.maps.Marker({
      position: location,
      label: this.labels[this.labelIndex++ % this.labels.length],
    });
    
    this.markersArray[0].setMap(map);
    this.latitud_usuario = this.markersArray[0]["position"].lat().toFixed(6)
    this.longitud_usuario = this.markersArray[0]["position"].lng().toFixed(6)
  }

  changeDepartamento(){
    this.listaProvinciasByDepartamentoEstado();
    this.listaDepartamentoByEstado();
  }

  changeProvincia(){
    this.listaMunicipiosByDepartamentoProvinciaEstado();
  }
  
  onSelect(event:any) {
    console.log(event);
    if(this.files && this.files.length >=1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  clickNavegarHaciaListadoUsuarios(){
    this.router.navigate(["admin/usuario"]);
  }

  agregarUsuario(){
    Swal.fire({title: 'Guardando nuevo registro. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.ci_usuario == "" || this.expedicion_usuario == '')
    {
      Swal.fire("Error en validación", "Introduza el numero de Cedula de identidad o este no es valido, intente nuevamente", "warning");
    }
    else if(this.genero_usuario == '' || this.estado_civil_usuario == '')  
    {
      Swal.fire("Error en validación", "Debe seleccionar un genero o estado civil valido, intente nuevamente", "warning");
    }
    else if(this.nombre_usuario == '' || this.apellido_paterno_usuario == '')
    {
      Swal.fire("Error en validación", "El campo nombre y apellido paterno no pueden estar vacío, son olbigatorio, intente nuevamente", "warning");
    }
    else if(this.id_municipio == '')
    {
      Swal.fire("Error en validación", "Seleccione un municipio valido este camp es obligatorio, intente nuevamente", "warning");
    }
    else if(this.id_rol == '')
    {
      Swal.fire("Error en validación", "Seleccione un rol o cargo valido para el usuario, intente nuevamente. . .", "warning");
    }
    else if(this.password_uno != this.password_dos)
    {
      Swal.fire("Error en validación", "La Contraseña del usuario no coinciden, repita la contraseña nuevamente e intente nuevamente. . .", "warning");
      this.password_dos = '';
    }
    else
    {
      let parametros = {
        "ci": this.ci_usuario, 'ci_exp': this.expedicion_usuario,  'nombre': this.nombre_usuario,
        'appat': this.apellido_paterno_usuario, 'apmat': this.apellido_materno_usuario,
        'email': this.correo_usuario, 'celular': this.telefono_usuario, 'genero': this.genero_usuario,
        'id_departamento': this.id_municipio, 'fecha_nacimiento': this.fecha_nacimiento_usuario,
        'estado_civil': this.estado_civil_usuario, 'estudio': this.estudio_usuario,
        'zona': this.zona_usuario, 'avenida': this.avenida_usuario, 'calle': this.calle_usuario,
        'numero': this.numero_casa_usuario, 'referencia': this.referencia_usuario,
        'latitud': this.latitud_usuario, 'longitud': this.longitud_usuario, 'foto': 'sin_imagen_usuario.jpg',
        'pass': this.password_dos, 'id_rol': this.id_rol, 'id_empresa': localStorage.getItem("id_empresa"),
        'hr_id_usuario': localStorage.getItem("id_usuario"), 'hr_dispositivo': 'app web desconocido',
        'hr_latitud': '0', 'hr_longitud': '0'
      };
  
      this.http.post(this.url + "usuario/agregarUsuario", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              if(this.files.length > 0)
              {
                this.actualizarImagenById(datos.id_usuario);
              }              

              this.clickNavegarHaciaListadoUsuarios();
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

  actualizarImagenById(_idUsuario:string){
    const formData: FormData = new FormData();
    formData.append('imagen', this.files[0]);
    this.http.post(
    this.url + "usuario/actualizarImagenById/" + _idUsuario + "/" + localStorage.getItem("id_empresa"),
    formData).subscribe((response:any) => {
      console.log("termino:" + response)
    });
  }

  listaRolByIdEmpresa() {
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"rol/listaRolByIdEmpresa", parametros).subscribe((datos_recibidos:any) => {
      this.datosRol = datos_recibidos.datos;
    });
  }

  listaDepartamentoByEstado() {
    if(this.swDepartamento){
      this.swDepartamento = false;
      let parametros = {
        "estado": "1"
      };
      this.http.post(this.url+"departamento/listaDepartamentoByEstado", parametros).subscribe((datos_recibidos:any) => {
        this.datosDepartamento = datos_recibidos.datos;
      });
    }
  }

  listaProvinciasByDepartamentoEstado() {
    this.datosProvincia = [];
    this.datosMunicipio = [];
    this.provincia = "";
    this.id_municipio = "";
    let parametros = {
      "departamento": this.departamento,
      "estado": "1"
    };
    this.http.post(this.url+"departamento/listaProvinciasByDepartamentoEstado", parametros).subscribe((datos_recibidos:any) => {
      this.datosProvincia = datos_recibidos.datos;
    });
  }
  
  listaMunicipiosByDepartamentoProvinciaEstado() {
    this.datosMunicipio = [];
    this.id_municipio = "";
    let parametros = {
      "departamento": this.departamento,
      "provincia": this.provincia,
      "estado": "1"
    };
    this.http.post(this.url+"departamento/listaMunicipiosByDepartamentoProvinciaEstado", parametros).subscribe((datos_recibidos:any) => {
      this.datosMunicipio = datos_recibidos.datos;
    });
  }

}
