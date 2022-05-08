const pool = require('../config/database');

// ------------> INSERT
function agregarVentaCarritoUsuario(id, id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora, id_promocion){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta_carrito_usuario(id, id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora, id_promocion) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_usuario, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora, id_promocion], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarVentaCarritoTienda(id, id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta_carrito_tienda(id, id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora) VALUES(?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_tienda, id_sucursal, id_producto, cantidad, precio, id_descuento_cantidad, id_empresa, fecha, hora], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarVentaFactura(id, fecha, total, nro_factura, nit, razon_social, codigo_control, importe_base_credito_fiscal, importe_ice_ie_hd_tasas, importe_no_gravadas_o_gravadas_tasa_cero, importe_sujeto_credito_fiscal, bonificacion_rebaja_obtenida, importe_no_sujeto_debito, sub_total, descuento, importe_base_para_debito, debito_fiscal, estado_factura, id_configuracion_factura, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta_factura(id, fecha, total, nro_factura, nit, razon_social, codigo_control, importe_base_credito_fiscal, importe_ice_ie_hd_tasas, importe_no_gravadas_o_gravadas_tasa_cero, importe_sujeto_credito_fiscal, bonificacion_rebaja_obtenida, importe_no_sujeto_debito, sub_total, descuento, importe_base_para_debito, debito_fiscal, estado_factura, id_configuracion_factura, estado, id_empresa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, fecha, total, nro_factura, nit, razon_social, codigo_control, importe_base_credito_fiscal, importe_ice_ie_hd_tasas, importe_no_gravadas_o_gravadas_tasa_cero, importe_sujeto_credito_fiscal, bonificacion_rebaja_obtenida, importe_no_sujeto_debito, sub_total, descuento, importe_base_para_debito, debito_fiscal, estado_factura, id_configuracion_factura, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarVenta(id, nro_venta, id_sucursal, razon_social, nit, observacion, fecha, hora, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta_factura, estado, id_tienda_empresa, id_pre_venta, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta(id, nro_venta, id_sucursal, razon_social, nit, observacion, fecha, hora, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta_factura, estado, id_tienda_empresa, id_pre_venta, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, nro_venta, id_sucursal, razon_social, nit, observacion, fecha, hora, credito, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta_factura, estado, id_tienda_empresa, id_pre_venta, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarVentaCreditoDetallePago(id, id_venta, monto, fecha, pago, estado, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta_credito(id, id_venta, monto, fecha, pago, estado, id_usuario, id_empresa) "
            + "VALUES(?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_venta, monto, fecha, pago, estado, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarPreVenta(id, nro_pre_venta, id_tienda_empresa, razon_social, nit, id_sucursal, fecha, hora, fecha_entrega, observacion_inicio, observacion_fin, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO pre_venta(id, nro_pre_venta, id_tienda_empresa, razon_social, nit, id_sucursal, fecha, hora, fecha_entrega, observacion_inicio, observacion_fin, venta_inicio, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, nro_pre_venta, id_tienda_empresa, razon_social, nit, id_sucursal, fecha, hora, fecha_entrega, observacion_inicio, observacion_fin, venta, venta, factura, id_descuento_ticket, descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos, id_venta, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarVentaDetalle(id, id_venta, id_producto_stock, cantidad, precio, id_descuento_cantidad, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO venta_detalle(id, id_venta, id_producto_stock, cantidad, precio, id_descuento_cantidad, estado, id_empresa) VALUES(?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_venta, id_producto_stock, cantidad, precio, id_descuento_cantidad, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function anularVentaById(estado, id_venta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE venta SET estado = ? WHERE id = ? and id_empresa = ?;";
        pool.query(sql, [estado, id_venta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarPreVentaDetalle(id, id_pre_venta, id_producto, cantidad, precio, id_descuento_cantidad, estado, id_empresa, estado_pago){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO pre_venta_detalle(id, id_pre_venta, id_producto, cantidad, precio, id_descuento_cantidad, estado, id_empresa, estado_pago) VALUES(?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_pre_venta, id_producto, cantidad, precio, id_descuento_cantidad, estado, id_empresa, estado_pago], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarCarritoCantidadById(cantidad, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE venta_carrito_usuario SET cantidad = ? WHERE id = ?;";
        pool.query(sql, [cantidad, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarCarritoCantidadTiendaById(cantidad, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE venta_carrito_tienda SET cantidad = ? WHERE id = ?;";
        pool.query(sql, [cantidad, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarVentaById(venta, observacion, id_venta, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE pre_venta SET venta = ?, observacion_fin = ?, id_venta = ? WHERE id = ?;";
        pool.query(sql, [venta, observacion, id_venta, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoPreVentaDetalleById(estado, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE pre_venta_detalle SET estado = ? WHERE id = ?;";
        pool.query(sql, [estado, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarIdVentaById(id_venta, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE pre_venta SET id_venta = ? WHERE id = ?;";
        pool.query(sql, [id_venta, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function eliminarProductoCarritoById(id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM venta_carrito_usuario WHERE id = ? and id_empresa = ?";
        pool.query(sql, [id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function eliminarProductoCarritoTiendaById(id, id_tienda){
    return new Promise((resolved, reject) =>{
        var sql = "DELETE FROM venta_carrito_tienda WHERE id = ? and id_tienda = ?;";
        pool.query(sql, [id, id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function productoEmpresaCarritoByUsuarioSucursalProducto(id_usuario, id_sucursal, id_producto, id_empresa, id_promocion){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM venta_carrito_usuario WHERE id_usuario = ? and id_sucursal = ? and id_producto = ? and id_empresa = ? and id_promocion=?;";
        pool.query(sql, [id_usuario, id_sucursal, id_producto, id_empresa, id_promocion], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function productoEmpresaCarritoByTiendaSucursalProducto(id_tienda, id_sucursal, id_producto, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM venta_carrito_tienda WHERE id_tienda = ? and id_sucursal = ? and id_producto = ? and id_empresa = ?;";
        pool.query(sql, [id_tienda, id_sucursal, id_producto, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCarritoByTienda(id_tienda){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta_carrito_tienda.id, venta_carrito_tienda.id_producto, cantidad, ROUND(precio+0.0000000001, 2) as 'precio', producto.nombre, producto.id as 'id_producto', producto.codigo, producto.descripcion, id_descuento_cantidad, descuento_cantidad.porcentaje_descuento, venta_carrito_tienda.id_empresa, venta_carrito_tienda.id_sucursal, empresa.nombre as 'nombre_empresa', sucursal.nombre as 'nombre_sucursal', ROUND(venta_carrito_tienda.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_carrito_tienda.precio)+0.0000000001, 2) as 'precio_descuento', (ROUND(venta_carrito_tienda.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_carrito_tienda.precio)+0.0000000001, 2) * venta_carrito_tienda.cantidad) as 'subtotal' FROM venta_carrito_tienda, producto, descuento_cantidad, empresa, sucursal WHERE venta_carrito_tienda.id_producto = producto.id and venta_carrito_tienda.id_descuento_cantidad = descuento_cantidad.id and venta_carrito_tienda.id_empresa = empresa.id and venta_carrito_tienda.id_sucursal = sucursal.id and venta_carrito_tienda.id_tienda = ? ORDER BY venta_carrito_tienda.id_empresa ASC, venta_carrito_tienda.id_sucursal ASC, producto.nombre ASC;";
        pool.query(sql, [id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCarritoByTiendaSucursal(id_tienda, id_sucursal){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta_carrito_tienda.id, venta_carrito_tienda.id_producto, cantidad, ROUND(venta_carrito_tienda.precio+0.0000000001, 2) as 'precio', producto.nombre, producto.id as 'id_producto', producto.codigo, producto.descripcion, id_descuento_cantidad, descuento_cantidad.porcentaje_descuento, venta_carrito_tienda.id_empresa, venta_carrito_tienda.id_sucursal, empresa.nombre as 'nombre_empresa', sucursal.nombre as 'nombre_sucursal' FROM venta_carrito_tienda, producto, descuento_cantidad, empresa, sucursal WHERE venta_carrito_tienda.id_producto = producto.id and venta_carrito_tienda.id_descuento_cantidad = descuento_cantidad.id and venta_carrito_tienda.id_empresa = empresa.id and venta_carrito_tienda.id_sucursal = sucursal.id and venta_carrito_tienda.id_tienda = ? and venta_carrito_tienda.id_sucursal = ? ORDER BY venta_carrito_tienda.id_empresa ASC, venta_carrito_tienda.id_sucursal ASC, producto.nombre ASC;";
        pool.query(sql, [id_tienda, id_sucursal], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaCarritoByUsuarioSucursal(id_usuario, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta_carrito_usuario.id, venta_carrito_usuario.id_producto, cantidad, "
            + "ROUND(venta_carrito_usuario.precio+0.0000000001, 2) as 'precio', producto.nombre, producto.id as 'id_producto', producto.codigo, producto.descripcion, "
            + "producto.imagen, id_descuento_cantidad, descuento_cantidad.porcentaje_descuento, promocion.nombre as 'nombre_promocion', promocion.id as 'id_promocion' "
            + "FROM venta_carrito_usuario, producto, descuento_cantidad, promocion "
            + "WHERE venta_carrito_usuario.id_promocion=promocion.id AND venta_carrito_usuario.id_producto = producto.id and venta_carrito_usuario.id_descuento_cantidad = descuento_cantidad.id and venta_carrito_usuario.id_usuario = ? "
            + "and venta_carrito_usuario.id_sucursal = ? and venta_carrito_usuario.id_empresa = ? "
            + "ORDER BY venta_carrito_usuario.id_promocion ASC, producto.nombre ASC;";
        pool.query(sql, [id_usuario, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function preVentaById(id_pre_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id, pre_venta.id_sucursal, nro_pre_venta, DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', hora, tienda_categoria.nombre as 'categoria', pre_venta.id_tienda_empresa, tipo_tienda.nombre as 'tipo', tienda.id as 'id_tienda', tienda.nombre as 'nombre_tienda', tienda.zona, tienda.avenida, tienda.calle, tienda.numero, tienda.referencia, tienda.telefono, tienda.nombre_contacto, tienda.celular_contacto, tienda.latitud, tienda.longitud, tienda.foto as 'foto_tienda', pre_venta.razon_social, pre_venta.nit, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', observacion_inicio, observacion_fin, venta_inicio, venta, factura, id_descuento_ticket, porcentaje_descuento, id_venta, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.celular as 'celular_usuario', usuario.foto as 'foto_usuario', descuento_uno, detalle_descuento_uno, descuento_dos, detalle_descuento_dos"+
        " FROM pre_venta, tienda_empresa, tienda, tipo_tienda, tienda_categoria, descuento_ticket, usuario"+
        " WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta.id_usuario = usuario.id and pre_venta.id = ?;";
        pool.query(sql, [id_pre_venta], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ventaById(id_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta.id, venta.id_sucursal, id_venta_factura, nro_venta, DATE_FORMAT(venta.fecha,'%d/%m/%Y') as 'fecha', venta.hora, observacion, tienda_categoria.nombre as 'categoria', venta.id_tienda_empresa, tipo_tienda.nombre as 'tipo', tienda.id as 'id_tienda', tienda.nombre as 'nombre_tienda', tienda.zona, tienda.avenida, tienda.calle, tienda.numero, tienda.referencia, tienda.telefono, tienda.nombre_contacto, tienda.celular_contacto, tienda.latitud, tienda.longitud, tienda.foto as 'foto_tienda', venta.razon_social, venta.nit, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', observacion_inicio, observacion_fin, venta_inicio, venta, factura, id_pre_venta, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', usuario.celular as 'celular_usuario', usuario.foto as 'foto_usuario', venta.descuento_uno, venta.detalle_descuento_uno, venta.descuento_dos, venta.detalle_descuento_dos"+
        " FROM venta, tienda_empresa, tienda, tipo_tienda, tienda_categoria, descuento_ticket, usuario, pre_venta"+
        " WHERE venta.id_pre_venta = pre_venta.id and venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and venta.id_descuento_ticket = descuento_ticket.id and venta.id_usuario = usuario.id and venta.id = ?;";
        pool.query(sql, [id_venta], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function preVentaDetalleById(id_pre_venta_detalle){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM pre_venta_detalle WHERE id = ?;";
        pool.query(sql, [id_pre_venta_detalle], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta,  DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', pre_venta.hora, DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', observacion_inicio, observacion_fin, factura, ROUND(SUM((ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', tienda.nombre as 'nombre_tienda', tienda.nombre_contacto, venta_inicio, venta, id_venta"+
        " FROM pre_venta, pre_venta_detalle, descuento_cantidad, usuario, tienda_empresa, tienda"+
        " WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_usuario = usuario.id and pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and pre_venta.id_sucursal = ? and pre_venta.id_empresa = ? and pre_venta.fecha_entrega >= ? and pre_venta.fecha_entrega <= ? and pre_venta.id_usuario IN ("+id_usuario+") and pre_venta.venta_inicio IN ("+venta+") and pre_venta.venta IN ("+estado_venta+") GROUP BY pre_venta.id ORDER BY nro_pre_venta DESC;";
        pool.query(sql, [id_sucursal, id_empresa, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, "
        + "categoria.nombre as 'nombre_categoria', SUM(pre_venta_detalle.cantidad) as 'cantidad', pre_venta_detalle.precio, "
        + "ROUND(pre_venta_detalle.precio * SUM(pre_venta_detalle.cantidad)) as 'subtotal', "
        + "ROUND(SUM((ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total' "
        + "FROM pre_venta, pre_venta_detalle, descuento_cantidad, producto, producto_grupo, categoria "
        + "WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id "
        + "and pre_venta_detalle.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id "
        + "and producto_grupo.id_categoria = categoria.id and pre_venta.id_sucursal = ? and pre_venta.id_empresa = ? "
        + "and pre_venta.fecha_entrega >= ? and pre_venta.fecha_entrega <= ? and pre_venta.id_usuario IN ("+id_usuario+") "
        + "and pre_venta.venta_inicio IN ("+venta+") and pre_venta.venta IN ("+estado_venta+") "
        + "GROUP BY producto.id, pre_venta_detalle.precio ORDER BY categoria.nombre ASC, producto.nombre DESC;";
        pool.query(sql, [id_sucursal, id_empresa, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta, credito){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta.id as 'id_venta', nro_venta, venta.razon_social, venta.nit, venta.observacion, "
        + "DATE_FORMAT(venta.fecha,'%d/%m/%Y') as 'fecha', venta.hora, "
        + "ROUND(SUM((ROUND(venta_detalle.precio+0.0000000001,2) - (ROUND(venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total', "
        + "CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', id_pre_venta, nro_pre_venta, "
        + "CONCAT(usuario_pre.nombre, ' ', usuario_pre.appat, ' ', usuario_pre.apmat) as 'usuario_pre_venta', factura, venta_inicio, "
        + "tienda.nombre as 'tienda_nombre', tienda.nombre_contacto " 
        + "FROM venta, venta_detalle, descuento_cantidad, usuario, pre_venta, usuario usuario_pre, tienda_empresa, tienda  "
        + "WHERE venta.id = venta_detalle.id_venta and venta_detalle.id_descuento_cantidad = descuento_cantidad.id  "
        + "and venta.id_usuario = usuario.id and venta.id_pre_venta = pre_venta.id and pre_venta.id_usuario = usuario_pre.id "
        + "and venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and venta.id_sucursal = ? "
        + "and venta.id_empresa = ? and venta.estado = ? and venta.fecha >= ? and venta.fecha <= ?  AND venta.credito IN ("+ credito +") "
        + "and pre_venta.venta_inicio IN ("+tipo_venta+") and venta.id_usuario IN ("+id_usuario+") and pre_venta.id_usuario IN ("+id_usuario_pre_venta+")  " 
        + "GROUP BY venta.id ORDER BY nro_venta DESC;";
        pool.query(sql, [id_sucursal, id_empresa, estado, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaProductoAgrupadoBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto_stock.id_producto, producto.codigo, producto.nombre, producto.descripcion, producto.imagen, categoria.nombre as 'nombre_categoria', "
        + "ROUND(venta_detalle.precio * SUM(venta_detalle.cantidad)) as 'subtotal', venta_detalle.precio, SUM(venta_detalle.cantidad) as 'cantidad', "
        + "ROUND(SUM((ROUND(venta_detalle.precio+0.0000000001,2) - (ROUND(venta_detalle.precio+0.0000000001,2) * (porcentaje_descuento*0.01))) * cantidad)+0.0000000001, 2) as 'total' "
        + "FROM venta, venta_detalle, descuento_cantidad, pre_venta, producto_stock, producto, producto_grupo, categoria "
        + "WHERE venta.id = venta_detalle.id_venta and venta_detalle.id_descuento_cantidad = descuento_cantidad.id "
        + "and venta.id_pre_venta = pre_venta.id and venta_detalle.id_producto_stock = producto_stock.id "
        + "and producto_stock.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id "
        + "and producto_grupo.id_categoria = categoria.id and venta.id_sucursal = ? and venta.id_empresa = ? "
        + "and venta.estado = ? and venta.fecha >= ? and venta.fecha <= ? and pre_venta.venta_inicio IN ("+tipo_venta+") "
        + "and venta.id_usuario IN ("+id_usuario+") and pre_venta.id_usuario IN ("+id_usuario_pre_venta+") "
        + "GROUP BY producto.id, venta_detalle.precio ORDER BY categoria.nombre ASC, producto.nombre DESC;";
        pool.query(sql, [id_sucursal, id_empresa, estado, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaByFechaEntregaTiendaEmpresa(fecha_entrega, id_tienda_empresa, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta,  DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', hora,  DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', factura, observacion_inicio, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', ROUND(SUM(cantidad * (ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (descuento_cantidad.porcentaje_descuento * 0.01))))+0.0000000001,2) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and fecha_entrega = ? and pre_venta.id_tienda_empresa = ? and pre_venta.id_empresa = ? GROUP BY pre_venta.id ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [fecha_entrega, id_tienda_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaProductoEmpresaByVentaAlmacen(id_producto, venta, id_almacen, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta_detalle.id_producto, SUM(cantidad) as 'cantidad' FROM pre_venta, pre_venta_detalle, sucursal, almacen WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta.id_sucursal = sucursal.id and almacen.id_sucursal = sucursal.id and pre_venta_detalle.id_producto = ? and pre_venta.venta = ? and almacen.id = ? and pre_venta.id_empresa = ? GROUP BY pre_venta_detalle.id_producto;";
        pool.query(sql, [id_producto, venta, id_almacen, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

/*function listaPreVentaByFechaEntregaTiendaEmpresa(fecha_entrega, id_tienda_empresa, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta, fecha, hora, fecha_entrega, factura, observacion_inicio, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', SUM(cantidad * (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01)))) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and fecha_entrega = ? and pre_venta.id_tienda_empresa = ? and pre_venta.id_empresa = ? GROUP BY pre_venta.id ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [fecha_entrega, id_tienda_empresa, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}*/

function listaPreVentaByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta,  DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', hora,  DATE_FORMAT(fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', factura, observacion_inicio, pre_venta.id_tienda_empresa, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', tienda.latitud, tienda.longitud, CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', ROUND(SUM(pre_venta_detalle.cantidad * (ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (descuento_cantidad.porcentaje_descuento * 0.01))))+0.0000000001,2) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and venta = ? and fecha_entrega = ? and pre_venta.id_sucursal = ? and pre_venta.id_usuario IN ("+id_usuario+") and pre_venta.id_empresa = ? GROUP BY pre_venta.id ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [venta, fecha_entrega, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT producto.id as 'id_producto', categoria.nombre as 'nombre_categoria', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, SUM(pre_venta_detalle.cantidad) as 'cantidad', ROUND(SUM(pre_venta_detalle.cantidad * (ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (descuento_cantidad.porcentaje_descuento * 0.01))))+0.0000000001,2) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, producto, producto_grupo, categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta_detalle.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and producto_grupo.id_categoria = categoria.id and venta = ? and fecha_entrega = ? and pre_venta.id_sucursal = ? and pre_venta.id_usuario IN ("+id_usuario+") and pre_venta.id_empresa = ? GROUP BY producto.id ORDER BY categoria.nombre ASC, producto.nombre ASC;";
        pool.query(sql, [venta, fecha_entrega, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto(venta, fecha_entrega, id_sucursal, id_usuario, id_empresa, id_producto){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta',  pre_venta_detalle.id_producto, nro_pre_venta,  DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', hora, DATE_FORMAT(fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', factura, observacion_inicio, pre_venta.id_tienda_empresa, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', tienda.latitud, tienda.longitud, tienda.foto as 'foto_tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', pre_venta_detalle.cantidad, ROUND((ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (descuento_cantidad.porcentaje_descuento * 0.01)))+0.0000000001,2) as 'precio', ROUND(pre_venta_detalle.cantidad * (ROUND(pre_venta_detalle.precio+0.0000000001,2) - (ROUND(pre_venta_detalle.precio+0.0000000001,2) * (descuento_cantidad.porcentaje_descuento * 0.01)))+0.0000000001,2) as 'subtotal'  "
        + " FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria "
        + " WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and"
        + " venta = ? and fecha_entrega = ? and pre_venta.id_sucursal = ? and pre_venta.id_usuario IN ("+id_usuario+") and pre_venta.id_empresa = ? and pre_venta_detalle.id_producto = ?"
        + " ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [venta, fecha_entrega, id_sucursal, id_empresa, id_producto], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaByFechaUsuarioVenta(fecha, id_usuario, venta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta, fecha, hora, fecha_entrega, factura, observacion_inicio, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', SUM(cantidad * (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01)))) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and fecha = ? and pre_venta.id_usuario = ? and pre_venta.venta = ? and pre_venta.id_empresa = ? GROUP BY pre_venta.id ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [fecha, id_usuario, venta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaByFechaRutaCategoriaVenta(fecha, id_ruta, id_tienda_categoria, venta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id as 'id_pre_venta', nro_pre_venta, fecha, hora, fecha_entrega, factura, observacion_inicio, tienda_categoria.nombre as 'nombre_categoria', tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', SUM(cantidad * (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01)))) as 'total' FROM pre_venta, usuario, pre_venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, tienda_categoria WHERE pre_venta.id_usuario = usuario.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = pre_venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and tienda_empresa.id_tienda_categoria = tienda_categoria.id and fecha = ? and tienda_empresa.id_ruta = ? and tienda_empresa.id_tienda_categoria = ? and pre_venta.venta IN (" + venta + ") and pre_venta.id_empresa = ? GROUP BY pre_venta.id ORDER BY usuario.nombre ASC, hora ASC;";
        pool.query(sql, [fecha, id_ruta, id_tienda_categoria, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ultimaVentaBySucursal(id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_venta FROM venta WHERE id_sucursal = ? and id_empresa = ? ORDER BY nro_venta DESC LIMIT 1;";
        pool.query(sql, [id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function ultimaPreVentaBySucursal(id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_pre_venta FROM pre_venta WHERE id_sucursal = ? and id_empresa = ? ORDER BY nro_pre_venta DESC LIMIT 1;";
        pool.query(sql, [id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaDetalleByNroVenta(nro_min, nro_max, venta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.nro_pre_venta, tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', DATE_FORMAT(fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', pre_venta_detalle.id, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, cantidad, precio, id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento' FROM pre_venta, tienda_empresa, tienda, tipo_tienda, pre_venta_detalle, producto, descuento_cantidad, descuento_ticket, carga WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta.id = carga.id_pre_venta and pre_venta_detalle.estado = '1' and carga.id_usuario = ? and pre_venta.venta = ? and pre_venta.id_empresa = ? ORDER BY nro_pre_venta ASC;";
        pool.query(sql, [nro_min, nro_max, venta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaDetalleByUsuario(id_usuario, venta, id_empresa, fecha_entrega){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.nro_pre_venta, tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', pre_venta_detalle.id, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, cantidad, precio, id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', usuario.nombre as 'usuario_nombre', usuario.appat as 'usuario_appat', usuario.apmat as 'usuario_apmat' FROM pre_venta, tienda_empresa, tienda, tipo_tienda, pre_venta_detalle, producto, descuento_cantidad, descuento_ticket, carga, usuario WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta.id = carga.id_pre_venta and carga.id_usuario = usuario.id and pre_venta_detalle.estado = '1' and carga.id_usuario = ? and pre_venta.venta = ? and pre_venta.id_empresa = ? and pre_venta.fecha_entrega = ? ORDER BY nro_pre_venta ASC;";
        pool.query(sql, [id_usuario, venta, id_empresa, fecha_entrega], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaDetalleByEstadoPreVenta(id_pre_venta, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta_detalle.id, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, cantidad, ROUND(pre_venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', (ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento'"+
        " FROM pre_venta, pre_venta_detalle, producto, descuento_cantidad, descuento_ticket"+
        " WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta_detalle.estado = '1' and pre_venta_detalle.id_pre_venta = ?;";
        pool.query(sql, [id_pre_venta, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaDetalleByNroPreVentaSucursal(nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_pre_venta, DATE_FORMAT(fecha_entrega,'%d/%m/%Y') as 'fecha', pre_venta_detalle.id, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, cantidad, ROUND(pre_venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', ROUND(((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) as 'descuento_unit', (ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', (ROUND(pre_venta_detalle.precio+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total', tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', tienda.nombre_contacto"+
        " FROM pre_venta, pre_venta_detalle, producto, descuento_cantidad, descuento_ticket, tienda, tienda_empresa, tipo_tienda"+
        " WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and pre_venta_detalle.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta_detalle.estado = '1' and pre_venta.nro_pre_venta >= ? and pre_venta.nro_pre_venta <= ? and pre_venta.id_sucursal = ? and pre_venta.id_empresa = ? ORDER BY pre_venta.nro_pre_venta ASC;";
        pool.query(sql, [nro_pre_venta_inicio, nro_pre_venta_final, id_sucursal, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaDetalleBySucursalFechaVentaEstado(id_sucursal, id_empresa, fecha_inicio, fecha_final, id_usuario, venta, estado_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_pre_venta, DATE_FORMAT(fecha_entrega,'%d/%m/%Y') as 'fecha', pre_venta_detalle.id, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, cantidad, ROUND(pre_venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', ROUND(((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) as 'descuento_unit', (ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', (ROUND(pre_venta_detalle.precio+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total', tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', tienda.nombre_contacto"+
        " FROM pre_venta, pre_venta_detalle, producto, descuento_cantidad, descuento_ticket, tienda, tienda_empresa, tipo_tienda"+
        " WHERE pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and pre_venta_detalle.id_producto = producto.id and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_descuento_ticket = descuento_ticket.id and pre_venta_detalle.estado = '1' and pre_venta.id_sucursal = ? and pre_venta.id_empresa = ? and pre_venta.fecha_entrega >= ? and pre_venta.fecha_entrega <= ? and pre_venta.id_usuario IN ("+id_usuario+") and pre_venta.venta_inicio IN ("+venta+") and pre_venta.venta IN ("+estado_venta+") ORDER BY nro_pre_venta ASC;";
        pool.query(sql, [id_sucursal, id_empresa, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaDetalleByEstadoVenta(id_venta, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT venta_detalle.id, venta_detalle.id_producto_stock, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, cantidad, ROUND(venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', (ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) * venta_detalle.cantidad) as 'total_descuento', (ROUND(venta_detalle.precio+0.0000000001, 2) * venta_detalle.cantidad) as 'total', producto_stock.cantidad_minima as 'minima'"+
        " FROM venta, venta_detalle, producto_stock, producto, descuento_cantidad, descuento_ticket" +
        " WHERE venta.id = venta_detalle.id_venta and venta_detalle.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id and venta_detalle.id_descuento_cantidad = descuento_cantidad.id and venta.id_descuento_ticket = descuento_ticket.id and venta_detalle.estado = '1' and venta_detalle.id_venta = ? ORDER BY producto.nombre ASC;";
        pool.query(sql, [id_venta, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaDetalleByNroVentaSucursal(nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_venta, DATE_FORMAT(fecha,'%d/%m/%Y') as 'fecha', venta_detalle.id, venta_detalle.id_producto_stock, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, cantidad, ROUND(venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', ROUND(((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) as 'descuento_unit', (ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) * venta_detalle.cantidad) as 'total_descuento', (ROUND(venta_detalle.precio+0.0000000001, 2) * venta_detalle.cantidad) as 'total', producto_stock.cantidad_minima as 'minima', tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', tienda.nombre_contacto"+
        " FROM venta, venta_detalle, producto_stock, producto, descuento_cantidad, descuento_ticket, tienda_empresa, tienda, tipo_tienda" +
        " WHERE venta.id = venta_detalle.id_venta and venta_detalle.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id and venta_detalle.id_descuento_cantidad = descuento_cantidad.id and venta.id_descuento_ticket = descuento_ticket.id and venta_detalle.estado = '1' and venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tipo_tienda.id = tienda.id_tipo_tienda and venta.nro_venta >= ? and venta.nro_venta <= ? and venta.id_sucursal = ? and venta.estado = ? and venta.id_empresa = ? ORDER BY venta.nro_venta ASC;";
        pool.query(sql, [nro_venta_inicio, nro_venta_final, id_sucursal, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaDetalleBySucursalFechaUsuario(id_sucursal, id_empresa, estado, fecha_inicio, fecha_final, tipo_venta, id_usuario, id_usuario_pre_venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_venta, DATE_FORMAT(venta.fecha,'%d/%m/%Y') as 'fecha', venta_detalle.id, venta_detalle.id_producto_stock, producto.id as 'id_producto', producto.codigo, producto.nombre, producto.descripcion, producto.imagen, cantidad, ROUND(venta_detalle.precio+0.0000000001, 2) as 'precio', id_descuento_cantidad, descuento_cantidad.porcentaje_descuento as 'porcentaje_cantidad', venta.id_descuento_ticket, descuento_ticket.porcentaje_descuento as 'porcentaje_ticket', (descuento_ticket.porcentaje_descuento + descuento_cantidad.porcentaje_descuento)as 'porcentaje_descuento', ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) as 'precio_descuento', ROUND(((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) as 'descuento_unit', (ROUND(venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * venta_detalle.precio)+0.0000000001, 2) * venta_detalle.cantidad) as 'total_descuento', (ROUND(venta_detalle.precio+0.0000000001, 2) * venta_detalle.cantidad) as 'total', producto_stock.cantidad_minima as 'minima', tipo_tienda.nombre as 'tipo', tienda.nombre as 'nombre_tienda', tienda.nombre_contacto"+
        " FROM venta, venta_detalle, producto_stock, producto, descuento_cantidad, descuento_ticket, tienda_empresa, tienda, tipo_tienda, pre_venta" +
        " WHERE venta.id_pre_venta = pre_venta.id and venta.id = venta_detalle.id_venta and venta_detalle.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id and venta_detalle.id_descuento_cantidad = descuento_cantidad.id and venta.id_descuento_ticket = descuento_ticket.id and venta_detalle.estado = '1' and venta.id_tienda_empresa = tienda_empresa.id and tienda_empresa.id_tienda = tienda.id and tipo_tienda.id = tienda.id_tipo_tienda and venta.id_sucursal = ? and venta.id_empresa = ? and venta.estado = ? and venta.fecha >= ? and venta.fecha <= ? and pre_venta.venta_inicio IN ("+tipo_venta+") and venta.id_usuario IN ("+id_usuario+") and pre_venta.id_usuario IN ("+id_usuario_pre_venta+") ORDER BY venta.nro_venta ASC;";
        pool.query(sql, [id_sucursal, id_empresa, estado, fecha_inicio, fecha_final], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaVentaDetalleByFechaSucursalUsuarioEstado(fecha, id_sucursal, id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT nro_venta, tipo_tienda.nombre as 'tipo', tienda.nombre as 'tienda', CONCAT(usuario.nombre, ' ', usuario.appat, ' ', usuario.apmat) as 'usuario', rol.nombre as 'nombre_rol', sucursal.nombre as 'nombre_sucursal', categoria.nombre as 'nombre_categoria', producto.id as 'id_producto', producto.codigo, producto.nombre, venta_detalle.cantidad, (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01))) as 'precio', (cantidad * (precio - (precio * (descuento_cantidad.porcentaje_descuento * 0.01)))) as 'subtotal' FROM venta, usuario, rol, venta_detalle, descuento_cantidad, tienda_empresa, tienda, tipo_tienda, producto_stock, categoria, sucursal, producto, producto_grupo WHERE venta.id_usuario = usuario.id and usuario.id_rol = rol.id and venta.id = venta_detalle.id_venta and venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id = venta.id_tienda_empresa and tienda_empresa.id_tienda = tienda.id and tienda.id_tipo_tienda = tipo_tienda.id and venta_detalle.id_producto_stock = producto_stock.id and producto_stock.id_producto = producto.id and producto.id_producto_grupo = producto_grupo.id and producto_grupo.id_categoria = categoria.id and venta.id_sucursal = sucursal.id and fecha = ? and venta.id_sucursal = ? and venta.id_usuario = ? and venta.estado = ? and venta_detalle.estado = ? and venta.id_empresa = ? ORDER BY nro_venta ASC;";
        pool.query(sql, [fecha, id_sucursal, id_usuario, estado, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaByEmpresaTiendaVenta(id_empresa, id_tienda, venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id, nro_pre_venta, sucursal.nombre as 'nombre_sucursal', empresa.nombre as 'nombre_empresa', DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', venta, SUM(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total' FROM pre_venta, tienda_empresa, sucursal, empresa, pre_venta_detalle, descuento_cantidad WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and pre_venta.id_sucursal = sucursal.id and pre_venta.id_empresa = empresa.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and pre_venta.id_empresa = ? and tienda_empresa.id_tienda = ? and pre_venta.venta IN ("+venta+") GROUP BY pre_venta.id ORDER BY fecha_entrega ASC;";
        pool.query(sql, [id_empresa, id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaPreVentaByTiendaVenta(id_tienda, venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id, nro_pre_venta, sucursal.nombre as 'nombre_sucursal', empresa.id as 'id_empresa', empresa.nombre as 'nombre_empresa', DATE_FORMAT(pre_venta.fecha,'%d/%m/%Y') as 'fecha', DATE_FORMAT(pre_venta.fecha_entrega,'%d/%m/%Y') as 'fecha_entrega', venta, SUM(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total' FROM pre_venta, tienda_empresa, sucursal, empresa, pre_venta_detalle, descuento_cantidad WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and pre_venta.id_sucursal = sucursal.id and pre_venta.id_empresa = empresa.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and tienda_empresa.id_tienda = ? and pre_venta.venta IN ("+venta+") GROUP BY pre_venta.id ORDER BY fecha_entrega ASC;";
        pool.query(sql, [id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaEmpresaPreVentaByTiendaVenta(id_tienda, venta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT pre_venta.id_empresa, empresa.id_rubro, empresa.nombre as 'nombre_empresa', empresa.descripcion, rubro.nombre as 'nombre_rubro', empresa.logo FROM pre_venta, tienda_empresa, sucursal, empresa, pre_venta_detalle, descuento_cantidad, rubro WHERE pre_venta.id_tienda_empresa = tienda_empresa.id and pre_venta.id_sucursal = sucursal.id and pre_venta.id_empresa = empresa.id and pre_venta.id = pre_venta_detalle.id_pre_venta and pre_venta_detalle.id_descuento_cantidad = descuento_cantidad.id and empresa.id_rubro = rubro.id and tienda_empresa.id_tienda = ? and pre_venta.venta IN ("+venta+") GROUP BY empresa.id;";
        pool.query(sql, [id_tienda], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarVentaCarritoUsuario,
    agregarVentaCarritoTienda,
    agregarVentaFactura,
    agregarPreVenta,
    agregarVenta,
    agregarVentaCreditoDetallePago,
    agregarPreVentaDetalle,
    agregarVentaDetalle,
    anularVentaById,
    actualizarCarritoCantidadById,
    actualizarCarritoCantidadTiendaById,
    actualizarVentaById,
    actualizarIdVentaById,
    actualizarEstadoPreVentaDetalleById,
    eliminarProductoCarritoById,
    eliminarProductoCarritoTiendaById,
    productoEmpresaCarritoByUsuarioSucursalProducto,
    productoEmpresaCarritoByTiendaSucursalProducto,
    listaCarritoByTienda,
    listaCarritoByTiendaSucursal,
    listaCarritoByUsuarioSucursal,
    ultimaPreVentaBySucursal,
    ultimaVentaBySucursal,
    ventaById,
    preVentaById,
    preVentaDetalleById,
    listaProductoEmpresaByVentaAlmacen,
    listaPreVentaByFechaEntregaTiendaEmpresa,
    listaPreVentaByVentaFechaEntregaSucursalUsuario,
    listaPreVentaAgrupadoProductoByVentaFechaEntregaSucursalUsuario,
    listaPreVentaClienteByVentaFechaEntregaSucursalUsuarioProducto,
    listaPreVentaByFechaUsuarioVenta,
    listaPreVentaByFechaRutaCategoriaVenta,
    listaPreVentaDetalleByNroVenta,
    listaPreVentaDetalleByUsuario,
    listaPreVentaDetalleByEstadoPreVenta,
    listaPreVentaDetalleByNroPreVentaSucursal,
    listaPreVentaDetalleBySucursalFechaVentaEstado,
    listaVentaDetalleByFechaSucursalUsuarioEstado,
    listaVentaDetalleByEstadoVenta,
    listaVentaDetalleByNroVentaSucursal,
    listaVentaDetalleBySucursalFechaUsuario,
    listaPreVentaByEmpresaTiendaVenta,
    listaPreVentaByTiendaVenta,
    listaPreVentaBySucursalFechaVentaEstado,
    listaPreVentaProductoAgrupadoBySucursalFechaVentaEstado,
    listaEmpresaPreVentaByTiendaVenta,
    listaVentaBySucursalFechaUsuario,
    listaVentaProductoAgrupadoBySucursalFechaUsuario
}