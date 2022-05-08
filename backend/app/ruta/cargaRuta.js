const {
  agregarCargaUsuario,
  cargaByPreVenta,
  listaCargaByUsuarioFecha,
  listaCargaProductoAgrupadoByUsuarioFecha,
  listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa,
  listaDevolucionCargaByUsuarioFecha,
  listaVentaCargaByUsuarioFecha,
  listaDetallePreventaClienteByNroCarga,
  listaDetallePreventaClienteByDistribuidorFecha,

  reporteListaCargaByUsuarioFechaSucursal,
  reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal,
  
  reporteListaVentaCargaByUsuarioFecha,
  reporteListaDevolucionCargaByUsuarioFecha,
  reporteListaCargaByUsuarioFecha,
  reporteTicketPreVentaCargaByUsuarioFecha
} = require('../controlador/cargaControlador');

const ruta = require('express').Router();
var dateTime = require('node-datetime');

ruta.post('/carga/agregarCargaUsuario', async (req, res) => {
    const { id_pre_venta, fecha_entrega, id_usuario, id_usuario_distribucion, estado, id_empresa } = req.body;
    try{
        var resultado = await agregarCargaUsuario(id_pre_venta, fecha_entrega, id_usuario, id_usuario_distribucion, estado, id_empresa);

        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
});

ruta.post('/carga/cargaByPreVenta', async (req, res) => {
  const { id_pre_venta  } = req.body;
  
  try{
      var resultado = await cargaByPreVenta(id_pre_venta);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha_inicio, fecha_final, estado_venta, estado, id_empresa } = req.body;
  try{
      var resultado = await listaCargaByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/carga/listaCargaProductoAgrupadoByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa  } = req.body;
  
  try{
      var resultado = await listaCargaProductoAgrupadoByUsuarioFecha(id_usuario, fecha_inicio, fecha_final, estado_venta, id_empresa);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa', async (req, res) => {
  const { id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion, id_producto_empresa } = req.body;
  
  try{
      var resultado = await listaCargaDetalleByUsuarioFechaSucursalProductoEmpresa(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion, id_producto_empresa);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaDevolucionCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  
  try{
      var resultado = await listaDevolucionCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaVentaCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  
  try{
      var resultado = await listaVentaCargaByUsuarioFecha(id_usuario, fecha, id_sucursal, id_empresa, id_usuario_impresion);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaDetallePreventaClienteByNroCarga', async (req, res) => {
  const { nro_carga, id_sucursal, estado_venta, estado_detalle, id_empresa } = req.body;
  
  try{
      var resultado = await listaDetallePreventaClienteByNroCarga(nro_carga, id_sucursal, estado_venta, estado_detalle, id_empresa);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/listaDetallePreventaClienteByDistribuidorFecha', async (req, res) => {
  const { fecha_entrega, id_usuario, id_sucursal, estado_venta, estado_detalle, id_empresa } = req.body;
  
  try{
      var resultado = await listaDetallePreventaClienteByDistribuidorFecha(fecha_entrega, id_usuario, id_sucursal, estado_venta, estado_detalle, id_empresa);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/reporteListaCargaByUsuarioFechaSucursal', async (req, res) => {
  const { id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaCargaByUsuarioFechaSucursal(id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion);
      var fileName = "reporte_de_carga_cliente_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal', async (req, res) => {
  const { id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaCargaProductoAgrupadoByUsuarioFechaSucursal(id_usuario, fecha_inicio, fecha_final, id_sucursal, estado_venta, id_empresa, id_usuario_impresion);
      var fileName = "reporte_de_carga_producto_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/carga/reporteListaCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaCargaByUsuarioFecha(id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "salida de carga "+fecha+" "+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/carga/reporteListaDevolucionCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaDevolucionCargaByUsuarioFecha(id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "devolucion de carga "+fecha+" "+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/carga/reporteListaVentaCargaByUsuarioFecha', async (req, res) => {
  const { id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaVentaCargaByUsuarioFecha(id_usuario, fecha_distribucion, id_sucursal, id_empresa, id_usuario_impresion);
      var fileName = "liquidacion de carga "+fecha+" "+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/carga/reporteTicketPreVentaCargaByUsuarioFecha', async (req, res) => {
  const { usuario, venta, id_empresa, fecha_entrega, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteTicketPreVentaCargaByUsuarioFecha(usuario, venta, id_empresa, fecha_entrega, id_usuario_impresion);
      var fileName = "ticket_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

module.exports = ruta;