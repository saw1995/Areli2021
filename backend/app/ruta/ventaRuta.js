const {
    agregarVenta,
    agregarVentaCreditoDetallePago,
    agregarPreVenta,
    agregarPreVentaTienda,
    agregarVentaCarritoUsuario,
    agregarVentaCarritoTienda,
    anularVentaById,
    actualizarVentaById,
    actualizarEstadoPreVentaDetalleById,
    actualizarCantidadPreVentaDetalleById,
    eliminarProductoCarritoById,
    eliminarProductoCarritoTiendaById,
    listaCarritoByTienda,
    listaCarritoByUsuarioSucursal,
    ventaById,
    preVentaById,
    listaPreVentaByFechaEntregaTiendaEmpresa,
    listaPreVentaByVentaFechaEntregaSucursalUsuario,
    listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario,
    listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto,
    listaPreVentaByFechaRutaCategoriaVenta,
    listaPreVentaDetalleByEstadoPreVenta,
    listaPreVentaByEmpresaTiendaVenta,
    listaPreVentaByTiendaVenta,
    listaEmpresaPreVentaByTiendaVenta,
    listaVentaBySucursalFechaUsuario,
    listaVentaProductoAgrupadoBySucursalFechaUsuario,
    listaPreVentaBySucursalFechaVentaEstado,
    listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado,
    listaVentaDetalleByEstadoVenta,

    reporteTNotaEntregaByNroPreVentaSucursal,
    reporteCNotaEntregaByNroPreVentaSucursal,
    reporteCCNotaEntregaByNroPreVentaSucursal,
    reporteTNotaPreVentaBySucursalFechaVentaEstado,
    reporteCNotaPreVentaBySucursalFechaVentaEstado,
    reporteCCNotaPreVentaBySucursalFechaVentaEstado,
    reporteTNotaEntregaByNroVentaSucursal,
    reporteCNotaEntregaByNroVentaSucursal,
    reporteCCNotaEntregaByNroVentaSucursal,
    reporteMCNotaEntregaByNroVentaSucursal,
    reporteTNotaVentaBySucursalFechaUsuario,
    reporteCNotaVentaBySucursalFechaUsuario,
    reporteCCNotaVentaBySucursalFechaUsuario,
    reporteListaVentaBySucursalFechaUsuario,
    reporteListaVentaProductoAgrupadoBySucursalFechaUsuario,
    reporteListaVentaDetalleByFechaSucursalUsuarioEstado,
    reporteListaPreVentaBySucursalFechaVentaEstado,
    reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado
} = require('../controlador/ventaControlador');

const ruta = require('express').Router();
var dateTime = require('node-datetime');

