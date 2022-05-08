import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ruta-lista',
  templateUrl: './ruta-lista.component.html',
  styleUrls: ['./ruta-lista.component.css']
})
export class RutaListaComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  showModalAsignarUsuarios:boolean = false;

  @ViewChild(DataTableDirective, {static: false}) dtElement:any = DataTableDirective;

  url:string = globals.url;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaRutas : any;
  listaUsuarioshabilitados:any;
  listaUsuariosDeshabilitados:any;

  id_ruta_seleccionado:string = '';

  constructor(private http: HttpClient, private router:Router) { }

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
      setTimeout(()=>{
        this.listaRutaUsuarioByUsuario();
      }, 100);
     
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

  click_agregarNuevaRuta(){
    this.router.navigate(['/admin/ruta/agregar']);
  }

  click_AbrirModalAsignarUsuario(_idRuta:string){
    this.showModalAsignarUsuarios = true;
    this.id_ruta_seleccionado = _idRuta;
    this.listaRutaUsuarioByRuta(_idRuta);
    this.listaRutaUsuarioNoRegistradoByUsuario(_idRuta);
  }

  agregarRutaUsuario(_idUsuario:string){
    Swal.fire({title: 'Buscando clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "id_ruta": this.id_ruta_seleccionado,
      "id_usuario":_idUsuario
    };

    this.http.post(this.url+"ruta/agregarRutaUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows)
          {
            this.listaRutaUsuarioByRuta(this.id_ruta_seleccionado);
            this.listaRutaUsuarioNoRegistradoByUsuario(this.id_ruta_seleccionado);
          }
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  eliminarRutaUsuarioById(_idUsuario:string){
    if(_idUsuario != localStorage.getItem("id_usuario"))
    {
      Swal.fire({title: 'Buscando clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      let parametros = {
        "id_empresa": localStorage.getItem("id_empresa"),
        "id_ruta": this.id_ruta_seleccionado,
        "id_usuario":_idUsuario
      };

      this.http.post(this.url+"ruta/eliminarRutaUsuarioById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows)
            {
              this.listaRutaUsuarioByRuta(this.id_ruta_seleccionado);
              this.listaRutaUsuarioNoRegistradoByUsuario(this.id_ruta_seleccionado);
            }
            
          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });
    }
    else
    {
      Swal.fire("Error en validación", "No puedes eliminar tu propio acceso. . .", "warning");
    }
    
  }

  listaRutaUsuarioByUsuario(){
    Swal.fire({title: 'Buscando rutas',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "id_usuario":localStorage.getItem("id_usuario")
    };

    this.http.post(this.url+"ruta/listaRutaUsuarioByUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaRutas = datos;
          
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

  listaRutaUsuarioByRuta(_idRuta:string){
    //listaRutaUsuarioByRuta(estado, id_ruta, id_empresa)
    Swal.fire({title: 'Buscando clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "id_ruta": _idRuta
    };

    this.http.post(this.url+"ruta/listaRutaUsuarioByRuta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.listaUsuarioshabilitados = datos;
        
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  listaRutaUsuarioNoRegistradoByUsuario(_idRuta:string){
    
    Swal.fire({title: 'Buscando clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "id_ruta": _idRuta
    };

    this.http.post(this.url+"ruta/listaRutaUsuarioNoRegistradoByUsuario", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.listaUsuariosDeshabilitados = datos;
        
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
