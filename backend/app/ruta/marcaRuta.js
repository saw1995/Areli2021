const {
  agregarMarca,
  actualizarImagenById,
  actualizarDatosById,
  actualizarEstadoByIdMarca,
  marcaById,
  listaMarcaByEstado
}= require('../controlador/marcaControlador');

const ruta = require('express').Router();

ruta.post('/marca/agregarMarca', async (req, res) => {
    const {nombre, descripcion, imagen, estado, id_empresa} = req.body;
    
    try{
        var resultado = await agregarMarca(nombre, descripcion, imagen, estado, id_empresa);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/marca/actualizarImagenById/:id', async (req, res) => {
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

ruta.post('/marca/actualizarDatosById', async (req, res) => {
    const {nombre, descripcion, id} = req.body;
    
    try{
        var resultado = await actualizarDatosById(nombre, descripcion, id);
        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/marca/actualizarEstadoByIdMarca', async (req, res) => {
    const {estado,id} = req.body;
    
    try{
        var resultado = await actualizarEstadoByIdMarca(estado,id);
        res.json(resultado);
      }catch(error){
        res.json(errors);
      }
});

ruta.post('/marca/listaMarcaByEstado', async (req, res) => {
    const {estado, id_empresa} = req.body;
    
    try{
        var resultado = await listaMarcaByEstado(estado, id_empresa);
        res.json(resultado);
      }catch(error){
        res.json(errors);
      }
});

ruta.post('/marca/marcaById', async (req, res) => {
  const { id } = req.body;
  
  try{
      var resultado = await marcaById(id);
      res.json(resultado);
    }catch(error){
      res.json(errors);
    }
});

module.exports = ruta;
