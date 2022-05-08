const { agregarSucursal,
    agregarSucursalRol,
    agregarImagenServicioSucursal,

    actualizarImagenById,
    actualizarDatosSucursal,
    actualizarEstadoByIdSucursal,
    actualizarAreliShopBySucursalEmpresa,
    actualizarHorarioSucursalById,
    actualizarInformacionServicioSucursal,

    eliminarSucursalRolById,
    eliminarImagenById,

    listaSucursalByEmpresa,
    listaSucursalByIdEmpresaEstado,
    listaSucursalByEmpresaEstadoArelishop,
    SucursalById,
    listaSucursalAlmacenVentaRolByRol,
    listaSucursalRolByRol,
    listaSucursalRolNoRegistradoByRol,
    listaHorarioSucursalByIdSucursal
  } = require('../controlador/sucursalControlador');

const ruta = require('express').Router();

ruta.post('/sucursal/agregarSucursal', async (req, res) => {
    const {nombre, sitio_web, id_departamento, zona, avenida, calle, numero, referencia, latitud,
        longitud, telefono_uno, telefono_dos, telefono_tres, foto, id_empresa, id_rol, hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud} = req.body;
    try{
        var resultado = await agregarSucursal(nombre, sitio_web, id_departamento, zona, avenida, calle, numero, referencia, latitud,
            longitud, telefono_uno, telefono_dos, telefono_tres, foto, id_empresa, id_rol, hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud);

        res.json(resultado);
        console.log(resultado)
      }catch(error){
        res.json(error);
      }
});

ruta.post('/sucursal/agregarSucursalRol', async (req, res) => {
  const {id_sucursal, id_rol, id_empresa} = req.body;
  try{
    
      var resultado = await agregarSucursalRol(id_sucursal, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/agregarImagenServicioSucursal/:id/:id_empresa', async (req, res) => {
  const { id, id_empresa } = req.params;
  let imagen = req.files.imagen
  try{
      var resultado = await agregarImagenServicioSucursal(imagen, id, id_empresa);
      res.json(resultado);
  }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/sucursal/actualizarDatosSucursal', async (req, res) => {
    const {nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
        longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id} = req.body;
    try{
        var resultado = await actualizarDatosSucursal(nombre,sitio_web,id_departamento,zona,avenida,calle,numero,referencia,latitud,
            longitud,telefono_uno,telefono_dos,telefono_tres,id_empresa,id);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/sucursal/actualizarEstadoByIdSucursal', async (req, res) => {
    const {estado,id_empresa,id} = req.body;
    try{
        var resultado = await actualizarEstadoByIdSucursal(estado,id_empresa,id);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/sucursal/actualizarAreliShopBySucursalEmpresa', async (req, res) => {
  const { areli_shop, id_sucursal, id_empresa } = req.body;
  try{
      var resultado = await actualizarAreliShopBySucursalEmpresa(areli_shop, id_sucursal, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/actualizarImagenById/:id/:id_empresa', async (req, res) => {
  const { id, id_empresa } = req.params;
  let imagen = req.files.imagen
  try{
    console.log(id, id_empresa)
      var resultado = await actualizarImagenById(imagen, id, id_empresa);
      res.json(resultado);
  }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/sucursal/actualizarHorarioSucursalById', async (req, res) => {
  const { hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, id_usuario, id } = req.body;
  try{
      var resultado = await actualizarHorarioSucursalById(hora_inicio_uno, hora_final_uno, hora_inicio_dos, hora_final_dos, id_usuario, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/actualizarInformacionServicioSucursal', async (req, res) => {
  const { info_servicio, id_sucursal, id_empresa } = req.body;
  try{
      var resultado = await actualizarInformacionServicioSucursal(info_servicio, id_sucursal, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/eliminarSucursalRolById', async (req, res) => {
  const {id_sucursal, id_rol, id_empresa} = req.body;
  try{
      var resultado = await eliminarSucursalRolById(id_sucursal, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/eliminarImagenById', async (req, res) => {
  const { imagen, id, id_empresa } = req.body;
  
  try{
      var resultado = await eliminarImagenById(imagen, id, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaSucursalByIdEmpresaEstado', async (req, res) => {
    const {id_empresa,estado} = req.body;
    try{
        var resultado = await listaSucursalByIdEmpresaEstado(id_empresa,estado);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/sucursal/listaSucursalByEmpresa', async (req, res) => {
  const { id_empresa } = req.body;
  try{
      var resultado = await listaSucursalByEmpresa(id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaSucursalByEmpresaEstadoArelishop', async (req, res) => {
  const {id_empresa,estado, arelishop} = req.body;
  try{
      var resultado = await listaSucursalByEmpresaEstadoArelishop(id_empresa,estado,arelishop);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/SucursalById', async (req, res) => {
  const {id_empresa,id} = req.body;
  try{
      var resultado = await SucursalById(id_empresa,id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaSucursalAlmacenVentaRolByRol', async (req, res) => {
  const { estado, id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaSucursalAlmacenVentaRolByRol(estado, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaSucursalRolByRol', async (req, res) => {
  const { estado, id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaSucursalRolByRol(estado, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaSucursalRolNoRegistradoByRol', async (req, res) => {
  const { estado, id_rol, id_empresa } = req.body;
  try{
      var resultado = await listaSucursalRolNoRegistradoByRol(estado, id_rol, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/sucursal/listaHorarioSucursalByIdSucursal', async (req, res) => {
  const { id_sucursal, estado, id_empresa } = req.body;
  try{
      var resultado = await listaHorarioSucursalByIdSucursal(id_sucursal, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});


module.exports = ruta;

