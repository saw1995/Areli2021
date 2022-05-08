const pool = require('../config/database');

// ------------> SELECT
function agregarPromocion(id, id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, estado, id_empresa, id_usuario){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO promocion(id, id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, estado, id_empresa, id_usuario) "
            + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_sucursal, nombre, descripcion, precio, imagen, fecha_inicio, fecha_limite, cantidad_limite, estado, id_empresa, id_usuario], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarPromocionProductoEmpresa(id, id_promocion, id_producto, precio, cantidad, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO promocion_producto(id, id_promocion, id_producto, precio, cantidad, estado, id_empresa) VALUES(?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_promocion, id_producto, precio, cantidad, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE promocion SET imagen = ? WHERE id = ?;";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarPrecioPromocionById(precio, id_promocion){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE promocion SET precio = ? WHERE id = ?;";
        pool.query(sql, [precio, id_promocion], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPromocionBySucursalByEstado(id_sucursal, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT promocion.id as 'id_promocion', promocion.nombre, promocion.descripcion, promocion.precio, promocion.imagen, "
            + "DATE_FORMAT(promocion.fecha_inicio,'%d/%m/%Y') as 'fecha_inicio', DATE_FORMAT(promocion.fecha_limite,'%d/%m/%Y') as 'fecha_limite', promocion.cantidad_limite, "
            + "concat_ws(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario' "
            + "FROM promocion INNER JOIN usuario ON usuario.id = promocion.id_usuario "
            + "WHERE promocion.id_sucursal =? AND promocion.estado=? AND promocion.id_empresa=? "
            + "ORDER BY promocion.fecha_inicio DESC, promocion.fecha_limite DESC, promocion.nombre ASC; ";
        pool.query(sql, [id_sucursal, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function promocionById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT promocion.id, promocion.nombre, promocion.descripcion, promocion.precio, promocion.imagen, "
            + "DATE_FORMAT(promocion.fecha_inicio,'%d/%m/%Y') as 'fecha_inicio', DATE_FORMAT(promocion.fecha_limite,'%d/%m/%Y') as 'fecha_limite', promocion.cantidad_limite, "
            + "promocion.estado, promocion.id_empresa, promocion.id_usuario, "
            + "concat_ws(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario' "
            + "FROM promocion INNER JOIN usuario ON usuario.id = promocion.id_usuario "
            + "WHERE promocion.id =? LIMIT 1;";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPromocionDetalleProductoByIdPromocion(id_promocion, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT promocion_producto.id as 'id_promocion_producto', producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, "
            + "promocion_producto.precio, promocion_producto.cantidad "
            + "FROM promocion_producto INNER JOIN producto ON producto.id = promocion_producto.id_producto "
            + "WHERE promocion_producto.id_promocion=? AND promocion_producto.estado=? "
            + "ORDER BY producto.codigo ASC, producto.nombre ASC";
        pool.query(sql, [id_promocion, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarPromocion,
    agregarPromocionProductoEmpresa,
    actualizarImagenById,
    actualizarPrecioPromocionById,
    listaPromocionBySucursalByEstado,
    promocionById,
    listaPromocionDetalleProductoByIdPromocion
}