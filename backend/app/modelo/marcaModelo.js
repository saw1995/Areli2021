const pool = require('../config/database');

// ------------> INSERT
function agregarMarca(id, nombre, descripcion, imagen, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO marca(id, nombre, descripcion, imagen, estado, id_empresa) VALUES(?, ?, ?, ?, ?, ?);";
        pool.query(sql, [id, nombre, descripcion, imagen, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function actualizarImagenById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE marca SET imagen = ? WHERE id = ?";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosById(nombre, descripcion, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE marca SET nombre = ?, descripcion = ? WHERE id = ?;";
        pool.query(sql, [nombre,descripcion,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdMarca(estado,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE marca SET estado = ? WHERE id = ?;";
        pool.query(sql, [estado,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> DELETE

// ------------> SELECT
function marcaById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion, imagen, estado FROM marca WHERE id = ?;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaMarcaByEstado(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, nombre, descripcion, imagen, estado FROM marca WHERE estado = ? and id_empresa = ?;";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarMarca,
    actualizarImagenById,
    actualizarDatosById,
    actualizarEstadoByIdMarca,
    marcaById,
    listaMarcaByEstado
}