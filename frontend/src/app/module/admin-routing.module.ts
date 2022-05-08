import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '../components/admin/admin.component';

import { AjusteComponent } from '../components/admin/configuracion/ajuste/ajuste.component';
import { InicioComponent } from '../components/inicio/inicio.component';
import { RestriccionAdminComponent } from '../components/restriccion-admin/restriccion-admin.component';
import { UsuarioListaComponent } from '../components/admin/usuario-lista/usuario-lista.component';
import { UsuarioAgregarComponent } from '../components/admin/usuario-agregar/usuario-agregar.component';
import { AlmacenListaComponent } from '../components/admin/almacen-lista/almacen-lista.component';
import { AlmacenModuloComponent } from '../components/admin/almacen-modulo/almacen-modulo.component';
import { AlmacenPanelComponent } from '../components/admin/almacen-panel/almacen-panel.component';
import { PanelcontrolComponent } from '../components/admin/panelcontrol/panelcontrol.component';
import { UsuarioPerfilComponent } from '../components/admin/usuario-perfil/usuario-perfil.component';
import { UsuarioEditarComponent } from '../components/admin/usuario-editar/usuario-editar.component';
import { CategoriaListaComponent } from '../components/admin/categoria-lista/categoria-lista.component';
import { CategoriaProductoListaComponent } from '../components/admin/categoria-producto-lista/categoria-producto-lista.component';
import { ClienteListaComponent } from '../components/admin/cliente-lista/cliente-lista.component';
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
import { ClienteCategoriaComponent } from '../components/admin/cliente-categoria/cliente-categoria.component';
import { ClienteAgregarComponent } from '../components/admin/cliente-agregar/cliente-agregar.component';
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

const routes: Routes = [
  { path: 'admin', component: AdminComponent,
    children: [
      { path: '', component: PanelcontrolComponent},
      { path: 'usuario', component: UsuarioListaComponent},
      { path: 'usuario/agregar', component: UsuarioAgregarComponent},
      { path: 'usuario/editar/:id_usuario', component: UsuarioEditarComponent},
      { path: 'usuario/perfil/:id_usuario', component: UsuarioPerfilComponent},
      { path: 'almacen/:id_sucursal', component: AlmacenListaComponent},
      { path: 'almacen', component: AlmacenModuloComponent , 
        children: [
          { path: 'panel/:id_almacen', component: AlmacenPanelComponent},
          { path: 'compra-detalle/:id_almacen/:id_compra', component: CompraDetalleComponent},
          { path: 'stock/:id_almacen', component: StockListaComponent},
          { path: 'compra/:id_almacen', component: CompraListaComponent},
          { path: 'compra-detalle/agregar/:id_almacen/:id_compra', component: CompraDetalleAgregarComponent},
          { path: 'traspaso/agregar/:id_sucursal/:id_almacen', component: TraspasoAgregarComponent},
          { path: 'traspaso-entrada/:tipo/:id_sucursal/:id_almacen', component: TraspasoListaComponent},
          { path: 'traspaso-salida/:tipo/:id_sucursal/:id_almacen', component: TraspasoListaComponent},
        ]
      },
      { path: 'categoria', component: CategoriaListaComponent},
      { path: 'categoria/producto/:id_categoria', component: CategoriaProductoListaComponent},
      { path: 'configuracion/marca-productos', component: ProductoMarcaComponent,
        children: [
          { path: 'producto-familia/:id_marca', component: ProductoFamiliaComponent},
          { path: 'producto-lista/:id_grupo', component: ProductoListaComponent}
      ]},
      { path: 'configuracion/ajuste', component: AjusteComponent},
      { path: 'configuracion/cargos-accesos', component: CargosAccesosComponent},
      { path: 'cliente-categoria', component: ClienteCategoriaComponent},
      { path: 'cliente', component: ClienteListaComponent},
      { path: 'cliente/agregar', component: ClienteAgregarComponent},
      { path: 'cliente/actualizar/:id_cliente', component: ClienteActualizarComponent},
      { path: 'sucursal', component: SucursalListaComponent},
      { path: 'sucursal', component: SucursalModuloComponent , 
        children: [
          { path: 'panel/:id_sucursal', component: SucursalPanelComponent},
          { path: 'almacen/:id_sucursal', component: AlmacenListaComponent},
          { path: 'ajuste-precio/:id_sucursal', component: SucursalAjustePrecioComponent},
          { path: 'ajuste-minimo/:id_sucursal', component: SucursalAjusteMinimoComponent},
          { path: 'descuento-cantidad/:id_sucursal', component: DescuentoCantidadComponent},
          { path: 'promocion/:id_sucursal/:id_almacen', component: PromocionListaComponent},
          { path: 'promocion/agregar/:id_sucursal/:id_almacen', component: PromocionDetalleAgregarComponent},
          { path: 'liquidacion/:id_sucursal', component: LiquidacionListaComponent},
          { path: 'pre-venta-lista/:id_sucursal', component: PreventaListaComponent},
          { path: 'venta-lista/:id_sucursal', component: VentaListaComponent},
          { path: 'carga-lista/:id_sucursal', component: CargaListaComponent},
          { path: 'carga-asignar/:id_sucursal', component: CargaAsignarComponent},
          { path: 'distribucion/:id_sucursal', component: DistribucionListaComponent}
        ]
      },
      { path: 'sucursal/agregar', component: SucursalAgregarComponent},
      { path: 'sucursal/actualizar/:id_sucursal', component: SucursalActualizarComponent},
      { path: 'venta/:id_sucursal/:id_almacen', component: VentaComponent},
      { path: 'ruta', component: RutaListaComponent},
      { path: 'ruta/agregar', component: RutaAgregarComponent},
      { path: 'ruta/editar/:id_ruta', component: RutaEditarComponent}
      
    ]
  },
  { path: 'restriccion-admin', component: RestriccionAdminComponent },
  { path: 'inicio', component: InicioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
