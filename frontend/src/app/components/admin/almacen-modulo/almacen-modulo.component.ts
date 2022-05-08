import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';


@Component({
  selector: 'app-almacen-modulo',
  templateUrl: './almacen-modulo.component.html',
  styleUrls: ['./almacen-modulo.component.css']
})
export class AlmacenModuloComponent implements OnInit, AfterViewInit {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  url : any;

  id_compra:string = "";
  id_sucursal:string = "1"
  id_almacen:string = '';
  nombre_almacen:string = '';
  descripcion_almacen:string = '';
  nombre_sucursal = '';

  showModalAgregarCompra:boolean = false;

  nombreAlmacen = '';
  concepto = '';

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servcio: ServicioAlmacenService) { }

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
    this.router.navigate(['/admin/almacen/panel/', encryptNumber(this.id_almacen)]);
  }

  click_listaStock(){
    this.router.navigate(['/admin/almacen/stock/', encryptNumber(this.id_almacen)]);
  }

  click_listaCompra(){
    this.router.navigate(['/admin/almacen/compra/', encryptNumber(this.id_almacen)]);
  }

  click_agregarTraspaso(){
    this.router.navigate(['/admin/almacen/traspaso/agregar/', encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen)]);
  }

  click_listaTraspaso(tipo:string){
    if(tipo === "entrada"){
      this.router.navigate(['/admin/almacen/traspaso-entrada/', tipo, encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen)]);
    }else{
      this.router.navigate(['/admin/almacen/traspaso-salida/', tipo, encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen)]);
    }
    
  }

  clickAbrirNuevaCompra()
  {
    this.concepto = '';
    this.showModalAgregarCompra = true;
  }

  recuperarDatosAlmacen()
  {
    this.id_almacen = this.servcio.getIdAlmacen();
    if(this.id_almacen != ""){
      this.almacenById();
    }
  }

  agregarCompra(){
    //agregarCompra(id_almacen, id_usuario, id_proveedor, concepto, id_factura_compra, estado, id_empresa)
    if(this.id_almacen == "")
    {
      Swal.fire("Error al validar los datos", "No se pudo obtener datos del almacen seleccionado, intente nuevamente. . .", "warning");
    }else if(this.concepto == "")
    {
      Swal.fire("Error al validar los datos", "El campto concepto de compra no puede estar vacío agregue almenos una descripcion, intente nuevamente . . .", "warning");
    }
    else
    {
      let parametros = {
        "id_almacen": this.id_almacen,
        'id_usuario': localStorage.getItem("id_usuario"),
        'id_proveedor': '1',
        'concepto': this.concepto,
        'id_factura_compra': '1',
        'estado': 1,
        'id_empresa': localStorage.getItem("id_empresa")
      };
  
      Swal.fire({title: 'Agregando Compra',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      this.http.post(this.url + "compra/agregarCompra", parametros).subscribe((datos_recibidos:any) => 
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
              this.cerrarModal.nativeElement.click();
              this.showModalAgregarCompra = false;
              this.id_compra = datos.id_compra + "";
              this.router.navigate(['/admin/almacen/compra-detalle/agregar/', encryptNumber(this.id_almacen), encryptNumber(this.id_compra)]);
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

  almacenById(){
    Swal.fire({title: 'Extrayendo informacion',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      'id_empresa': localStorage.getItem("id_empresa"),
      'id': this.id_almacen
    };

    this.http.post(this.url+"almacen/almacenById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.nombre_almacen = datos[0].nombre;
          this.descripcion_almacen = datos[0].descripcion;
          
          if(this.id_sucursal != "1"){
            this.nombre_sucursal = "Sucursal " + datos[0].sucursal;
          }else{
            this.nombre_sucursal = datos[0].sucursal;
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
