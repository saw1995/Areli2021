const {
    listaUsuarios,
    excelPrueba,
    pruebapdf,
    pruebaFactura
} = require('../controlador/pruebaControlador');
const ruta = require('express').Router();
const path = require('path');

ruta.get('/prueba/pruebaFactura', async (req, res) => {
  try{
    var resultado = await pruebaFactura();
    res.send(resultado);
  }catch(error){
    res.json(errors);
  }
});

ruta.get('/prueba/pruebapdf', async (req, res) => {
  try{
      var fileName = "ivan.pdf";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/pdf');
      var resultado = await pruebapdf();
      res.send(new Buffer.from(resultado));
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/prueba/listaUsuarios', async (req, res) => {
    const { estado } = req.body;
    
    try{
        var resultado = await listaUsuarios(estado);
        res.json(resultado);
      }catch(error){
        res.json(errors);
      }
   
});

ruta.get('/prueba/excel', async (req, res) => {
  try{
      var fileName = "akd.xlsx";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const xlsx = await excelPrueba();
      res.send(new Buffer.from(xlsx));

    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

module.exports = ruta;