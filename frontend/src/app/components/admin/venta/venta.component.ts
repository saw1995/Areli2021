import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { globals } from '../../../utils/global';
import { decryptNumber } from '../../../utils/encrypt';
import { listaGestion } from '../../../utils/fecha-hora';
import Swal from 'sweetalert2';
import { ServicioAlmacenService } from 'src/app/services/servicio-almacen.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cerrarModal') cerrarModal:any = ElementRef;
  @ViewChild('cerrarModalTienda') cerrarModalTienda:any = ElementRef;
  @ViewChild('cerrarModalVentaDirecta') cerrarModalVentaDirecta:any = ElementRef;
  @ViewChild('cerrarModalCarrito') cerrarModalCarrito:any = ElementRef;
  @ViewChild(DataTableDirective, {static: false})
  dtElement:any = DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  url:string = globals.url;

  id_sucursal:any;
  id_almacen:any;
  id_producto_grupo:any;
  id_descuento_cantidad:any;

  id_tienda:any = ""
  id_tienda_empresa:any = ""
  imagen_tienda:any = "sin_imagen_tienda.jpg"
  tienda:any = "Seleccionar"
  categoria_tienda:any = "Seleccionar"
  nit:any = "0"
  razon_social:any = "Sin Nombre"
  fecha_entrega:any = ""
  enviar_factura:any = 0;
  observacion:any = ""
  tipo_venta = "";
  venta_credito:number = 0;
  metodo_pago:any = "0";

  cantUnidades:any = 0;
  precioBase:any = 0.00
  precio_actual:any = 0.00
  subtotal_actual:any = 0.00

  subtotal:any = 0.00
  descuento:any = 0.00
  total:any = 0.00

  cantidad:any = "0";
  medida:any = "0";
  id_producto:any = "";
  stock:any = "";
  cantidad_minima:any = "";

  id_promocion_seleccionado:string = '';
  nombre_promocion_seleccionado:string = '';
  precion_promocion_seleccionado:number = 0;

  cantidad_promocion:number = 0;
  
  listaCategoria:any;
  listaFamiliaProductos:any;
  listaProductos:any;
  listaPresentacion:any = [];
  listaDescuento:any = [];
  listaCarrito:any = [];
  listaTienda:any = [];
  listaPromociones:any = [];
  listaPromocionDetalle:any = [];

  listaCreditoPagos:any = [];

  monto_credito:any = 0;
  fecha_credito:any;

  showModalPresentacion:boolean = false;
  showModalCarrito:boolean = false;
  showModalTienda:boolean = false;
  showModalDetallePromocion:boolean = false;
  showModalVentaDirecta:boolean = false;
  showModalCreditoVenta:Boolean = false;

  constructor(private http: HttpClient, public router: Router, private route: ActivatedRoute, private servicio: ServicioAlmacenService) { }

  ngOnInit(): void {
    this.url = globals.url;
      this.id_sucursal = decryptNumber(this.route.snapshot.paramMap.get("id_sucursal"))
      this.id_almacen = decryptNumber(this.route.snapshot.paramMap.get("id_almacen"))

      this.servicio.setIdAlmacen(this.id_almacen);

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu : [5, 10, 25],
        processing: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
        }
      }

      this.listaCarritoByUsuarioSucursal();
      this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
      this.listaPromocionBySucursalByEstado();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  change_ventaCredito(){
    if(this.venta_credito == 1){
      let elemento:any = document.querySelector("#metodoPago");
      elemento.style.display = 'none';
      elemento = document.querySelector("#pagoCredito");
      elemento.style.display = 'block';
    }else{
      let elemento:any = document.querySelector("#metodoPago");
      elemento.style.display = 'block';
      elemento = document.querySelector("#pagoCredito");
      elemento.style.display = 'none';
    }
  }

  change_metodoPago(){
    if(this.metodo_pago == "0"){

    }

    if(this.metodo_pago == "1"){

    }

    if(this.metodo_pago == "2"){

    }
  }

  click_seleccionarTienda(id_tienda:any, foto_tienda:any, nombre_categoria:any, nombre_tienda:any){
    this.id_tienda = id_tienda;
    this.imagen_tienda = foto_tienda;
    this.categoria_tienda = nombre_categoria;
    this.tienda = nombre_tienda;

    this.showModalTienda = false;
    this.cerrarModalTienda.nativeElement.click();
  }

  click_abrirTienda(){
    this.showModalTienda = true;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25],
      processing: true,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.11.3/i18n/es-mx.json"
      }
    }
  }

  click_rbRuta(){
    this.listaTiendaEmpresaRutaByUsuarioEmpresa();
  }

  click_rbEmpresa(){
    this.listaTiendaEmpresaByEmpresaEstado()
  }

  click_rbAvanzada(){
    
  }

  click_presentacion(id_producto:any, stock:any, cantidad_minima:any) {
    this.cantidad = 0;
    this.medida = 0;

    this.id_producto = id_producto;
    this.stock = stock;
    this.cantidad_minima = cantidad_minima;
    this.id_promocion_seleccionado = '1';
    this.showModalPresentacion = true;
    this.listaMedidaByProductoEstado(id_producto)
  }

  click_verCarrito(){
    this.showModalCarrito = true;
    this.listaCarritoByUsuarioSucursal();
  }

  click_ventaDirecta(tipo:any){
    this.showModalVentaDirecta = true;
  }

  click_agregarVenta(tipo:any){
    if(parseFloat(this.subtotal) > 0){
      if(this.id_tienda != ""){
        this.tipo_venta = tipo;
        this.tiendaEmpresaByTiendaEmpresa();
      }else{
        Swal.fire("Cliente no seleccionado", "Seleccione un cliente", "warning");
      }
    }else{
      Swal.fire("Sin productos", "El carrito de venta se encuentra vacio", "warning");
    }
  }

  click_AbrirDetallePromocion(_idPromocion:string, _nombrePromocion:string, _descripcionPromocion:string, _precio:number){

    this.id_promocion_seleccionado = _idPromocion;
    this.precion_promocion_seleccionado = _precio;
    this.nombre_promocion_seleccionado = _nombrePromocion + ' - ' + _descripcionPromocion;
    this.showModalDetallePromocion = true;
    this.cantidad_promocion = 1;
    this.listaPromocionDetalleProductoByIdPromocion();
  }

  calcularCantidadDescuento(){
    this.cantUnidades = parseInt(this.medida) * parseInt(this.cantidad);
    if(this.listaDescuento.length > 0){
      for(let i=0; i<this.listaDescuento.length; i++){
        if(parseInt(this.listaDescuento[i]["cantidad_inicio"]) <= this.cantUnidades && parseInt(this.listaDescuento[i]["cantidad_limite"]) >= this.cantUnidades){
          this.precio_actual = parseFloat(this.listaDescuento[i]["precio_descuento"])
          this.id_descuento_cantidad = this.listaDescuento[i]["id"]
          this.subtotal_actual = parseFloat(this.precio_actual) * parseInt(this.cantUnidades)
          break;
        }else{
          this.id_descuento_cantidad = "1"
          this.precio_actual = this.precioBase
          this.subtotal_actual = parseFloat(this.precio_actual) * parseInt(this.cantUnidades)
        }
      }
    }else{
      this.id_descuento_cantidad = "1"
      this.precio_actual = this.precioBase
      this.subtotal_actual = parseFloat(this.precio_actual) * parseInt(this.cantUnidades)
    }
  }

  click_AbrirAgregarCuotaPago(){
    this.showModalCreditoVenta = true;
    this.monto_credito = 0;
    this.fecha_credito = '';
  }

  click_AgregarCuotaAlista(){
    if(this.monto_credito>0){
      let codigo = this.listaCreditoPagos.length > 0 ?  this.listaCreditoPagos.length + 1: 1;
      this.listaCreditoPagos.push({codigo:codigo, monto:this.monto_credito, fecha: this.fecha_credito, pago:'0'});
      
      this.showModalCreditoVenta = false;
    }
  }

  quitarCuotaDeListaCredito(_codigo:any){
    this.listaCreditoPagos = this.listaCreditoPagos.filter(function(cuota:any) {
      return cuota.codigo !== _codigo; 
    });
  }

  eliminarProductoCarritoById(id_carrito:any){
    let parametros = {
      'id': id_carrito,
      "id_empresa": localStorage.getItem("id_empresa")};

    this.http.post(this.url+"venta/eliminarProductoCarritoById", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          this.listaCarritoByUsuarioSucursal();

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  agregarPromocionAlCarrito(){
    if(this.id_promocion_seleccionado != '1' && this.cantidad_promocion >= 1){

      Swal.fire({title: 'Agregando promociones al carrito. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

      let valida = true;
      for(let i = 0 ; i<= this.listaPromocionDetalle.length-1; i++)
      {
        let parametros = {
          'id_producto': this.listaPromocionDetalle[i].id_producto,
          'cantidad': this.listaPromocionDetalle[i].cantidad * this.cantidad_promocion,
          'precio': this.listaPromocionDetalle[i].precio,
          'id_descuento_cantidad': 1,
          'id_sucursal': this.id_sucursal,
          'id_usuario': localStorage.getItem('id_usuario'),
          "id_empresa": localStorage.getItem("id_empresa"),
          "id_promocion": this.id_promocion_seleccionado
        };
    
        this.http.post(this.url+"venta/agregarVentaCarritoUsuario", parametros).subscribe((datos_recibidos:any) => {
    
          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
    
          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              
              if(datos.affectedRows == 0)
              {
                i = this.listaPromocionDetalle.length - 1;
                valida = false;
                console.log('Error no se agregaron los registros')
              }
    
            }else{
              Swal.fire("Error en el Servidor", datosNodejs, "warning");
              i = this.listaPromocionDetalle.length - 1;
              valida = false;
            }
          }else{
            Swal.fire("Error en la Base de Datos", datosMysql, "warning");
            i = this.listaPromocionDetalle.length - 1;
            valida = false;
          }
        });
      }

      Swal.close();
      
      if(valida==true){
        this.listaCarritoByUsuarioSucursal();
        this.cerrarModal.nativeElement.click();
        this.showModalDetallePromocion = false;
      }
    }else{
      console.log('Error en la logica de codificación. . .')
    }
    
  }

  agregarCarrito(){
    if(parseInt(this.cantUnidades) % parseInt(this.cantidad_minima) == 0){
      if(parseInt(this.cantUnidades) <= parseInt(this.stock)){

        let parametros = {
          'id_producto': this.id_producto,
          'cantidad': this.cantUnidades,
          'precio': this.precio_actual,
          'id_descuento_cantidad': this.id_descuento_cantidad,
          'id_sucursal': this.id_sucursal,
          'id_usuario': localStorage.getItem('id_usuario'),
          "id_empresa": localStorage.getItem("id_empresa"),
          "id_promocion": this.id_promocion_seleccionado
        };
    
        this.http.post(this.url+"venta/agregarVentaCarritoUsuario", parametros).subscribe((datos_recibidos:any) => {
          Swal.close();
    
          let datos = datos_recibidos["datos"];
          let datosMysql = datos_recibidos["mysql"];
          let datosNodejs = datos_recibidos["nodejs"];
    
          if(datosMysql === undefined){
            if(datosNodejs === undefined){
              
              if(datos.affectedRows == 1)
              {

                this.listaCarritoByUsuarioSucursal();
                this.cerrarModal.nativeElement.click();
                this.showModalPresentacion = false;
              }
    
            }else{
              Swal.fire("Error en el Servidor", datosNodejs, "warning");
            }
          }else{
            Swal.fire("Error en la Base de Datos", datosMysql, "warning");
          }
        });
      }else{
        Swal.fire("Stock Insuficiente", "La cantidad sobrepasa el stock, verifique e intente nuevamente.", "warning");
      }
    }else{
      Swal.fire("Cantidad Incorrecto", "La cantidad de venta solo puede ser multiplo de " + this.cantidad_minima, "warning");
    }
  }

  agregarPreVenta(){
    Swal.fire({title: 'Agregando Pre Venta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      'id_tienda_empresa': this.id_tienda_empresa,
      'id_tienda': this.id_tienda,    
      'razon_social': this.razon_social,
      'nit': this.nit,
      'id_sucursal': this.id_sucursal,
      'fecha_entrega': this.fecha_entrega,
      'observacion_inicio': this.observacion,
      'observacion_fin': this.observacion,
      'venta': "0",
      'factura': "0",
      'id_descuento_ticket': "1",
      'descuento_uno': "0",
      'detalle_descuento_uno': "",
      'descuento_dos': "0",
      'detalle_descuento_dos': "",
      'estado': "1",
      'id_venta': "1",
      'id_usuario': localStorage.getItem("id_usuario"),
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"venta/agregarPreVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          if(datos.affectedRows == 1)
          {
            this.listaCarritoByUsuarioSucursal();
            this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  agregarVentaCreditoDetallePago(_idVenta:string){
    Swal.fire({title: 'Agregando detalle creditos. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    if(this.listaCreditoPagos.length>0){
      
      var resultados = [];
      for(let i = 0; i<= this.listaCreditoPagos.length-1;i++){
        let parametros = {
          'id_venta': _idVenta,
          'monto': this.listaCreditoPagos[i].monto,
          'fecha': this.listaCreditoPagos[i].fecha,
          'pago': this.listaCreditoPagos[i].pago,
          'id_usuario': localStorage.getItem("id_usuario"),
          "id_empresa": localStorage.getItem("id_empresa")
        };
  
        this.http.post(this.url+"venta/agregarVentaCreditoDetallePago", parametros).subscribe((datos_recibidos:any) => {
          resultados.push(datos_recibidos);
        });
      }
      Swal.close();      
    }
    else{
      Swal.fire("Error en validar", "No se agrego datos", "warning");
    }
  }

  agregarVenta(){
    Swal.fire({title: 'Agregando Venta',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      'id_sucursal': this.id_sucursal,
      'razon_social': this.razon_social,
      'nit': this.nit,
      'observacion': this.observacion,
      'credito': this.venta_credito,
      'id_descuento_ticket': "1",
      'descuento_uno': "0",
      'detalle_descuento_uno': "",
      'descuento_dos': "0",
      'detalle_descuento_dos': "",
      'estado': "1",
      'id_tienda_empresa': this.id_tienda_empresa,
      'id_tienda': this.id_tienda,
      'id_pre_venta': "1",
      'id_usuario': localStorage.getItem("id_usuario"),
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"venta/agregarVenta", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          if(datos.affectedRows == 1)
          {
            if(this.venta_credito==1){
              this.agregarVentaCreditoDetallePago(datos.id_venta);
            }

            this.listaCarritoByUsuarioSucursal();
            this.listaCategoriaProductoStockByAlmacenEmpresaEstado();
            
            this.showModalCarrito = false;
            this.cerrarModalCarrito.nativeElement.click();

            this.showModalVentaDirecta = false;
            this.cerrarModalVentaDirecta.nativeElement.click();
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  agregarTiendaEmpresa(){
    Swal.fire({title: 'Enlazando tienda',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      'id_tienda': this.id_tienda,
      "id_empresa": localStorage.getItem("id_empresa")};

    this.http.post(this.url+"tienda/agregarTiendaEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          
          if(datos.affectedRows == 1)
          {
            this.tiendaEmpresaByTiendaEmpresa();
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaPromocionDetalleProductoByIdPromocion(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_promocion": this.id_promocion_seleccionado,
      "estado": 1
    };

    this.http.post(this.url+"promocion/listaPromocionDetalleProductoByIdPromocion", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];
    console.log(datos)
      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaPromocionDetalle = datos;

          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            this.listaPromocionDetalle[i]['imagen_uno'] = imagenes[0];
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaMedidaByProductoEstado(id_producto:any) {
    let parametros = {
      "id_producto": id_producto,
      "estado": "1",
    };
    this.http.post(this.url+"producto/listaMedidaByProductoEstado", parametros).subscribe((datos_recibidos:any) => {
      this.listaPresentacion = datos_recibidos.datos;
    });
  }

  listaDescuentoCantidadBySucursalProductoGrupo() {
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_producto_grupo": this.id_producto_grupo,
      "estado": "1",
      "id_empresa": localStorage.getItem("id_empresa")
    };
    this.http.post(this.url+"descuento/listaDescuentoCantidadBySucursalProductoGrupo", parametros).subscribe((datos_recibidos:any) => {
      this.listaDescuento = datos_recibidos.datos;
    });
  }

  tiendaEmpresaByTiendaEmpresa(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_tienda": this.id_tienda,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"tienda/tiendaEmpresaByTiendaEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){

          if(datos.length > 0){
            this.id_tienda_empresa = datos[0]["id"];

            if(this.tipo_venta === "venta"){
              this.agregarVenta();
            }
            if(this.tipo_venta === "pre_venta"){
              this.agregarPreVenta();
            }

          }else{
            this.agregarTiendaEmpresa();
          }
          

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaTiendaEmpresaRutaByUsuarioEmpresa(){
    Swal.fire({title: 'Buscando Clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_usuario": localStorage.getItem("id_usuario"),
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1
    };

    this.http.post(this.url+"tienda/listaTiendaEmpresaRutaByUsuarioEmpresa", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaTienda = datos;

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

  listaTiendaEmpresaByEmpresaEstado(){
    Swal.fire({title: 'Buscando Clientes',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1
    };

    this.http.post(this.url+"tienda/listaTiendaEmpresaByEmpresaEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaTienda = datos;
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

  listaPromocionBySucursalByEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando promociones actuales. . .',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_sucursal": this.id_sucursal,
      "estado": 1,
      "id_empresa": localStorage.getItem("id_empresa")
    };

    this.http.post(this.url+"promocion/listaPromocionBySucursalByEstado", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();

      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          this.listaPromociones = datos;
          for(let  i =0;i<= datos.length -1  ;i++)
          {
            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;
          }

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaCategoriaProductoStockByAlmacenEmpresaEstado(){
    this.listaFamiliaProductos = [];

    Swal.fire({title: 'Buscando lista de Categorías',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});

    let parametros = {
      "id_almacen": this.id_almacen,
      "id_empresa": localStorage.getItem("id_empresa"),
      "estado": 1
    };

    this.http.post(this.url+"categoria/listaCategoriaProductoStockByAlmacenEmpresaEstado", parametros).subscribe((datos_recibidos:any) => {
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

  listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria:string){
    this.listaProductos = [];

    Swal.fire({title: 'Buscando familia de producto',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
    
    let parametros = {
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': "1",
      'id_categoria': id_categoria,
      'id_almacen': this.id_almacen
    };

    this.http.post(this.url+"productostock/listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa", parametros).subscribe((datos_recibidos:any) => {
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

  listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_producto_grupo:string){
    this.id_producto_grupo = id_producto_grupo;
    Swal.fire({title: 'Buscando productos',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_almacen": this.id_almacen,
      "id_empresa": localStorage.getItem("id_empresa"),
      'estado': 1,
      'id_producto_grupo': id_producto_grupo
    };

    this.http.post(this.url+"productostock/listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa", parametros).subscribe((datos_recibidos:any) => {
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
          this.precioBase = this.listaProductos[0]["precio_sugerido"]
          this.precio_actual = this.precioBase;
          this.listaDescuentoCantidadBySucursalProductoGrupo();

        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

  listaCarritoByUsuarioSucursal(){
    this.subtotal =  0.00;
    this.descuento =  0.00;
    this.total =  0.00;
    Swal.fire({title: 'Buscando carrito',text: 'Aguarde unos segundos . . .',allowOutsideClick: false,willOpen: () => {Swal.showLoading()}});
  
    let parametros = {
      "id_sucursal": this.id_sucursal,
      "id_usuario": localStorage.getItem("id_usuario"),
      "id_empresa": localStorage.getItem("id_empresa"),
    };

    this.http.post(this.url+"venta/listaCarritoByUsuarioSucursal", parametros).subscribe((datos_recibidos:any) => {
      Swal.close();
      
      let datos = datos_recibidos["datos"];
      let datosMysql = datos_recibidos["mysql"];
      let datosNodejs = datos_recibidos["nodejs"];

      if(datosMysql === undefined){
        if(datosNodejs === undefined){
          for(let i=0; i<datos.length ; i++)
          {
            datos[i].nombre_promocion = datos[i].id_promocion != '1' ? 'Promo: ' + datos[i].nombre_promocion : '';

            let imagenes = datos[i]['imagen'].split(",");
            datos[i]['imagen'] = imagenes;

            this.descuento = this.descuento + parseFloat(datos[i]["descuento"]);
            this.subtotal = this.subtotal + parseFloat(datos[i]["subTotal"]);
          }

          this.total =  this.subtotal - this.descuento;
          this.listaCarrito = datos;
        }else{
          Swal.fire("Error en el Servidor", datosNodejs, "warning");
        }
      }else{
        Swal.fire("Error en la Base de Datos", datosMysql, "warning");
      }
    });
  }

}
