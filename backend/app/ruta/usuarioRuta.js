const {
    agregarUsuario,
    agregarLogin,
    salirLogin,
    actualizarDatosUsuarioById,
    actualizarEstadoByIdUsuario,
    actualizarPassById,
    actualizarImagenById,
    usuarioLoginByUsuarioEmpresa,
    usuarioByCiPass,
    loginByUsuarioPlataforma,
    listaUsuarioByEmpresaByEstado,
    listaUsuarioByEmpresa,
    usuarioById,
    listaUsuarioByEmpresaToExcel,excelprueba

} = require('../controlador/usuarioControlador');
const ruta = require('express').Router();

ruta.post('/usuario/agregarUsuario', async (req, res) => {
    const {ci,ci_exp,nombre,appat,apmat,email, 
        celular,genero,id_departamento,fecha_nacimiento,estado_civil,estudio,zona,avenida,calle,numero,referencia,
        latitud,longitud,foto,pass, id_rol,id_empresa,hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud} = req.body;
    try{
        var resultado = await agregarUsuario(ci,ci_exp,nombre,appat,apmat,email, 
            celular,genero,id_departamento,fecha_nacimiento,estado_civil,estudio,zona,avenida,calle,numero,referencia,
            latitud,longitud,foto,pass, id_rol,id_empresa,hr_id_usuario,hr_dispositivo,hr_latitud,hr_longitud);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});

ruta.post('/usuario/agregarLogin', async (req, res) => {
  const {id_usuario, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, id_empresa} = req.body;
  try{
      var resultado = await agregarLogin(id_usuario, plataforma, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/salirLogin', async (req, res) => {
  const {latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa} = req.body;
  try{
      var resultado = await salirLogin(latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/actualizarDatosUsuarioById', async (req, res) => {
  const {ci, ci_exp , nombre, appat, apmat, email, celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, latitud, longitud, id_rol, id_empresa, id} = req.body;

  try{
      var resultado = await actualizarDatosUsuarioById(ci, ci_exp , nombre, appat, apmat, email,
        celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, 
       latitud, longitud,id_rol,id_empresa,id);

      res.json(resultado);
    }catch(error){
      console.log(error);
      res.json(error);
    }
});

ruta.post('/usuario/actualizarEstadoByIdUsuario', async (req, res) => {
  const {estado, id_empresa, id} = req.body;
  try{
      var resultado = await actualizarEstadoByIdUsuario(estado, id_empresa, id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/actualizarPassById', async (req, res) => {
  const { pass, id_usuario, id_empresa } = req.body;
  try{
      var resultado = await actualizarPassById(pass, id_usuario, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/actualizarImagenById/:id/:id_empresa', async (req, res) => {
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

ruta.post('/usuario/usuarioByCiPass', async (req, res) => {
  const {ci, pass} = req.body;
  try{
      var resultado = await usuarioByCiPass(ci, pass);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
 
});

ruta.post('/usuario/usuarioLoginByUsuarioEmpresa', async (req, res) => {
    const {id_usuario,id_empresa} = req.body;
    try{
        var resultado = await usuarioLoginByUsuarioEmpresa(id_usuario, id_empresa);

        res.json(resultado);
      }catch(error){
        res.json(error);
      }
});


ruta.post('/usuario/loginByUsuarioPlataforma', async (req, res) => {
  const {id_usuario, plataforma, id_empresa} = req.body;
  try{
      var resultado = await loginByUsuarioPlataforma(id_usuario, plataforma, id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/listaUsuarioByEmpresaByEstado', async (req, res) => {
  const {id_empresa,estado} = req.body;
  try{
      var resultado = await listaUsuarioByEmpresaByEstado(id_empresa,estado);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/listaUsuarioByEmpresa', async (req, res) => {
  const {id_empresa} = req.body;
  try{
      var resultado = await listaUsuarioByEmpresa(id_empresa);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

ruta.post('/usuario/usuarioById', async (req, res) => {
  const {id_empresa,id} = req.body;
  try{
      var resultado = await usuarioById(id_empresa,id);

      res.json(resultado);
    }catch(error){
      res.json(error);
    }
});

//--------------->>>>Ruta para exportar en Excel  const { carpeta, imagen } = req.params; :carpeta/:imagen

ruta.post('/usuario/listaUsuarioByEmpresaToExcel', async (req, res) => {
  try{
      const {id_empresa} = req.body;
      var fileName = "listaUsuarios.xlsx";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const xlsx = await listaUsuarioByEmpresaToExcel(id_empresa);
      res.send(new Buffer.from(xlsx));

    }catch(error){
      console.log(error)
      res.json(error);w
    }
 
});



ruta.post('/usuario/prueba', async (req, res) => {
  try{
      const {id_empresa} = req.body;
      console.log(id_empresa);
      var fileName = "listaUsuarios.xlsx";
      res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      const xlsx = await excelprueba();
      res.send(new Buffer.from(xlsx));

    }catch(error){
      console.log(error)
      res.json(error);
    }
 
});

module.exports = ruta;