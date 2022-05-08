const pool = require('../config/database');

// ------------> INSERT
function agregarCategoria(id,nombre,descripcion,imagen,estado,id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO categoria(id, nombre, descripcion, imagen, estado, id_empresa) VALUES(?, ?, ?, ?, ?, ?)";
        pool.query(sql, [id,nombre,descripcion,imagen,estado,id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
// ------------> UPDATE
function actualizarImagenById(imagen,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE categoria SET imagen = ? WHERE id = ?";
        pool.query(sql, [imagen,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarCategoriaById(nombre, descripcion, id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE categoria SET nombre = ?, descripcion = ? WHERE id_empresa = ? and id = ?";
        pool.query(sql, [nombre, descripcion, id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdCategoria(estado,id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE categoria SET estado=? WHERE id_empresa=? AND id=?";
        pool.query(sql, [estado,id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> DELETE

// ------------> SELECT

function categoriaById(id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM categoria WHERE id_empresa = ? and id = ?;";
        pool.query(sql, [id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}


function listaCategoriaAleatorioProductoStockByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen, categoria.id_empresa, empresa.nombre as 'nombre_empresa', sucursal.id as 'id_sucursal', sucursal.nombre as 'nombre_sucursal', almacen.id as 'id_almacen'"
        + " FROM producto_stock, producto_grupo, categoria, empresa, almacen, sucursal"
        + " WHERE producto_grupo.id_categoria = categoria.id and categoria.id_empresa = empresa.id and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and"
        + " empresa.estado = ? and sucursal.arelishop = ? and producto_grupo.estado = ? and producto_stock.estado = ? and producto_stock.stock > 0"
        + " GROUP BY categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen, sucursal.id, almacen.id"
        + " ORDER BY RAND() LIMIT 40;";
        pool.query(sql, [estado, estado, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCategoriaProductoStockByAlmacenEmpresaEstado(id_empresa, id_almacen, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen FROM producto_stock, producto, producto_grupo, categoria WHERE producto_stock.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and producto_grupo.id_categoria = categoria.id and producto_stock.id_almacen = ? and producto_stock.id_empresa = ? and producto.estado = ? and producto_stock.estado = ? and producto_stock.stock > 0 GROUP BY categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen ORDER BY categoria.nombre ASC";
        pool.query(sql, [id_empresa, id_almacen, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCategoriaProductoStockCeroByAlmacenEmpresaEstado(id_empresa, id_almacen, estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen FROM producto_stock, producto, producto_grupo, categoria WHERE producto_stock.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and producto_grupo.id_categoria = categoria.id and producto_stock.id_almacen = ? and producto_stock.id_empresa = ? and producto.estado = ? and producto_stock.estado = ? GROUP BY categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen ORDER BY categoria.nombre ASC";
        pool.query(sql, [id_empresa, id_almacen, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCategoriaByIdEmpresaByEstado(id_empresa,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id,nombre,descripcion,imagen,estado,id_empresa FROM categoria WHERE id_empresa = ? AND estado = ? ORDER BY categoria.nombre ASC";
        pool.query(sql, [id_empresa,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCategoriaProductoEmpresaByEstadoEmpresa(estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT categoria.id, categoria.nombre, categoria.descripcion, categoria.imagen, categoria.estado, categoria.id_empresa FROM categoria, producto_empresa WHERE producto_empresa.id_categoria = categoria.id and producto_empresa.estado = ? and producto_empresa.id_empresa = ? GROUP BY categoria.id ORDER BY categoria.nombre ASC";
        pool.query(sql, [estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarCategoria,
    actualizarImagenById,
    actualizarCategoriaById,
    actualizarEstadoByIdCategoria,
    categoriaById,
    listaCategoriaAleatorioProductoStockByEstado,
    listaCategoriaProductoStockByAlmacenEmpresaEstado,
    listaCategoriaProductoStockCeroByAlmacenEmpresaEstado,
    listaCategoriaByIdEmpresaByEstado,
    listaCategoriaProductoEmpresaByEstadoEmpresa
}