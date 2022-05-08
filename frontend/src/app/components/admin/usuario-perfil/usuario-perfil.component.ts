import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { listaGestion } from 'src/app/utils/fecha-hora';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
declare const google: any;

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  url:string = globals.url;

  id_usuario:string = decryptNumber(this.router.snapshot.paramMap.get("id_usuario"));

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  map:any;
  @ViewChild('mapElement') mapElement: any;

  showModalCambiarClave:boolean = false;
  showModalUbicacionMaps:boolean = false;

  mes:any;
  gestionActual:any;
  rangoUno:string = ""
  rangoDos:string = ""
  fecha_inicio:string = ""
  fecha_final:string = ""
  enviar_fecha_inicio:string = ""
  enviar_fecha_final:string = ""

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
  edad_usuario:string = '';

  departamento:string = '';
  provincia:string = '';
  municipio_usuario:string = '';
  id_municipio:string = '';

  zona_usuario:string = '';
  avenida_usuario:string = '';
  calle_usuario:string = '';
  numero_casa_usuario:string = '';
  referencia_usuario:string = '';
  imagen_usuario:string = 'sin_imagen_usuario.jpg';

  id_rol:string = '';
  nombre_rol:string = '';
  password:string = '';

  passAnterior:string = '';
  passNuevo_uno:string = '';
  passNuevo_dos:string = '';

  usuario_habilitado:boolean = false;

  datosGestion:any = []
  datosLiquidacion:any = []
  datosUsuarioLiquidacion:any = []

  total:any = 0.0;
  sobrante:any = 0.0;

  labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  labelIndex = 0;
  markersArray:any = [];

  constructor(private router: ActivatedRoute, private http:HttpClient, private datePipe:DatePipe, private nav:Router){ }

  ngOnInit(): void {
    if(localStorage.getItem("Usuarios") != undefined){
      this.url = globals.url;

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };

      this.usuarioById();

      this.datosGestion = listaGestion();
      this.gestionActual = this.datosGestion[ this.datosGestion.length - 1 ]["gestion"]
      this.rangoUno = "Mes"
      this.rangoDos = "Año"
      this.mes = (Number(new Date().getMonth()) +1)
      this.fecha_inicio = this.gestionActual + "-" + this.mes + "-" + new Date().getDate()
      this.fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate()
      
      this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
      this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();


    }else{
      this.nav.navigate(['/restriccion-admin']);
    }
    
  }

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: {lat: -16.540246638894946, lng: -64.79782730340958},
      zoom: 5
    });
    google.maps.event.addListener(this.map, "click", (event:any) => {
     
    });
    this.dtTrigger.next(this.dtOptions);
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

    this.listaLiquidacionGeneralByIdUsuario();
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

    this.listaLiquidacionGeneralByIdUsuario();
  }

  changeMes() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaLiquidacionGeneralByIdUsuario();
  }

  changeGestion() {
    this.enviar_fecha_inicio = this.gestionActual + "-" + this.mes + "-" + "01";
    this.enviar_fecha_final = this.gestionActual + "-" + this.mes + "-" + new Date(this.gestionActual, this.mes, 0).getDate();
    this.listaLiquidacionGeneralByIdUsuario();
  }

  changeFechaInicio() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaLiquidacionGeneralByIdUsuario();
  }

  changeFechaFinal() {
    this.enviar_fecha_inicio = this.fecha_inicio;
    this.enviar_fecha_final = this.fecha_final;
    this.listaLiquidacionGeneralByIdUsuario();
  }

  click_abrirSaldo(){
    this.listaLiquidacionGeneralByIdUsuario();
  }

  clickNavegarHaciaActualizarUsuario(){
    this.nav.navigate(['admin/usuario/editar', encryptNumber(this.id_usuario)]);
  }

  clickActualizarClave(){
    this.showModalCambiarClave = true;
  }

  clickVerPuntoMapsGoogle(){
    this.showModalUbicacionMaps = true;
  }

  reporteGenerar(){

  }

  actualizarEstadoByIdUsuario(_estado:number){    
       
      Swal.fire({title: 'Actualizando estado habilitación usuario. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      let parametros = {
        "estado": _estado,
        "id": this.id_usuario,
        'id_empresa': localStorage.getItem("id_empresa")
      };

      this.http.post(this.url+"usuario/actualizarEstadoByIdUsuario", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.usuarioById();
            }

          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
  
      });
  }

  actualizarPassById(){    
    
    if(this.passAnterior == '' || this.passNuevo_uno == '' || this.passNuevo_dos == '')
    {
      Swal.fire("Error en validación", "Error en validar datos no pueden existir campos vacíos, intente nuevamente. . .", "warning");
    }
    else if(this.password != this.passAnterior)
    {
      Swal.fire("Error en validación", "La contraseña que inserto es incorrecta, intente nuevamente. . .", "warning");
      this.passAnterior = '';
    }
    else if(this.passNuevo_uno != this.passNuevo_dos)
    {
      Swal.fire("Error en validación", "No coincide la nueva contraseña con la que inserto, intente nuevamente. . .", "warning");
      this.passNuevo_dos = '';
    }
    else
    {
     
      Swal.fire({title: 'Buscando registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      let parametros = {
        "pass": this.passNuevo_dos ,
        "id_usuario": this.id_usuario,
        'id_empresa': localStorage.getItem("id_empresa")
      };
      this.http.post(this.url+"usuario/actualizarPassById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows == 1)
            {
              this.password = this.passNuevo_dos;

              this.passAnterior = ''; 
              this.passNuevo_uno = '';
              this.passNuevo_dos = '';
              this.showModalCambiarClave = false;
              this.cerrarModal.nativeElement.click();
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
          
          this.ci_usuario = datos[0].ci;
          this.expedicion_usuario = datos[0].ci_exp;
          this.nombre_usuario = datos[0].nombre;
          this.apellido_paterno_usuario = datos[0].appat;
          this.apellido_materno_usuario = datos[0].apmat;
          this.correo_usuario = datos[0].email;
          this.telefono_usuario = datos[0].celular;
          this.genero_usuario = datos[0].genero;
          this.fecha_nacimiento_usuario = datos[0].fecha_nacimiento;
        
          this.estado_civil_usuario = datos[0].estado_civil;
          this.estudio_usuario = datos[0].estudio;
          this.zona_usuario = datos[0].zona;
          this.avenida_usuario = datos[0].avenida;
          this.calle_usuario = datos[0].calle;
          this.numero_casa_usuario = datos[0].numero;
          this.referencia_usuario = datos[0].referencia;

          this.usuario_habilitado = datos[0].estado == '1' ? true: false;

          this.departamento = datos[0].departamento;
          this.provincia = datos[0].provincia;
          this.id_municipio = datos[0].id_departamento;
          this.id_rol = datos[0].id_rol;
          this.nombre_rol = datos[0].nombre_rol;
          this.imagen_usuario = datos[0].foto;
          this.edad_usuario = datos[0].edad;
          this.municipio_usuario = datos[0].municipio;

          this.password = datos[0].pass;

          let posicion = {lat: parseFloat(datos[0].latitud), lng: parseFloat(datos[0].longitud)}
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

  listaLiquidacionGeneralByIdUsuario(){
    Swal.fire({title: 'Buscando lista de liquidaciones. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = 
    {
      "estado": 1,
      "id_usuario_cuenta": this.id_usuario,
      "id_usuario": "0",
      "fecha_inicio": this.enviar_fecha_inicio,
      "fecha_fin": this.enviar_fecha_final,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"liquidacion/listaLiquidacionGeneralByIdUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.total = 0.0;
          this.sobrante = 0.0;
          this.datosLiquidacion = datos;
        
          for(let i = 0 ; i<= datos.length-1;i++){
            this.total = parseFloat( this.total) + parseFloat(this.datosLiquidacion[i]["total"]);
            this.sobrante = parseFloat( this.sobrante) + parseFloat(this.datosLiquidacion[i]["sobrante"]);
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
}
