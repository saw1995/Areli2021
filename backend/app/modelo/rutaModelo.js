const pool = require('../config/database');

// ------------> INSERT
function agregarRuta(id, nombre, descripcion, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO ruta(id, nombre, descripcion, estado, id_empresa) VALUES(?, ?, ?, ?, ?);";
        pool.query(sql, [id, nombre, descripcion, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarRutaLimite(id, id_ruta, posicion, latitud, longitud, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO ruta_limite(id, id_ruta, posicion, latitud, longitud, id_empresa) VALUES(?, ?, ?, ?, ?, ?);";
        pool.query(sql, [id, id_ruta, posicion, latitud, longitud, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarRutaUsuario(id, id_ruta, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO ruta_usuario(id, id_ruta, id_usuario, id_empresa) VALUES (?,?,?,?);";
        pool.query(sql, [id, id_ruta, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarRutaEntrega(id, id_ruta, numero_dia, dia){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO ruta_entrega(id, id_ruta, numero_dia, dia) VALUES (?,?,?,?);";
        pool.query(sql, [id, id_ruta, numero_dia, dia], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarRutaById(nombre, descripcion, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE ruta SET nombre = ?, descripcion = ? WHERE id = ? and id_empresa = ?;";
        pool.query(sql, [nombre, descripcion, id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> DELETE
function eliminarRutaUsuarioById(id_ruta, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM ruta_usuario WHERE id_ruta = ? and id_usuario = ? and id_empresa = ?;";
        pool.query(sql, [id_ruta, id_usuario, id_empresa], function(error, resultado){
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

function eliminarRutaEntregaById(id){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM ruta_entrega WHERE id = ?;";
        pool.query(sql, [id], function(error, resultado){
            if(error) return reject(error);
            return resolved(resultado);
        })
    })
}

// ------------> SELECT
function listaRutaLimiteByEstadoEmpresa(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT ruta.id, ruta.nombre, ruta.descripcion, posicion, latitud, longitud FROM ruta, ruta_limite WHERE ruta.id = ruta_limite.id_ruta and ruta.estado = ? and ruta.id_empresa = ? ORDER BY ruta_limite.id_ruta ASC, ruta_limite.posicion ASC;";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaByEstadoEmpresa(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion FROM ruta WHERE estado = ? and id_empresa = ? ORDER BY nombre ASC;";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaLimiteByRuta(id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, posicion, latitud, longitud FROM ruta_limite WHERE id_ruta = ? and id_empresa = ? ORDER BY posicion ASC;";
        pool.query(sql, [id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaUsuarioByUsuario(estado, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT ruta_usuario.id, id_ruta, nombre, descripcion FROM ruta_usuario, ruta WHERE ruta_usuario.id_ruta = ruta.id and ruta.estado = ? and ruta_usuario.id_usuario = ? and ruta_usuario.id_empresa = ? ORDER BY ruta.nombre ASC;";
        pool.query(sql, [estado, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaUsuarioNoRegistradoByUsuario(estado, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id, usuario.nombre as 'nombre_usuario', appat, apmat, rol.nombre as 'nombre_rol' FROM usuario, rol WHERE usuario.id_rol = rol.id and usuario.estado = ? and usuario.id NOT IN (SELECT id_usuario FROM ruta_usuario WHERE id_ruta = ? and id_empresa = ?) and usuario.id_empresa = ?;";
        pool.query(sql, [estado, id_ruta, id_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaUsuarioByRuta(estado, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id, usuario.nombre as 'nombre_usuario', appat, apmat, rol.nombre as 'nombre_rol' FROM usuario, rol, ruta_usuario WHERE ruta_usuario.id_usuario = usuario.id and usuario.id_rol = rol.id and usuario.estado = ? and ruta_usuario.id_ruta = ? and ruta_usuario.id_empresa = ? ;";
        pool.query(sql, [estado, id_ruta, id_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCargaRutaByFechaUsuario(fecha, id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT carga.id as 'id_carga', nro_carga, id_pre_venta, observacion_inicio, nro_pre_venta, pre_venta.venta, id_tienda_empresa, id_tienda, tipo_tienda.nombre as 'tipo_tienda', tienda.nombre as 'nombre_tienda', tienda.latitud, tienda.longitud, tienda.foto, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario' FROM carga, pre_venta, tienda_empresa, tienda, tipo_tienda, usuario WHERE carga.id_pre_venta = pre_venta.id and pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tipo_tienda.id = tienda.id_tipo_tienda and pre_venta.id_usuario = usuario.id and carga.fecha_entrega = ? and carga.id_usuario = ? and carga.estado = ? and carga.id_empresa = ?;";
        pool.query(sql, [fecha, id_usuario, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaEntregaByRuta(id_ruta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, id_ruta, numero_dia, dia FROM ruta_entrega WHERE id_ruta = ? ORDER BY numero_dia ASC;";
        pool.query(sql, [id_ruta], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarRuta,
    agregarRutaLimite,
    agregarRutaUsuario,
    agregarRutaEntrega,
    eliminarRutaUsuarioById,
    eliminarRutaEntregaById,
    listaRutaLimiteByEstadoEmpresa,
    listaRutaLimiteByRuta,
    listaRutaByEstadoEmpresa,
    listaRutaUsuarioByUsuario,
    listaRutaUsuarioNoRegistradoByUsuario,
    listaCargaRutaByFechaUsuario,
    listaRutaEntregaByRuta,
    listaRutaUsuarioByRuta
}