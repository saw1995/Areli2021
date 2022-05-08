const {
  listaRubroByEstado,
  listaRubroEmpresaByEstado
} = require('../controlador/rubroControlador');

const ruta = require('express').Router();

ruta.post('/rubro/listaRubroByEstado', async (req, res) => {
  const { estado } = req.body;
  try{
      var resultado = await listaRubroByEstado(estado);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/rubro/listaRubroEmpresaByEstado', async (req, res) => {
  const { estado } = req.body;
  try{
      var resultado = await listaRubroEmpresaByEstado(estado);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

module.exports = ruta;