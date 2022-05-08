import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { globals } from 'src/app/utils/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ajuste',
  templateUrl: './ajuste.component.html',
  styleUrls: ['./ajuste.component.css']
})
export class AjusteComponent implements OnInit {
  url:string = globals.url;

  ajuste_ruta:string = '';
  ajuste_stock:string = '';

  listaAjuste:any;

  constructor(private route:Router, private http:HttpClient) { }

  ngOnInit(): void {
    if(localStorage.getItem("Configuracion") != undefined){
      this.url = globals.url;

      this.listaAjusteByEmpresa();
    }else{
      this.route.navigate(['/restriccion-admin']);
    }
  }

  agregarAjuste(){

    Swal.fire({title: 'Actualizando ajuste',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let parametros = {
        'stock': this.ajuste_stock, 
        'ruta': this.ajuste_ruta, 
        'id_empresa': localStorage.getItem("id_empresa"),
        'id_usuario': localStorage.getItem("id_usuario")
      };
  
      this.http.post(this.url+"ajuste/agregarAjuste", parametros).subscribe((datos_recibidos:any) => {
        Swal.close();
        
        let datos = datos_recibidos["datos"];
        let datosMysql = datos_recibidos["mysql"];
        let datosNodejs = datos_recibidos["nodejs"];
  
        if(datosMysql === undefined){
          if(datosNodejs === undefined){
            
            if(datos.affectedRows == 1)
            {
              this.listaAjusteByEmpresa()
            }
  
          }else{
            Swal.fire("Error en el Servidor", datosNodejs, "warning");
          }
        }else{
          Swal.fire("Error en la Base de Datos", datosMysql, "warning");
        }
      });
  }

  listaAjusteByEmpresa(){
    Swal.fire({title: 'Buscando Ajustes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url + "ajuste/listaAjusteByEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaAjuste = datos;
          
          this.ajuste_ruta = this.listaAjuste[0].ruta;
          this.ajuste_stock = this.listaAjuste[0].stock;
          
          
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }
}
