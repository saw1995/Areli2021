import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { decryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursal-ajuste-precio',
  templateUrl: './sucursal-ajuste-precio.component.html',
  styleUrls: ['./sucursal-ajuste-precio.component.css']
})
export class SucursalAjustePrecioComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url:string = globals.url;

  showModalAjustePrecioProducto:boolean = false;

  id_sucursal:string = '';
  id_almacen:string = '';
  id_medida:string = '';

  id_producto:string = '';
  id_grupo_producto:string = '';
  rango_medida:number = 0;
  precio_sugerido_unidad:number = 0;
  precio_sugerido_calculado:number = 0;

  listaCategoria:any;
  listaFamiliaProductos:any;
  listaMedidaProducto:any;

  producto_selecionado:string = '';

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioSucursalService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Sucursales") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))
      this.servicio.setIdSucursal(this.id_sucursal);
      
      this.almacenVentaSucursalBySucursalVenta();
    }else{
      this.router.navigate(['/restriccion-admin']);
    }
  }

  clickAbrirAjustarPrecio(_id_productoGrupo:string, _producto:string){
    this.producto_selecionado = _producto;
    this.showModalAjustePrecioProducto = true;
    this.id_grupo_producto = _id_productoGrupo;
    this.precioSugeridoByProductoGrupoAlmacen(_id_productoGrupo);
    this.precio_sugerido_calculado =0;
    
    this.rango_medida = 0;
  }

  calcularPrecioSugerido(){

    this.precio_sugerido_calculado = this.precio_sugerido_unidad * this.rango_medida;
  }

  actualizarPrecioSugeridoByProductoGrupoAlmacen(){
    Swal.fire({title: 'Actualizando precio de producto. . .',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    if(this.rango_medida != 0)
    {
      if(this.precio_sugerido_calculado != 0 || this.precio_sugerido_calculado > 0)
      {
        let nuevoPrecio = this.precio_sugerido_calculado / this.rango_medida;
        console.log(nuevoPrecio);
        let parametros = {
          "precio": nuevoPrecio,
          "id_producto_grupo": this.id_grupo_producto,
          "id_almacen": this.id_almacen,
          "id_empresa": localStorage.getItem("id_empresa")
        };
        
        this.http.post(this.url+"productostock/actualizarPrecioSugeridoByProductoGrupoAlmacen", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();

          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
          
          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              if(datos.affectedRows == 1)
              {
                this.cerrarModal.nativeElement.click();
                this.showModalAjustePrecioProducto = false;
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
        Swal.fire("Error en validación", "Debe ingresar un precio valido no puede ser igual a cero o menor, intente nuevamente . . .", "warning");  
      }
    }
    else
    {
      Swal.fire("Error en validación", "Debe seleccionar una presentación para poder actualizar el precio de producto, intente nuevamente", "warning");
    }
    

  }

  

  listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "id_almacen": this.id_almacen
    };
    
    this.http.post(this.url+"categoria/listaCategoriaProductoStockCeroByAlmacenEmpresaEstado", parametros).subscribe((datos_recibidos:any) => {
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

  listaMedidaByProductoEstado(_idProducto:string){
    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
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

  precioSugeridoByProductoGrupoAlmacen(_id_producto_grupo:string){
    Swal.fire({title: 'Cargando precio',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      'id_producto_grupo': _id_producto_grupo,
      'id_almacen': this.id_almacen,
      id_empresa: localStorage.getItem('id_empresa')
    };

    this.http.post(this.url+"productostock/precioSugeridoByProductoGrupoAlmacen", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.precio_sugerido_unidad = datos[0].precio_sugerido;
          this.id_producto = datos[0].id_producto;
          this.listaMedidaByProductoEstado(this.id_producto);

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
  
  listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria:string){

    Swal.fire({title: 'Cargando Registros',text: 'Aguarde unos segundos . . .', allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_categoria': id_categoria,
      'id_almacen': this.id_almacen
    };

    this.http.post(this.url+"productostock/listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa", parametros).subscribe((datos_recibidos:any) => {
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

  almacenVentaSucursalBySucursalVenta(){

    Swal.fire({title: 'Buscando datos de sucursal. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      "venta": 1,
      'id_sucursal': this.id_sucursal
    };

    this.http.post(this.url+"almacen/almacenVentaSucursalBySucursalVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.id_almacen = datos[0].id;
          
          this.listaCategoriaProductoStockCeroByAlmacenEmpresaEstado();

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }


}