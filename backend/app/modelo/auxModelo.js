const pool = require('../config/database');

function lisproductoempresa(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM producto_empresa WHERE estado = '1';";
        pool.query(sql, [], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function lisproductoprecio(codigo){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM productoaux WHERE codigo = ?;";
        pool.query(sql, [codigo], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutas(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM ruta;";
        pool.query(sql, [], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaRutaLimite(id_ruta){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM ruta_limite WHERE id_ruta = ? ORDER BY posicion ASC;";
        pool.query(sql, [id_ruta], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaTiendas(){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT * FROM tienda WHERE estado = '1';";
        pool.query(sql, [], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarTiendaEmpresa(id, id_tienda, id_tienda_categoria, id_ruta, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO tienda_empresa(id, id_tienda, id_tienda_categoria, id_ruta, id_empresa) VALUES (?,?,?,?,?);";
        pool.query(sql, [id, id_tienda, id_tienda_categoria, id_ruta, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function inside(point, vs){
    return new Promise((resolved, reject) =>{
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html
        
        var x = point[0], y = point[1];
        
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];

            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return resolved(inside)
    })
}

function inside_polygon(test_point, points){
    return new Promise((resolved, reject) =>{
        var p0 = points[points.length -1];
        var ctr = false;
        for(c=0;c<points.length;c++){
            if (test_point[1] == p0[1]){
                test_point[1]+=0.0000000001;
            }
                
            if ( p0[1] != points[c][1] ) {
                var interp = (test_point[1] - p0[1]) / (points[c][1] - p0[1]);
                if ( interp >= 0 && interp < 1 ) {
                    var long = interp * points[c][0] + (1 - interp) * p0[0];
                    if ( long > test_point[0] ) {
                        ctr = true;
                    }
                }
            }
            p0 = points[c];
        }
        return resolved(ctr)
    })
}

module.exports = {
    lisproductoempresa,
    lisproductoprecio,
    inside_polygon,
    agregarTiendaEmpresa,
    listaRutas,
    listaTiendas,
    listaRutaLimite
}