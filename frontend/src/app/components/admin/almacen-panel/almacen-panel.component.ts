import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { decryptNumber, encryptNumber } from '../../../utils/encrypt';
import { globals } from '../../../utils/global';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';


@Component({
  selector: 'app-almacen-panel',
  templateUrl: './almacen-panel.component.html',
  styleUrls: ['./almacen-panel.component.css']
})
export class AlmacenPanelComponent implements OnInit {

  url : any;

  id_sucursal:string = "1"
  id_almacen:string = '';

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicioAlmacen: ServicioAlmacenService) { }

  ngOnInit(): void {
    this.url = globals.url;
    this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"));
    this.servicioAlmacen.setIdAlmacen(this.id_almacen);
  }
}
