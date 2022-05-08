import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { globals } from '../../../utils/global';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { listaGestion } from '../../../utils/fecha-hora';
import Swal from 'sweetalert2';
import { ServicioSucursalService } from 'src/app/services/servicio-sucursal.service';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-promocion-lista',
  templateUrl: './promocion-lista.component.html',
  styleUrls: ['./promocion-lista.component.css']
})
export class PromocionListaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) dtElement:any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  showModalPromocionDetalle:boolean = false;

  url:string = "";

  id_sucursal:any = "";
  id_almacen:any = "";

  listaPromocion : any;
  listaHistorialPromocion : any;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicioAlmacen: ServicioAlmacenService, private servicioSucursal: ServicioSucursalService) { }

  ngOnInit(): void {
    if(localStorage.getItem("Sucursales") != undefined){
      this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"));
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"));
      this.servicioSucursal.setIdSucursal(this.id_sucursal);
      this.servicioAlmacen.setIdAlmacen(this.id_almacen);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };

      this.listaPromocionBySucursalByEstado("1")
    }else{
      this.router.navigate(['/restriccion-admin']);
    }   
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  click_promocionDetalle(id_promocion:any){
    this.showModalPromocionDetalle = true;
  }

  click_agregarPromocion(){
    this.router.navigate(['/admin/sucursal/promocion/agregar/', encryptNumber(this.id_sucursal), encryptNumber(this.id_almacen)]);
  }

  listaPromocionBySucursalByEstado(estado:any){
    Swal.fire({title: 'Buscando Promociones',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": estado,
      "id_sucursal": this.id_sucursal
    };
    
    this.http.post(this.url + "promocion/listaPromocionBySucursalByEstado", parametros).subscribe((datos_recibidos:any) => {
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
          
          if(estado == "1"){
            this.listaPromocion = datos
            this.listaPromocionBySucursalByEstado("0")
          }else{
            this.listaHistorialPromocion = datos

            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
    
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 5,
                lengthMenu : [5, 10, 25],
                processing: true,
                language: {
                  url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
                }
              };
              this.dtTrigger.next(this.dtOptions);
            });
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
