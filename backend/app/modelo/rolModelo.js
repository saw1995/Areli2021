const pool = require('../config/database');

// ------------> INSERT
function agregarRol(id, nombre, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO rol(id, nombre, estado, id_empresa) VALUES(?, ?, ?, ?)";
        pool.query(sql, [id, nombre, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarRolModulo(id, id_rol, id_modulo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO rol_modulo(id, id_rol, id_modulo, estado, id_empresa) " 
                + "VALUES(?, ?, ?, ?, ?)";
        pool.query(sql, [id, id_rol, id_modulo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarDatosRol(nombre, estado, id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE rol SET nombre=?, estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [nombre, estado, id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> DELETE
function eliminarRolModulo(id_rol, id_modulo){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM rol_modulo WHERE id_rol = ? and id_modulo = ?";
        pool.query(sql, [id_rol, id_modulo], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}


// ------------> SELECT
function listaRolByIdEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, estado, id_empresa FROM rol WHERE id_empresa=? AND estado=1 ORDER BY nombre ASC;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
function listaModulo(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, detalle FROM modulo ORDER BY nombre ASC";
        pool.query(sql, function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaModuloRolNoRegistradoByRol(id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, detalle FROM modulo WHERE id NOT IN (SELECT id_modulo FROM rol_modulo WHERE id_rol = ? and id_empresa = ?) ORDER BY nombre ASC;";
        pool.query(sql, [id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaModuloRolByRol(id_rol, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT rol_modulo.id, id_rol, id_modulo, modulo.nombre, detalle FROM rol_modulo, modulo WHERE rol_modulo.id_modulo = modulo.id and id_rol = ? and id_empresa = ? ORDER BY nombre ASC;";
        pool.query(sql, [id_rol, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarRol,
    agregarRolModulo,
    actualizarDatosRol,
    eliminarRolModulo,
    listaRolByIdEmpresa,
    listaModulo,
    listaModuloRolNoRegistradoByRol,
    listaModuloRolByRol
}