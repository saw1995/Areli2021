const {
  agregarPromocion,
  agregarPromocionProductoEmpresa,
  agregarImagenById,
  listaPromocionBySucursalByEstado,
  listaPromocionDetalleProductoByIdPromocion
} = require('../controlador/promocionControlador');

const ruta = require('express').Router();

ruta.post('/promocion/agregarPromocion', async (req, res) => {
  const { id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, id_empresa, id_usuario} = req.body;
  try{
      var resultado = await agregarPromocion(id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, id_empresa, id_usuario);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/promocion/agregarPromocionProductoEmpresa', async (req, res) => {
  const { id_promocion, id_producto, precio, cantidad, id_empresa } = req.body;
  try{
      var resultado = await agregarPromocionProductoEmpresa(id_promocion, id_producto, precio, cantidad, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/promocion/actualizarPrecioPromocionById', async (req, res) => {
  const { precio, id_promocion } = req.body;
  try{
      var resultado = await actualizarPrecioPromocionById(precio, id_promocion);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/promocion/agregarImagenById/:id', async (req, res) => {
  const { id } = req.params;
  let imagen = req.files.imagen
  try{
      var resultado = await agregarImagenById(imagen,id);
      res.json(resultado);
  }catch(error){
      
      res.json(error);
    }
});

ruta.post('/promocion/listaPromocionBySucursalByEstado', async (req, res) => {
  const { id_sucursal, estado, id_empresa } = req.body;
  try{
      var resultado = await listaPromocionBySucursalByEstado(id_sucursal, estado, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

ruta.post('/promocion/listaPromocionDetalleProductoByIdPromocion', async (req, res) => {
  const { id_promocion, estado } = req.body;
  try{
      var resultado = await listaPromocionDetalleProductoByIdPromocion(id_promocion, estado);

      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
 
});

module.exports = ruta;