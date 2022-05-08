import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { encryptNumber } from 'src/app/utils/encrypt';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.css']
})
export class ClienteListaComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;

  url : any;
  data : any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  listaCliente:any;

  constructor(private route:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem("Clientes") != undefined){
      this.url = globals.url;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      };

      setTimeout(()=>{
        this.listaTiendaEmpresaByEstadoEmpresa();
      }, 100);
    }else{
      this.route.navigate(['/restriccion-admin']);
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  clickNavegarHaciaAgregarCliente(){
    this.route.navigate(['admin/cliente/agregar']);
  }

  clickNavegarActualizarCliente(_idCliente:string){
    this.route.navigate(['admin/cliente/actualizar', encryptNumber(_idCliente)]);
  }

  listaTiendaEmpresaByEstadoEmpresa(){
    Swal.fire({title: 'Buscando clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    let parametros = {"id_empresa": localStorage.getItem("id_empresa"),  "estado": 1 };

    this.http.post(this.url+"tienda/listaTiendaEmpresaByEstadoEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      console.log(datos_recibidos)

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaCliente = datos;
          
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
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });

  }
}
