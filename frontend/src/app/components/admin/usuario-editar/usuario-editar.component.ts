import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';
declare const google: any;

@Component({
  selector: 'app-usuario-editar',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.css']
})
export class UsuarioEditarComponent implements OnInit, AfterViewInit {
  map:any;
  @ViewChild('mapElement') mapElement: any;
  url:string = globals.url;

  datosRol: any;
  datosDepartamento: any;
  datosProvincia: any;
  datosMunicipio: any;

  id_usuario:string = ''
  ci_usuario:string  = '';
  expedicion_usuario:string = '';
  genero_usuario:string = '';
  estado_civil_usuario:string = '';
  foto_usuario:string = 'sin_imagen_usuario.jpg';
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
  swMap:boolean = false;

  files: File[] = [];

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labelIndex = 0;
  markersArray:any = [];

  constructor(private http: HttpClient, public route: ActivatedRoute, private router:Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;
      this.id_usuario = decryptNumber(this.route.snapshot.paramMap.get("id_usuario"))

      this.listaDepartamentoByEstado();
      this.listaRolByIdEmpresa();
      this.usuarioById();
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
      if(this.swMap){
        this.addMarker(event.latLng, this.map);
      }
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

  click_desbloquear(){
    this.swMap = true;
    let elemento:any = document.querySelector("#btnDesbloqueo");
    elemento.style.display = 'none';
  }

  clickNavegarHaciaListadoUsuarios(){
    this.router.navigate(["admin/usuario"]);
  }

  actualizarDatosUsuarioById(){
    Swal.fire({title: 'Cargando peticion',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
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
        'latitud': this.latitud_usuario, 'longitud': this.longitud_usuario, 
        'id_rol': this.id_rol, 'id_empresa': localStorage.getItem("id_empresa"), 'id': this.id_usuario
      };
  
      this.http.post(this.url + "usuario/actualizarDatosUsuarioById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        console.log(datos_recibidos);
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              if(this.files.length > 0)
              {
                this.actualizarImagenById(this.id_usuario);
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
  
  usuarioById(){

    Swal.fire({title: 'Buscando registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "id": this.id_usuario
    };
    this.http.post(this.url+"usuario/usuarioById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.foto_usuario = datos[0].foto;
          this.ci_usuario = datos[0].ci;
          this.expedicion_usuario = datos[0].ci_exp;
          this.nombre_usuario = datos[0].nombre;
          this.apellido_paterno_usuario = datos[0].appat;
          this.apellido_materno_usuario = datos[0].apmat;
          this.correo_usuario = datos[0].email;
          this.telefono_usuario = datos[0].celular;
          this.genero_usuario = datos[0].genero;

          //let fecha  = this.datePipe.transform((datos[0].fecha_nacimiento), 'yyyy-MM-dd');
          //this.fecha_nacimiento_usuario = fecha == null  ? (datos[0].fecha_nacimiento): fecha;
          let fecha = datos[0].fecha_nacimiento.split("/");
          this.fecha_nacimiento_usuario = fecha[2] + "-" + fecha[1] + "-" + fecha[0];
          
          this.estado_civil_usuario = datos[0].estado_civil;
          this.estudio_usuario = datos[0].estudio;
          this.zona_usuario = datos[0].zona;
          this.avenida_usuario = datos[0].avenida;
          this.calle_usuario = datos[0].calle;
          this.numero_casa_usuario = datos[0].numero;
          this.referencia_usuario = datos[0].referencia;

          
          this.latitud_usuario = datos[0].latitud;
          this.longitud_usuario = datos[0].longitud;
          this.departamento = datos[0].departamento;

          this.listaProvinciasByDepartamentoEstado();
          this.provincia = datos[0].provincia;
          this.listaMunicipiosByDepartamentoProvinciaEstado();
          this.id_municipio = datos[0].id_departamento;
          this.id_rol = datos[0].id_rol;

          let posicion = {lat: parseFloat(this.latitud_usuario), lng: parseFloat(this.longitud_usuario)}
          this.markersArray[0] = new google.maps.Marker({
            position: posicion,
            label: this.labels[this.labelIndex++ % this.labels.length],
          });
          this.markersArray[0].setMap(this.map);
          this.map.setCenter(posicion);
          this.map.setZoom(15);
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
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
