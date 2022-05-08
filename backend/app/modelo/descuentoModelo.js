const pool = require('../config/database');

// ------------> SELECT
function agregarDescuentoTicket(id, nombre, id_sucursal, id_tienda_categoria, fecha_inicio, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO descuento_ticket(id, nombre, id_sucursal, id_tienda_categoria, fecha_inicio, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, nombre, id_sucursal, id_tienda_categoria, fecha_inicio, fecha_limite, monto_inicio, monto_limite, porcentaje_descuento, estado, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarDescuentoCantidad(id, id_sucursal, id_producto_grupo, fecha_inicio, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO descuento_cantidad(id, id_sucursal, id_producto_grupo, fecha_inicio, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_sucursal, id_producto_grupo, fecha_inicio, fecha_limite, cantidad_inicio, cantidad_limite, precio, porcentaje_descuento, estado, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoDescuentoTicketById(estado, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE descuento_ticket SET estado = ? WHERE id = ? and id_empresa = ?;";
        pool.query(sql, [estado, id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoDescuentoCantidadById(estado, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE descuento_cantidad SET estado = ? WHERE id = ? and id_empresa = ?;";
        pool.query(sql, [estado, id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function descuentoTicketById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM descuento_ticket WHERE id = ?";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function descuentoCantidadById(id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM descuento_cantidad WHERE id = ?";
        pool.query(sql, [id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function descuentoTicketBySucursalCategoriaTiendaMonto(id_sucursal, id_tienda_categoria, monto, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT descuento_ticket.id, descuento_ticket.nombre, tienda_categoria.nombre as 'nombre_categoria', fecha_inicio, form-controlDATE_FORMAT(fecha_limite,'%d/%m/%Y') as 'fecha_limite', monto_inicio, monto_limite, porcentaje_descuento FROM descuento_ticket, tienda_categoria WHERE descuento_ticket.id_tienda_categoria = tienda_categoria.id and descuento_ticket.id_sucursal = ? and descuento_ticket.id_tienda_categoria = ? and (monto_inicio <= ? and monto_limite >= ?) and descuento_ticket.estado = ? and descuento_ticket.id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_tienda_categoria, monto, monto, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function descuentoCantidadBySucursalProductoCategoriaTiendaCantidad(id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT descuento_cantidad.id, tienda_categoria.nombre as 'nombre_categoria', fecha_inicio, DATE_FORMAT(fecha_limite,'%d/%m/%Y') as 'fecha_limite', cantidad_inicio, cantidad_limite, porcentaje_descuento FROM descuento_cantidad, tienda_categoria WHERE descuento_cantidad.id_tienda_categoria = tienda_categoria.id and descuento_cantidad.id_sucursal = ? and descuento_cantidad.id_producto_empresa = ? and descuento_cantidad.id_tienda_categoria = ? and (cantidad_inicio >= ? and cantidad_limite <= ?) and descuento_cantidad.estado = ? and descuento_cantidad.id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_producto_empresa, id_tienda_categoria, cantidad, cantidad, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDescuentoCantidadAleatorioByEstado(estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT descuento_cantidad.id_producto_grupo, producto_grupo.grupo, producto_grupo.descripcion, producto_grupo.imagen, cantidad_inicio, cantidad_limite, porcentaje_descuento, descuento_cantidad.id_empresa, descuento_cantidad.id_sucursal, sucursal.nombre as 'nombre_sucursal', empresa.nombre as 'nombre_empresa', producto_stock.id_almacen "
        + " FROM descuento_cantidad, producto_grupo, empresa, sucursal, producto, producto_stock, almacen"
        + " WHERE descuento_cantidad.id_producto_grupo = producto_grupo.id and descuento_cantidad.id_empresa = empresa.id and descuento_cantidad.id_sucursal = sucursal.id and producto_grupo.id = producto.id_producto_grupo and producto_stock.id_producto = producto.id and producto_stock.id_almacen = almacen.id and almacen.id_sucursal = sucursal.id and"
        + " descuento_cantidad.estado = ? and empresa.estado = ? and sucursal.arelishop = ? and producto_stock.estado = ? and producto_stock.stock > 0"
        + " GROUP BY descuento_cantidad.id, descuento_cantidad.id_producto_grupo, id_almacen"
        + " ORDER BY RAND() LIMIT 30;";
        pool.query(sql, [estado, estado, estado, estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDescuentoTicketBySucursal(id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id, descuento_ticket.nombre, tienda_categoria.nombre as 'nombre_categoria', fecha_inicio, DATE_FORMAT(fecha_limite,'%d/%m/%Y') as 'fecha_limite', monto_inicio, monto_limite, porcentaje_descuento, estado FROM descuento_ticket, tienda_categoria WHERE descuento_ticket.id_tienda_categoria = tienda_categoria.id and descuento_ticket.id_sucursal = ? and descuento_ticket.id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDescuentoCantidadBySucursalProductoCategoria(id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT descuento_cantidad.id, id_tienda_categoria, tienda_categoria.nombre as 'nombre_categoria', fecha_inicio, DATE_FORMAT(fecha_limite,'%d/%m/%Y') as 'fecha_limite', cantidad_inicio, cantidad_limite, porcentaje_descuento, descuento_cantidad.estado FROM descuento_cantidad, tienda_categoria WHERE descuento_cantidad.id_tienda_categoria = tienda_categoria.id and descuento_cantidad.id_sucursal = ? and id_producto_empresa = ? and descuento_cantidad.id_tienda_categoria = ? and descuento_cantidad.estado = ? and descuento_cantidad.id_empresa = ?;";
        pool.query(sql, [id_sucursal, id_producto_empresa, id_tienda_categoria, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaDescuentoCantidadBySucursalProductoGrupo(id_sucursal, id_producto_grupo, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT descuento_cantidad.id, fecha_inicio, DATE_FORMAT(fecha_limite,'%d/%m/%Y') as 'fecha_limite', cantidad_inicio, cantidad_limite, ROUND(precio+0.0000000001, 2) as 'precio', porcentaje_descuento, descuento_cantidad.estado, ROUND((porcentaje_descuento * 0.01) * ROUND(precio+0.0000000001, 2) + 0.0000000001, 2) as 'descuento',  ROUND(precio+0.0000000001, 2) - ROUND(ROUND(precio+0.0000000001, 2) * (porcentaje_descuento * 0.01) + 0.0000000001, 2) as 'precio_descuento' FROM descuento_cantidad WHERE descuento_cantidad.id_sucursal = ? and descuento_cantidad.id_producto_grupo = ? and descuento_cantidad.estado = ? and descuento_cantidad.id_empresa = ? ORDER BY cantidad_inicio ASC;";
        pool.query(sql, [id_sucursal, id_producto_grupo, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarDescuentoTicket,
    agregarDescuentoCantidad,
    actualizarEstadoDescuentoTicketById,
    actualizarEstadoDescuentoCantidadById,
    descuentoTicketById,
    descuentoCantidadById,
    descuentoTicketBySucursalCategoriaTiendaMonto,
    descuentoCantidadBySucursalProductoCategoriaTiendaCantidad,
    listaDescuentoCantidadAleatorioByEstado,
    listaDescuentoTicketBySucursal,
    listaDescuentoCantidadBySucursalProductoCategoria,
    listaDescuentoCantidadBySucursalProductoGrupo
}