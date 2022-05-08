const {
    agregarProductoStock,
    precioSugeridoByProductoEmpresaAlmacen,
    precioSugeridoByProductoGrupoAlmacen,
    stockMinimoCantidadMinimaByProductoGrupoAlmacen,
    listaProductoEmpresaStockCeroByAlmacenProductoEmpresa,
    listaKardexStockByProductoStockEmpresa,

    actualizarStockById,
    actualizarPrecioSugeridoByProductoGrupoAlmacen,
    actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen,
    listaGrupoProductoAleatorioEmpresaStockByEstado,
    listaProductoStockByProductoEmpresa,
    listaProductoStockByProductoEmpresaAlmacen,
    listaProductoStockByProductoEmpresaAlmacenFecVencimiento,
    listaProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa,
    listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa,
    buscaListaGrupoProductoEmpresaStockByPalabra,
    listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa,
    listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa,
    listaStockProductoEmpresaByAlmacenEmpresa,
    listaStockProductoEmpresaByCategoriaAlmacenEmpresa,

    reporteListaStockBySucursal
} = require('../controlador/productoStockControlador');

const ruta = require('express').Router();
var dateTime = require('node-datetime');

ruta.post('/productostock/agregarProductoStock', async (req, res) => {
    const { id,id_producto_empresa,id_almacen,stock,id_producto_precio, stock_minimo,multiplo,cantidad_minima,id_empresa } = req.body;
    try{
        var resultado = await agregarProductoStock(id,id_producto_empresa,id_almacen,stock,id_producto_precio, stock_minimo,multiplo,cantidad_minima,id_empresa);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
  });

  ruta.post('/productostock/actualizarPrecioSugeridoByProductoGrupoAlmacen', async (req, res) => {
    const { precio, id_producto_grupo, id_almacen, id_empresa } = req.body;
    try{
        var resultado = await actualizarPrecioSugeridoByProductoGrupoAlmacen(precio, id_producto_grupo, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });
  
  ruta.post('/productostock/actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen', async (req, res) => {
    const { stock_minimo, cantidad_minima, id_producto_grupo, id_almacen, id_empresa } = req.body;
    try{
        var resultado = await actualizarStockMinimoCantidadMinimaByProductoGrupoAlmacen(stock_minimo, cantidad_minima, id_producto_grupo, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa', async (req, res) => {
    const { id_almacen, id_producto_grupo, estado, id_empresa } = req.body;
    try{
        var resultado = await listaProductoEmpresaStockCeroByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
  });

  ruta.post('/productostock/listaProductoEmpresaStockCeroByAlmacenProductoEmpresa', async (req, res) => {
    const { id_almacen, id_producto, estado, id_empresa } = req.body;
    try{
        var resultado = await listaProductoEmpresaStockCeroByAlmacenProductoEmpresa(id_almacen, id_producto, estado, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
  });

  ruta.post('/productostock/listaKardexStockByProductoStockEmpresa', async (req, res) => {
    const { id_producto_stock, id_empresa } = req.body;
    try{
        var resultado = await listaKardexStockByProductoStockEmpresa(id_producto_stock, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
  });

  ruta.post('/productostock/precioSugeridoByProductoEmpresaAlmacen', async (req, res) => {
    const { id_producto_empresa,id_almacen,id_empresa } = req.body;
    try{
        var resultado = await precioSugeridoByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

  ruta.post('/productostock/precioSugeridoByProductoGrupoAlmacen', async (req, res) => {
    const { id_producto_grupo, id_almacen, id_empresa } = req.body;
    try{
        var resultado = await precioSugeridoByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

  ruta.post('/productostock/stockMinimoCantidadMinimaByProductoGrupoAlmacen', async (req, res) => {
    const { id_producto_grupo, id_almacen, id_empresa } = req.body;
    try{
        var resultado = await stockMinimoCantidadMinimaByProductoGrupoAlmacen(id_producto_grupo, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });






























  ruta.post('/productostock/actualizarStockById', async (req, res) => {
    const { stock, id, observacion, estado, id_usuario, id_empresa } = req.body;
    try{
        var resultado = await actualizarStockById(stock, id, observacion, estado, id_usuario, id_empresa);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

  

  ruta.post('/productostock/listaGrupoProductoAleatorioEmpresaStockByEstado', async (req, res) => {
    const { estado } = req.body;
    try{
        var resultado = await listaGrupoProductoAleatorioEmpresaStockByEstado(estado);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaProductoStockByProductoEmpresa', async (req, res) => {
    const { id_producto_empresa, id_empresa, estado } = req.body;
    try{
        var resultado = await listaProductoStockByProductoEmpresa(id_producto_empresa, id_empresa, estado);
  
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });

ruta.post('/productostock/listaProductoStockByProductoEmpresaAlmacen', async (req, res) => {
  const { id_producto_empresa, id_almacen, id_empresa, estado } = req.body;
  try{
      var resultado = await listaProductoStockByProductoEmpresaAlmacen(id_producto_empresa, id_almacen, id_empresa, estado);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/productostock/listaProductoStockByProductoEmpresaAlmacenFecVencimiento', async (req, res) => {
    const { id_producto_empresa, id_almacen, fecha_vencimiento, id_empresa, estado } = req.body;
    try{
        var resultado = await listaProductoStockByProductoEmpresaAlmacenFecVencimiento(id_producto_empresa, id_almacen, fecha_vencimiento, id_empresa, estado);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaProductoEmpresaStockByCategoriaAlmacenEmpresa', async (req, res) => {
    const { id_categoria, id_almacen, id_empresa, estado } = req.body;
    try{
        var resultado = await listaProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa', async (req, res) => {
    const { id_almacen, id_producto_grupo, estado, id_empresa } = req.body;
    try{
        var resultado = await listaProductoEmpresaStockByAlmacenGrupoProductoEmpresa(id_almacen, id_producto_grupo, estado, id_empresa);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });



  ruta.post('/productostock/buscaListaGrupoProductoEmpresaStockByPalabra', async (req, res) => {
    const { estado, palabra } = req.body;
    try{
        var resultado = await buscaListaGrupoProductoEmpresaStockByPalabra(estado, palabra);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa', async (req, res) => {
    const { id_categoria, id_almacen, id_empresa, estado } = req.body;
    try{
        var resultado = await listaGrupoProductoEmpresaStockByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa', async (req, res) => {
    const { id_categoria, id_almacen, id_empresa, estado } = req.body;
    try{
        var resultado = await listaGrupoProductoEmpresaStockCeroByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa, estado);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaStockProductoEmpresaByAlmacenEmpresa', async (req, res) => {
    const { id_almacen, id_empresa } = req.body;
    try{
        var resultado = await listaStockProductoEmpresaByAlmacenEmpresa(id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/listaStockProductoEmpresaByCategoriaAlmacenEmpresa', async (req, res) => {
    const { id_categoria, id_almacen, id_empresa } = req.body;
    try{
        var resultado = await listaStockProductoEmpresaByCategoriaAlmacenEmpresa(id_categoria, id_almacen, id_empresa);
  
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
  });

  ruta.post('/productostock/reporteListaStockBySucursal', async (req, res) => {
    const { id_sucursal, id_rol, id_empresa, id_usuario_impresion } = req.body;
    try{
      var dt = dateTime.create();
        const fecha = dt.format('Y-m-d');
        const hora = dt.format('H-M-S');
        var resultado = await reporteListaStockBySucursal(id_sucursal, id_rol, id_empresa, id_usuario_impresion);
        var fileName = "reporte de stock "+fecha+" "+hora+".pdf";
        res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        res.setHeader('Content-type', 'application/pdf');
        res.send(new Buffer.from(resultado));
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
  });
module.exports = ruta;
