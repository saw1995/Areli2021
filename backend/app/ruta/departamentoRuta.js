const {
  listaDepartamentoByEstado,
  listaProvinciasByDepartamentoEstado,
  listaMunicipiosByDepartamentoProvinciaEstado
} = require('../controlador/departamentoControlador');

const ruta = require('express').Router();

ruta.post('/departamento/listaDepartamentoByEstado', async (req, res) => {
    const { estado } = req.body;
    try{
        var resultado = await listaDepartamentoByEstado(estado);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/departamento/listaProvinciasByDepartamentoEstado', async (req, res) => {
  const { departamento, estado } = req.body;
  try{
      var resultado = await listaProvinciasByDepartamentoEstado(departamento, estado);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/departamento/listaMunicipiosByDepartamentoProvinciaEstado', async (req, res) => {
  const { departamento, provincia, estado } = req.body;
  try{
      var resultado = await listaMunicipiosByDepartamentoProvinciaEstado(departamento, provincia, estado);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

module.exports = ruta;