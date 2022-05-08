const {
    agregarAjuste,
    listaAjusteByEmpresa
} = require('../controlador/ajusteControlador');

const ruta = require('express').Router();

ruta.post('/ajuste/agregarAjuste', async (req, res) => {
  const {ruta, stock, id_usuario, id_empresa} = req.body;

    try{
      var resultado = await agregarAjuste(ruta, stock, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ajuste/listaAjusteByEmpresa', async (req, res) => {
  const {id_empresa} = req.body;

  try{
    var resultado = await listaAjusteByEmpresa(id_empresa);

    res.json(resultado);
  }catch(error){
    res.json(error);
  }
});


module.exports = ruta;