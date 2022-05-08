const rolModelo = require('../modelo/rolModelo');

// ------------> INSERT
function nuevoRolPredeterminado(id, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id !== undefined && id_empresa !== undefined){

                var resultado = await rolModelo.agregarRol(id, "Administrador", '1', id_empresa);
                var modulos = await rolModelo.listaModulo();
                for(i=0;i<modulos.length;i++){
                  
                    resultado = await rolModelo.agregarRolModulo( (id+"-"+i), id, modulos[i]["id"], "1", id_empresa);
                }
                if(resultado.length == 0){
                    resultado = [];
                }
                respuesta = {"datos":resultado}
            }
            return resolved(respuesta)
        }catch(error){
            return reject({"mysql":error});
        }
    })
}

function agregarRol(nombre, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(nombre !== undefined && id_empresa !== undefined){

                const id_generado = Date.now();
                var resultado = await rolModelo.agregarRol(id_generado, nombre, '1', id_empresa);
                resultado['id_rol'] = id_generado;
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

function agregarRolModulo(id_rol, id_modulo, estado, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_rol !== undefined && id_modulo !== undefined){

                const id_generado = Date.now();
                var resultado = await rolModelo.agregarRolModulo(id_generado, id_rol, id_modulo, estado, id_empresa);
                resultado["id_modulo_rol"] = id_generado;
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

function eliminarRolModulo(id_rol, id_modulo){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_rol !== undefined && id_modulo !== undefined){

                var resultado = await rolModelo.eliminarRolModulo(id_rol, id_modulo);
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

// ------------> SELECT
function listaModulo(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined){

                var resultado = await rolModelo.listaModulo(id_empresa);
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

function listaRolByIdEmpresa(id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_empresa !== undefined){

                var resultado = await rolModelo.listaRolByIdEmpresa(id_empresa);
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

function listaModuloRolNoRegistradoByRol(id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_rol !== undefined && id_empresa !== undefined){

                var resultado = await rolModelo.listaModuloRolNoRegistradoByRol(id_rol, id_empresa);
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

function listaModuloRolByRol(id_rol, id_empresa){
    return new Promise(async (resolved, reject) =>{
        try{
            respuesta = {"nodejs":"Falta de parametros para la Operacion."}
            if(id_rol !== undefined && id_empresa !== undefined){

                var resultado = await rolModelo.listaModuloRolByRol(id_rol, id_empresa);
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
//export
module.exports = {
    nuevoRolPredeterminado,
    agregarRol,
    agregarRolModulo,
    eliminarRolModulo,
    listaModulo,
    listaRolByIdEmpresa,
    listaModuloRolNoRegistradoByRol,
    listaModuloRolByRol
}