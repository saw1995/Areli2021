const {
    agregarAlmacen,
    agregarAlmacenRol,
    actualizarVentaAlmacenByAlmacen,
    actualizarDatosAlmacen,
    actualizarEstadoByIdAlmacen,
    listaAlmacenBySucursalEmpresa,
    listaAlmacenByIdEmpresaEstado,
    agregarAlmacenSeccion,
    actualizarDatosAlmacenSeccion,
    actualizarEstadoAlmacenSeccionById,
    eliminarAlmacenRolById,
    listaAlmacenSeccionByIdAlmacenEstado,
    almacenById,
    listaAlmacenVentaSucursalBySucursal,
    almacenVentaSucursalBySucursalVenta,
    listaAlmacenRolByRol,
    listaAlmacenRolNoRegistradoByRol
   } = require('../controlador/almacenControlador');

const ruta = require('express').Router();

ruta.post('/almacen/agregarAlmacen', async (req, res) => {
    const { id_sucursal, nombre, descripcion, latitud, longitud, id_empresa, id_rol } = req.body;
    
    try{
        var resultado = await agregarAlmacen(id_sucursal, nombre, descripcion, latitud, longitud, id_empresa, id_rol);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/agregarAlmacenRol', async (req, res) => {
  const {id_almacen, id_rol, id_empresa } = req.body;
  
  try{
      var resultado = await agregarAlmacenRol(id_almacen, id_rol, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/actualizarVentaAlmacenByAlmacen', async (req, res) => {
  const {venta, id_almacen, id_sucursal, id_empresa, estado} = req.body;
  
  try{
      var resultado = await actualizarVentaAlmacenByAlmacen(venta, id_almacen, id_sucursal, id_empresa, estado);
      res.json(resultado);
    }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/almacen/actualizarDatosAlmacen', async (req, res) => {
    const {id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarDatosAlmacen(id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/actualizarEstadoByIdAlmacen', async (req, res) => {
    const {estado,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdAlmacen(estado,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/listaAlmacenBySucursalEmpresa', async (req, res) => {
  const {id_empresa,id_sucursal} = req.body;
  
  try{
      var resultado = await listaAlmacenBySucursalEmpresa(id_empresa,id_sucursal);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/listaAlmacenByIdEmpresaEstado', async (req, res) => {
    const {id_empresa,id_sucursal, estado} = req.body;
    
    try{
        var resultado = await listaAlmacenByIdEmpresaEstado(id_empresa,id_sucursal, estado);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/agregarAlmacenSeccion', async (req, res) => {
    const {id,id_almacen,nombre,descripcion,id_empresa} = req.body;
    
    try{
        var resultado = await agregarAlmacenSeccion(id,id_almacen,nombre,descripcion,id_empresa);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/actualizarDatosAlmacenSeccion', async (req, res) => {
    const {id_almacen,nombre,descripcion,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarDatosAlmacenSeccion(id_almacen,nombre,descripcion,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/actualizarEstadoAlmacenSeccionById', async (req, res) => {
    const {estado,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoAlmacenSeccionById(estado,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/eliminarAlmacenRolById', async (req, res) => {
  const {id_almacen, id_rol, id_empresa} = req.body;
  
  try{
      var resultado = await eliminarAlmacenRolById(id_almacen, id_rol, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/listaAlmacenSeccionByIdAlmacenEstado', async (req, res) => {
    const {id_empresa,id_almacen, estado} = req.body;
    
    try{
        var resultado = await listaAlmacenSeccionByIdAlmacenEstado(id_empresa,id_almacen, estado);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/almacen/almacenById', async (req, res) => {
  const {id_empresa,id} = req.body;
  
  try{
      var resultado = await almacenById(id_empresa,id);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/listaAlmacenVentaSucursalBySucursal', async (req, res) => {
  const {id_sucursal, id_empresa, estado} = req.body;
  
  try{
      var resultado = await listaAlmacenVentaSucursalBySucursal(id_sucursal, id_empresa, estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/almacenVentaSucursalBySucursalVenta', async (req, res) => {
  const {id_sucursal, id_empresa, venta, estado} = req.body;
  
  try{
      var resultado = await almacenVentaSucursalBySucursalVenta(id_sucursal, id_empresa, venta, estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/listaAlmacenRolByRol', async (req, res) => {
  const {estado, id_sucursal, id_rol, id_empresa} = req.body;
  
  try{
      var resultado = await listaAlmacenRolByRol(estado, id_sucursal, id_rol, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/almacen/listaAlmacenRolNoRegistradoByRol', async (req, res) => {
  const {estado, id_rol, id_empresa} = req.body;
  
  try{
      var resultado = await listaAlmacenRolNoRegistradoByRol(estado, id_rol, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

module.exports = ruta;