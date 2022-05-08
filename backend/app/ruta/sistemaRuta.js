const {
    version,
    versionAreliShop
} = require('../controlador/sistemaControlador');

const ruta = require('express').Router();

ruta.get('/sistema/version', async (req, res) => {
  try{
    var resultado = await version();

    res.json(resultado);
  }catch(error){
    res.json(error);
  }
});

ruta.post('/sistema/version', async (req, res) => {
    try{
      var resultado = await version();

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sistema/versionAreliShop', async (req, res) => {
  try{
    var resultado = await versionAreliShop();

    res.json(resultado);
  }catch(error){
    res.json(error);
  }
});

module.exports = ruta;