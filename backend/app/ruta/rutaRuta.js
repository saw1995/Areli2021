const {
  agregarRuta,
  agregarRutaLimite,
  agregarRutaUsuario,
  agregarRutaEntrega,
  agregarRutaEmpresaByTienda,
  eliminarRutaUsuarioById,
  eliminarRutaEntregaById,
  listaRutaLimiteByRuta,
  listaRutaLimiteByEstadoEmpresa,
  listaRutaByEstadoEmpresa,
  listaRutaUsuarioByUsuario,
  listaRutaUsuarioNoRegistradoByUsuario,
  listaRutaEntregaByRuta,
  listaCargaRutaByFechaUsuario,
  listaRutaUsuarioByRuta
} = require('../controlador/rutaControlador');

const ruta = require('express').Router();

ruta.post('/ruta/agregarRuta', async (req, res) => {
    const { nombre, descripcion, estado, id_empresa, id_usuario } = req.body;
    try{
      console.log(nombre, descripcion, estado, id_empresa, id_usuario)
        var resultado = await agregarRuta(nombre, descripcion, estado, id_empresa, id_usuario );

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/ruta/agregarRutaLimite', async (req, res) => {
  const { id_ruta, posicion, latitud, longitud, id_empresa } = req.body;
  try{
      var resultado = await agregarRutaLimite(id_ruta, posicion, latitud, longitud, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/ruta/agregarRutaUsuario', async (req, res) => {
  const {id_ruta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await agregarRutaUsuario(id_ruta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/agregarRutaEntrega', async (req, res) => {
  const { id, id_ruta, numero_dia, dia } = req.body;
  try{
      var resultado = await agregarRutaEntrega(id, id_ruta, numero_dia, dia);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/agregarRutaEmpresaByTienda', async (req, res) => {
  const { id_tienda, id_empresa } = req.body;
  try{
      var resultado = await agregarRutaEmpresaByTienda(id_tienda, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/eliminarRutaUsuarioById', async (req, res) => {
  const { id_ruta, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await eliminarRutaUsuarioById(id_ruta, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/eliminarRutaEntregaById', async (req, res) => {
  const { id } = req.body;
  try{
      var resultado = await eliminarRutaEntregaById(id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/listaRutaLimiteByEstadoEmpresa', async (req, res) => {
  const { estado, id_empresa } = req.body;
  try{
      var resultado = await listaRutaLimiteByEstadoEmpresa(estado, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

ruta.post('/ruta/listaRutaLimiteByRuta', async (req, res) => {
  const { id_ruta, id_empresa } = req.body;
  try{
      var resultado = await listaRutaLimiteByRuta(id_ruta, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/ruta/listaRutaByEstadoEmpresa', async (req, res) => {
  const { estado, id_empresa } = req.body;
  try{
      var resultado = await listaRutaByEstadoEmpresa(estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/ruta/listaRutaUsuarioByUsuario', async (req, res) => {
  const { estado, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await listaRutaUsuarioByUsuario(estado, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/listaRutaUsuarioNoRegistradoByUsuario', async (req, res) => {
  const { estado, id_ruta, id_empresa } = req.body;
  try{
      var resultado = await listaRutaUsuarioNoRegistradoByUsuario(estado, id_ruta, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});


ruta.post('/ruta/listaRutaUsuarioByRuta', async (req, res) => {
  const { estado, id_ruta, id_empresa } = req.body;
  try{
      var resultado = await listaRutaUsuarioByRuta(estado, id_ruta, id_empresa);

      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});


ruta.post('/ruta/listaCargaRutaByFechaUsuario', async (req, res) => {
  const { fecha, id_usuario, estado, id_empresa } = req.body;
  try{
      var resultado = await listaCargaRutaByFechaUsuario(fecha, id_usuario, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/ruta/listaRutaEntregaByRuta', async (req, res) => {
  const { id_ruta } = req.body;
  try{
      var resultado = await listaRutaEntregaByRuta(id_ruta);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

module.exports = ruta;