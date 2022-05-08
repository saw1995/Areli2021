const {
  agregarProducto,
  agregarProductoGrupo,
  agregarProductoMedida,
  agregarImagenById,
  eliminarImagenById,
  actualizarProductoById,
  actualizarImagenGrupoById,
  listaProductoByGrupoEmpresa,
  listaProductoGrupoByMarcaEmpresa,
  listaProductoGrupoByCategoriaEmpresa,



    
    agregarProductoEmpresa,

    actualizarDatosProducto,
    actualizarEstadoByIdProducto,
    actualizarDatosProductoMedida,
    actualizarEstadoByIdProductoMedida,
    actualizarDatosProductoEmpresa,
    actualizarProductoGrupoById,
    actualizarEstadoByIdProductoEmpresa,

    productoById,
    productoGrupoById,
    listaMedidaByProductoEstado,
    listaProductoByEstado,
    listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa,
    listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa,
    listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa,
    listaProductoEmpresaVistaSencillaByIdEmpresa
  } = require('../controlador/productoControlador');

const ruta = require('express').Router();

ruta.post('/producto/agregarProducto', async (req, res) => {
  const { codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa } = req.body;
  
  try{
      var resultado = await agregarProducto(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, imagen, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/agregarProductoGrupo', async (req, res) => {
  const { grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa } = req.body;
  
  try{
      var resultado = await agregarProductoGrupo( grupo, descripcion, imagen, estado, id_categoria, id_marca, id_empresa );
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/agregarProductoMedida', async (req, res) => {
  const { id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado } = req.body;
  
  try{
      var resultado = await agregarProductoMedida(id_producto, unidad, medida, rango, peso, ancho, alto, largo, estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/agregarImagenById/:id', async (req, res) => {
  const { id } = req.params;
  let imagen = req.files.imagen
  try{
      var resultado = await agregarImagenById(imagen,id);
      res.json(resultado);
  }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/producto/eliminarImagenById', async (req, res) => {
  const { imagen, id } = req.body;
  
  try{
      var resultado = await eliminarImagenById(imagen, id);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/actualizarImagenGrupoById/:id', async (req, res) => {
  const { id } = req.params;
  let imagen = req.files.imagen
  try{
      var resultado = await actualizarImagenGrupoById(imagen,id);
      res.json(resultado);
  }catch(error){
      console.log(error)
      res.json(error);
    }
});

ruta.post('/producto/listaProductoGrupoByMarcaEmpresa', async (req, res) => {
  const { id_marca, estado, id_empresa } = req.body;
  
  try{
      var resultado = await listaProductoGrupoByMarcaEmpresa(id_marca, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/listaProductoByGrupoEmpresa', async (req, res) => {
  const { id_producto_grupo, estado, id_empresa } = req.body;
  
  try{
      var resultado = await listaProductoByGrupoEmpresa(id_producto_grupo, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});
















ruta.post('/producto/agregarProductoEmpresa', async (req, res) => {
    const {id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion} = req.body;
    
    try{
        var resultado = await agregarProductoEmpresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});
ruta.post('/producto/agregarProductoEmpresa', async (req, res) => {
    const {id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion} = req.body;
    
    try{
        var resultado = await agregarProductoEmpresa(id,id_producto,id_empresa,codigo,id_categoria,imagenes,descripcion);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});
ruta.post('/producto/actualizarDatosProducto', async (req, res) => {
    const {codigo_barra_qr,codigo,nombre,descripcion,id_marca,id} = req.body;
    
    try{
        var resultado = await actualizarDatosProducto(codigo_barra_qr,codigo,nombre,descripcion,id_marca,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});
ruta.post('/producto/actualizarEstadoByIdProducto', async (req, res) => {
    const {estado,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdProducto(estado,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});
ruta.post('/producto/actualizarDatosProductoMedida', async (req, res) => {
    const {id_producto,unidad,medida,rango,presentacion,imagen,id} = req.body;
    
    try{
        var resultado = await actualizarDatosProductoMedida(id_producto,unidad,medida,rango,presentacion,imagen,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});
ruta.post('/producto/actualizarEstadoByIdProductoMedida', async (req, res) => {
    const {estado,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdProductoMedida(estado,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/actualizarProductoGrupoById', async (req, res) => {
  const {nombre, descripcion, id_categoria, id} = req.body;
  
  try{
      var resultado = await actualizarProductoGrupoById(nombre, descripcion, id_categoria, id);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/actualizarProductoById', async (req, res) => {
  const { codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id } = req.body;
  
  try{
      var resultado = await actualizarProductoById(codigo_barra_qr, codigo, id_producto_grupo, nombre, descripcion, id);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/actualizarDatosProductoEmpresa', async (req, res) => {
    const {id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarDatosProductoEmpresa(id_producto,codigo,id_categoria,imagenes,descripcion,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/actualizarEstadoByIdProductoEmpresa', async (req, res) => {
    const {estado,id_empresa,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdProductoEmpresa(estado,id_empresa,id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/listaMedidaByProductoEstado', async (req, res) => {
  const {id_producto, estado} = req.body;
  
  try{
      var resultado = await listaMedidaByProductoEstado(id_producto, estado);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/productoById', async (req, res) => {
  const {id_producto} = req.body;

  try{
      var resultado = await productoById(id_producto);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/productoGrupoById', async (req, res) => {
  const {id_producto_grupo} = req.body;
  
  try{
      var resultado = await productoGrupoById(id_producto_grupo);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/listaProductoByEstado', async (req, res) => {
    const {estado} = req.body;
    
    try{
        var resultado = await listaProductoByEstado(estado);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa', async (req, res) => {
  const {id_producto_grupo, estado_producto, estado, id_empresa} = req.body;
  
  try{
      var resultado = await listaProductoMedidaSeleccionadoByGrupoEstadoEmpresa(id_producto_grupo, estado_producto, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/listaProductoMedidaNoSeleccionadoByGrupoEstadoEmpresa', async (req, res) => {
const {id_producto_grupo, estado_producto, estado, id_empresa} = req.body;

try{
    var resultado = await listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa(id_producto_grupo, estado_producto, estado, id_empresa);
    res.json(resultado);
  }catch(error){
    res.json(error);
  }
});

ruta.post('/producto/listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa', async (req, res) => {
    const {id_marca, estado_producto, estado, id_empresa} = req.body;
    
    try{
        var resultado = await listaProductoMedidaSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa', async (req, res) => {
  const {id_marca, estado_producto, estado, id_empresa} = req.body;
  
  try{
      var resultado = await listaProductoMedidaNoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa', async (req, res) => {
  const {id_marca, estado_producto, estado, id_empresa} = req.body;
  
  try{
      var resultado = await listaProductoGrupoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/producto/listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa', async (req, res) => {
const {id_marca, estado_producto, estado, id_empresa} = req.body;

try{
    var resultado = await listaProductoGrupoNoSeleccionadoByMarcaEstadoEmpresa(id_marca, estado_producto, estado, id_empresa);
    res.json(resultado);
  }catch(error){
    res.json(error);
  }
});

ruta.post('/producto/listaProductoEmpresaVistaSencillaByIdEmpresa', async (req, res) => {
    const {id_empresa} = req.body;
    
    try{
        var resultado = await listaProductoEmpresaVistaSencillaByIdEmpresa(id_empresa);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/producto/listaProductoGrupoByCategoriaEmpresa', async (req, res) => {
  const {id_categoria, estado, id_empresa} = req.body;
  
  try{
      var resultado = await listaProductoGrupoByCategoriaEmpresa(id_categoria, estado, id_empresa);
      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

module.exports = ruta;
