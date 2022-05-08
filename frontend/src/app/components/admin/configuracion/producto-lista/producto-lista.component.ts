import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;

  showModalAgregarProducto:boolean = false;
  showModalMedidaProducto:boolean = false;
  showModalActualizarProducto:boolean = false;

  idGrupoProducto:string = decryptNumber(this.router.snapshot.paramMap.get("id_grupo"));
  nombre_familia:string = '';
  descripcion_familia:string = '';
  imagen_familia:string = '';

  familia_producto_descripcion:string ='';
  
  id_producto:string = "";
  codigo_barra_producto:string = '';
  codigo_producto:string = '';
  nombre_producto:string = '';
  descripcion_producto:string = '';

  unidad_medida:string = '';
  rango_medida:number = 0;
  cantidad_medida:number = 0;
  peso_medida:number = 0;

  files: File[] = [];
  count_file:any = 0;

  listaProductos:any;

  listaMedidaProducto:any;

  constructor(private router:ActivatedRoute, private http:HttpClient, private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("Configuracion") != undefined){
      this.router.paramMap.subscribe((params:any) => {
        this.idGrupoProducto = decryptNumber(params.get('id_grupo'));
        this.listaProductoByGrupoEmpresa();
        this.productoGrupoById();
      });
    }else{
      this.route.navigate(['/restriccion-admin']);
    }

    
  }

  onSelect(event:any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  clickAbrirModalAgregarProducto()
  {
    this.codigo_barra_producto = '';
    this.codigo_producto = '';
    this.nombre_producto = '';
    this.descripcion_producto = '';
    this.files = [];

    this.showModalAgregarProducto = true;
  }

  clickAbrirModalActualizarProducto(_id:string, _codigoBarra:string, _codigo:string, _nombre:string, _descripcion:string)
  {
    this.id_producto = _id;
    this.codigo_barra_producto = _codigoBarra;
    this.codigo_producto = _codigo;
    this.nombre_producto = _nombre;
    this.descripcion_producto = _descripcion;

    this.showModalActualizarProducto = true;
  }

  clickAbrirMedidasProducto(_idProducto:string){
    this.id_producto = _idProducto;
    this.listaMedidaByProductoEstado(this.id_producto);
    this.showModalMedidaProducto = true;
  }

  agregarProducto(){
    Swal.fire({title: 'Guardando nuevo producto. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.codigo_producto == "")
    {
      Swal.fire("Error en validación", "El campo código de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.nombre_producto == '')
    {
      Swal.fire("Error en validación", "El campo nombre de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.descripcion_producto == '')
    {
      Swal.fire("Error en validación", "El campo descripción de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else
    {
      let parametros = {
        "codigo_barra_qr": this.codigo_barra_producto,
        'codigo': this.codigo_producto, 
        'id_producto_grupo': this.idGrupoProducto,
        'nombre': this.nombre_producto,
        'descripcion': this.descripcion_producto,
        'imagen': '',
        'estado': 1,
        'id_empresa': localStorage.getItem('id_empresa')};
  
      this.http.post(this.url + "producto/agregarProducto", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.id_producto = datos.id_producto;
              
              if(this.files.length > 0)
              {
                this.count_file = 0;
                this.agregarImagenById();
              }

              this.cerrarModal.nativeElement.click();
              this.showModalAgregarProducto = false;

              this.listaProductoByGrupoEmpresa();


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

  agregarImagenById(){
    console.log(this.files.length , " " ,this.count_file);
    if(this.files.length > this.count_file ) {
      Swal.fire({title: 'Agregando imagen ' + (this.count_file+1) + "/" + this.files.length,text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
      const formData: FormData = new FormData();
      formData.append('imagen', this.files[this.count_file]);
      
      this.http.post(this.url+"producto/agregarImagenById/" + this.id_producto, formData).subscribe((datos_recibidos:any) => {
        Swal.close();
        this.count_file = this.count_file + 1;  
        this.agregarImagenById()
      });
    }else{
      console.log('fin');      
      this.files = [];
    }
  }

  agregarProductoMedida(){
    Swal.fire({title: 'Guardando medida de producto. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.unidad_medida == "")
    {
      Swal.fire("Error en validación", "El campo unidad de medida no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.rango_medida == 0 || this.cantidad_medida == 0)
    {
      Swal.fire("Error en validación", "El campo rango de medida o la cantidad de unidades no son validas, intente nuevamente. . .", "warning");
    }
    else
    {
      let parametros = {
        "id_producto": this.id_producto,
        'unidad': this.cantidad_medida, 
        'medida': this.unidad_medida,
        'rango': this.rango_medida,
        'peso': this.peso_medida,
        'ancho': 0,
        'alto': 0,
        'largo': 0,
        'estado': 1};
  
      this.http.post(this.url + "producto/agregarProductoMedida", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.listaMedidaByProductoEstado(this.id_producto);
            }

            this.unidad_medida = '',
            this.rango_medida = 0;
            this.peso_medida = 0;
            this.cantidad_medida = 0;

          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });
    }

  }

  
  actualizarProductoById(){
    Swal.fire({title: 'Actualizando datos del producto. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    if(this.codigo_producto == "")
    {
      Swal.fire("Error en validación", "El campo código de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.nombre_producto == '')
    {
      Swal.fire("Error en validación", "El campo nombre de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else if(this.descripcion_producto == '')
    {
      Swal.fire("Error en validación", "El campo descripción de producto no puede estar vacío, agregue al menos un identificador", "warning");
    }
    else
    {
      let parametros = {
        "codigo_barra_qr": this.codigo_barra_producto,
        'codigo': this.codigo_producto, 
        'id_producto_grupo': this.idGrupoProducto,
        'nombre': this.nombre_producto,
        'descripcion': this.descripcion_producto,
        'id': this.id_producto};
  
      this.http.post(this.url + "producto/actualizarProductoById", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.id_producto = datos.id_producto;
              
              if(this.files.length > 0)
              {
                this.count_file = 0;
                this.agregarImagenById();
              }

              this.cerrarModal.nativeElement.click();
              this.showModalActualizarProducto = false;

              this.listaProductoByGrupoEmpresa();


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
  
  listaProductoByGrupoEmpresa(){
    Swal.fire({title: 'Cargando lista de productos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {"id_empresa": localStorage.getItem("id_empresa"), 'estado': 1, 'id_producto_grupo': this.idGrupoProducto};

    this.http.post(this.url+"producto/listaProductoByGrupoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;
          }
          this.listaProductos = datos;
          
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  productoGrupoById(){
    Swal.fire({title: 'Cargando grupo de familia. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {'id_producto_grupo': this.idGrupoProducto};

    this.http.post(this.url+"producto/productoGrupoById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.nombre_familia = datos[0].grupo;
          this.descripcion_familia = datos[0].descripcion;
          this.imagen_familia = datos[0].imagen;
          this.familia_producto_descripcion = this.nombre_familia + " - " + this.descripcion_familia;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaMedidaByProductoEstado(_idProducto:string){
    Swal.fire({title: 'Cargando lista medidas de producto. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {'id_producto': _idProducto, 'estado': 1};

    this.http.post(this.url+"producto/listaMedidaByProductoEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaMedidaProducto = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
