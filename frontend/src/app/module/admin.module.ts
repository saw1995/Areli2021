import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AdminRoutingModule } from './admin-routing.module';

import { AjusteComponent } from '../components/admin/configuracion/ajuste/ajuste.component';
import { AdminComponent } from '../components/admin/admin.component';
import { IncHeaderComponent } from '../components/admin/inc-header/inc-header.component';
import { IncFooterComponent } from '../components/admin/inc-footer/inc-footer.component';
import { IncSiderbarComponent } from '../components/admin/inc-siderbar/inc-siderbar.component';
import { PanelcontrolComponent } from '../components/admin/panelcontrol/panelcontrol.component';
import { UsuarioAgregarComponent } from '../components/admin/usuario-agregar/usuario-agregar.component';
import { UsuarioListaComponent } from '../components/admin/usuario-lista/usuario-lista.component';
import { UsuarioPerfilComponent } from '../components/admin/usuario-perfil/usuario-perfil.component';
import { UsuarioEditarComponent } from '../components/admin/usuario-editar/usuario-editar.component';
import { AlmacenListaComponent } from '../components/admin/almacen-lista/almacen-lista.component';
import { AlmacenModuloComponent } from '../components/admin/almacen-modulo/almacen-modulo.component';
import { AlmacenPanelComponent } from '../components/admin/almacen-panel/almacen-panel.component';
import { CategoriaListaComponent } from '../components/admin/categoria-lista/categoria-lista.component';
import { CategoriaProductoListaComponent } from '../components/admin/categoria-producto-lista/categoria-producto-lista.component';
import { ClienteListaComponent } from '../components/admin/cliente-lista/cliente-lista.component';
import { ClienteAgregarComponent } from '../components/admin/cliente-agregar/cliente-agregar.component';
import { ClienteCategoriaComponent } from '../components/admin/cliente-categoria/cliente-categoria.component';
import { CompraListaComponent } from '../components/admin/compra-lista/compra-lista.component';
import { CompraDetalleComponent } from '../components/admin/compra-detalle/compra-detalle.component';
import { CompraDetalleAgregarComponent } from '../components/admin/compra-detalle-agregar/compra-detalle-agregar.component';
import { TraspasoListaComponent } from '../components/admin/traspaso-lista/traspaso-lista.component';
import { TraspasoAgregarComponent } from '../components/admin/traspaso-agregar/traspaso-agregar.component';
import { ProductoMarcaComponent } from '../components/admin/configuracion/producto-marca/producto-marca.component';
import { ProductoFamiliaComponent } from '../components/admin/configuracion/producto-familia/producto-familia.component';
import { ProductoListaComponent } from '../components/admin/configuracion/producto-lista/producto-lista.component';
import { StockListaComponent } from '../components/admin/stock-lista/stock-lista.component';
import { StockDetalleComponent } from '../components/admin/stock-detalle/stock-detalle.component';
import { ClienteActualizarComponent } from '../components/admin/cliente-actualizar/cliente-actualizar.component';
import { CargosAccesosComponent } from '../components/admin/configuracion/cargos-accesos/cargos-accesos.component';
import { SucursalListaComponent } from '../components/admin/sucursal-lista/sucursal-lista.component';
import { SucursalPanelComponent } from '../components/admin/sucursal-panel/sucursal-panel.component';
import { SucursalModuloComponent } from '../components/admin/sucursal-modulo/sucursal-modulo.component';
import { SucursalAgregarComponent } from '../components/admin/sucursal-agregar/sucursal-agregar.component';
import { SucursalActualizarComponent } from '../components/admin/sucursal-actualizar/sucursal-actualizar.component';
import { SucursalAjustePrecioComponent } from '../components/admin/sucursal-ajuste-precio/sucursal-ajuste-precio.component';
import { SucursalAjusteMinimoComponent } from '../components/admin/sucursal-ajuste-minimo/sucursal-ajuste-minimo.component';
import { PromocionListaComponent } from '../components/admin/promocion-lista/promocion-lista.component';
import { PromocionDetalleAgregarComponent } from '../components/admin/promocion-detalle-agregar/promocion-detalle-agregar.component';
import { LiquidacionListaComponent } from '../components/admin/liquidacion-lista/liquidacion-lista.component';
import { DescuentoCantidadComponent } from '../components/admin/descuento-cantidad/descuento-cantidad.component';
import { RutaListaComponent } from '../components/admin/ruta-lista/ruta-lista.component';
import { RutaAgregarComponent } from '../components/admin/ruta-agregar/ruta-agregar.component';
import { RutaEditarComponent } from '../components/admin/ruta-editar/ruta-editar.component';
import { VentaComponent } from '../components/admin/venta/venta.component';
import { PreventaListaComponent } from '../components/admin/preventa-lista/preventa-lista.component';
import { VentaListaComponent } from '../components/admin/venta-lista/venta-lista.component';
import { CargaListaComponent } from '../components/admin/carga-lista/carga-lista.component';
import { CargaAsignarComponent } from '../components/admin/carga-asignar/carga-asignar.component';
import { DistribucionListaComponent } from '../components/admin/distribucion-lista/distribucion-lista.component';

import { InicioComponent } from '../components/inicio/inicio.component';

import { FormsModule } from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    AjusteComponent,
    AdminComponent,
    IncHeaderComponent,
    IncFooterComponent,
    IncSiderbarComponent,
    PanelcontrolComponent,
    UsuarioAgregarComponent,
    UsuarioListaComponent,
    UsuarioPerfilComponent,
    UsuarioEditarComponent,
    AlmacenListaComponent,
    AlmacenModuloComponent,
    AlmacenPanelComponent,
    CategoriaListaComponent, 
    CategoriaProductoListaComponent,
    ClienteListaComponent,
    CompraListaComponent,
    CompraDetalleComponent,
    CompraDetalleAgregarComponent,
    TraspasoListaComponent,
    TraspasoAgregarComponent,
    ProductoMarcaComponent,
    ProductoFamiliaComponent,
    ProductoListaComponent,
    StockListaComponent,
    StockDetalleComponent,
    ClienteAgregarComponent,
    ClienteCategoriaComponent,
    ClienteActualizarComponent, 
    CargosAccesosComponent,
    SucursalListaComponent,
    SucursalModuloComponent,
    SucursalPanelComponent,
    SucursalAgregarComponent,
    SucursalActualizarComponent,
    SucursalAjustePrecioComponent,
    SucursalAjusteMinimoComponent,
    PromocionDetalleAgregarComponent,
    PromocionListaComponent,
    LiquidacionListaComponent,
    DescuentoCantidadComponent,
    RutaListaComponent,
    RutaAgregarComponent,
    RutaEditarComponent,
    VentaComponent,
    PreventaListaComponent,
    VentaListaComponent,
    CargaListaComponent,
    CargaAsignarComponent,
    DistribucionListaComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    //ToastrModule.forRoot(),
    DataTablesModule,
    HttpClientModule,
    //GoogleMapsModule,
    NgxDropzoneModule
  ],
  providers:[DatePipe]
})
export class AdminModule { }
