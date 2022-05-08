const {
  insertTiendaRuta,
  insertTiendaRutaId,
  imprimirNotaVenta,
  imprimirNotaVentaUsuario,
  stock
} = require('../controlador/auxControlador');
const ruta = require('express').Router();
const path = require('path');

ruta.get('/ruta/insertTiendaRuta', async (req, res) => {
    //const { estado } = req.body;
    
    try{
        var resultado = await insertTiendaRuta();
        res.json(resultado);
      }catch(error){
        console.log(error)
        res.json(error);
      }
   
});

ruta.get('/ruta/insertTiendaRutaId', async (req, res) => {
  //const { estado } = req.body;
  
  try{
      var resultado = await insertTiendaRutaId();
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.get('/stock/stock', async (req, res) => {
  //const { estado } = req.body;
  
  try{
      var resultado = await stock();
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.get('/venta/imprimirNotaVenta/:nro_min/:nro_max/:venta/:id_empresa', async (req, res) => {
  const { nro_min, nro_max, venta, id_empresa } = req.params;
  
  try{
      var resultado = await imprimirNotaVenta(nro_min, nro_max, venta, id_empresa);
      var fileName = "ticket.pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.get('/venta/imprimirNotaVentaUsuario/:usuario/:venta/:id_empresa/:fecha_entrega', async (req, res) => {
  const { usuario, venta, id_empresa, fecha_entrega } = req.params;
  
  try{
      var resultado = await imprimirNotaVentaUsuario(usuario, venta, id_empresa, fecha_entrega);
      var fileName = "ticket.pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});
module.exports = ruta;