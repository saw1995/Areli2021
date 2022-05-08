const {
  agregarCompra,
  agregarCompraDetalle,
  compraById,
  listaCompraDetalleHistorialByProductoEmpresa,
  listaCompraByAlmacenFechaUsuario,
  listaCompraDetalleByCompra,

  reporteListaCompraByAlmacenFechaUsuario,

  listaComprasByFechaToExcel
} = require('../controlador/compraControlador');

const ruta = require('express').Router();
var dateTime = require('node-datetime');

ruta.post('/compra/agregarCompra', async (req, res) => {
  const { id_almacen, id_usuario, id_proveedor, concepto, id_factura_compra, estado, id_empresa } = req.body;
  try{
      var resultado = await agregarCompra(id_almacen, id_usuario, id_proveedor, concepto, id_factura_compra, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/compra/agregarCompraDetalle', async (req, res) => {
  const { id_compra, cantidad, costo_adquisicion, estado, id_usuario, id_empresa, id_producto, id_almacen, fecha_vencimiento, stock, precio_sugerido, stock_minimo, cantidad_minima } = req.body;
  try{
      var resultado = await agregarCompraDetalle(id_compra, cantidad, costo_adquisicion, estado, id_usuario, id_empresa, id_producto, id_almacen, fecha_vencimiento, stock, precio_sugerido, stock_minimo, cantidad_minima);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/compra/compraById', async (req, res) => {
  const { id_compra, estado, id_empresa } = req.body;
  try{
      var resultado = await compraById(id_compra, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/compra/listaCompraDetalleHistorialByProductoEmpresa', async (req, res) => {
  const { id_producto, id_empresa } = req.body;
  try{
      var resultado = await listaCompraDetalleHistorialByProductoEmpresa(id_producto, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/compra/listaCompraByAlmacenFechaUsuario', async (req, res) => {
  const { id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario } = req.body;
  try{
      var resultado = await  listaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/compra/listaCompraDetalleByCompra', async (req, res) => {
  const { id_compra, estado, id_empresa } = req.body;
  try{
      var resultado = await listaCompraDetalleByCompra(id_compra, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/compra/reporteListaCompraByAlmacenFechaUsuario', async (req, res) => {
  const { id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario, id_usuario_impresion } = req.body;
  console.log("VARIABLES REC:",id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario, id_usuario_impresion)
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario, id_usuario_impresion);
      var fileName = "reporte_de_compra_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

//---------------->excel
ruta.post('/compra/listaComprasByFechaToExcel', async (req, res) => {
  try{
      const {fecha_inicio,fecha_fin,id_empresa} = req.body;
      var fileName = "listaUsuarios.xlsx";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const xlsx = await listaComprasByFechaToExcel(fecha_inicio,fecha_fin,id_empresa);
      res.send(new Buffer.from(xlsx));

    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

module.exports = ruta;