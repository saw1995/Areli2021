const {
  ultimaLicencia,
} = require('../controlador/licenciaControlador');

const ruta = require('express').Router();

ruta.post('/licencia/ultimaLicencia', async (req, res) => {
  const {id_empresa } = req.body;
  try{
      var resultado = await ultimaLicencia(id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

module.exports = ruta;