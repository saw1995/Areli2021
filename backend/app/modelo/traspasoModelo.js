const pool = require('../config/database');

// ------------> SELECT
function agregarTraspaso(id, nro_traspaso, concepto, id_producto_stock_emisor, id_producto_stock_receptor, cantidad, estado, fecha, hora, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO traspaso(id, nro_traspaso, concepto, id_producto_stock_emisor, id_producto_stock_receptor, cantidad, estado, fecha, hora, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, nro_traspaso, concepto, id_producto_stock_emisor, id_producto_stock_receptor, cantidad, estado, fecha, hora, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTraspasoByFechaAlmacenesEstado(fecha_inicio, fecha_final, id_almacen_recepctor, id_almacen_emisor, id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT traspaso.id, nro_traspaso, id_producto_stock_emisor, categoria.nombre as 'nombre_categoria', producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, concepto, cantidad, suc.id as 'id_sucursal_rec', almacen.nombre as 'nombre_almacen', sucursal.nombre as 'nombre_sucursal', alm.nombre as 'nombre_almacen_rec', suc.nombre as 'nombre_sucursal_rec', DATE_FORMAT(traspaso.fecha,'%d/%m/%Y') as 'fecha', hora, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', (ROUND(producto_stock.precio_sugerido+0.0000000001, 2) * traspaso.cantidad) as 'subTotal' FROM traspaso, producto_stock, producto, producto_grupo, usuario, almacen, sucursal, categoria, producto_stock producto_stock_rec, almacen alm, sucursal suc WHERE traspaso.id_producto_stock_emisor = producto_stock.id and producto_stock.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and traspaso.id_usuario = usuario.id and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and traspaso.id_producto_stock_receptor = producto_stock_rec.id and producto_stock_rec.id_almacen = alm.id and alm.id_sucursal = suc.id and producto_grupo.id_categoria = categoria.id and fecha >= ? and fecha <= ? and producto_stock_rec.id_almacen IN ("+id_almacen_recepctor+") and producto_stock.id_almacen IN ("+id_almacen_emisor+") and traspaso.id_usuario IN ("+id_usuario+") and traspaso.estado = ? and traspaso.id_empresa = ? ORDER BY producto.nombre ASC;";
        pool.query(sql, [fecha_inicio, fecha_final, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ultimoTraspasoyEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_traspaso FROM traspaso WHERE id_empresa = ? ORDER BY nro_traspaso DESC LIMIT 1;";
        pool.query(sql, [ id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}


module.exports = {
    agregarTraspaso,
    ultimoTraspasoyEmpresa,
    listaTraspasoByFechaAlmacenesEstado
}