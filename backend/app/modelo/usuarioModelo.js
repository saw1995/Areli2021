const pool = require('../config/database');

// ------------> INSERT
function agregarUsuario(id, ci, ci_exp, nombre, appat, apmat, email, 
    celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia,
    latitud, longitud, foto, pass, id_rol, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO usuario(id, ci, ci_exp , nombre, appat, apmat, email, "
            + " celular, genero, id_departamento_nacimiento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, "
            + " latitud, longitud, foto, pass, id_rol, estado, id_empresa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, ci, ci_exp, nombre, appat, apmat, email, 
            celular, genero, id_departamento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia,
            latitud, longitud, foto, pass, id_rol, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function agregarLogin(id, id_usuario, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "INSERT INTO usuario_login(id, id_usuario, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado, id_empresa) VALUES (?,?,?,?,?,?,?,?,?,?);";
        pool.query(sql, [id, id_usuario, plataforma, fecha_ingreso, hora_ingreso, latitud_ingreso, longitud_ingreso, dispositivo_ingreso, estado, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

// ------------> UPDATE
function salirLogin(fecha_salida, hora_salida, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE usuario_login SET fecha_salida = ?, hora_salida = ?, latitud_salida = ?, longitud_salida = ?, observacion_salida = ?, dispositivo_salida = ?, estado = ? WHERE id = ? and id_empresa = ?;";
        pool.query(sql, [fecha_salida, hora_salida, latitud_salida, longitud_salida, observacion_salida, dispositivo_salida, estado, id, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarDatosUsuarioById(ci, ci_exp , nombre, appat, apmat, email,
     celular, genero, id_departamento_nacimiento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, 
    latitud, longitud, id_rol, id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE usuario SET ci=?,ci_exp=?,nombre=?,appat=?,apmat=?,email=?, "
                + "celular=?,genero=?,id_departamento_nacimiento=?,fecha_nacimiento=?,estado_civil=?, "
                + "estudio=?,zona=?,avenida=?,calle=?,numero=?,referencia=?, "
                + "latitud=?,longitud=?,id_rol=? WHERE id_empresa=? and id=?";
        pool.query(sql, [ci, ci_exp , nombre, appat, apmat, email,
            celular, genero, id_departamento_nacimiento, fecha_nacimiento, estado_civil, estudio, zona, avenida, calle, numero, referencia, 
           latitud, longitud, id_rol, id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarEstadoByIdUsuario(estado, id_empresa, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE usuario SET estado = ? WHERE id_empresa = ? AND id = ?";
        pool.query(sql, [estado, id_empresa, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarPassById(pass, id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE usuario SET pass = ? WHERE id = ? and id_empresa = ?";
        pool.query(sql, [pass, id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function actualizarImagenById(foto, id){
    return new Promise((resolved, reject) =>{
        var sql = "UPDATE usuario SET foto = ? WHERE id = ?;";
        pool.query(sql, [foto, id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}
// ------------> DELETE

// ------------> SELECT
function listaUsuarioByEmpresaByEstado(id_empresa,estado){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id,usuario.ci,usuario.ci_exp, usuario.nombre,usuario.appat,usuario.apmat,usuario.email,"
        +"usuario.celular, usuario.genero, usuario.fecha_nacimiento, year(curdate())-year(usuario.fecha_nacimiento) as 'edad',"
        +"usuario.estado_civil, usuario.estudio, usuario.zona, usuario.avenida,usuario.calle,usuario.numero,usuario.referencia,"
        +"usuario.latitud, usuario.longitud, usuario.foto, departamento.departamento, departamento.provincia, departamento.municipio, "
        +"departamento.id as 'id_departamento',rol.id as 'id_rol',rol.nombre as 'nombre_rol',usuario.estado "
        +"FROM usuario INNER JOIN rol  ON rol.id = usuario.id_rol "
        +"INNER JOIN departamento ON departamento.id = usuario.id_departamento_nacimiento "
        +"WHERE usuario.id_empresa =? AND usuario.estado=? ORDER BY rol.nombre ASC, usuario.nombre ASC";
        pool.query(sql, [id_empresa,estado], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaUsuarioByEmpresa(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id,usuario.ci,usuario.ci_exp, usuario.nombre,usuario.appat,usuario.apmat,usuario.email,"
        +"usuario.celular, usuario.genero, usuario.fecha_nacimiento, year(curdate())-year(usuario.fecha_nacimiento) as 'edad',"
        +"usuario.estado_civil, usuario.estudio, usuario.zona, usuario.avenida,usuario.calle,usuario.numero,usuario.referencia,"
        +"usuario.latitud, usuario.longitud, usuario.foto, departamento.departamento, departamento.provincia, departamento.municipio, "
        +"departamento.id as 'id_departamento',rol.id as 'id_rol',rol.nombre as 'nombre_rol',usuario.estado "
        +"FROM usuario INNER JOIN rol  ON rol.id = usuario.id_rol "
        +"INNER JOIN departamento ON departamento.id = usuario.id_departamento_nacimiento "
        +"WHERE usuario.id_empresa =? ORDER BY rol.nombre ASC, usuario.nombre ASC";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function usuarioById(id_empresa,id){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id,usuario.ci,usuario.ci_exp, usuario.nombre,usuario.appat,usuario.apmat,usuario.email,"
        +"usuario.celular, usuario.genero,  DATE_FORMAT(usuario.fecha_nacimiento,'%d/%m/%Y') as 'fecha_nacimiento', year(curdate())-year(usuario.fecha_nacimiento) as 'edad',"
        +"usuario.estado_civil, usuario.estudio, usuario.zona, usuario.avenida,usuario.calle,usuario.numero,usuario.referencia,"
        +"usuario.latitud,usuario.longitud,usuario.foto,departamento.departamento,departamento.provincia,departamento.municipio,"
        +"departamento.id as 'id_departamento',rol.id as 'id_rol',rol.nombre as 'nombre_rol', usuario.estado, usuario.pass "
        +"FROM usuario INNER JOIN rol  ON rol.id = usuario.id_rol "
        +"INNER JOIN departamento ON departamento.id = usuario.id_departamento_nacimiento "
        +"WHERE usuario.id_empresa =? AND usuario.id=?";
        pool.query(sql, [id_empresa,id], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function usuarioByCiPass(ci, pass){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id, usuario.nombre, usuario.appat, usuario.apmat, usuario.foto as 'foto_usuario', empresa.id as 'id_empresa', empresa.nombre as 'nombre_empresa', empresa.logo as 'logo_empresa', empresa.descripcion, id_rubro, rubro.nombre as 'nombre_rubro', nit, usuario.estado as 'estado_usuario', empresa.estado as 'estado_empresa', usuario.id_rol, rol.nombre as 'nombre_rol' FROM usuario, empresa, rol, rubro WHERE usuario.id_empresa = empresa.id and usuario.id_rol = rol.id and empresa.id_rubro = rubro.id and ci = ? and pass = ? ";
        pool.query(sql, [ci, pass], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function usuarioLoginByUsuarioEmpresa(id_usuario, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.id, usuario.nombre, usuario.appat, usuario.apmat, usuario.foto as 'foto_usuario', empresa.id as 'id_empresa', empresa.nombre as 'nombre_empresa', empresa.logo as 'logo_empresa', empresa.descripcion, id_rubro, rubro.nombre as 'nombre_rubro', nit, usuario.estado as 'estado_usuario', empresa.estado as 'estado_empresa', usuario.id_rol, rol.nombre as 'nombre_rol' FROM usuario, empresa, rol, rubro WHERE usuario.id_empresa = empresa.id and usuario.id_rol = rol.id and empresa.id_rubro = rubro.id and usuario.id = ? and usuario.id_empresa = ?;";
        pool.query(sql, [id_usuario, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function loginByUsuarioPlataforma(id_usuario, plataforma, id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT id,id_usuario,plataforma,fecha_ingreso,hora_ingreso,latitud_ingreso,longitud_ingreso,dispositivo_ingreso, "
        +"fecha_salida,hora_salida,latitud_salida,longitud_salida,observacion_salida,dispositivo_salida,estado,id_empresa "
        + "FROM usuario_login WHERE id_usuario = ? and plataforma = ? and id_empresa = ? AND estado=1 ORDER BY fecha_ingreso DESC, hora_ingreso DESC LIMIT 1";
        pool.query(sql, [id_usuario, plataforma, id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

function listaUsuarioByEmpresaToExcel(id_empresa){
    return new Promise((resolved, reject) =>{
        var sql = "SELECT usuario.ci,usuario.ci_exp, "
        +"concat_ws(' ',usuario.nombre,usuario.appat,usuario.apmat) as 'nombre',usuario.email,"
        +"usuario.celular, usuario.genero, usuario.fecha_nacimiento,"
        +"usuario.estado_civil, usuario.estudio, "
        +"concat_ws(' ',usuario.zona, usuario.avenida,usuario.calle,usuario.numero,usuario.referencia) as 'direccion', "
        +"usuario.foto,rol.nombre as 'rol',usuario.estado, "
        +"departamento.departamento,departamento.provincia,departamento.municipio,sucursal.nombre as 'sucursal' "
        +"FROM usuario INNER JOIN rol  ON rol.id = usuario.id_rol "
        +"INNER JOIN sucursal_rol ON rol.id = sucursal_rol.id_rol "
        +"inner join sucursal on sucursal.id = sucursal_rol.id_sucursal "
        +"INNER JOIN departamento ON departamento.id = sucursal.id_departamento WHERE usuario.id_empresa=? ORDER BY usuario.nombre ASC;";
        pool.query(sql, [id_empresa], function(error, resultado){
            if (error) return reject(error);
            return resolved(resultado)
        });
    })
}

module.exports = {
    agregarUsuario,
    agregarLogin,
    salirLogin,
    actualizarDatosUsuarioById,
    actualizarEstadoByIdUsuario,
    actualizarPassById,
    actualizarImagenById,
    listaUsuarioByEmpresaByEstado,
    listaUsuarioByEmpresa,
    usuarioByCiPass,
    usuarioLoginByUsuarioEmpresa,
    loginByUsuarioPlataforma,
    usuarioById,
    listaUsuarioByEmpresaToExcel
}