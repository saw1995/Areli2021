import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'inc-siderbar',
  templateUrl: './inc-siderbar.component.html',
  styleUrls: ['./inc-siderbar.component.css']
})
export class IncSiderbarComponent implements OnInit {
  url : any;
  usuario : any;
  foto : any;
  cargo : any;
  logo : any;

  menu_selec: any = "";

  panel_control:any = 0;
  usuarios:any = 0;
  categorias:any = 0;
  almacenes:any = 0;
  sucursales:any = 0;
  categoria_clientes:any = 0;
  clientes:any = 0;
  rutas:any = 0;
  configuracion:any = 0;
  liquidacion:any = 0;
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.url = globals.url;
    this.usuarioLoginByUsuarioEmpresa();

    this.usuario = localStorage.getItem("nombre_usuario") + " " + localStorage.getItem("appat_usuario") + " " + localStorage.getItem("apmat_usuario");
    this.foto = localStorage.getItem("foto_usuario");
    this.cargo = localStorage.getItem("nombre_rol");
    this.logo = localStorage.getItem("logo_empresa");
  }

  usuarioLoginByUsuarioEmpresa(){
    Swal.fire({title: 'Autentificando Usuario',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

        let parametros = {
          "id_usuario": localStorage.getItem("id_usuario"),
          "id_empresa": localStorage.getItem("id_empresa")
        };
        this.http.post(this.url+"usuario/usuarioLoginByUsuarioEmpresa", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();

          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              if(datos.length > 0){
 
                if(datos[0]["estado_usuario"] == "1"){
                  if(datos[0]["estado_empresa"] == "1"){

                    localStorage.setItem('id_usuario', datos[0]["id"]);
                    localStorage.setItem('id_rol', datos[0]["id_rol"]);
                    localStorage.setItem('id_empresa', datos[0]["id_empresa"]);
                    localStorage.setItem('foto_usuario', datos[0]["foto_usuario"]);
                    localStorage.setItem('logo_empresa', datos[0]["logo_empresa"]);
                    localStorage.setItem('nombre_empresa', datos[0]["nombre_empresa"]);
                    localStorage.setItem('nombre_usuario', datos[0]["nombre"]);
                    localStorage.setItem('appat_usuario', datos[0]["appat"]);
                    localStorage.setItem('apmat_usuario', datos[0]["apmat"]);
                    localStorage.setItem('id_rubro', datos[0]["id_rubro"]);
                    localStorage.setItem('nombre_rubro', datos[0]["nombre_rubro"]);
                    localStorage.setItem('nombre_rol', datos[0]["nombre_rol"]);

                    this.ultimaLicencia();
                  }else{
                    Swal.fire("Empresa Bloqueada", "Contactese con el administrador de la empresa que corresponda, todos los usuarios enlazados no podran acceder al sistema.", "warning");
                  }
                }else{
                  Swal.fire("Usuario Bloqueado", "Contactese con el administrador de la distribuidor que corresponda.", "warning");
                }

              }else{
                Swal.fire("Usuario no Identificado", "El usuario y/o contraseña no son correctas.", "warning");
              }
            }else{
              Swal.fire("Error en el Servidor", datosNodejs, "warning");
            }
          }else{
            Swal.fire("Error en la Base de Datos", datosMysql, "warning");
          }
        });
  }

  ultimaLicencia(){
    Swal.fire({title: 'Verificando licencia',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
    };
    this.http.post(this.url+"licencia/ultimaLicencia", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.length > 0){

            let fec = datos[0]["fecha_final"].split("-");
            let fecha1 = new Date(datos[0]["fecha_final"]);
            let fecha2 = new Date();
            let resta = fecha1.getTime() - fecha2.getTime();
            let diasRestantes = Math.round(resta / (1000*60*60*24));

            if (diasRestantes > -1) {

              this.loginByUsuarioPlataforma();

            }else{
              Swal.fire({
                title: "EMPRESA BLOQUEADA",
                text: "Su Licencia a expirado renueve la licencia de uso, contactese con el administrador. Nota: Tiene un maximo de 14 dias para renovar apartir de la fecha de expiracion de la licencia("+fecha1+"), caso contrario se eliminara todos los datos registrados desl sistema.",
                icon: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Entendido',
                allowOutsideClick: false
              }).then((result) => {
                if (result.isConfirmed) {
                  localStorage.clear();
                  let parametros = {
                    "id_empresa": localStorage.getItem("id_empresa"),
                    "estado": "0",
                  };
                  this.http.post(this.url+"empresa/actualizarEstodoByIdEmpresa", parametros).subscribe((datos_recibidos:any) => {

                  })
                }
              })
            }

          }else{
            localStorage.clear();
            Swal.fire("Problemas con la Licencia", "Existe un problema con su licencia, porfavor contactese con el administrador del sistema", "warning");
          }
        }else{
          localStorage.clear();
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        localStorage.clear();
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  loginByUsuarioPlataforma(){
    Swal.fire({title: 'Buscando cuenta abierta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_usuario": localStorage.getItem("id_usuario"),
      "plataforma": "Web",
      "id_empresa": localStorage.getItem("id_empresa"),
    };
    this.http.post(this.url+"usuario/loginByUsuarioPlataforma", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.length > 0){

            if(datos[0]["estado"] == "1"){
              localStorage.setItem('id_login', datos[0]["id"]);
              
              this.listaModuloRolByRol();
            }else{
              localStorage.clear();
              Swal.fire("Error en la Autentificacion", datos[0]["observacion_salida"], "warning");
            }
          }else{
            localStorage.clear();
              Swal.fire("Error en la Autentificacion", "La autentificacion de Usuario a fallado, por seguridad se cerro la cuenta", "warning");
          }
        }else{
          localStorage.clear();
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        localStorage.clear();
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  

  salirLogin(id_login:string){
    Swal.fire({title: 'Cerrando Sesion en otro Dispositivo',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "latitud_salida": "0",
      "longitud_salida": "0",
      "observacion_salida": "Sesion cerrada por cambio de dispositivo web",
      "dispositivo_salida": "Web",
      "estado": "0",
      "id": id_login,
      "id_empresa": localStorage.getItem("id_empresa"),
    };
    this.http.post(this.url+"usuario/salirLogin", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          if(datos.affectedRows == "1"){
                
            localStorage.clear();

          }else{
            localStorage.clear();
             Swal.fire("Existe un problema al cerrar el otro dispositivo, porfavor contactese con el administrador del sistema", datosNodejs, "warning");
          }
        }else{
          localStorage.clear();
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        localStorage.clear();
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaModuloRolByRol(){
    Swal.fire({title: 'Buscando cuenta abierta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_rol": localStorage.getItem("id_rol"),
      "id_empresa": localStorage.getItem("id_empresa"),
    };
    this.http.post(this.url+"rol/listaModuloRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          var i:number; 
          localStorage.removeItem("Panel Control")
          localStorage.removeItem("Usuarios")
          localStorage.removeItem("Categorias")
          localStorage.removeItem("Almacenes")
          localStorage.removeItem("Sucursales")
          localStorage.removeItem("Categoria Clientes")
          localStorage.removeItem("Clientes")
          localStorage.removeItem("Rutas")
          localStorage.removeItem("Configuracion")

          for(i=0;i<datos.length;i++){
            localStorage.setItem(datos[i]["nombre"], "1"); 
          }

          this.panel_control = localStorage.getItem("Panel Control");
          this.usuarios = localStorage.getItem("Usuarios");
          this.categorias = localStorage.getItem("Categorias");
          this.almacenes = localStorage.getItem("Almacenes");
          this.sucursales = localStorage.getItem("Sucursales");
          this.categoria_clientes = localStorage.getItem("Categoria Clientes");
          this.clientes = localStorage.getItem("Clientes");
          this.rutas = localStorage.getItem("Rutas");
          this.configuracion = localStorage.getItem("Configuracion");

        }else{
          localStorage.clear();
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        localStorage.clear();
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
