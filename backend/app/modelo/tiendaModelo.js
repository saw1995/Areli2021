const pool = require('../config/database');

// ------------> INSERT
function agregarTiendaAreliShop(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        pool.query(sql, [id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTienda(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda(id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);"
        pool.query(sql, [id, id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, estado, usuario, pass], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTiendaCategoria(id, nombre, detalle, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_categoria(id, nombre, detalle, estado, id_empresa) VALUES (?,?,?,?,?);"
        pool.query(sql, [id, nombre, detalle, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTiendaEmpresa(id, id_tienda, id_tienda_categoria, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_empresa(id, id_tienda, id_tienda_categoria, id_ruta, id_empresa) VALUES (?,?,?,?,?);"
        pool.query(sql, [id, id_tienda, id_tienda_categoria, id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTiendaVisita(id, id_tienda_empresa, id_tienda_estado, detalle, fecha, hora, id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_visita(id, id_tienda_empresa, id_tienda_estado, detalle, fecha, hora, id_usuario, estado, id_empresa) VALUES (?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_tienda_empresa, id_tienda_estado, detalle, fecha, hora, id_usuario, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTiendaCategoriaRol(id, id_tienda_categoria, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_categoria_rol(id, id_tienda_categoria, id_rol, id_empresa) VALUES (?,?,?,?);";
        pool.query(sql, [id, id_tienda_categoria, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarLogin(id, id_tienda, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_login(id, id_tienda, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado) VALUES (?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_tienda, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function salirLogin(fecha_salida, hora_salida, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda_login SET fecha_salida = ?, hora_salida = ?, latitud_salida = ?, longitud_salida = ?, observacion_salida = ?, dispositivo_salida = ?, estado = ? WHERE id = ?;";
        pool.query(sql, [fecha_salida, hora_salida, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarTiendaById(id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET id_tipo_tienda = ?, nombre = ?, id_departamento = ?, zona = ?, avenida = ?, calle = ?, numero = ?, referencia = ?, nit = ?, razon_social = ?, email = ?, telefono = ?, nombre_contacto = ?, celular_contacto = ?, latitud = ?, longitud = ? WHERE id = ?;";
        pool.query(sql, [id_tipo_tienda, nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarTiendaEmpresaById(new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda_empresa SET id_tienda_categoria = ?, id_ruta = ? WHERE id_tienda = ? and id_tienda_categoria = ? and id_ruta = ? and id_empresa = ?;";
        pool.query(sql, [new_tienda_categoria, new_ruta, id_tienda, id_tienda_categoria, id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET foto = ? WHERE id = ?;";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarTiendaCategoriaById(nombre, detalle, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda_categoria SET nombre = ?, detalle = ? WHERE id = ? and id_empresa = ?;"
        pool.query(sql, [nombre, detalle, id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoById(estado, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda_categoria SET estado = ? WHERE id = ? and id_empresa = ?;"
        pool.query(sql, [estado, id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosContactoById(id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET id_tipo_tienda = ?, nombre = ?, email = ?, telefono = ?, nombre_contacto = ?, celular_contacto = ? WHERE id = ?;"
        pool.query(sql, [id_tipo_tienda, nombre, email, telefono, nombre_contacto, celular_contacto, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarUbicacionById(id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET id_departamento = ?, zona = ?, avenida = ?, calle = ?, numero = ?, referencia = ?, latitud = ?, longitud = ? WHERE id = ?;"
        pool.query(sql, [id_departamento, zona, avenida, calle, numero, referencia, latitud, longitud, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarNitRazonSocialById(nit, razon_social, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET nit = ?, razon_social = ? WHERE id = ?;"
        pool.query(sql, [nit, razon_social, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarPassByTienda(pass, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE tienda SET pass = ? WHERE id = ?;"
        pool.query(sql, [pass, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> DELETE
function eliminarTiendaCategoriaRolById(id_tienda_categoria, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM tienda_categoria_rol WHERE id_tienda_categoria = ? and id_rol = ? and id_empresa = ?;";
        pool.query(sql, [id_tienda_categoria, id_rol, id_empresa], function(error, resultado){
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

// ------------> SELECT
function tiendaById(id_tienda){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda.id, id_tipo_tienda, tipo_tienda.nombre as 'tipo_tienda', tienda.nombre, id_departamento, departamento, provincia, municipio, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, tienda.latitud, tienda.longitud, foto, tienda.estado, usuario, pass, tienda_categoria.id as 'id_tienda_categoria' FROM tienda, tienda_empresa, departamento, tipo_tienda, tienda_categoria WHERE tienda_empresa.id_tienda = tienda.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda.id_departamento = departamento.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id = ?;";
        pool.query(sql, [id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function tiendaEmpresaById(id_tienda_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id, id_tienda, id_tipo_tienda, tipo_tienda.nombre as 'nombre_tipo', tienda.nombre, id_departamento, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, tienda.latitud, tienda.longitud, foto, tienda_empresa.id_ruta, tienda_empresa.id_tienda_categoria, tienda_categoria.nombre as 'nombre_tienda_categoria', ruta.nombre as 'nombre_ruta' FROM tienda_empresa, tienda, departamento, tipo_tienda, ruta, tienda_categoria WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_departamento = departamento.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and tienda_empresa.id_ruta = ruta.id and tienda_empresa.id = ?;";
        pool.query(sql, [id_tienda_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function tiendaByUsuarioPass(usuario, pass){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda.id, id_tipo_tienda, tipo_tienda.nombre as 'tipo_tienda', tienda.nombre, id_departamento, zona, avenida, calle, numero, referencia, nit, razon_social, email, telefono, nombre_contacto, celular_contacto, latitud, longitud, foto, usuario, pass, tienda.estado FROM tienda, tipo_tienda WHERE tienda.id_tipo_tienda = tipo_tienda.id and usuario = ? and pass = ?;";
        pool.query(sql, [usuario, pass], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function tiendaLoginByTiendaPlataforma(id_tienda, plataforma){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, id_tienda, plataforma,fecha_ingreso,hora_ingreso,latitud_ingreso,longitud_ingreso,dispositivo_ingreso, fecha_salida,hora_salida,latitud_salida,longitud_salida,observacion_salida,dispositivo_salida,estado FROM tienda_login WHERE id_tienda = ? and plataforma = ? and estado=1 ORDER BY fecha_ingreso DESC, hora_ingreso DESC LIMIT 1;";
        pool.query(sql, [id_tienda, plataforma], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEmpresaByEstadoCategoriaRutaEmpresa(estado, id_tienda_categoria, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id as 'id_tienda_empresa', id_tienda, tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', id_ruta, ruta.nombre as 'nombre_ruta', tienda.latitud, tienda.longitud FROM tienda_empresa, tienda, tipo_tienda, departamento, tienda_categoria, ruta WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda_empresa.id_ruta = ruta.id and tienda.estado = ? and tienda_empresa.id_tienda_categoria = ? and tienda_empresa.id_ruta = ? and tienda_empresa.id_empresa = ? ORDER BY tienda.nombre ASC;";
        pool.query(sql, [estado, id_tienda_categoria, id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEmpresaByEstadoEmpresa(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id as 'id_tienda_empresa', id_tienda, tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', id_ruta, ruta.nombre as 'nombre_ruta', nit, razon_social FROM tienda_empresa, tienda, tipo_tienda, departamento, tienda_categoria, ruta WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda_empresa.id_ruta = ruta.id and tienda.estado = ? and tienda_empresa.id_empresa = ? ORDER BY tienda.nombre ASC;";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEmpresaRutaByUsuarioEmpresa(estado, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id as 'id_tienda_empresa', id_tienda, tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', id_ruta, ruta.nombre as 'nombre_ruta', nit, razon_social FROM tienda_empresa, tienda, tipo_tienda, departamento, tienda_categoria, ruta WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda_empresa.id_ruta = ruta.id and tienda_empresa.id_ruta IN (SELECT id_ruta FROM ruta_usuario, ruta WHERE ruta_usuario.id_ruta = ruta.id and ruta.estado = ? and ruta_usuario.id_usuario = ? and ruta_usuario.id_empresa = ?) and tienda.estado = ? and tienda_empresa.id_empresa = ? ORDER BY tienda.nombre ASC;";
        pool.query(sql, [estado, id_usuario, id_empresa, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEmpresaByEstadoCategoriaRuta(estado, id_categoria, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id as 'id_tienda_empresa', id_tienda, tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', id_ruta, ruta.nombre as 'nombre_ruta' FROM tienda_empresa, tienda, tipo_tienda, departamento, tienda_categoria, ruta WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda_empresa.id_ruta = ruta.id and tienda.estado = ? and tienda_empresa.id_categoria = ? and tienda_empresa.id_ruta = ? and tienda_empresa.id_empresa = ? ORDER BY tienda.nombre ASC;";
        pool.query(sql, [estado, id_categoria, id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTipoTiendaByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, detalle, imagen FROM tipo_tienda WHERE estado = ? ORDER BY nombre ASC";
        pool.query(sql, [estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEstadoByEstadoTipo(estado, tipo){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, detalle FROM tienda_estado WHERE estado = ? and tipo = ? ORDER BY nombre ASC, detalle ASC;";
        pool.query(sql, [estado, tipo], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaCategoriaByEstado(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, detalle FROM tienda_categoria WHERE estado = ? and id_empresa = ? ORDER BY nombre ASC";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}



function listaCategoriaTiendaRolByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_categoria_rol.id, id_tienda_categoria, nombre, detalle FROM tienda_categoria_rol, tienda_categoria WHERE tienda_categoria_rol.id_tienda_categoria = tienda_categoria.id and tienda_categoria.estado = ? and tienda_categoria_rol.id_rol = ? and tienda_categoria_rol.id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCategoriaTiendaRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_categoria.id, nombre, detalle FROM tienda_categoria WHERE tienda_categoria.estado = ? and tienda_categoria.id NOT IN (SELECT id_tienda_categoria FROM tienda_categoria_rol WHERE id_rol = ? and id_empresa = ?) and  id_empresa = ?;";
        pool.query(sql, [estado, id_rol, id_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaVisitaByCategoriaRutaEmpresaFecha(id_tienda_categoria, id_ruta, id_empresa, fecha){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_visita.id as 'id_tienda_visita', id_tienda_empresa, id_tienda_estado, tienda_estado.nombre, tienda_estado.detalle, tienda_estado.tipo, tienda_visita.detalle as 'observacion', fecha, hora, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario' FROM tienda_visita, tienda_estado, usuario WHERE tienda_visita.id_tienda_estado = tienda_estado.id and tienda_visita.id_usuario = usuario.id and id_tienda_empresa IN (SELECT id FROM tienda_empresa WHERE id_tienda_categoria = ? and id_ruta = ? and id_empresa = ?) and fecha = ? and tienda_visita.id_empresa = ? ORDER BY fecha DESC, hora DESC;";
        pool.query(sql, [id_tienda_categoria, id_ruta, id_empresa, fecha, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaNoRutaByEmpresaEstado(id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda.id as 'id_tienda', tipo_tienda.nombre as 'tipo_tienda', tienda.nombre as 'nombre_tienda', tienda.latitud, tienda.longitud FROM tienda, tipo_tienda WHERE tienda.id_tipo_tienda = tipo_tienda.id and tienda.id NOT IN (SELECT id_tienda FROM tienda_empresa WHERE id_empresa = ?) and tienda.estado = ? ORDER BY tipo_tienda.nombre ASC, tienda.nombre;";
        pool.query(sql, [id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaNoRutaByEmpresaEstadoBuscar(id_empresa, estado, palabra){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda.id as 'id_tienda', tipo_tienda.nombre as 'tipo_tienda', tienda.nombre as 'nombre_tienda', tienda.latitud, tienda.longitud, foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, tienda.usuario, nit, razon_social FROM tienda, tipo_tienda, departamento WHERE tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda.id NOT IN (SELECT id_tienda FROM tienda_empresa WHERE id_empresa = ?) and tienda.estado = ? and (tienda.usuario LIKE '%"+palabra+"%' or tienda.celular_contacto LIKE '%"+palabra+"%' or tienda.nombre_contacto LIKE '%"+palabra+"%' or tienda.telefono LIKE '%"+palabra+"%' or tienda.nombre LIKE '%"+palabra+"%') ORDER BY tipo_tienda.nombre ASC, tienda.nombre ASC;";
        pool.query(sql, [id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendaEmpresaByEmpresaEstado(id_empresa, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id as 'id_tienda_empresa', id_tienda, tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', foto, departamento.departamento, provincia, municipio, zona, avenida, calle, numero, referencia, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', id_ruta, ruta.nombre as 'nombre_ruta', nit, razon_social FROM tienda_empresa, tienda, tipo_tienda, departamento, tienda_categoria, ruta WHERE tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda.id_departamento = departamento.id and tienda_categoria.id = tienda_empresa.id_tienda_categoria and tienda_empresa.id_ruta = ruta.id and tienda_empresa.id_empresa = ? and tienda.estado = ? ORDER BY tienda.nombre ASC;";
        pool.query(sql, [id_empresa, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function tiendaEmpresaByTiendaEmpresa(id_tienda, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT tienda_empresa.id, id_tienda, id_tienda_categoria, id_ruta FROM tienda_empresa WHERE id_tienda = ? and id_empresa = ?;";
        pool.query(sql, [id_tienda, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function usuarioTiendaByUsuario(usuario){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM tienda WHERE usuario = ?";
        pool.query(sql, [usuario], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarTiendaAreliShop,
    agregarTienda,
    agregarTiendaCategoria,
    agregarTiendaEmpresa,
    agregarTiendaVisita,
    agregarTiendaCategoriaRol,
    agregarLogin,
    salirLogin,
    actualizarTiendaById,
    actualizarTiendaEmpresaById,
    actualizarImagenById,
    actualizarTiendaCategoriaById,
    actualizarEstadoById,
    actualizarDatosContactoById,
    actualizarUbicacionById,
    actualizarNitRazonSocialById,
    actualizarPassByTienda,
    eliminarTiendaCategoriaRolById,
    tiendaById,
    tiendaEmpresaById,
    tiendaByUsuarioPass,
    tiendaLoginByTiendaPlataforma,
    listaTiendaEmpresaRutaByUsuarioEmpresa,
    listaTiendaEmpresaByEstadoCategoriaRutaEmpresa,
    listaTiendaEmpresaByEstadoEmpresa,
    listaTiendaEmpresaByEstadoCategoriaRuta,
    listaTipoTiendaByEstado,
    listaTiendaEstadoByEstadoTipo,
    listaTiendaCategoriaByEstado,
    listaCategoriaTiendaRolByRol,
    listaCategoriaTiendaRolNoRegistradoByRol,
    listaTiendaVisitaByCategoriaRutaEmpresaFecha,
    listaTiendaNoRutaByEmpresaEstado,
    listaTiendaNoRutaByEmpresaEstadoBuscar,
    listaTiendaEmpresaByEmpresaEstado,
    tiendaEmpresaByTiendaEmpresa,
    usuarioTiendaByUsuario
}