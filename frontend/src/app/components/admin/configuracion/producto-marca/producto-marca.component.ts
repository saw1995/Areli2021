import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { encryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-marca',
  templateUrl: './producto-marca.component.html',
  styleUrls: ['./producto-marca.component.css']
})
export class ProductoMarcaComponent implements OnInit {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  showModalAgregarMarca:boolean = false;
  showModalActualizarMarca:boolean = false;

  url:string = globals.url;

  listaMarca:any;

  idMarca:string = "";
  nombre_marca:string = "";
  descripcion_marca:string = "";
  imagen_marca:string = '';

  files: File[] = [];

  constructor(private http:HttpClient, private route:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("Configuracion") != undefined){
      this.listaMarcaByEstado();
    }else{
      this.route.navigate(['/restriccion-admin']);
    }
  }

  onSelect(event:any) {
    if(this.files && this.files.length >=1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  clickAgregarMarca(){
    this.nombre_marca = '';
    this.descripcion_marca = '';
    this.showModalAgregarMarca = true;
  }

  clickActualizarMarca(_id:string,_nombre:string,_descripcion:string,_img:string){
    this.idMarca = _id;
    this.nombre_marca = _nombre;
    this.descripcion_marca = _descripcion;
    this.imagen_marca = _img;
  
    this.showModalActualizarMarca = true;
  }
  clickNavegarHaciaFamiliaProducto(_idMarca:string)
  {
    this.route.navigate(['admin/configuracion/marca-productos/producto-familia', encryptNumber(_idMarca)]);
  }

  agregarMarca(){
    if(this.nombre_marca == "")
    {
      Swal.fire("Error en validación", "El campo nombre marca no puede estar vacío", "warning");
    }
    else if(this.descripcion_marca == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Cargando registros marca. . . ',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
      let parametros = {
        'nombre': this.nombre_marca,
        'descripcion': this.descripcion_marca,
        'imagen': 'sin_imagen_marca.jpg',
        'estado': 1,
        "id_empresa": localStorage.getItem("id_empresa")};
  
      this.http.post(this.url+"marca/agregarMarca", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              console.log("imagen", this.files.length);
              if(this.files && this.files.length >=1) {
                const formData: FormData = new FormData();
                formData.append('imagen', this.files[0]);
                this.http.post(
                  this.url + "marca/actualizarImagenById/" + datos.id_marca,
                   formData).subscribe((response:any) => {
                  console.log("termino:" + response)

                  this.onRemove(this.files);
                });
              }
            
              this.listaMarcaByEstado();
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarMarca = false;
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

  actualizarDatosById(){
    if(this.nombre_marca == "")
    {
      Swal.fire("Error en validación", "El campo nombre marca no puede estar vacío", "warning");
    }
    else if(this.descripcion_marca == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Actualizando registros. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
      let parametros = {
        'nombre': this.nombre_marca,
        'descripcion': this.descripcion_marca,
        'id': this.idMarca}
  
      this.http.post(this.url+"marca/actualizarDatosById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              console.log("imagen", this.files.length);
              if(this.files && this.files.length >=1) {
                const formData: FormData = new FormData();
                formData.append('imagen', this.files[0]);
                this.http.post(
                  this.url + "marca/actualizarImagenById/" + parametros.id,
                   formData).subscribe((response:any) => {
                  console.log("termino:" + response)

                  this.onRemove(this.files);
                });
              }
            
              this.listaMarcaByEstado();
              this.cerrarModal.nativeElement.click();
              this.showModalActualizarMarca = false;
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

  actualizarEstadoByIdMarca(_estado:number, _idMarca:string){

    Swal.fire({title: 'Actualizando datos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
    let parametros = {
      'estado': _estado,
      'id': _idMarca}

    this.http.post(this.url+"marca/actualizarEstadoByIdMarca", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          if(datos.affectedRows == 1)
          {
            this.listaMarcaByEstado();
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }

  listaMarcaByEstado()
  {
    Swal.fire({title: 'Buscando registros marcas. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), 'estado': 1};

    this.http.post(this.url+"marca/listaMarcaByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaMarca = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
