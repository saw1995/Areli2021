const {
  agregarTienda,
  agregarTiendaEmpresa,
  agregarTiendaAreliShop,
  agregarTiendaCategoria,
  agregarTiendaVisita,
  agregarTiendaCategoriaRol,
  actualizarTiendaById,
  actualizarTiendaEmpresaById,
  actualizarImagenById,
  actualizarTiendaCategoriaById,
  actualizarEstadoById,
  actualizarUbicacionById,
  actualizarDatosContactoById,
  actualizarNitRazonSocialById,
  actualizarPassByTienda,
  agregarLogin,
  salirLogin,
  eliminarTiendaCategoriaRolById,
  tiendaById,
  tiendaEmpresaById,
  tiendaByUsuarioPass,
  tiendaLoginByTiendaPlataforma,
  listaTiendaEmpresaRutaByUsuarioEmpresa,
  listaTiendaEmpresaByEstadoCategoriaRuta,
  listaTiendaEmpresaByEstadoCategoriaRutaEmpresa,
  listaTiendaEmpresaByEstadoEmpresa,
  listaTipoTiendaByEstado,
  listaTiendaEstadoByEstadoTipo,
  listaTiendaCategoriaByEstado,
  listaCategoriaTiendaRolByRol,
  listaCategoriaTiendaRolNoRegistradoByRol,
  listaTiendaNoRutaByEmpresaEstado,
  listaTiendaNoRutaByEmpresaEstadoBuscar,
  listaTiendaEmpresaByEmpresaEstado,
  tiendaEmpresaByTiendaEmpresa,
  usuarioTiendaByUsuario
} = require('../controlador/tiendaControlador');

const ruta = require('express').Router();

