const pool = require('../config/database');

// ------------> INSERT
function agregarLiquidacion(id, id_sucursal, id_usuario_cuenta, id_usuario, fecha, hora, observacion,  
corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
total, sobrante, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO liquidacion(id, id_sucursal, id_usuario_cuenta, id_usuario, fecha, hora, observacion, " 
            + "corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, "
            + "corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, "
            + "total, sobrante, estado, id_empresa) "
            + "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        pool.query(sql, [id, id_sucursal, id_usuario_cuenta, id_usuario, fecha, hora, observacion,  
            corte_centavo_10, corte_centavo_20, corte_centavo_50, corte_boliviano_1, corte_boliviano_2, corte_boliviano_5, 
            corte_boliviano_10, corte_boliviano_20, corte_boliviano_50, corte_boliviano_100, corte_boliviano_200, 
            total, sobrante, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarPreventaDetalleLiquidacion(estado_pago, id){
    return new Promise((resolved, reject) =>{
    
        var sql = "UPDATE pre_venta_detalle SET estado_pago=? WHERE id=?;";
        pool.query(sql, [estado_pago, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function actualizarLiquidacionPagoSobrante(sobrante, id){
    return new Promise((resolved, reject) =>{
    
        var sql = "UPDATE liquidacion SET sobrante=? WHERE id=?;";
        pool.query(sql, [sobrante, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function listaLiquidacionGeneralByIdSucursal(id_sucursal, estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa){
    return new Promise((resolved, reject) =>{
    
        var sql = "SELECT liquidacion.id as 'id_liquidacion', liquidacion.id_sucursal, liquidacion.id_usuario_cuenta, liquidacion.id_usuario, "
            + "DATE_FORMAT(liquidacion.fecha,'%d/%m/%Y') as 'fecha', liquidacion.hora, liquidacion.observacion, "
            + "liquidacion.total, liquidacion.sobrante, sucursal.nombre as 'sucursal', "
            + "concat_ws(' ', user_liquidacion.nombre, user_liquidacion.appat, user_liquidacion.apmat) as 'usuario_liquidacion', rol_user_liquidacion.nombre as 'rol_usuario_liquidacion', "
            + "concat_ws(' ', user.nombre, user.appat, user.apmat) as 'usuario_adm', rol_user.nombre as 'rol_usuario_adm' "
            + "FROM liquidacion INNER JOIN sucursal ON sucursal.id = liquidacion.id_sucursal "
            + "INNER JOIN usuario as user_liquidacion ON liquidacion.id_usuario_cuenta = user_liquidacion.id "
            + "INNER JOIN rol as rol_user_liquidacion ON user_liquidacion.id_rol = rol_user_liquidacion.id "
            + "INNER JOIN usuario as user ON user.id = liquidacion.id_usuario INNER JOIN rol as rol_user ON rol_user.id = user.id_rol "
            + "WHERE liquidacion.id_sucursal=? AND liquidacion.estado =? AND liquidacion.fecha>=? AND liquidacion.fecha<=? AND liquidacion.id_empresa=? "
            + "AND liquidacion.id_usuario_cuenta IN (" + id_usuario_cuenta + ") AND liquidacion.id_usuario IN (" + id_usuario + ") "
            + "ORDER BY liquidacion.fecha DESC, liquidacion.hora DESC; ";
        pool.query(sql, [id_sucursal, estado, fecha_inicio, fecha_fin, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function listaLiquidacionGeneralByIdUsuario(estado, id_usuario_cuenta, id_usuario, fecha_inicio, fecha_fin, id_empresa){
    return new Promise((resolved, reject) =>{
    
        var sql = "SELECT liquidacion.id as 'id_liquidacion', liquidacion.id_sucursal, liquidacion.id_usuario_cuenta, liquidacion.id_usuario, "
            + "DATE_FORMAT(liquidacion.fecha,'%d/%m/%Y') as 'fecha', liquidacion.hora, liquidacion.observacion, "
            + "liquidacion.total, liquidacion.sobrante, sucursal.nombre as 'sucursal', "
            + "concat_ws(' ', user_liquidacion.nombre, user_liquidacion.appat, user_liquidacion.apmat) as 'usuario_liquidacion', rol_user_liquidacion.nombre as 'rol_usuario_liquidacion', "
            + "concat_ws(' ', user.nombre, user.appat, user.apmat) as 'usuario_adm', rol_user.nombre as 'rol_usuario_adm' "
            + "FROM liquidacion INNER JOIN sucursal ON sucursal.id = liquidacion.id_sucursal "
            + "INNER JOIN usuario as user_liquidacion ON liquidacion.id_usuario_cuenta = user_liquidacion.id "
            + "INNER JOIN rol as rol_user_liquidacion ON user_liquidacion.id_rol = rol_user_liquidacion.id "
            + "INNER JOIN usuario as user ON user.id = liquidacion.id_usuario INNER JOIN rol as rol_user ON rol_user.id = user.id_rol "
            + "WHERE liquidacion.estado =? AND liquidacion.fecha>=? AND liquidacion.fecha<=? AND liquidacion.id_empresa=? "
            + "AND liquidacion.id_usuario_cuenta IN (" + id_usuario_cuenta + ") AND liquidacion.id_usuario IN (" + id_usuario + ") "
            + "ORDER BY liquidacion.fecha DESC, liquidacion.hora DESC; ";
        pool.query(sql, [estado, fecha_inicio, fecha_fin, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function listaPreventaProductosByCargaParaLiquidacion(nro_carga, estado, id_empresa){
    return new Promise((resolved, reject) =>{
    
        var sql = "SELECT pre_venta_detalle.id, carga.nro_carga as 'nro_carga', DATE_FORMAT(carga.fecha_entrega, '%d/%m/%Y') as 'fecha_entrega', "
            + "pre_venta.nro_pre_venta, pre_venta_detalle.precio, pre_venta_detalle.id_producto, pre_venta_detalle.cantidad, "
            + "(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', "
            + "producto.codigo, producto.nombre, producto.descripcion, producto.imagen "
            + "FROM carga INNER JOIN pre_venta ON carga.id_pre_venta = pre_venta.id  "
            + "INNER JOIN pre_venta_detalle ON pre_venta.id = pre_venta_detalle.id_pre_venta "
            + "INNER JOIN producto ON producto.id = pre_venta_detalle.id_producto "
            + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad "
            + "WHERE pre_venta_detalle.estado_pago=0 AND pre_venta_detalle.estado=1 AND carga.nro_carga=? AND carga.estado =? AND carga.id_empresa=? AND pre_venta.venta=1 "
            + "ORDER BY producto.nombre ASC, pre_venta.nro_pre_venta DESC; ";
        pool.query(sql, [nro_carga, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function listaCargaTotalMontosParaLiquidacion(id_usuario, estado, id_empresa){
    return new Promise((resolved, reject) =>{
    
        var sql = "SELECT carga.nro_carga as 'nro_carga', DATE_FORMAT(carga.fecha_entrega, '%d/%m/%Y') as 'fecha_entrega', "
            + "SUM(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento', "
            + "concat_ws(' ', usuario.nombre, usuario.appat, usuario.apmat) as 'usuario' "
            + "FROM carga INNER JOIN pre_venta ON carga.id_pre_venta = pre_venta.id "
            + "INNER JOIN pre_venta_detalle ON pre_venta.id = pre_venta_detalle.id_pre_venta "
            + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad "
            + "INNER JOIN usuario ON usuario.id = carga.id_usuario "
            + "WHERE pre_venta.venta='1' AND pre_venta_detalle.estado='1' AND carga.id_usuario=? AND carga.estado=? AND carga.id_empresa=? AND pre_venta_detalle.estado_pago=0 "
            + "group by carga.nro_carga, fecha_entrega, usuario "
            + "ORDER By carga.nro_carga DESC";
        pool.query(sql, [id_usuario, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

function listaDetallePreventaByCargaParaLiquidacion(nro_carga, id_empresa){
    return new Promise((resolved, reject) =>{
    
        var sql = "SELECT pre_venta_detalle.id, pre_venta_detalle.cantidad, pre_venta_detalle.id_producto,pre_venta_detalle.precio, "
            + "(ROUND(pre_venta_detalle.precio-((descuento_cantidad.porcentaje_descuento * 0.01) * pre_venta_detalle.precio)+0.0000000001, 2) * pre_venta_detalle.cantidad) as 'total_descuento' "
            + "FROM carga INNER JOIN pre_venta ON carga.id_pre_venta = carga.id_pre_venta "
            + "INNER JOIN pre_venta_detalle ON pre_venta_detalle.id_pre_venta = pre_venta.id "
            + "INNER JOIN descuento_cantidad ON descuento_cantidad.id = pre_venta_detalle.id_descuento_cantidad "
            + "WHERE carga.nro_carga =? AND carga.id_empresa=? AND pre_venta.venta=1 AND pre_venta_detalle.estado=1 AND pre_venta_detalle.estado_pago=0 "
            + "GROUP BY pre_venta_detalle.id ";
            + "ORDER BY total_descuento DESC";
        pool.query(sql, [nro_carga, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
        
    })
}

module.exports = {
    agregarLiquidacion,
    actualizarPreventaDetalleLiquidacion,
    actualizarLiquidacionPagoSobrante,
    listaLiquidacionGeneralByIdSucursal,
    listaLiquidacionGeneralByIdUsuario,
    listaPreventaProductosByCargaParaLiquidacion,
    listaCargaTotalMontosParaLiquidacion,
    listaDetallePreventaByCargaParaLiquidacion
}