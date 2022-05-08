const {
    nuevoRolPredeterminado,
    agregarRol,
    agregarRolModulo,
    eliminarRolModulo,
    listaModulo,
    listaModuloRolNoRegistradoByRol,
    listaModuloRolByRol,
    listaRolByIdEmpresa
} = require('../controlador/rolControlador');

const ruta = require('express').Router();

ruta.post('/rol/nuevoRolPredeterminado', async (req, res) => {
    const {id, id_empresa} = req.body;
    try{
        var resultado = await nuevoRolPredeterminado(id, id_empresa);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/rol/agregarRol', async (req, res) => {
  const {nombre, id_empresa } = req.body;
  try{
      var resultado = await agregarRol(nombre, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/agregarRolModulo', async (req, res) => {
  const { id_rol, id_modulo, estado, id_empresa } = req.body;
  try{
      var resultado = await agregarRolModulo(id_rol, id_modulo, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/eliminarRolModulo', async (req, res) => {
  const { id_rol, id_modulo } = req.body;
  try{
      var resultado = await eliminarRolModulo(id_rol, id_modulo);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/listaModulo', async (req, res) => {
  const {id_empresa } = req.body;
  try{
      var resultado = await listaModulo(id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/listaRolByIdEmpresa', async (req, res) => {
  const {id_empresa } = req.body;
  try{
      var resultado = await listaRolByIdEmpresa(id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/listaModuloRolByRol', async (req, res) => {
  const { id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaModuloRolByRol(id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/rol/listaModuloRolNoRegistradoByRol', async (req, res) => {
  const { id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaModuloRolNoRegistradoByRol(id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

module.exports = ruta;