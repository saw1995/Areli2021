import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';

@Component({
  selector: 'app-almacen-lista',
  templateUrl: './almacen-lista.component.html',
  styleUrls: ['./almacen-lista.component.css']
})
export class AlmacenListaComponent implements OnInit {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;
  listaAlmacen:any[] = [];

  showModalAgregarCompra:boolean = false;
  showModalAgregarAlmacen:boolean = false;
  showModalActualizarAlmacen:boolean = false;

  id_sucursal:string = "1"
  id_almacen:string = '';
  
  nombre:string = '';
  descripcion:string = '';

  actualizar_id:string = '';
  actualizar_nombre:string = '';
  actualizar_descripcion:string = '';

  seleccion_id:string = '';
  seleccion_nombre:string = '';
  seleccion_descripcion:string = '';

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicioSucursal: ServicioSucursalService) { }

  ngOnInit(): void {

    if(localStorage.getItem("Almacenes") != undefined){
      this.url = globals.url;  
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"));
      this.servicioSucursal.setIdSucursal(this.id_sucursal);

      /*if(this.id_sucursal == "1"){
        this.nombre_sucursal = "Indenpendientes"
      }else{
        this.sucursalById();
      }*/
      this.listaAlmacenRolByRol();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  agregarAlmacen()
  {
    if(this.nombre == "")
    {
      Swal.fire("Error al validar los datos", "El campo nombre almacen no puede ser vacío.", "warning");
    }else if(this.descripcion == "")
    {
      Swal.fire("Error al validar los datos", "El campo descripción almacen no puede ser vacío.", "warning");
    }
    else
    {
      let parametros = {
        "id_sucursal": this.id_sucursal,
        'nombre': this.nombre,
        'descripcion': this.descripcion,
        'latitud': '0',
        'longitud': '0',
        'id_empresa': localStorage.getItem("id_empresa"),
        'id_rol': localStorage.getItem("id_rol")
      };
  
      Swal.fire({title: 'Buscando lista de almacenes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      this.http.post(this.url + "almacen/agregarAlmacen", parametros).subscribe((datos_recibidos:any) => 
      {
        Swal.close();
        console.log(datos_recibidos);
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows == 1)
            {
              //this.id_almacen = datos.id_almacen;
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarAlmacen = false;
              this.listaAlmacenRolByRol();
            }
          }
          else
          {
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }
        else
        {
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });
    }
  }

  actualizarDatosAlmacen(){

    if(this.actualizar_nombre == "")
    {
      Swal.fire("Error al validar los datos", "El campo nombre almacen no puede ser vacío.", "warning");
    }else if(this.actualizar_descripcion == "")
    {
      Swal.fire("Error al validar los datos", "El campo descripción almacen no puede ser vacío.", "warning");
    }
    else
    {
      let parametros = {
        "id_sucursal": '1',
        'nombre': this.actualizar_nombre,
        'descripcion': this.actualizar_descripcion,
        'latitud': '0',
        'longitud': '0',
        'id_empresa': localStorage.getItem("id_empresa"),
        'id': this.actualizar_id
      };
  
      Swal.fire({title: 'Ejecutando la petición',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      this.http.post(this.url + "almacen/actualizarDatosAlmacen", parametros).subscribe((datos_recibidos:any) => 
      {
        Swal.close();
        console.log(datos_recibidos);
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            if(datos.affectedRows == 1)
            {
              this.listaAlmacenRolByRol();
              this.cerrarModal.nativeElement.click();
              this.showModalActualizarAlmacen = false;
            }
          }
          else
          {
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }
        else
        {
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });
    }
  }

  listaAlmacenRolByRol()
  {
    Swal.fire({title: 'Buscando lista de almacenes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      'id_sucursal': this.id_sucursal,
      'id_rol': localStorage.getItem("id_rol")
    };
    this.http.post(this.url+"almacen/listaAlmacenRolByRol", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaAlmacen = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  click_agregarAlmacen(){
    this.nombre = '';
    this.descripcion = '';
    this.showModalAgregarAlmacen = true;
  }

  clickAgrgarCompra(){
    this.showModalAgregarCompra = true;
  }

  clickSeleecionarAlmacen(_id:string, _nombre:string, _descripcion:string){
    this.seleccion_id = _id;
    this.seleccion_nombre = _nombre;
    this.seleccion_descripcion = _descripcion;
    this.router.navigate(['/admin/almacen/panel/', encryptNumber(this.seleccion_id)]);
  }

  clickActualizarAlmacen(_id:string, _nombre:string, _descripcion:string){
    this.actualizar_id = _id;
    this.actualizar_nombre = _nombre;
    this.actualizar_descripcion = _descripcion;

    this.showModalActualizarAlmacen = true;
  }

  click_listaCompra(){
    this.router.navigate(['/admin/almacen/compra', encryptNumber(this.seleccion_id)]);
  }

  click_listaTraspaso(tipo:string){
    if(tipo === "entrada"){
      this.router.navigate(['/admin/almacen/traspaso-entrada/', tipo, encryptNumber(this.id_sucursal), encryptNumber(this.seleccion_id)]);
    }else{
      this.router.navigate(['/admin/almacen/traspaso-salida/', tipo, encryptNumber(this.id_sucursal), encryptNumber(this.seleccion_id)]);
    }
    
  }

  click_listaStock(){
    this.router.navigate(['/admin/almacen/stock/', encryptNumber(this.seleccion_id)]);
  }
}
