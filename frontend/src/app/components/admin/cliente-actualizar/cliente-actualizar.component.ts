import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-actualizar',
  templateUrl: './cliente-actualizar.component.html',
  styleUrls: ['./cliente-actualizar.component.css']
})
export class ClienteActualizarComponent implements OnInit {

  url:string = globals.url;

  id_cliente = decryptNumber(this.router.snapshot.paramMap.get("id_cliente"))

  usuario_areli:string = '';
  contrasena_areli:string = '';
  
  id_categoria_cliente:string = '';
  id_tipo_cliente:string = '';

  swDepartamento:boolean = true;

  alias_cliente:string = '';
  correo_cliente:string = '';
  telefono_cliente:string = '';
  contacto_cliente:string = '';
  telefono_contacto_cliente:string = '';

  nit_cliente:number = 0;
  razon_social_cliente:string = 'Sin Nombre';

  zona_cliente:string = '';
  avenida_cliente:string = '';
  calle_cliente:string = '';
  numero_casa_cliente:string = '';
  referencia_cliente:string = '';

  listaCategoriaCliente:any;
  listaTipoCliente:any;

  datosDepartamento: any;
  datosProvincia: any;
  datosMunicipio: any;

  departamento:string = '';
  provincia:string = '';
  id_municipio:string = '';

  center = {lat: -16.540246638894946, lng: -64.79782730340958};
  zoom = 5;
  //display?: google.maps.LatLngLiteral;

  files: File[] = [];

  constructor(private http:HttpClient, private route:Router, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.tiendaById();
    this.listaTipoTiendaByEstado();
    this.listaCategoriaByIdEmpresaByEstado();
    this.listaDepartamentoByEstado();


    this.tiendaById();
  }

  changeDepartamento(){
    this.listaProvinciasByDepartamentoEstado();
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

  navegarHaciaListadoCliente(){
    this.route.navigate(['admin/cliente']);
  }

  //actualizarTiendaById(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id)
  actualizarTiendaById(){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.id_tipo_cliente == "" || this.id_categoria_cliente == '')
    {
      Swal.fire("Error en validación", "Debe Seleccionar los campos correspondientes de Categoria de cliente o Tipo de cliente, intente nuevamente.", "warning");
    }
    else if(this.alias_cliente == '')  
    {
      Swal.fire("Error en validación", "El campo alias del cliente o nombre no puede estar vacío, agregue al menos agregue un identificador", "warning");
    }
    else if(this.contacto_cliente == '')
    {
      Swal.fire("Error en validación", "Los campos de contacto cliente el nombre y telefono no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.id_municipio == '')
    {
      Swal.fire("Error en validación", "Seleccione un municipio valido, porfavor", "warning");
    }
    else
    {
      let parametros = {
        "id_tipo_tienda": this.id_tipo_cliente, 'nombre': this.alias_cliente,  'id_departamento': this.id_municipio,
        'zona': this.zona_cliente, 'avenida': this.avenida_cliente, 'calle': this.calle_cliente, 'numero': this.numero_casa_cliente, 'referencia': this.referencia_cliente,
        'nit': this.nit_cliente, 'razon_social': this.razon_social_cliente, 'email': this.correo_cliente, 'telefono': this.telefono_cliente, 'nombre_contacto': this.contacto_cliente,
        'celular_contacto': this.telefono_contacto_cliente, 'latitud': this.center.lat, 'longitud': this.center.lng, 'id': this.id_cliente
      };
  
      this.http.post(this.url + "tienda/actualizarTiendaById", parametros).subscribe((datos_recibidos:any) => {
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
                this.actualizarImagenById(this.id_cliente);
              }              

              this.navegarHaciaListadoCliente();
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

  actualizarImagenById(_diCliente:string){
    
    const formData: FormData = new FormData();
    formData.append('imagen', this.files[0]);
    this.http.post(
    this.url + "tienda/actualizarImagenById/" + _diCliente,
    formData).subscribe((response:any) => {
      
    });
  }

  tiendaById(){
    Swal.fire({title: 'Buscando registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = { "id_tienda": this.id_cliente };

    this.http.post(this.url+"tienda/tiendaById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){

          this.usuario_areli = datos[0].usuario;
          this.contrasena_areli = datos[0].pass;
          this.id_categoria_cliente = datos[0].id_tienda_categoria;
          this.id_tipo_cliente = datos[0].id_tipo_tienda;
          this.alias_cliente = datos[0].nombre;
          this.correo_cliente = datos[0].email;
          this.telefono_cliente = datos[0].telefono;
          this.contacto_cliente = datos[0].nombre_contacto;
          this.telefono_contacto_cliente = datos[0].celular_contacto;
          this.center.lat = datos[0].latitud;
          this.center.lng = datos[0].longitud;
          this.nit_cliente = datos[0].nit;
          this.razon_social_cliente = datos[0].razon_social;
          this.departamento = datos[0].departamento;
          this.provincia = datos[0].provincia;
          this.id_municipio = datos[0].id_departamento;
          this.zona_cliente = datos[0].zona;
          this.avenida_cliente = datos[0].avenida;;
          this.calle_cliente = datos[0].calle;;
          this.numero_casa_cliente = datos[0].numero;
          this.referencia_cliente = datos[0].referencia;

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaDepartamentoByEstado() {
    if(this.swDepartamento){
      this.swDepartamento = false;
      //Swal.fire({title: 'Buscando Departamentos . . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,   willOpen: () => {Swal.showLoading()}});
      let parametros = {
        "estado": "1"
      };
      this.http.post(this.url+"departamento/listaDepartamentoByEstado", parametros).subscribe((datos_recibidos:any) => {
        //Swal.close();
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

  listaTipoTiendaByEstado(){

    Swal.fire({title: 'Buscando registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = { "estado": 1 };

    this.http.post(this.url+"tienda/listaTipoTiendaByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaTipoCliente = datos;

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }


  listaCategoriaByIdEmpresaByEstado(){
    Swal.fire({title: 'Cargando listado de registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "estado": 1};

    this.http.post(this.url + "tienda/listaTiendaCategoriaByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoriaCliente = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
