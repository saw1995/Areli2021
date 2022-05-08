const {
  agregarEmpresa,
  actualizarDatosEmpresa,
  actualizarEstodoByIdEmpresa,
  empresaById,
  listaEmpresaRubroByEstadoAreliShop,
  listaEmpresaAleatorioByEstadoAreliShop,
  listaEmpresaRubroByEstadoAreliShopRubro,
  listaEmpresaByEstado } = require('../controlador/empresaControlador');

const ruta = require('express').Router();

ruta.post('/empresa/agregarEmpresa', async (req, res) => {
    const {id,nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id_licencia} = req.body;
    
    try{
        var resultado = await agregarEmpresa(id,nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id_licencia);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/empresa/actualizarDatosEmpresa', async (req, res) => {
    const {nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id} = req.body;
    
    try{
        var resultado = await actualizarDatosEmpresa(nombre,propietario,descripcion,nit,sitio_web,logo,id_rubro,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/empresa/actualizarEstodoByIdEmpresa', async (req, res) => {
    const {estado,id} = req.body;
    
    try{
        var resultado = await actualizarEstodoByIdEmpresa(estado,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/empresa/empresaById', async (req, res) => {
  const {id_empresa} = req.body;
  
  try{
      var resultado = await empresaById(id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/empresa/listaEmpresaByEstado', async (req, res) => {
    const {estado} = req.body;
    
    try{
        var resultado = await listaEmpresaByEstado(estado);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/empresa/listaEmpresaAleatorioByEstadoAreliShop', async (req, res) => {
  const {estado, arelishop} = req.body;
  
  try{
      var resultado = await listaEmpresaAleatorioByEstadoAreliShop(estado, arelishop);
      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
});

ruta.post('/empresa/listaEmpresaRubroByEstadoAreliShop', async (req, res) => {
  const {estado, arelishop} = req.body;
  
  try{
      var resultado = await listaEmpresaRubroByEstadoAreliShop(estado, arelishop);
      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
});

ruta.post('/empresa/listaEmpresaRubroByEstadoAreliShopRubro', async (req, res) => {
  const {estado, arelishop, id_rubro} = req.body;
  
  try{
      var resultado = await listaEmpresaRubroByEstadoAreliShopRubro(estado, arelishop, id_rubro);
      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
});

module.exports = ruta;