ruta.post('/tienda/agregarTiendaAreliShop', async (req, res) => {
  const { id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass } = req.body;
  try{
      var resultado = await agregarTiendaAreliShop(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/agregarTienda', async (req, res) => {
  const { id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, id_tienda_categoria, id_empresa, usuario, pass } = req.body;
  try{
      var resultado = await agregarTienda(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, id_tienda_categoria, id_empresa, usuario, pass);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/agregarTiendaEmpresa', async (req, res) => {
  const { id_tienda, id_empresa } = req.body;
  try{
      var resultado = await agregarTiendaEmpresa(id_tienda, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/agregarTiendaCategoria', async (req, res) => {
    const {nombre, detalle, estado, id_empresa} = req.body;
    try{
        var resultado = await agregarTiendaCategoria(nombre, detalle, estado, id_empresa);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
   
});

ruta.post('/tienda/agregarTiendaVisita', async (req, res) => {
  const {id_tienda_empresa, id_tienda_estado, detalle, id_usuario, estado, id_empresa} = req.body;
  try{
      var resultado = await agregarTiendaVisita(id_tienda_empresa, id_tienda_estado, detalle, id_usuario, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/agregarTiendaCategoriaRol', async (req, res) => {
  const {id_tienda_categoria, id_rol, id_empresa} = req.body;
  try{
      var resultado = await agregarTiendaCategoriaRol(id_tienda_categoria, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/actualizarTiendaById', async (req, res) => {
  const { id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id } = req.body;
  try{
      var resultado = await actualizarTiendaById(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/actualizarTiendaEmpresaById', async (req, res) => {
  const { new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa } = req.body;
  try{
      var resultado = await actualizarTiendaEmpresaById(new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/actualizarImagenById/:id', async (req, res) => {
  const { id } = req.params;
  let imagen = req.files.imagen

  //try{
      var resultado = await actualizarImagenById(imagen,id);
      res.json(resultado);
  /*}catch(error){
      console.log("myeerr:"+error)
      res.json(error);
    }*/
});

ruta.post('/tienda/actualizarTiendaCategoriaById', async (req, res) => {
  const { nombre, detalle, id_tienda_categoria, id_empresa } = req.body;
  try{
      var resultado = await actualizarTiendaCategoriaById(nombre, detalle, id_tienda_categoria, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/actualizarEstadoById', async (req, res) => {
  const { estado, id_tienda_categoria, id_empresa } = req.body;
  try{
      var resultado = await actualizarEstadoById(estado, id_tienda_categoria, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/actualizarDatosContactoById', async (req, res) => {
  const { id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id } = req.body;
  try{
      var resultado = await actualizarDatosContactoById(id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    } 
});

ruta.post('/tienda/actualizarUbicacionById', async (req, res) => {
  const { id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id } = req.body;
  try{
      var resultado = await actualizarUbicacionById(id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    } 
});

ruta.post('/tienda/actualizarNitRazonSocialById', async (req, res) => {
  const { nit, razon_social, id } = req.body;
  try{
      var resultado = await actualizarNitRazonSocialById(nit, razon_social, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    } 
});

ruta.post('/tienda/actualizarPassByTienda', async (req, res) => {
  const { pass, id } = req.body;
  try{
      var resultado = await actualizarPassByTienda(pass, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/eliminarTiendaCategoriaRolById', async (req, res) => {
  const { id_tienda_categoria, id_rol, id_empresa } = req.body;
  try{
      var resultado = await eliminarTiendaCategoriaRolById(id_tienda_categoria, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/agregarLogin', async (req, res) => {
  const { id, id_tienda, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado } = req.body;
  try{
      var resultado = await agregarLogin(id, id_tienda, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/salirLogin', async (req, res) => {
  const { latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id } = req.body;
  try{
      var resultado = await salirLogin(latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/tiendaById', async (req, res) => {
  const { id_tienda } = req.body;
  try{
      var resultado = await tiendaById(id_tienda);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/tiendaEmpresaById', async (req, res) => {
  const { id_tienda_empresa } = req.body;
  try{
      var resultado = await tiendaEmpresaById(id_tienda_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/tiendaByUsuarioPass', async (req, res) => {
  const { usuario, pass } = req.body;
  try{
      var resultado = await tiendaByUsuarioPass(usuario, pass);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/tiendaLoginByTiendaPlataforma', async (req, res) => {
  const { id_tienda, plataforma } = req.body;
  try{
      var resultado = await tiendaLoginByTiendaPlataforma(id_tienda, plataforma);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/listaTiendaEmpresaByEstadoCategoriaRutaEmpresa', async (req, res) => {
  const { estado, id_tienda_categoria, id_ruta, id_empresa, fecha } = req.body;
  try{
      var resultado = await listaTiendaEmpresaByEstadoCategoriaRutaEmpresa(estado, id_tienda_categoria, id_ruta, id_empresa, fecha);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTiendaEmpresaByEstadoEmpresa', async (req, res) => {
  const { estado, id_empresa } = req.body;
  try{
      var resultado = await listaTiendaEmpresaByEstadoEmpresa(estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTiendaEmpresaRutaByUsuarioEmpresa', async (req, res) => {
  const { estado, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await listaTiendaEmpresaRutaByUsuarioEmpresa(estado, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTiendaEmpresaByEstadoCategoriaRuta', async (req, res) => {
  const { estado, id_categoria, id_ruta, id_empresa } = req.body;
  try{
      var resultado = await listaTiendaEmpresaByEstadoCategoriaRuta(estado, id_categoria, id_ruta, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTipoTiendaByEstado', async (req, res) => {
  const { estado } = req.body;
  try{
      var resultado = await listaTipoTiendaByEstado(estado);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTiendaEstadoByEstadoTipo', async (req, res) => {
  const { estado, tipo } = req.body;
  try{
      var resultado = await listaTiendaEstadoByEstadoTipo(estado, tipo);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaTiendaCategoriaByEstado', async (req, res) => {
  const { estado, id_empresa } = req.body;
  try{
      var resultado = await listaTiendaCategoriaByEstado(estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/tienda/listaCategoriaTiendaRolByRol', async (req, res) => {
  const { estado, id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaCategoriaTiendaRolByRol(estado, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/listaCategoriaTiendaRolNoRegistradoByRol', async (req, res) => {
  const { estado, id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaCategoriaTiendaRolNoRegistradoByRol(estado, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/listaTiendaNoRutaByEmpresaEstado', async (req, res) => {
  const { id_empresa, estado } = req.body;
  try{
      var resultado = await listaTiendaNoRutaByEmpresaEstado(id_empresa, estado);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/listaTiendaNoRutaByEmpresaEstadoBuscar', async (req, res) => {
  const { id_empresa, estado, palabra } = req.body;
  try{
      var resultado = await listaTiendaNoRutaByEmpresaEstadoBuscar(id_empresa, estado, palabra);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/listaTiendaEmpresaByEmpresaEstado', async (req, res) => {
  const { id_empresa, estado } = req.body;
  try{
      var resultado = await listaTiendaEmpresaByEmpresaEstado(id_empresa, estado);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/tiendaEmpresaByTiendaEmpresa', async (req, res) => {
  const { id_tienda, id_empresa } = req.body;
  try{
      var resultado = await tiendaEmpresaByTiendaEmpresa(id_tienda, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/tienda/usuarioTiendaByUsuario', async (req, res) => {
  const { usuario } = req.body;
  try{
      var resultado = await usuarioTiendaByUsuario(usuario);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

module.exports = ruta;