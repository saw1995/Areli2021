const almacenModelo = require('../modelo/almacenModelo');

// ------------> INSERT
function agregarAlmacen(id_sucursal, nombre, descripcion, latitud, longitud, id_empresa, id_rol){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && nombre !== undefined && descripcion !== undefined &&
                latitud !== undefined && longitud !== undefined && id_empresa !== undefined){

                const id_generado_almacen = Date.now();
                const id_generado = Date.now();
                var resultado = await almacenModelo.agregarAlmacen(id_generado_almacen, id_sucursal, nombre, descripcion, latitud, longitud, 1, 0, id_empresa);
                var resultado = await almacenModelo.agregarAlmacenRol(id_generado, id_generado_almacen, id_rol, id_empresa);
                
                resultado["id_almacen"] = id_generado_almacen;
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
function agregarAlmacenSeccion(id,id_almacen,nombre,descripcion,id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_almacen !== undefined && nombre !== undefined && descripcion !== undefined && id_empresa !== undefined){

                var resultado = await almacenModelo.agregarAlmacenSeccion(id,id_sucursal,nombre,descripcion,latitud,longitud,1,id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function agregarAlmacenRol(id_almacen, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_rol !== undefined && id_empresa !== undefined){

                const id_generado = Date.now();

                var resultado = await almacenModelo.agregarAlmacenRol(id_generado, id_almacen, id_rol, id_empresa);

                resultado["id_almacen_rol"] = id_generado
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
// ------------> UPDATE
function actualizarVentaAlmacenByAlmacen(venta, id_almacen, id_sucursal, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(venta !== undefined && id_almacen !== undefined && id_sucursal !== undefined &&
                id_empresa !== undefined && estado !== undefined ){

                var resultado = await almacenModelo.actualizarVentaAlmacenBySucursal("0", id_sucursal, id_empresa, estado);
                resultado = await almacenModelo.actualizarVentaAlmacenByAlmacen(venta, id_almacen, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function actualizarDatosAlmacen(id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && nombre !== undefined && descripcion !== undefined &&
                latitud !== undefined && longitud !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await almacenModelo.actualizarDatosAlmacen(id_sucursal,nombre,descripcion,latitud,longitud,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoByIdAlmacen(estado,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await almacenModelo.actualizarEstadoByIdAlmacen(estado, id_empresa, id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarDatosAlmacenSeccion(id_almacen,nombre,descripcion,id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && nombre !== undefined && descripcion !== undefined &&
                id_empresa !== undefined && id !== undefined){

                var resultado = await almacenModelo.actualizarDatosAlmacenSeccion(id_almacen,nombre,descripcion,id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function actualizarEstadoAlmacenSeccionById(estado, id_empresa, id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_empresa !== undefined && id !== undefined){

                var resultado = await almacenModelo.actualizarEstadoAlmacenSeccionById(estado, id_empresa, id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
// ------------> DELETE
function eliminarAlmacenRolById(id_almacen, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_almacen !== undefined && id_rol !== undefined && id_empresa !== undefined){

                var resultado = await almacenModelo.eliminarAlmacenRolById(id_almacen, id_rol, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

// ------------> SELECT
function listaAlmacenBySucursalEmpresa(id_empresa,id_sucursal){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id_sucursal !== undefined){

                var resultado = await almacenModelo.listaAlmacenBySucursalEmpresa(id_empresa,id_sucursal);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            console.log(error)
            return resolved({"mysql":error});
        }
    })
}

function listaAlmacenByIdEmpresaEstado(id_empresa,id_sucursal,estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id_sucursal !== undefined && estado !== undefined){

                var resultado = await almacenModelo.listaAlmacenByIdEmpresaEstado(id_empresa,id_sucursal,estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaAlmacenSeccionByIdAlmacenEstado(id_empresa,id_almacen, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id_almacen !== undefined && estado !== undefined){

                var resultado = await almacenModelo.listaAlmacenSeccionByIdAlmacenEstado(id_empresa,id_almacen, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function almacenById(id_empresa,id){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined && id !== undefined ){

                var resultado = await almacenModelo.almacenById(id_empresa,id);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaAlmacenVentaSucursalBySucursal(id_sucursal, id_empresa, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_empresa !== undefined && estado !== undefined ){

                var resultado = await almacenModelo.listaAlmacenVentaSucursalBySucursal(id_sucursal, id_empresa, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function almacenVentaSucursalBySucursalVenta(id_sucursal, id_empresa, venta, estado){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_sucursal !== undefined && id_empresa !== undefined && venta !== undefined && estado !== undefined ){

                var resultado = await almacenModelo.almacenVentaSucursalBySucursalVenta(id_sucursal, id_empresa, venta, estado);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaAlmacenRolByRol(estado, id_sucursal, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_sucursal !== undefined && id_rol !== undefined && id_empresa !== undefined ){

                var resultado = await almacenModelo.listaAlmacenRolByRol(estado, id_sucursal, id_rol, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}

function listaAlmacenRolNoRegistradoByRol(estado, id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(estado !== undefined && id_rol !== undefined && id_empresa !== undefined ){

                var resultado = await almacenModelo.listaAlmacenRolNoRegistradoByRol(estado, id_rol, id_empresa);
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return resolved({"mysql":error});
        }
    })
}
//---------->export
module.exports = {
    agregarAlmacen,
    agregarAlmacenRol,
    actualizarVentaAlmacenByAlmacen,
    actualizarDatosAlmacen,
    actualizarEstadoByIdAlmacen,
    listaAlmacenBySucursalEmpresa,
    listaAlmacenByIdEmpresaEstado,
    agregarAlmacenSeccion,
    actualizarDatosAlmacenSeccion,
    actualizarEstadoAlmacenSeccionById,
    eliminarAlmacenRolById,
    listaAlmacenSeccionByIdAlmacenEstado,
    almacenById,
    listaAlmacenVentaSucursalBySucursal,
    almacenVentaSucursalBySucursalVenta,
    listaAlmacenRolByRol,
    listaAlmacenRolNoRegistradoByRol
}