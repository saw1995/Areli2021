const {
  agregarTraspaso,
  listaTraspasoByFechaAlmacenesEstado,
  reporteListaTraspasoByFechaAlmacenesEstado
} = require('../controlador/traspasoControlador');

const ruta = require('express').Router();
var dateTime = require('node-datetime');

ruta.post('/traspaso/agregarTraspaso', async (req, res) => {
    const { concepto, id_producto, id_almacen_emisor, id_almacen_receptor, cantidad, estado, id_usuario, id_empresa } = req.body;
    try{
        var resultado = await agregarTraspaso(concepto, id_producto, id_almacen_emisor, id_almacen_receptor, cantidad, estado, id_usuario, id_empresa);

        res.json(resultado);
      }catch(error){
        console.log(error);
        res.json(error);
      }
   
});

ruta.post('/traspaso/listaTraspasoByFechaAlmacenesEstado', async (req, res) => {
  const { fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa } = req.body;
  try{
      var resultado = await listaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
 
});

ruta.post('/traspaso/reporteListaTraspasoByFechaAlmacenesEstado', async (req, res) => {
  const { fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa, entrada_salida, id_usuario_impresion } = req.body;
  try{
    var dt = dateTime.create();
      const fecha = dt.format('Y-m-d');
      const hora = dt.format('H-M-S');
      var resultado = await reporteListaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_sucursal_receptor, id_almacen_receptor, id_sucursal_emisor, id_almacen_emisor, id_usuario, estado, id_empresa, entrada_salida, id_usuario_impresion);
      var fileName = "reporte_de_traspaso_"+fecha+"_"+hora+".pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

module.exports = ruta;