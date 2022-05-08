import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.component.html',
  styleUrls: ['./categoria-lista.component.css']
})
export class CategoriaListaComponent implements AfterViewInit, OnDestroy, OnInit  {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  url:string = globals.url;

  listaCategoria:any;

  showModalAgregarCategoria:Boolean = false;
  showModalActualizarCategoria:boolean = false;

  AgregarCategoria_id:string = '';
  AgregarCategoria_nombre:string = '';
  AgregarCategoria_descripcion:string = '';

  actualizar_nombre:string = '';
  actualizar_descripcion:string = '';
  actualizar_id:string = '';

  files: File[] = [];

  constructor(private http: HttpClient, private router:Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("Categorias") != undefined){
      this.url = globals.url;

      this.listaCategoriaByIdEmpresaByEstado();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
    
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  onSelect(event:any) {
    if(this.files && this.files.length >=1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    if(this.files && this.files.length >=1) {
      this.files.splice(this.files.indexOf(event), 1);
    }
  }

  clickAgregarCategoria(){
    this.AgregarCategoria_id = "";
    this.AgregarCategoria_nombre = "";
    this.AgregarCategoria_descripcion = "";
    this.onRemove(this.files);

    this.showModalAgregarCategoria = true;
  }

  clickActualizarCategoria(_id:string,_nombre:string,_descripcion:string){
    this.actualizar_id = _id;
    this.actualizar_nombre = _nombre;
    this.actualizar_descripcion = _descripcion;

    this.showModalActualizarCategoria = true;
  }

  navegarProductoByCategoria(id_categoria:string) {
    this.router.navigate(['/admin/categoria/producto', encryptNumber(id_categoria)]);
  }
  //metodos para agregar y editar
  agregarCategoria(){

    if(this.AgregarCategoria_nombre == "")
    {
      Swal.fire("Error en validación", "El campo nombre categoría no puede estar vacío", "warning");
    }
    else if(this.AgregarCategoria_descripcion == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Buscando usuarios',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'nombre': this.AgregarCategoria_nombre,
        'descripcion': this.AgregarCategoria_descripcion,
        'imagen': 'sin_imagen_categoria.jpg',
        'dispositivo': 'desde pc angular',
        'latitud': '0', 'longitud': '0',
        'id_usuario': localStorage.getItem('id_usuario'),
        "id_empresa": localStorage.getItem("id_empresa")};
  
      this.http.post(this.url+"categoria/agregarCategoria", parametros).subscribe((datos_recibidos:any) => {
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
                  this.url + "categoria/actualizarImagenById/" + datos.id_categoria + "/" + parametros.id_empresa,
                   formData).subscribe((response:any) => {
                  console.log("termino:" + response)

                  this.onRemove(this.files);
                });
              }
            
              this.listaCategoriaByIdEmpresaByEstado();
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarCategoria = false;
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

  actualizarCategoriaById(){

    if(this.actualizar_nombre == "")
    {
      Swal.fire("Error en validación", "El campo nombre categoría no puede estar vacío", "warning");
    }
    else if(this.actualizar_descripcion == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Actualizando Categoria',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'nombre': this.actualizar_nombre, 
        'descripcion': this.actualizar_descripcion, 
        'id_empresa': localStorage.getItem("id_empresa"),
        'id': this.actualizar_id
      };
  
      this.http.post(this.url+"categoria/actualizarCategoriaById", parametros).subscribe((datos_recibidos:any) => {
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
                const formData: FormData = new FormData();
                formData.append('imagen', this.files[0]);
                this.http.post(
                  this.url + "categoria/actualizarImagenById/" + parametros.id + "/" + parametros.id_empresa,
                   formData).subscribe((response:any) => {
                  console.log("termino:" + response)
                });

                this.onRemove(this.files);
              }
  
              this.listaCategoriaByIdEmpresaByEstado();
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarCategoria = false;
              
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
  //metodos para listado de peticion api
  listaCategoriaByIdEmpresaByEstado(){
    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), "estado": 1};

    this.http.post(this.url+"categoria/listaCategoriaByIdEmpresaByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCategoria = datos;
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