ruta.post('/venta/agregarVentaCarritoUsuario', async (req, res) => {
    const {id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, id_promocion} = req.body;
    try{
        var resultado = await agregarVentaCarritoUsuario(id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, id_promocion);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/venta/agregarVentaCarritoTienda', async (req, res) => {
  const {id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa} = req.body;
  try{
      var resultado = await agregarVentaCarritoTienda(id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/agregarVenta', async (req, res) => {
  const { id_sucursal, razon_social, nit, observacion, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, estado, id_tienda_empresa, id_tienda, id_pre_venta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await agregarVenta(id_sucursal, razon_social, nit, observacion, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, estado, id_tienda_empresa, id_tienda, id_pre_venta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/agregarVentaCreditoDetallePago', async (req, res) => {
  const { id_venta, monto, fecha, pago, id_usuario, id_empresa, credito } = req.body;
  try{
      var resultado = await agregarVentaCreditoDetallePago(id_venta, monto, fecha, pago, id_usuario, id_empresa, credito);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/agregarPreVenta', async (req, res) => {
  const { id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await agregarPreVenta(id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/agregarPreVentaTienda', async (req, res) => {
  const { id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await agregarPreVentaTienda(id_tienda_empresa, id_tienda, razon_social, nit, id_sucursal, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});


ruta.post('/venta/anularVentaById', async (req, res) => {
  const {estado, id_venta, id_empresa } = req.body;
  try{
      var resultado = await anularVentaById(estado, id_venta, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/actualizarEstadoPreVentaDetalleById', async (req, res) => {
  const { estado, id_pre_venta_detalle, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await actualizarEstadoPreVentaDetalleById(estado, id_pre_venta_detalle, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/actualizarCantidadPreVentaDetalleById', async (req, res) => {
  const { cantidad, id_pre_venta_detalle, id_pre_venta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await actualizarCantidadPreVentaDetalleById(cantidad, id_pre_venta_detalle, id_pre_venta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/actualizarVentaById', async (req, res) => {
  const { id, venta, observacion, id_pre_venta, id_tienda_empresa, id_tienda_estado, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await actualizarVentaById(id, venta, observacion, id_pre_venta, id_tienda_empresa, id_tienda_estado, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/eliminarProductoCarritoById', async (req, res) => {
  const {id, id_empresa} = req.body;
  try{
      var resultado = await eliminarProductoCarritoById(id, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/eliminarProductoCarritoTiendaById', async (req, res) => {
  const {id, id_tienda} = req.body;
  try{
      var resultado = await eliminarProductoCarritoTiendaById(id, id_tienda);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaCarritoByTienda', async (req, res) => {
  const {id_tienda} = req.body;
  try{
      var resultado = await listaCarritoByTienda(id_tienda);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});


ruta.post('/venta/listaCarritoByUsuarioSucursal', async (req, res) => {
  const {id_usuario, id_sucursal, id_empresa} = req.body;
  try{
      var resultado = await listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/preVentaById', async (req, res) => {
  const { id_pre_venta } = req.body;
  try{
      var resultado = await preVentaById(id_pre_venta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/ventaById', async (req, res) => {
  const { id_venta } = req.body;
  try{
      var resultado = await ventaById(id_venta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaByFechaEntregaTiendaEmpresa', async (req, res) => {
  const { fecha_entrega, id_tienda_empresa, id_empresa } = req.body;
  try{
      var resultado = await listaPreVentaByFechaEntregaTiendaEmpresa(fecha_entrega, id_tienda_empresa, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaByVentaFechaEntregaSucursalUsuario', async (req, res) => {
  const { venta, fecha_entrega, id_sucursal, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await listaPreVentaByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario', async (req, res) => {
  const { venta, fecha_entrega, id_sucursal, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto', async (req, res) => {
  const { venta, fecha_entrega, id_sucursal, id_usuario, id_empresa, id_producto } = req.body;
  try{
      var resultado = await listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa, id_producto);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaByFechaRutaCategoriaVenta', async (req, res) => {
  const { fecha, id_ruta, id_tienda_categoria, venta, id_empresa } = req.body;
  try{
      var resultado = await listaPreVentaByFechaRutaCategoriaVenta(fecha, id_ruta, id_tienda_categoria, venta, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/venta/listaPreVentaDetalleByEstadoPreVenta', async (req, res) => {
  const { id_pre_venta, estado, id_empresa } = req.body;
  try{
      var resultado = await listaPreVentaDetalleByEstadoPreVenta(id_pre_venta, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaVentaDetalleByEstadoVenta', async (req, res) => {
  const { id_venta, estado, id_empresa } = req.body;
  try{
      var resultado = await listaVentaDetalleByEstadoVenta(id_venta, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaPreVentaByEmpresaTiendaVenta', async (req, res) => {
  const { id_empresa, id_tienda, venta } = req.body;
  try{
      var resultado = await listaPreVentaByEmpresaTiendaVenta(id_empresa, id_tienda, venta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaPreVentaByTiendaVenta', async (req, res) => {
  const { id_tienda, venta } = req.body;
  try{
      var resultado = await listaPreVentaByTiendaVenta(id_tienda, venta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaEmpresaPreVentaByTiendaVenta', async (req, res) => {
  const { id_tienda, venta } = req.body;
  try{
      var resultado = await listaEmpresaPreVentaByTiendaVenta(id_tienda, venta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaVentaBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, credito } = req.body;
  try{
      var resultado = await listaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, credito);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaVentaProductoAgrupadoBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta } = req.body;
  try{
      var resultado = await listaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaPreVentaBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta } = req.body;
  try{
      var resultado = await listaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/venta/listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta } = req.body;
  try{
      var resultado = await listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});


ruta.post('/venta/reporteTNotaEntregaByNroPreVentaSucursal', async (req, res) => {
  const { nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteTNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_pre_venta_inicio+"_al_"+nro_pre_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCNotaEntregaByNroPreVentaSucursal', async (req, res) => {
  const { nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_pre_venta_inicio+"_al_"+nro_pre_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCCNotaEntregaByNroPreVentaSucursal', async (req, res) => {
  const { nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCCNotaEntregaByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_pre_venta_inicio+"_al_"+nro_pre_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteTNotaPreVentaBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteTNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCNotaPreVentaBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCCNotaPreVentaBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCCNotaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteTNotaEntregaByNroVentaSucursal', async (req, res) => {
  const { nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteTNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_venta_inicio+"_al_"+nro_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCNotaEntregaByNroVentaSucursal', async (req, res) => {
  const { nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_venta_inicio+"_al_"+nro_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCCNotaEntregaByNroVentaSucursal', async (req, res) => {
  const { nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_venta_inicio+"_al_"+nro_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteMCNotaEntregaByNroVentaSucursal', async (req, res) => {
  const { nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteMCNotaEntregaByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa, id_usuario_impresion);
      var fileName = "nota_entrega_"+nro_venta_inicio+"_al_"+nro_venta_final+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});


ruta.post('/venta/reporteTNotaVentaBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteTNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCNotaVentaBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteCCNotaVentaBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteCCNotaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion);
      var fileName = "nota_entrega_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});
ruta.post('/venta/reporteListaPreVentaBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
      var fileName = "reporte_de_pre_venta_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado', async (req, res) => {
  const { id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta, id_usuario_impresion);
      var fileName = "reporte_de_pre_venta_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/venta/reporteListaVentaBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion);
      var fileName = "reporte_de_venta_cliente_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/venta/reporteListaVentaProductoAgrupadoBySucursalFechaUsuario', async (req, res) => {
  const { id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, id_usuario_impresion);
      var fileName = "reporte_de_venta_producto_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/venta/reporteListaVentaDetalleByFechaSucursalUsuarioEstado', async (req, res) => {
  const { fecha, id_sucursal, id_usuario, estado, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha_a = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaVentaDetalleByFechaSucursalUsuarioEstado(fecha, id_sucursal, id_usuario, estado, id_empresa, id_usuario_impresion);
      var fileName = "reporte_de_venta_detalle_"+fecha_a+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

module.exports = ruta;