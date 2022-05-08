const {
  agregarLiquidacion,
  actualizarLiquidacionPagoSobrante,
  actualizarLiquidacionItemProducto,
  listaLiquidacionGeneralByIdSucursal,
  listaLiquidacionGeneralByIdUsuario,
  listaPreventaProductosByCargaParaLiquidacion,
  listaCargaTotalMontosParaLiquidacion
}= require('../controlador/liquidacionControlador');

const ruta = require('express').Router();

ruta.post('/liquidacion/agregarLiquidacion', async (req, res) => {
    const { id_sucursal, id_usuario_cuenta, id_usuario, observacion,  
      corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
      corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
      total, sobrante, id_empresa } = req.body;
    
    try{
        var resultado = await agregarLiquidacion(id_sucursal, id_usuario_cuenta, id_usuario, observacion,  
          corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
          corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
          total, sobrante, id_empresa);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/liquidacion/actualizarLiquidacionPagoSobrante', async (req, res) => {
  const { id_liquidacion, sobrante, nro_carga, id_empresa } = req.body;
  try{
      var resultado = await actualizarLiquidacionPagoSobrante(id_liquidacion, sobrante, nro_carga, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/liquidacion/actualizarLiquidacionItemProducto', async (req, res) => {
  const { id_liquidacion, sobrante, id_preventa_detalle } = req.body;
  try{
      var resultado = await actualizarLiquidacionItemProducto(id_liquidacion, sobrante, id_preventa_detalle);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/liquidacion/listaLiquidacionGeneralByIdSucursal', async (req, res) => {
  const { id_sucursal, estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa } = req.body;
  try{
      var resultado = await listaLiquidacionGeneralByIdSucursal(id_sucursal, estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/liquidacion/listaLiquidacionGeneralByIdUsuario', async (req, res) => {
  const { estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa } = req.body;
  try{
      var resultado = await listaLiquidacionGeneralByIdUsuario(estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/liquidacion/listaPreventaProductosByCargaParaLiquidacion', async (req, res) => {
  const { nro_carga, estado, id_empresa } = req.body;
  
  try{
      var resultado = await listaPreventaProductosByCargaParaLiquidacion(nro_carga, estado, id_empresa);
      res.json(resultado);
      
    }catch(error){
      res.json(error);
    }
});

ruta.post('/liquidacion/listaCargaTotalMontosParaLiquidacion', async (req, res) => {
  const { id_usuario, estado, id_empresa } = req.body;
  
  try{
      var resultado = await listaCargaTotalMontosParaLiquidacion(id_usuario, estado, id_empresa);
      res.json(resultado);
      
    }catch(error){
      res.json(error);
    }
});

module.exports = ruta;
