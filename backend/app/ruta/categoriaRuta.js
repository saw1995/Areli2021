const {
    agregarCategoria,
    actualizarImagenById,
    actualizarCategoriaById,
    actualizarEstadoByIdCategoria,
    categoriaById,
    listaCategoriaAleatorioProductoStockByEstado,
    listaCategoriaProductoStockCeroByAlmacenEmpresaEstado,
    listaCategoriaProductoStockByAlmacenEmpresaEstado,
    listaCategoriaByIdEmpresaByEstado,
    listaCategoriaProductoEmpresaByEstadoEmpresa
  } = require('../controlador/categoriaControlador');

const ruta = require('express').Router();

ruta.post('/categoria/agregarCategoria', async (req, res) => {
    const {nombre,descripcion,imagen,id_empresa,id_usuario,dispositivo,latitud,longitud} = req.body;
    
    try{
        var resultado = await agregarCategoria(nombre,descripcion,imagen,id_empresa,id_usuario,dispositivo,latitud,longitud);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/categoria/actualizarImagenById/:id/:id_empresa', async (req, res) => {
  const { id, id_empresa } = req.params;
  let imagen = req.files.imagen
  try{
      var resultado = await actualizarImagenById(imagen, id, id_empresa);
      res.json(resultado);
  }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/categoria/actualizarCategoriaById', async (req, res) => {
    const { nombre, descripcion, id_empresa, id } = req.body;
    
    try{
        var resultado = await actualizarCategoriaById(nombre, descripcion, id_empresa, id);
        res.json(resultado);
      }catch(error){0
        res.json(error);
      }
});

ruta.post('/categoria/actualizarEstadoByIdCategoria', async (req, res) => {
    const {estado,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdCategoria(estado,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/categoria/categoriaById', async (req, res) => {
  const { id_empresa, id_categoria } = req.body;
  
  try{
      var resultado = await categoriaById(id_empresa, id_categoria);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/categoria/listaCategoriaAleatorioProductoStockByEstado', async (req, res) => {
  const {estado} = req.body;
  
  try{
      var resultado = await listaCategoriaAleatorioProductoStockByEstado(estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/categoria/listaCategoriaByIdEmpresaByEstado', async (req, res) => {
  const {id_empresa,estado} = req.body;
  
  try{
      var resultado = await listaCategoriaByIdEmpresaByEstado(id_empresa,estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/categoria/listaCategoriaProductoEmpresaByEstadoEmpresa', async (req, res) => {
  const { estado, id_empresa } = req.body;
  
  try{
      var resultado = await listaCategoriaProductoEmpresaByEstadoEmpresa(estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/categoria/listaCategoriaProductoStockByAlmacenEmpresaEstado', async (req, res) => {
    const {id_almacen, id_empresa, estado} = req.body;
    
    try{
        var resultado = await listaCategoriaProductoStockByAlmacenEmpresaEstado(id_almacen, id_empresa, estado);
        res.json(resultado);
      }catch(error){
        console.log(error);
        res.json(error);
      }
});

ruta.post('/categoria/listaCategoriaProductoStockCeroByAlmacenEmpresaEstado', async (req, res) => {
  const {id_almacen, id_empresa, estado} = req.body;
  
  try{
      var resultado = await listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(id_almacen, id_empresa, estado);
      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
});

module.exports = ruta;
