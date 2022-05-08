const pool = require('../config/database');

function agregarCompra(id, nro_compra, id_almacen, id_usuario, id_proveedor, fecha, hora, concepto, id_factura_compra, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO compra(id, nro_compra, id_almacen, id_usuario, id_proveedor, fecha, hora, concepto, id_factura_compra, estado, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, nro_compra, id_almacen, id_usuario, id_proveedor, fecha, hora, concepto, id_factura_compra, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarCompraDetalle(id, id_compra, id_producto_stock, cantidad, costo_adquisicion, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO compra_detalle(id, id_compra, id_producto_stock, cantidad, costo_adquisicion, estado, id_empresa) VALUES(?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_compra, id_producto_stock, cantidad, costo_adquisicion, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function compraById(id_compra, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT compra.id, id_almacen, almacen.nombre as 'nombre_almacen', almacen.id_sucursal, sucursal.nombre as 'nombre_sucursal', sucursal.foto as 'foto_sucursal', nro_compra, DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', hora, concepto, id_factura_compra, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.foto as 'foto_usuario' FROM compra, almacen, usuario, sucursal WHERE compra.id_almacen = almacen.id and compra.id_usuario = usuario.id and almacen.id_sucursal = sucursal.id and compra.id = ? and compra.estado = ? and compra.id_empresa = ?;";
        pool.query(sql, [id_compra, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ultimaCompraByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_compra FROM compra WHERE id_empresa = ? ORDER BY nro_compra DESC LIMIT 1;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCompraDetalleHistorialByProductoEmpresa(id_producto, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT compra.id, nro_compra, concepto, DATE_FORMAT(compra.fecha,'%d/%m/%Y') as 'fecha', compra.hora, cantidad, compra_detalle.costo_adquisicion, producto_stock.id_almacen, almacen.nombre as 'nombre_almacen', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', sucursal.nombre as 'nombre_sucursal' FROM compra_detalle, producto_stock, almacen, compra, usuario, sucursal WHERE compra.id = compra_detalle.id_compra and compra_detalle.id_producto_stock = producto_stock.id and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and compra.id_usuario = usuario.id and producto_stock.id_producto = ? and producto_stock.id_empresa = ? ORDER BY compra.fecha DESC;";
        pool.query(sql, [id_producto, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCompraDetalleByCompra(id_compra, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT compra_detalle.id, id_producto_stock, id_producto, codigo, producto.nombre, cantidad, compra_detalle.costo_adquisicion, (cantidad * ROUND(compra_detalle.costo_adquisicion + 0.0000000001, 2)) as 'subTotal' FROM compra_detalle, producto_stock, producto WHERE compra_detalle.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id  and id_compra = ? and compra_detalle.estado = ? and compra_detalle.id_empresa = ? ORDER BY producto.nombre ASC";
        pool.query(sql, [id_compra, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCompraByAlmacenFechaUsuario(id_almacen, estado, id_empresa, fecha_inicio, fecha_final, id_usuario){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT compra.id, id_almacen, almacen.nombre as 'nombre_almacen', nro_compra, DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', hora, concepto, id_factura_compra, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', SUM(ROUND(compra_detalle.costo_adquisicion+0.0000000001, 2) * compra_detalle.cantidad) as 'total' FROM compra, almacen, usuario, compra_detalle WHERE compra.id_almacen = almacen.id and compra.id_usuario = usuario.id and compra.id = compra_detalle.id_compra and id_almacen = ? and compra.estado = ? and compra.id_empresa = ? and compra.fecha >= ? and compra.fecha <= ? and compra.id_usuario IN ("+id_usuario+") GROUP BY compra.id ORDER BY nro_compra ASC, fecha ASC, hora ASC;";
        pool.query(sql, [id_almacen, estado, id_empresa, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaComprasByFechaToExcel(fecha_inicio, fecha_fin, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "select compra.id as 'id_compra', compra.nro_compra,compra.fecha,compra.hora,compra.concepto, "
        + "concat_ws(' ',usuario.nombre,usuario.appat,usuario.apmat) as 'usuario', proveedor.nombre as 'proveedor', "
        + "sum(compra_detalle.costo_adquisicion) as 'total', producto_empresa.codigo, producto.nombre, "
        + "compra_detalle.cantidad,compra_detalle.costo_adquisicion "
        + "from compra inner join compra_detalle on compra.id = compra_detalle.id_compra "
        + "inner join proveedor on proveedor.id = compra.id_proveedor "
        + "inner join usuario on compra.id_usuario = usuario.id "
        + "inner join producto_stock on producto_stock.id = compra_detalle.id_producto_stock "
        + "inner join producto_empresa on producto_empresa.id = producto_stock.id_producto_empresa "
        + "inner join producto on producto.id = producto_empresa.id_producto "
        + "where compra_detalle.estado = 1 and compra.estado=1 and "
        + "compra.fecha between ? and ? and compra.id_empresa=? "
        + "group by compra.id,compra.nro_compra,compra.fecha,compra.hora,compra.concepto,usuario, "
        + "producto_empresa.codigo,producto.nombre,compra_detalle.cantidad,compra_detalle.costo_adquisicion "
        + "order by compra.nro_compra asc;";
        pool.query(sql, [fecha_inicio, fecha_fin, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarCompra,
    agregarCompraDetalle,
    compraById,
    ultimaCompraByEmpresa,
    listaCompraDetalleHistorialByProductoEmpresa,
    listaCompraByAlmacenFechaUsuario,
    listaCompraDetalleByCompra,
    listaComprasByFechaToExcel
}