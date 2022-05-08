import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';

@Component({
  selector: 'app-sucursal-modulo',
  templateUrl: './sucursal-modulo.component.html',
  styleUrls: ['./sucursal-modulo.component.css']
})
export class SucursalModuloComponent implements OnInit {

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;

  url : any;

  showModalAsignarAlmacen:boolean = false;
  showModalVistaAreliShop:boolean = false;
  
  id_sucursal:string = ""
  nombre_sucursal:string = '';
  direccion_sucursal:string = '';
  foto_sucursal:string = 'sin_imagen_sucursal.jpg';
  areli_shop:boolean = false;

  id_almacen_seleccionado:string = '';

  listaAlmacenVenta:any;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servcioSucursal: ServicioSucursalService) { }

  ngOnInit(): void {
    this.url = globals.url;
    this.recuperarDatosAlmacen();
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{    
      this.recuperarDatosAlmacen();
    }, 500);
  }

  click_listaPanel(){
    this.router.navigate(['/admin/sucursal/panel/', encryptNumber(this.id_sucursal)]);
  }

  click_listaAlmacen(){
    this.router.navigate(['/admin/sucursal/almacen/', encryptNumber(this.id_sucursal)]);
  }

  click_venta(){
    if(this.id_almacen_seleccionado !== ""){
      this.router.navigate(['/admin/venta/', encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen_seleccionado)]);
    }else{
      Swal.fire("No existe Almacen", "no se encontro almacen para la venta, seleccione e intente nuevamente.", "warning");
    }
    
  }

  click_ajustePrecio(){
    this.router.navigate(['/admin/sucursal/ajuste-precio/', encryptNumber(this.id_sucursal)]);
  }

  click_ajusteMinimo(){
    this.router.navigate(['/admin/sucursal/ajuste-minimo/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirDescuentoCantidad(){
    this.router.navigate(['/admin/sucursal/descuento-cantidad/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirLiquidacion(){
    this.router.navigate(['/admin/sucursal/liquidacion/', encryptNumber(this.id_sucursal)]);
  }
  
  click_abrirPreventa(){
    this.router.navigate(['/admin/sucursal/pre-venta-lista/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirListaVenta(){
    this.router.navigate(['/admin/sucursal/venta-lista/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirCargaLista(){
    this.router.navigate(['/admin/sucursal/carga-lista/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirDistribucion(){
    this.router.navigate(['/admin/sucursal/distribucion/', encryptNumber(this.id_sucursal)]);
  }

  click_AbrirCargaAsignar(){
    this.router.navigate(['/admin/sucursal/carga-asignar/', encryptNumber(this.id_sucursal)]);
  }

  click_abrirPromocion(){
    this.router.navigate(['/admin/sucursal/promocion/', encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen_seleccionado)]);
  }

  click_abrirModalAsignarAlmacen(){
    this.showModalAsignarAlmacen = true;
    this.listaAlmacenVentaSucursalBySucursal();
  }

  click_abrirModalArelisShopHabilitar(){
    this.showModalVistaAreliShop = true;
  }

  recuperarDatosAlmacen()
  {
    this.id_sucursal = this.servcioSucursal.getIdSucursal();
    if(this.id_sucursal != ""){
      this.sucursalById();
      this.almacenVentaSucursalBySucursalVenta();
    }
  }

  click_rbHabilitado(){
    this.areli_shop = true;
  }

  click_rbDeshabilitado(){
    this.areli_shop = false;
  }

  actualizarAreliShopBySucursalEmpresa(){
    //actualizarAreliShopBySucursalEmpresa(areli_shop, id_sucursal, id_empresa)
    Swal.fire({title: 'Actualizando datos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let validaAreliShop = this.areli_shop == true ? '1' : '0';
      let parametros = {
        "areli_shop": validaAreliShop,
        "id_empresa": localStorage.getItem("id_empresa"),
        'id_sucursal': this.id_sucursal
      };

      this.http.post(this.url+"sucursal/actualizarAreliShopBySucursalEmpresa", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.cerrarModal.nativeElement.click();
              this.showModalVistaAreliShop = false;
              this.sucursalById();
            }
            
          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });

  }


  actualizarVentaAlmacenByAlmacen(){
    
    if(this.id_almacen_seleccionado != "")
    {
      Swal.fire({title: 'Actualizando datos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        "venta": 1,
        "id_almacen":  this.id_almacen_seleccionado,
        "id_empresa": localStorage.getItem("id_empresa"),
        "estado": 1,
        'id_sucursal': this.id_sucursal
      };

      this.http.post(this.url+"almacen/actualizarVentaAlmacenByAlmacen", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();

        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
        
        if(datosMysql === undefined){
          if(datosNodejs === undefined){

            if(datos.affectedRows == 1)
            {
              this.cerrarModal.nativeElement.click();
              this.showModalAsignarAlmacen = false;
            }
            
          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });

    }
    else{
      Swal.fire("Error en validar datos", "Error en asignar el almacen este debe ser uno valido", "warning");
    }
    
  }

  listaAlmacenVentaSucursalBySucursal(){
    
    Swal.fire({title: 'Buscando almacen',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1,
      'id_sucursal': this.id_sucursal
    };

    this.http.post(this.url+"almacen/listaAlmacenVentaSucursalBySucursal", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){

          this.listaAlmacenVenta = datos;
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }

  
  almacenVentaSucursalBySucursalVenta(){

    Swal.fire({title: 'Buscando datos almacen. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

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

          if(datos.length > 0){
            this.id_almacen_seleccionado = datos[0].id;
          }else{
            this.id_almacen_seleccionado = "";
          }
  
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
    
  }


  sucursalById(){
    Swal.fire({title: 'Extrayendo informacion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      'id_empresa': localStorage.getItem("id_empresa"),
      'id': this.id_sucursal
    };

    this.http.post(this.url+"sucursal/sucursalById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
    
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.areli_shop = datos[0].arelishop == '1' ? true:false;
          this.nombre_sucursal = datos[0].nombre;
          this.foto_sucursal = datos[0].foto;
          this.direccion_sucursal = datos[0].departamento + ", " + datos[0].provincia + " - " + datos[0].municipio;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }


}
