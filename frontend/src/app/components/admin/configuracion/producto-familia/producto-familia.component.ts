import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-familia',
  templateUrl: './producto-familia.component.html',
  styleUrls: ['./producto-familia.component.css']
})
export class ProductoFamiliaComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;

  showModalAgregarGrupoProducto:boolean = false;
  showModalActualizarFamiliaProductos:boolean = false;

  idMarca:string = decryptNumber(this.router.snapshot.paramMap.get("id_marca"));
  imagen_marca:string = "";
  nombre_marca:string = '';
  descripcion_marca:string = '';
  
  marca_producto:string = '';
  
  id_familia:string = '';
  id_categoria:string = '';
  nombre_familia:string = '';
  descripcion_familia:string = '';
  imagen_familia:string = '';

  files: File[] = [];

  listaFamiliaProductos:any;

  listaCategoria:any;  

  constructor(private router:ActivatedRoute, private http:HttpClient, private route:Router) { }

  ngOnInit(): void 
  {
    if(localStorage.getItem("Configuracion") != undefined){
      this.router.paramMap.subscribe((params:any) => {
        this.idMarca = decryptNumber(params.get('id_marca'));
        this.listaProductoGrupoByMarcaEmpresa();
        this.marcaById();
        this.listaCategoriaByIdEmpresaByEstado();      
      });
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

  clickAgregarNuevoGrupoProducto(){
    this.nombre_familia = '';
    this.descripcion_familia = '';
    this.onRemove(this.files);

    this.showModalAgregarGrupoProducto = true;
  }

  clickActualizarDatosFamilia(_id:string, _nombre:string, _descripcion:string, _idCategoria:string,_img:string)
  {
    this.onRemove(this.files);

    this.id_familia = _id;
    this.nombre_familia = _nombre;
    this.descripcion_familia = _descripcion;
    this.id_categoria = _idCategoria;
    this.imagen_familia = _img;

    this.showModalActualizarFamiliaProductos = true;
  }
  clickNavegarHaciaProductos(_idGrupo:string)
  {
    this.route.navigate(['admin/configuracion/marca-productos/producto-lista', encryptNumber(_idGrupo)]);
  }

  agregarProductoGrupo(){
    
    if(this.nombre_familia == "")
    {
      Swal.fire("Error en validación", "El campo nombre categoría no puede estar vacío", "warning");
    }
    else if(this.descripcion_familia == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else if(this.id_categoria == '')
    {
      Swal.fire("Error en validación", 
      "Debe seleccionar una categoría.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Guardando nuevo grupo familia de producto. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
      let parametros = {
        'grupo': this.nombre_familia,
        'descripcion': this.descripcion_familia,
        'imagen': 'sin_imagen_grupo_producto.jpg',
        'estado': 1,
        'id_categoria': this.id_categoria,
        'id_marca': this.idMarca,
        "id_empresa": localStorage.getItem("id_empresa")};
  
      this.http.post(this.url+"producto/agregarProductoGrupo", parametros).subscribe((datos_recibidos:any) => {
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
                  this.url + "producto/actualizarImagenGrupoById/" + datos.id_producto_grupo,
                   formData).subscribe((response:any) => {
                  console.log("termino:" + response)

                  this.onRemove(this.files);
                });
              }
            
              this.listaProductoGrupoByMarcaEmpresa();
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarGrupoProducto = false;
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

  actualizarProductoGrupoById(){
    if(this.nombre_familia == "")
    {
      Swal.fire("Error en validación", "El campo nombre categoría no puede estar vacío", "warning");
    }
    else if(this.descripcion_familia == "")
    {
      Swal.fire("Error en validación", 
      "El campo descripción no puede estar vació, debe agregar al menos una descripción.",
       "warning");
    }
    else if(this.id_categoria == '')
    {
      Swal.fire("Error en validación", 
      "Debe seleccionar una categoría.",
       "warning");
    }
    else
    {

      Swal.fire({title: 'Actualizando datos familia producto. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      
      let parametros = {
        'nombre': this.nombre_familia,
        'descripcion': this.descripcion_familia,
        'id_categoria': this.id_categoria,
        'id': this.id_familia};
  
      this.http.post(this.url+"producto/actualizarProductoGrupoById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
  
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              if(this.files && this.files.length >=1) {
                const formData: FormData = new FormData();
                formData.append('imagen', this.files[0]);
                this.http.post(
                  this.url + "producto/actualizarImagenGrupoById/" + parametros.id,
                   formData).subscribe((response:any) => {

                  this.onRemove(this.files);
                });
              }
            
              this.listaProductoGrupoByMarcaEmpresa();
              this.cerrarModal.nativeElement.click();
              this.showModalActualizarFamiliaProductos = false;
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


  listaProductoGrupoByMarcaEmpresa(){
    Swal.fire({title: 'Cargando lista de familias de productos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), 'estado': 1, 'id_marca': this.idMarca};

    this.http.post(this.url+"producto/listaProductoGrupoByMarcaEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaFamiliaProductos = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  marcaById(){
    Swal.fire({title: 'Cargando datos Marca. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {'id': this.idMarca};

    this.http.post(this.url+"marca/marcaById ", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.nombre_marca = datos[0].nombre;
          this.descripcion_marca = datos[0].descripcion;
          this.imagen_marca = datos[0].imagen;

          this.marca_producto = this.nombre_marca + " - " + this.descripcion_marca;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }


  listaCategoriaByIdEmpresaByEstado(){
    Swal.fire({title: 'Cargando lista de Categorías. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

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
